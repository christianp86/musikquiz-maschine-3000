<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ session }) {
    return {
      props: {
        session: session,
      },
    };
  }
</script>

<script lang="ts">
  import { supabase } from "$lib/utils/supabaseClient";
  import type { User } from "@supabase/gotrue-js//dist/main/lib/types";
  export let session

  const user: User = session?.user;

  /**
   * Logout user from supabase
   */
  async function logout() {
    console.log("logout");
    const { error } = await supabase.auth.signOut();
  }
</script>

<div class="container">
  <header>
    <span class="title">Musikquiz Maschine 3000</span>
    <nav>
      <ul>
        <li class="text-clickable" on:click={logout}>Logout</li>
      </ul>
    </nav>
    <slot name="header" />
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <p>{user?.user_metadata?.full_name}</p>
  </footer>
</div>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    background-color: var(--header-color);
  }

  .title {
    flex-grow: 1;
  }

  nav {
    flex-grow: 0;
  }

  ul {
    display: flex;
    list-style: none;
    justify-content: flex-end;
    align-items: center;
  }

  li {
    margin-left: 1rem;
  }

  main {
    flex: 1;
    margin: 0 10%;
  }
</style>
