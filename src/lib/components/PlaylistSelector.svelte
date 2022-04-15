<script lang="ts">
  export let playLists: any;
</script>

<select name="Spotify Playlist">
  {#each playLists as playlist}
    <option value="{playlist.id}">{playlist.name}</option>
  {/each}
</select>
