<script context="module" lang="ts">
	enum ButtonText {
		NEXT_QUESTION = 'Nächste Frage',
		NEXT_ROUND = 'Nächste Runde',
		RESULT = 'Ergebnis'
	}
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
	import type {
		MusikquizResult,
		Question as QuestionType,
		Player
	} from '$lib/utils/quiz_interfaces';

	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import NavButton from '$lib/NavButton.svelte';
	import Button from '$lib/Button.svelte';
	import QuizRoundQuestion from '$lib/QuizRoundQuestions.svelte';

	import { numberOfQuestions, numberOfRounds } from '../stores/inputStore';
	import { players } from '../stores/player';
	const allPlayers: Player[] = $players;

	export let quiz: MusikquizResult;
	export const rounds = 0;

	const question = 'Hier ist dein Musikquiz.';
	const QUESTIONDURATION = 2;
	const minutes = $numberOfQuestions * QUESTIONDURATION * $numberOfRounds;

	let buttonText = '';
	let buttonDisabled = true;
	let currentRound = 1;
	let currentQuestionNumber = 1;
	let numberOfSelectedPlayers = 0;
	let totalQuestionIndex = 0;
	let showResult = false;

	$: currentRoundIndex = currentRound - 1;
	$: currentQuestionIndex = currentQuestionNumber - 1;
	$: currentQuestion = quiz.rounds[currentRoundIndex].questions[currentQuestionIndex];
	$: if (numberOfSelectedPlayers > 0) {
		buttonDisabled = false;
	} else {
		buttonDisabled = true;
	}

	// Setup all questions
	for (const player of allPlayers) {
		// Empty the current player's answers
		player.score = 0;
		player.correctQuestions = [];
		for (let roundIndex = 0; roundIndex < $numberOfRounds; roundIndex++) {
			for (let questionIndex = 0; questionIndex < $numberOfQuestions; questionIndex++) {
				player.correctQuestions.push({
					round: roundIndex + 1,
					question: questionIndex + 1,
					correct: false
				});
			}
		}
	}

	/**
	 * Determines the next possible round number
	 * @param roundNumber
	 */
	function getNextRoundNumber(roundNumber: number): number {
		return roundNumber < $numberOfRounds ? roundNumber + 1 : roundNumber;
	}

	/**
	 * Determins next possible question number
	 * In case of last question of a round we need to start a new round with the first question
	 * @param questionNumber
	 */
	function getNextQuestionNumber(questionNumber: number): number {
		return currentQuestionNumber < $numberOfQuestions ? questionNumber + 1 : 1;
	}

	/**
	 * Checks if the Quiz is finished. All questions of each round have been asked
	 */
	function isQuizFinished(): boolean {
		let roundIndex = currentRoundIndex === undefined ? currentRound - 1 : currentRoundIndex;
		return currentQuestionNumber === $numberOfQuestions && currentRound === $numberOfRounds
			? true
			: false;
	}

	/**
	 * Get the next question
	 */
	function handleButtonClick() {
		numberOfSelectedPlayers = 0;
		totalQuestionIndex += 1;
		currentQuestionNumber = getNextQuestionNumber(currentQuestionNumber);
		setCorrectButtonText();

		// Is quiz finished?
		if (isQuizFinished()) {
			showResult = true;
			return;
		}

		// Is round finished?
		if (totalQuestionIndex >= $numberOfQuestions && totalQuestionIndex % $numberOfQuestions === 0) {
			currentRound = getNextRoundNumber(currentRound);
		}
	}

	/**
	 * Updates the button text of <Button> and <NavButton>
	 */
	function setCorrectButtonText() {
		// Is quiz finished?
		if (isQuizFinished()) {
			buttonText = ButtonText.RESULT;
			return;
		}

		// Is round finished?
		if (currentQuestionNumber === $numberOfQuestions) {
			buttonText = ButtonText.NEXT_ROUND;
		} else {
			buttonText = ButtonText.NEXT_QUESTION;
		}
	}

	/**
	 * Handle dispatched message from Component QuizRoundQuestions
	 * @param {Event} event Component Event
	 */
	function handleMessage(event) {
		numberOfSelectedPlayers = event.detail.numberOfSelectedPlayers;
	}

	// Set the button text initially
	setCorrectButtonText();
</script>

<svelte:head>
	<style>
		body {
			background-color: #e76f51;
		}
	</style>
</svelte:head>

<div class="quiz">
	<SmallHeader />
	<div class="quiz-color-text">
		<Step stepNumber={4} />
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
			<QuizRoundQuestion
				round={currentRound}
				question={currentQuestion}
				questionNumber={currentQuestionNumber}
				{totalQuestionIndex}
				on:message={handleMessage}
			/>
		</div>
		<NavButton backToRounds link="/rounds" />
		{#if showResult}
			<NavButton next {buttonText} link="result" disabled={buttonDisabled} />
		{:else}
			<Button {buttonText} on:click={handleButtonClick} disabled={buttonDisabled} />
		{/if}
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
