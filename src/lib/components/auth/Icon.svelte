<script lang="ts">
  import SpotifyIcon from './social-icons/SpotifyIcon.svelte'
  import AppleIcon from './social-icons/AppleIcon.svelte'

  const map = {
    spotify: SpotifyIcon,
    apple: AppleIcon
  }

  export let name
  export let size = 10
</script>

<svelte:component this={map[name]} {size}/>