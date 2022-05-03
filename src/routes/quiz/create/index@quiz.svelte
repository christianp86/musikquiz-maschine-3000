<script lang="ts">
  import Wizard from "$lib/components/quiz/wizard/Wizard.svelte";
  import WizardStep from "$lib/components/quiz/wizard/WizardStep.svelte";
</script>

<div class="flex flex-col">
  <Wizard>
    <WizardStep num={1}>
      <h1>Step 1</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        consectetur, nisl eget congue consectetur, nisl nunc egestas augue,
        euismod aliquet nunc nisl eu nisl.
      </p>
    </WizardStep>
    <WizardStep num={2}>
      <h1>Step 2</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        consectetur, nisl eget congue consectetur, nisl nunc egestas augue,
        euismod aliquet nunc nisl eu nisl.
      </p>
    </WizardStep>
  </Wizard>
</div>
