<script lang="ts">
  interface Step {
    number: number;
    label: string;
  }
  const steps: Step[] = [
    { number: 1, label: "Einstellungen" },
    { number: 2, label: "Playlist" },
    { number: 3, label: "Fragen" },
    { number: 4, label: "Ergebnis" },
  ];

  export let activeStep = 1;
</script>

<div>
  <h2 class="sr-only">Steps</h2>
  <div
    class="relative after:inset-x-0 after:h-0.5 after:absolute after:top-1/2 after:-translate-y-1/2 after:block after:rounded-lg after:bg-primary-75"
  >
    <ol
      class="relative z-10 flex justify-between text-sm font-medium text-gray-500"
    >
      {#each steps as step}
        <li class="flex items-center p-2">
          <span
            class="w-6 h-6 text-[10px] font-bold leading-6 {activeStep === step.number ? 'bg-accent-75' : 'bg-primary-75'} text-center rounded-full"
          >
            {step.number}
          </span>
          <span class="hidden sm:block sm:ml-2"> {step.label} </span>
        </li>
      {/each}
    </ol>
  </div>
</div>
