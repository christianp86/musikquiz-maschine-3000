<script lang="ts">
  import type { SupabaseClient } from "@supabase/supabase-js";
  import Button from "./Button.svelte";
  import Text from "./Text.svelte";

  export let supabaseClient: SupabaseClient;
  export let providers;
  export let socialLayout;
  export let socialButtonSize;
  export let socialColors;
  export let view;

  let loading = false,
    error = "";

  const buttonStyles = {
    spotify: {
      "background-color": "#000000",
      color: "white",
    },
    apple: {
      "background-color": "#ffffff",
      color: "black",
    },
  };

  $: hasProviders = providers && providers.length > 0;

  async function handleProviderSignIn(provider) {
    loading = true;

    const { error: signInError } = await supabaseClient.auth.signIn(
      { provider },
      { scopes: "playlist-read-private playlist-read-collaborative" }
    );
    if (signInError) error = signInError.message;

    loading = false;
  }
</script>

{#if hasProviders}
  <div class="flex flex-col flex-gap-5 mt-1 gap-2">
    {#each providers as provider}
      <Button
        block
        icon={provider}
        size={socialButtonSize}
        style={socialColors ? buttonStyles[provider] : {}}
        on:click={() => handleProviderSignIn(provider)}
      >
        {#if socialLayout == "vertical"}{view == "sign_up"
            ? "Sign up"
            : "Sign in"} with {provider}{/if}
      </Button>
    {/each}
  </div>
{/if}

{#if error}
  <Text type="danger">{error}</Text>
{/if}

<style>
  * {
    text-align: center;
  }
</style>
