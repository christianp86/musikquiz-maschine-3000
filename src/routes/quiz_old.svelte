<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session }) {
		console.log(`Query: ${page.query}`);

		const roundsParam = page.query.get('rounds');
		const questionsParam = page.query.get('questions');
		const res = await fetch(`/api/quiz/${roundsParam}/${questionsParam}`);

		if (res.ok) return { props: { quiz: await res.json() } };

		return {
			status: res.status,
			error: new Error(`Could not load /api`)
		};
	}
</script>

<script>
	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import NavButton from '$lib/NavButton.svelte';
	import Button from '$lib/Button.svelte';
	import { numberOfQuestions, numberOfRounds } from '../stores/inputStore';
	import QuizRound from '$lib/QuizRound.svelte';

	export let quiz = {};
	export const rounds = 0;

	const question = 'Hier ist dein Musikquiz';
	const buttonText = 'Download';
	const QUESTIONDURATION = 2;
	const minutes = $numberOfQuestions * QUESTIONDURATION * $numberOfRounds;
</script>

<svelte:head>
	<style>
		body {
			background-color: #f4a261;
		}
	</style>
</svelte:head>

<div class="quiz">
	<SmallHeader />
	<div class="quiz-color-text">
		<Step stepNumber={3} />
		<Question {question} />
		<div class="quiz-summary">
			<div>
				<span class="quiz-summary-number">{$numberOfQuestions}</span><span
					class="quiz-round-container-header">Fragen</span
				>
			</div>
			<div class="quiz-color">
				<span class="quiz-summary-number">{$numberOfRounds}</span><span
					class="quiz-round-container-header">Runden</span
				>
			</div>
			<div class="quiz-color">
				<span class="quiz-summary-number">~{minutes}</span><span class="quiz-round-container-header"
					>Minuten</span
				>
			</div>
		</div>
		<div id="quizGrid" class="quiz-container">
			{#each quiz.musicQuiz.rounds as quizRound}
				<QuizRound round={quizRound.roundNumber} questions={quizRound.questions} />
			{/each}
		</div>
		<NavButton backToRounds link="/rounds" />
		<Button {buttonText} />
	</div>
</div>

<style>
	.quiz {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.quiz-color-text {
		color: #264653;
	}

	.quiz-summary {
		display: grid;
		justify-content: space-evenly;
		margin-top: 10px;
	}

	.quiz-summary-number {
		color: #e9c46a;
		font-size: larger;
		font-weight: 700;
		padding: 0 10px 0 10px;
	}

	.quiz-round-container-header {
		font-size: large;
		font-family: OpenSans-Bold;
		text-align: center;
	}

	.quiz-container {
		display: grid;
		/* grid-template-columns: 50% 50%; */
		/* justify-content: space-evenly; */
		/* margin-top: 5vh; */
	}

	@media only screen and (min-width: 1280px) {
		.quiz-summary {
			grid-template-columns: 30% 30% 40%;
		}

		.quiz-summary-number {
			font-size: xx-large;
		}

		.quiz-round-container-header {
			font-size: x-large;
		}

		/* .quiz-container {
			grid-template-columns: 50% 50%;
		} */
	}
</style>
