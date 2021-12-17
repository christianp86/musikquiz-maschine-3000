<script lang="ts">
  import SocialAuthView from "./SocialAuth.svelte";
  export let supabaseClient;
  export let socialLayout = "vertical";
  export let socialColors = false;
  export let socialButtonSize = "medium";
  export let providers = [];
  export let view = "sign_in";
</script>

<div class="authContainer">
  <SocialAuthView
    {supabaseClient}
    {providers}
    {socialLayout}
    {socialButtonSize}
    {socialColors}
    {view}
  />
</div>

<style>
  .authContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
