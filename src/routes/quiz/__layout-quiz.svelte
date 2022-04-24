<script context="module" lang="ts">
  import { ROUTE_HOME } from "$lib/constants";
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ session }) {
    if (session.user.name === "guest") {
      return {
        status: 302,
        redirect: ROUTE_HOME,
      };
    }
    console.log('Session in load function: ', session);
    return {
      props: {
        session: session,
      },
    };
  }
</script>

<script lang="ts">
  //import type { User } from "@supabase/gotrue-js//dist/main/lib/types";
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
    <p>{user?.name}</p>
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
