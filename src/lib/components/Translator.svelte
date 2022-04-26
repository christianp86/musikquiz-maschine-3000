<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
		translated: string
	}>()


  export let lyrics;
  let translatedLyrics;
  let buttonDisabled = true;

  const languages = [
    {
      code: "de",
      name: "Deutsch",
    },
    {
      code: "en-us",
      name: "Englisch",
    },
    {
      code: "es",
      name: "Spanisch",
    },
    {
      code: "fr",
      name: "Französisch",
    },
    {
      code: "it",
      name: "Italienisch",
    }
  ];

  let selectedLanguage:string;

  const translateLyrics = async () => {

    console.log("Selected language: ", selectedLanguage);
    const apiUrl = `/api/lyrics/translate`;

    const request = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ language: selectedLanguage, lyrics: lyrics }),
    });

    if (request.ok) {
      translatedLyrics = await request.json();
      console.log(translatedLyrics);
      dispatch("translated", translatedLyrics);
    }
  };

  $: if (lyrics !== undefined && lyrics !== "") {
    buttonDisabled = false;
  }
</script>

<div class="translate_controls">
  <select bind:value={selectedLanguage} disabled={buttonDisabled}>
    {#each languages as language}
      <option value={language.code}>{language.name}</option>
    {/each}
  </select>
  <button on:click|once={translateLyrics} disabled={buttonDisabled}>
    Übersetzen
  </button>
</div>

<style>
  .translate_controls {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    margin: 5px 0 5px 0;
  }
</style>
