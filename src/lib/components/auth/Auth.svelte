<script lang="ts">
  import SocialAuthView from "./SocialAuth.svelte";
  export let supabaseClient;
  export let socialLayout = "vertical";
  export let socialColors = false;
  export let socialButtonSize = "medium";
  export let providers = [];
  export let view = "sign_in";
</script>

<div class="flex flex-col justify-center">
  <SocialAuthView
    {supabaseClient}
    {providers}
    {socialLayout}
    {socialButtonSize}
    {socialColors}
    {view}
  />
</div>
