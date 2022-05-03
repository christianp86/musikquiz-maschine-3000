<script lang="ts">
  import type { Writable } from "svelte/store";
  import { fly } from "svelte/transition";
  import { getContext } from "svelte";
  export let num;

  const getStepWizardContext = () => {
    const context = getContext<Writable<number>>("step");
    if (!context) {
      throw new Error(
        "WizardStep compound components cannot be rendered outside the Wizard component"
      );
    }
    console.log("context", context);
    return context;
  };

  const step = getStepWizardContext();
</script>

{#if $step === num}
  <div in:fly={{ x: 200, duration: 300 }} out:fly={{ x: -200, duration: 300 }}>
    <slot />
  </div>
{/if}
