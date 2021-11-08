<script>
	export let buttonText = 'Zurück';
	export let link = '#';
	export let next = false;
	export let backToStart = false;
	export let backToQuestions = false;
	export let backToRounds = false;
	export let disabled = false;
</script>

{#if disabled}
	<span class="navbutton" class:next>
		{buttonText}
	</span>
{:else}
	<a
		class="navbutton"
		class:next
		class:back-to-start={backToStart}
		class:back-to-questions={backToQuestions}
		class:back-to-rounds={backToRounds}
		href={link}>{buttonText}</a
	>
{/if}

<style>
	.navbutton {
		border: 1px solid;
		border-color: #f4a261;
		border-radius: 5px;

		font-family: OpenSans-Bold;
		font-size: 28px;
		color: #f4a261;
		text-align: center;
		text-decoration: none;
		line-height: 24px;

		display: inline-block;
		padding: 8px 24px;
		margin-top: 5vh;

		transition-duration: 0.2s;
	}

	.navbutton:hover {
		background-color: var(--backgroundColor);
	}

	.next:hover {
		background-color: #162e38;
	}

	.next {
		background-color: #264653;
	}

	.back-to-start {
		color: #043b35;
		border-color: #043b35;
	}

	.back-to-start:hover {
		background-color: #08776a;
	}

	.back-to-questions {
		color: #5d6396;
		border-color: #5d6396;
	}

	.back-to-questions:hover {
		background-color: #c9cde8;
	}

	.back-to-rounds {
		color: #264653;
		border-color: #264653;
	}

	.back-to-rounds:hover {
		background-color: #f5ac70;
	}
</style>
