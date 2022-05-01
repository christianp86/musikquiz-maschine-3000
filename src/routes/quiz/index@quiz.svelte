<script lang="ts">
  import { supabase } from "$lib/utils/supabaseClient";
</script>

<h1 class="text-center text-3xl font-bold">
  Willkommen in der Musikquiz Maschine 3000
</h1>

<div class="flex flex-col md:flex-row items-center justify-center gap-5 pt-8">
  <button class="rounded p-4">Neues Quiz erstellen</button>
  <button class="rounded p-4 accent">Quiz starten</button>
</div>

<style>
  button {
    background-color: var(--clr-30);
  }
  .accent {
    background-color: var(--accent);
  }
</style>