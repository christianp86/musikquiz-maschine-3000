<script lang="ts">
  import Auth from "$lib/components/auth/Auth.svelte";
  import { supabase } from "$lib/utils/supabaseClient";
</script>

<div class="container mx-auto">
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-2xl text-center pb-4">Musikquiz Maschine 3000</h1>
    <Auth
      supabaseClient={supabase}
      providers={["spotify"]}
      socialColors
      socialButtonSize="large"
    />
  </div>
</div>
