<script lang="ts">
  export let lyrics;
  let translatedLyrics;

  const translateLyrics = async () => {
    const urlParameter = new URLSearchParams();
    urlParameter.append("language", encodeURI("en"));
    const apiUrl = `/api/lyrics/translate?${urlParameter.toString()}`;

    const request = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ language: "de", lyrics: lyrics }),
    });
    if (request.ok) {
      translatedLyrics = await request.json();
      console.log(translateLyrics);
    }
  };
</script>

<button on:click|once={translateLyrics}>Übersetzen</button>
