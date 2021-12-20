<script lang="ts">
  import Auth from "$lib/components/auth/Auth.svelte";
  import { supabase } from "$lib/utils/supabaseClient";
</script>


  <div class="container">
    <h1>Musikquiz Maschine 3000</h1>
    <Auth supabaseClient={supabase} providers={["spotify"]} socialColors socialButtonSize="large" />
  </div>

<style>
  h1 {
    text-align: center;
  }

  .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
    }
  @media (max-width: 600px) {
    .container {
      margin-top: 80px;
      padding: 0 20px;
    }
  }
</style>
