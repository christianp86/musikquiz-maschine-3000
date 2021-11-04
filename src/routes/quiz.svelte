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

<script lang="ts">
	import type { MusikquizResult, Question as QuestionType } from '$lib/utils/quiz_interfaces';

	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import NavButton from '$lib/NavButton.svelte';
	import Button from '$lib/Button.svelte';
	import QuizRoundQuestion from '$lib/QuizRoundQuestions.svelte'

	import { numberOfQuestions, numberOfRounds } from '../stores/inputStore';

	export let quiz: MusikquizResult;
	export const rounds = 0;

	const question = 'Hier ist dein Musikquiz.';
	const buttonText = 'Download';
	const QUESTIONDURATION = 2;
	const minutes = $numberOfQuestions * QUESTIONDURATION * $numberOfRounds;

	let currentRound = 1;
	let currentRoundIndex = currentRound - 1
	let currentQuestionNumber = 1;
	let currentQuestionIndex = currentQuestionNumber - 1
	let currentQuestion: QuestionType = quiz.rounds[currentRoundIndex].questions[currentQuestionIndex];

	/**
	 * Determines the next possible round number
	 * @param roundNumber
	 */
	function nextRound(roundNumber): number {
		return quiz.rounds.length > currentRound ? roundNumber++ : quiz.rounds.length
	}

	/**
	 * Determins next possible question number
	 * In case of last question of a round we need to start a new round with the first question
	 * @param questionNumber
	 */
	function nextQuestion(questionNumber): number {
		return quiz.rounds[currentRoundIndex].questions.length > currentQuestionNumber ? questionNumber++ : 1
	}

	/**
	 * Checks if the Quiz is finished. All questions of each round have been asked
	 */
	function isQuizFinished(): boolean {
		let quizIsFinished = false;

		if (quiz.rounds.length === currentRound && quiz.rounds[currentRoundIndex].questions.length === currentQuestionNumber) {
			quizIsFinished = true
		}
		return quizIsFinished
	}
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
			<QuizRoundQuestion round={currentRound} question={currentQuestion} questionNumber={currentQuestionNumber} />
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
