<script lang="ts">
  const synth = window.speechSynthesis;
  let selected = "";
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
      console.error("speechSynthesis.speaking");
      return;
    }

    if (text === "") {
      console.error("No text to speak");
      return;
    }

    let utterThis = new SpeechSynthesisUtterance(text);

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selected) {
        utterThis.voice = voices[i];
        break;
      }
    }

    utterThis.onend = (event) => {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.pitch = pitch;
    utterThis.rate = rate;
    synth.speak(utterThis);
  };

  const voices = populateVoiceList();

  const voiceSelected = () => {
    speak("Hello World");
  };

  const speakText = (): void => {
    speak("Hello World");
  };
</script>

<form on:submit|preventDefault={speakText}>
  <select bind:value={selected} on:blur={voiceSelected}>
    {#each voices as voice}
      <option value={voice.name}>
        {voice.name} - ({voice.lang})
      </option>
    {/each}
  </select>
  <div class="controls">
    <button id="play" type="submit">Play</button>
  </div>
</form>
