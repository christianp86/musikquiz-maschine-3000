<script lang="ts">
  import type { PlaylistBaseObject } from "$lib/utils/spotify/Types";
  export let playLists: PlaylistBaseObject[] = [];
</script>

<select name="Spotify Playlist" class="form-select form-select-sm bg-base_color-10 border-2 border-accent-75 max-w-min">
  {#each playLists as playlist}
    <option value={playlist.id}>{playlist.name}</option>
  {/each}
</select>
