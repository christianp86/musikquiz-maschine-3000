<script lang="ts">
  import { supabase } from "$lib/utils/supabase";
  import { setAuthCookie, unsetAuthCookie } from "$lib/utils/session";
  import {ROUTE_HOME, ROUTE_QUIZ} from '$lib/constants'
  import { session } from "$app/stores";
  import { goto } from '$app/navigation';

  supabase.auth.onAuthStateChange(async (event, _session) => {
    if (event !== "SIGNED_OUT") {
      session.set({ user: _session.user });
      await setAuthCookie(_session);
      goto(ROUTE_QUIZ)
    } else {
      session.set({ user: { guest: true } });
      supabase.auth.signOut();
      await unsetAuthCookie();
      goto(ROUTE_HOME)
    }
  });
</script>

<main>
  <slot />
</main>

<footer>
  <h2>Session Data</h2>
  <pre>{JSON.stringify($session, null, 2)}</pre>
</footer>
