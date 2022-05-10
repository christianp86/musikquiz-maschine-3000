<script context="module" lang="ts">
  import type { PlaylistBaseObject } from "$lib/utils/spotify/Types";

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, session }) {
    if (session === null) return;

    const response = await fetch("/api/spotify.json", {
      method: "GET",
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const playLists: PlaylistBaseObject[] = data?.items.map(
      (spotifyPlaylist): PlaylistBaseObject => ({
        id: spotifyPlaylist.id,
        name: spotifyPlaylist.name,
        href: spotifyPlaylist.href,
        images: spotifyPlaylist.images,
        type: spotifyPlaylist.type,
      })
    );

    return {
      props: {
        playLists: playLists,
      },
    };
  }
</script>

<script lang="ts">
  import type { Quiz } from "$lib/utils/quiz/Types";

  import Wizard from "$lib/components/quiz/wizard/Wizard.svelte";
  import WizardStep from "$lib/components/quiz/wizard/WizardStep.svelte";
  import PlaylistSelector from "$lib/components/PlaylistSelector.svelte";

  export let playLists: PlaylistBaseObject[];
  

  const quiz: Quiz = {
    id: "",
    description: "",
    spotifyPlaylistId: "",
    settings: {
      questions: 1,
      rounds: 1,
    },
    questions: [],
  };
</script>

<div class="flex flex-col">
  <Wizard>
    <WizardStep num={1}>
      <h1 class="mb-2">Schritt 1</h1>
      <p class="text-base_color-90">
        Generelle Einstellungen für die Quiz-Erstellung.
      </p>
      <div class="grid grid-cols-2 gap-y-5 mt-4">
        <label class="text-base_color-90" for="rounds">Runden:</label>
        <input
          type="number"
          id="rounds"
          bind:value={quiz.settings.rounds}
          required
          class="md:ml-2 border-0 border-none bg-base_color-10 text-base_color-90 text-xl text-center"
          min="1"
          max="10"
        />
        <label class="text-base_color-90" for="questions">Fragen pro Runde:</label>
        <input
          type="number"
          id="questions"
          bind:value={quiz.settings.questions}
          required
          class="md:ml-2 border-0 border-none bg-base_color-10 text-base_color-90 text-xl text-center"
          min="1"
          max="10"
        />
      </div>
    </WizardStep>
    <WizardStep num={2}>
      <h1 class="mb-2">Schritt 2</h1>
      <p class="text-base_color-90 mb-2">
        Wähle eine Playlist aus. Daraus werden später zufällig Lieder ausgewählt.
      </p>
      <PlaylistSelector {playLists}/>
    </WizardStep>
  </Wizard>
</div>
