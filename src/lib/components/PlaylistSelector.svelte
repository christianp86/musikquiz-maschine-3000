<script lang="ts">
  import type { PlaylistBaseObject } from "$lib/utils/spotify/Types";
  export let playLists: PlaylistBaseObject[] = [];
</script>

<select name="Spotify Playlist">
  {#each playLists as playlist}
    <option value="{playlist.id}">{playlist.name}</option>
  {/each}
</select>
