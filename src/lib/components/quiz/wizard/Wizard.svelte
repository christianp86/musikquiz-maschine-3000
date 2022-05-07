<script lang="ts">
  import { setContext } from "svelte";
  import { currentStep } from "$lib/stores/wizardStep";
  import Steps from "$lib/components/quiz/wizard/Steps.svelte";

  setContext("step", currentStep);

  const nextStep = () => {
    currentStep.update((n) => n + 1);
  };

  const previousStep = () => {
    if ($currentStep > 0) {
      currentStep.update((n) => n - 1);
    }
  };
</script>

<Steps activeStep={$currentStep} />
<div class="flex flex-col justify-center items-center mt-8">
  <slot />

  <div class="flex flex-col md:flex-row items-center gap-5">
    <button
      class="bg-base_color-30 round-lg p-4"
      disabled={$currentStep === 1}
      on:click={previousStep}>Zurück</button
    >
    <button
      class="bg-base_color-30 round-lg p-4"
      disabled={$currentStep === 4}
      on:click={nextStep}>Weiter</button
    >
  </div>
</div>