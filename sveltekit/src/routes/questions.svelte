<script>
	import SmallHeader from '../components/SmallHeader.svelte';
	import Step from '../components/Step.svelte';
	import Question from '../components/Question.svelte';
	import MainText from '../components/Maintext.svelte';
	import Button from '../components/Button.svelte';
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
<a href="rounds"> <Button {buttonText} /></a>

<style>
	:global(html) {
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
