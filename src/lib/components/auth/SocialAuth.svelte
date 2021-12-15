<script lang="ts">
  import type { SupabaseClient } from '@supabase/supabase-js'
  import Button from './Button.svelte'
  import Text from './Text.svelte'

  export let supabaseClient : SupabaseClient
  export let providers
  export let socialLayout
  export let socialButtonSize
  export let socialColors
  export let view

  let loading = false, error = ''

  const buttonStyles = {
    spotify: {
      'background-color': '#000000',
      color: 'white'
    },
    apple: {
      'background-color': '#ffffff',
      color: 'black'
    }
  }

  $: hasProviders = providers && providers.length > 0

  async function handleProviderSignIn(provider) {
    loading = true

    const { session, user, error: signInError } = await supabaseClient.auth.signIn({ provider })
    console.log(`Session: ${session}, User: ${user}`)
    if (signInError) error = signInError.message

    loading = false
  }
</script>

{#if hasProviders}
  <span class="heading">{view == 'sign_up' ? 'Sign up' : 'Sign in'} with</span>

  <div class="providers" class:horizontal={socialLayout == 'horizontal'}>
    {#each providers as provider}
      <Button block icon={provider} size={socialButtonSize} style={socialColors ? buttonStyles[provider] : {}} on:click={() => handleProviderSignIn(provider)}>
        {#if socialLayout == 'vertical'}{view == 'sign_up' ? 'Sign up' : 'Sign in'} with {provider}{/if}
      </Button>
    {/each}
  </div>
{/if}

{#if error}
  <Text type="danger">{error}</Text>
{/if}

<style>
  .providers {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .providers.horizontal {
    flex-direction: row;
  }

  .heading {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0 0 0.5rem 0;
  }
</style>
