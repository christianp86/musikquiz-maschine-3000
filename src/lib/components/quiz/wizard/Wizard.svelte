<script lang="ts">
  import { setContext } from "svelte";
  import { currentStep } from "$lib/stores/wizardStep";
  import Steps from "$lib/components/quiz/wizard/Steps.svelte";


  setContext("step", currentStep);

  const nextStep = () => {
    console.log("NEXT STEP");
    currentStep.update(n => n + 1);
    console.log("$step", $currentStep);
  };

  const previousStep = () => {
    console.log("PREVIOUS STEP");
    if ($currentStep > 0) {
      $currentStep -= 1;
    }
  };
</script>

<Steps activeStep={$currentStep} />
<slot />

<button disabled={$currentStep === 1} on:click={previousStep}>Zurück</button>
<button disabled={$currentStep === 4} on:click={nextStep}>Weiter</button>
