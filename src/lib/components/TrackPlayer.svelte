<script lang="ts">
    import type { Track } from "$lib/utils/spotify/Types";
    export let track: Track;
</script>


<figure>
    <figcaption>Listen to {track.album.artist.name} - {track.name}</figcaption>
    <audio
        controls
        src={track.preview_url}>
            Your browser does not support the
            <code>audio</code> element.
    </audio>
</figure>

<!-- We need the following
1. Play and Pause controls
2. Controls to select what should be played: Song, Lyrics, Lyrics translated -->