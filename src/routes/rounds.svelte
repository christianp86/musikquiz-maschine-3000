<script>
	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import MainText from '$lib/Maintext.svelte';
	import NavButton from '$lib/NavButton.svelte';
	import { numberOfQuestions, numberOfRounds } from '../stores/inputStore';

	const question = 'Wieviele Runden soll das Quiz gehen?';

	const introText = `Dein Quiz wird ${$numberOfQuestions} Fragen haben. Wähle nun in wie vielen Runden du diese abfragen willst. Je mehr Runden, desto weniger Fragen pro Runde. Logisch, ne? Durch Runden kannst du als ModeratorIn gut Punktezwischenstände, Erholungspausen, Klopausen, Bierpausen oder sonstigen Nonsense einstreuen.`;

	const buttonText = 'Musikquiz erstellen';
</script>

<SmallHeader />
<div class="rounds-color-text">
	<Step stepNumber={2} />
	<Question {question} />
	<MainText mainText={introText} />
	<input
		type="number"
		bind:value={$numberOfRounds}
		required
		class="input-rounds input-text rounds"
		id="questions"
		min="1"
		max="10"
	/>
</div>

<NavButton {buttonText} link="quiz?rounds={$numberOfRounds}&questions={$numberOfQuestions}" />

<style>
	.rounds {
		background-color: #a7acd9;
	}

	.input-rounds {
		border: none;
		border-bottom: 4px solid #264653;
	}

	.rounds-color-text {
		color: #5d6396;
	}

	.input-text {
		font-size: xx-large;
		text-align: center;
		color: #e9c46a;
		width: 10vw;
	}

	:global(body) {
		background-color: #a7acd9;
	}
</style>
