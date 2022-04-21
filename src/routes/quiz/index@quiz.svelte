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

    /*  const request = await fetch("/api/quiz.json", {
      method: "GET",
      credentials: "same-origin",
    });

    const data = await request.json();
    console.log(data); */

    return {
      props: {
        // session: session,
        playLists: playLists,
      },
    };
  }

  const createQuiz = async () => {
    await fetch("/api/quiz.json", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
    });
  };
</script>

<script lang="ts">
  import PlaylistSelector from "$lib/components/PlaylistSelector.svelte";
  import { supabase } from "$lib/utils/supabaseClient";

  export let playLists: PlaylistBaseObject[];

  const getQuizViaClient = async () => {
    const { data, error } = await supabase.from("musikquiz").select();
    if (error) console.error(error);
    console.log(data);
  };
</script>

<h1>Welcome to Musikquiz Maschine 3000</h1>

<PlaylistSelector {playLists} />
