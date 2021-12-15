<script lang="ts">
  import Auth from "$lib/components/auth/Auth.svelte";
  import { supabase } from "$lib/utils/supabase";
</script>

<Auth supabaseClient={supabase} providers={["spotify"]} />
