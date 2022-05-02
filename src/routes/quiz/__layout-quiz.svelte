<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load:Load = async ({ session }) => {
    if (session.user === undefined ) {
      return {
        status: 302,
        redirect: '/',
      };
    }
    console.log("Session in load function: ", session);
    return {
      props: {
        session: session,
      },
    };
  }
</script>

<script lang="ts">
  import { supabase } from "$lib/utils/supabaseClient";

  export let session;
  const user = session.user;

  /**
   * Logout user from supabase
   */
  async function logout() {
    console.log("logout");
    const { error } = await supabase.auth.signOut();
  }
</script>

<div class="flex flex-col min-h-screen v-screen">
  <header class="bg-base_color-30 my-1 mx-2 py-4 px-4 flex justify-between items-center rounded">
    <span class="grow">Musikquiz Maschine 3000</span>
    <nav class="grow-0">
      <ul class="flex justify-end items-center list-none">
        <li class="cursor-pointer ml-1" on:click={logout}>Logout</li>
      </ul>
    </nav>
    <slot name="header" />
  </header>

  <main class="flex-1 px-20 pt-4">
    <slot />
  </main>

  <footer>
    <p>{user?.name}</p>
  </footer>
</div>