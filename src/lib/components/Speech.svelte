<script lang="ts">
  import Translator from "./Translator.svelte";
  import { onMount } from "svelte";

  type TranslatedEventType = Translator['$$events_def']['translated'];

  const handleLoaded = ({ detail }: TranslatedEventType) => {
    translatedLyrics = detail;
    text = translatedLyrics;
  }


  export let artist: string;
  export let trackName: string;

  let voices: SpeechSynthesisVoice[] = [];
  const synth = window.speechSynthesis;
  let selectedVoice: SpeechSynthesisVoice;
  let pitch = 1;
  let rate = 1;
  let lyrics = "";
  let translatedLyrics = "";
  let text = "";

  onMount(async () => {
    const urlParameter = new URLSearchParams();
    urlParameter.append("artist", encodeURI(artist));
    urlParameter.append("track", trackName);
    const apiUrl = `/api/lyrics?${urlParameter.toString()}`;

    const request = await fetch(apiUrl);
    if (request.ok) {
      lyrics = await request.json();
      text = lyrics;
    }

    voices = populateVoiceList();
    selectedVoice = voices[0];
  });

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

    utterThis.voice = voices.find((voice) => voice.name === selectedVoice.name);

    utterThis.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.pitch = pitch;
    utterThis.rate = rate;
    synth.speak(utterThis);
  };

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
      speak(text);
      console.log("Speaking");
    }
  };
</script>

<textarea bind:value={text} readonly rows="10" cols="200" />

<div class="controls">
  <button id="play" on:click={speakText}>Lyrics vorlesen</button>
  <button id="pause" on:click={pause}>Pause</button>
  <!-- <select bind:value={selectedVoice} on:blur={voiceSelected}> -->
  <select bind:value={selectedVoice}>
    {#each voices as voice}
      <option value={voice}>
        {voice.name} - ({voice.lang})
      </option>
    {/each}
  </select>
</div>

<Translator {lyrics} on:translated={handleLoaded}/>

<style>
  textarea {
    width: 500px;
  }
</style>
