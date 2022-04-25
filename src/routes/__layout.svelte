<script lang="ts">
  import "../global.css";
  import { supabase } from "$lib/utils/supabaseClient";
  import { setAuthCookie, unsetAuthCookie } from "$lib/utils/session";
  import { ROUTE_HOME, ROUTE_QUIZ } from "$lib/constants";
  import { getStores } from "$app/stores";
  import { goto } from "$app/navigation";

  const { session } = getStores();

  supabase.auth.onAuthStateChange(async (event, _session) => {
    switch (event) {
      case "SIGNED_IN":
        session.set({
          user: {
            id: _session.user.id,
            aud: _session.user.aud,
            name: _session.user.user_metadata["full_name"],
          },
        });
        await setAuthCookie(event, _session);
        goto(ROUTE_QUIZ);
        break;

      default:
        session.set({ user: undefined });
        await unsetAuthCookie();
        goto(ROUTE_HOME);
        break;
    }
  });
</script>

<div class="container">
  <header>
    <slot name="header" />
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <slot name="footer" />
  </footer>
</div>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>
