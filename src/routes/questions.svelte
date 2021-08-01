<script>
	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import MainText from '$lib/Maintext.svelte';
	import NavButton from '$lib/NavButton.svelte';
	import { numberOfQuestions } from '../stores/inputStore';

	const introText =
		'Als Richtlinie: 10 Fragen dauern ca. 15 Minuten. Wenn Deine Freunde Idioten sind und/oder einfach nur langsam, dauert es auch mal 10 Minuten. Wenn Deine Freunde aber sehr schnelle Idioten sind, dann dauert eine Runde vielleicht auch nur fünf Minuten. 🤷';
	const buttonText = 'Weiter';

	const question = 'Wieviele Fragen pro Runde willst du stellen?';
</script>

<SmallHeader />
<div class="questions-color-text">
	<Step />
	<Question {question} />
	<MainText mainText={introText} />
	<input
		type="number"
		bind:value={$numberOfQuestions}
		required
		class="input-questions input-text questions"
		id="questions"
		min="1"
		max="10"
	/>
</div>

<NavButton style="color: #043b35; border-color: #043b35; --backgroundColor: #08776a" link="/" />
<NavButton {buttonText} next link="rounds" />

<style>
	:global(body) {
		background-color: #2a9d8f;
	}

	.questions-color-text {
		color: #043b35;
	}

	.questions {
		background: #2a9d8f;
	}

	.input-questions {
		border: none;
		border-bottom: 4px solid #043b35;
	}

	.input-text {
		font-size: xx-large;
		text-align: center;
		color: #e9c46a;
		width: 10vw;
	}
</style>
