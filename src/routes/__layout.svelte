<script lang="ts">
  import '../global.css';
  import { supabase } from "$lib/utils/supabase";
  import { setAuthCookie, unsetAuthCookie } from "$lib/utils/session";
  import { ROUTE_HOME, ROUTE_QUIZ } from "$lib/constants";
  import { getStores } from "$app/stores";
  import { goto } from "$app/navigation";

  const { session } = getStores();

  supabase.auth.onAuthStateChange(async (event, _session) => {
    if (event !== "SIGNED_OUT") {
      session.set({ user: _session.user });
      await setAuthCookie(_session);
      goto(ROUTE_QUIZ);
    } else {
      console.log("signed out");
      session.set({ user: { guest: true } });
      supabase.auth.signOut();
      await unsetAuthCookie();
      goto(ROUTE_HOME);
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
 .container{
   min-height: 100vh;
   display: flex;
    flex-direction: column;
 }

 main {
    flex: 1;
 }
</style>
