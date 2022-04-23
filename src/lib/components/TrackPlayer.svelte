<script lang="ts">
  enum PlaybackSettings {
    Song = "SONG",
    Lyrics = "LYRICS",
  }

  import type { Track } from "$lib/utils/spotify/Types";
  import Speech from "./Speech.svelte";
  export let track: Track;

  let playbackSettings: PlaybackSettings = PlaybackSettings.Song;
</script>

<!-- We need the following
1. Play and Pause controls
2. Controls to select what should be played: Song, Lyrics, Lyrics translated -->
<div class="container">
  <div class="info">
    <div class="picture">
      <img src={track.album.images[0].url} alt="Album Cover" />
    </div>
    <div class="song_info">
      <p>{track.album.artist.name} - {track.name}</p>
    </div>
  </div>

  <div class="play_controls">
    {#if playbackSettings === PlaybackSettings.Song}
      <div class="audio_controls">
        <audio controls src={track.preview_url}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    {/if}
  </div>
  {#if playbackSettings === PlaybackSettings.Lyrics}
    <div class="speech_controls">
      <Speech artist={track.album.artist.name} trackName={track.name} />
    </div>
  {/if}
  <div class="playback_settings">
    <label>
      <input
        type="radio"
        bind:group={playbackSettings}
        value={PlaybackSettings.Song}
        checked
      />
      Lied abspielen
    </label>

    <label>
      <input
        type="radio"
        bind:group={playbackSettings}
        value={PlaybackSettings.Lyrics}
      />
      Lyrcis vorlesen
    </label>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  .info {
    display: flex;
    flex-direction: row;
  }

  .picture {
    width: 50px;
    height: 50px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .song_info {
    grid-area: song_info;
  }

  .play_controls {
    grid-area: play_controls;
  }

  .playback_settings {
    grid-area: playback_settings;
    display: flex;
    flex-direction: row;
  }
</style>
