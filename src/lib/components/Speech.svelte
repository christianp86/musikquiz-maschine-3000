<script lang="ts">
  import { onMount } from "svelte";

  const synth = window.speechSynthesis;

  export let artist: string;
  export let trackName: string;

  let lyrics = "";

  onMount(async () => {
    const urlParameter = new URLSearchParams();
    urlParameter.append("artist", encodeURI(artist));
    urlParameter.append("track", trackName);
    const apiUrl = `/api/lyrics?${urlParameter.toString()}`;

    const request = await fetch(apiUrl);
    if (request.ok) {
      lyrics = await request.json();
    }
  });

  let selectedVoice = "";
  let pitch = 1;
  let rate = 1;

  const populateVoiceList = (): SpeechSynthesisVoice[] => {
    const voices = synth.getVoices().sort((a, b) => {
      const aname = a.name.toUpperCase(),
        bname = b.name.toUpperCase();

      if (aname < bname) return -1;
      else if (aname == bname) return 0;
      else return +1;
    });
    return voices;
  };

  const speak = (text: string): void => {
    if (synth.speaking) {
      console.error("Already speaking");
      return;
    }

    if (text === "") {
      console.error("No text to speak");
      return;
    }

    let utterThis = new SpeechSynthesisUtterance(text);

    utterThis.voice = voices.find((voice) => voice.name === selectedVoice);

    utterThis.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.pitch = pitch;
    utterThis.rate = rate;
    synth.speak(utterThis);
  };

  const voices = populateVoiceList();

  const pause = () => {
    if (synth.speaking) {
      synth.pause();
      console.log("Paused");
    }
  };

  const voiceSelected = () => {
    speak(lyrics);
  };

  const speakText = (): void => {
    if (synth.paused) {
      synth.resume();
      console.log("Resumed");
    } else {
      speak(lyrics);
      console.log("Speaking");
    }

  };
</script>

<textarea bind:value={lyrics} readonly />

<select bind:value={selectedVoice} on:blur={voiceSelected}>
  {#each voices as voice}
    <option value={voice.name}>
      {voice.name} - ({voice.lang})
    </option>
  {/each}
</select>
<div class="controls">
  <button id="play" on:click|once={speakText}>Play</button>
  <button id="pause" on:click|once={pause}>Pause</button>
</div>

<style>
  textarea {
    width: 500px;
    height: 200px;
  }
</style>
