<script lang="ts">
  import type { Track } from "$lib/utils/spotify/Types";
  import TrackPlayer from "$lib/components/TrackPlayer.svelte";
  import track_sample from "$lib/utils/spotify/track_sample.json";

  const track: Track = {
    album: {
      name: track_sample.album.name,
      artist: {
        name: track_sample.album.artists[0].name,
      },
      images: track_sample.album.images,
    },
    href: track_sample.href,
    id: track_sample.id,
    name: track_sample.name,
    preview_url: track_sample.preview_url,
  };
</script>

<TrackPlayer {track} />
