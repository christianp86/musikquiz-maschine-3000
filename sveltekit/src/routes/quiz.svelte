<script>
	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import Button from '$lib/Button.svelte';
	import { numberOfQuestions, numberOfRounds } from '../stores/inputStore';

	const question = 'Hier ist dein Musikquiz';
	const buttonText = 'Download';
    const QUESTIONDURATION = 2;
    const minutes = $numberOfQuestions * QUESTIONDURATION * $numberOfRounds
</script>

<div class="quiz">
	<SmallHeader />
	<div class="quiz-color-text">
		<Step stepNumber={3} />
		<Question {question} />
		<div class="mm-quiz-summary">
			<div>
				<span class="mm-quiz-summary-number">{$numberOfQuestions}</span><span
					class="mm-quiz-round-container-header">Fragen</span
				>
			</div>
			<div class="quiz-color">
				<span class="mm-quiz-summary-number">{$numberOfRounds}</span><span
					class="mm-quiz-round-container-header">Runden</span
				>
			</div>
			<div class="quiz-color">
				<span class="mm-quiz-summary-number">~{minutes}</span><span class="mm-quiz-round-container-header"
					>Minuten</span
				>
			</div>
		</div>
		<div id="quizGrid" class="mm-quiz-container">
			<!-- The quiz result will be added here -->
		</div>
		<Button {buttonText} />
	</div>
</div>

<style>
    :global(html) {
        background-color: #f4a261;
    }

	.quiz {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.quiz-color-text {
		color: #264653;
	}

	.mm-quiz-summary {
		display: grid;
		justify-content: space-evenly;
		margin-top: 10px;
		border: 4px solid #e9c46a;
	}

	.mm-quiz-summary-number {
		color: #e9c46a;
		font-size: larger;
		font-weight: 700;
		padding: 0 10px 0 10px;
	}

	.mm-quiz-round-container-header {
		font-size: large;
		font-family: OpenSans-Bold;
		text-align: center;
	}

	.mm-quiz-summary-text {
		font-size: large;
	}

	.mm-quiz-container {
		display: grid;
		/* grid-template-columns: 50% 50%; */
		justify-content: space-evenly;
		/* margin-top: 5vh; */
	}

	@media only screen and (min-width: 1280px) {
		.mm-quiz-summary {
			grid-template-columns: 30% 30% 40%;
		}

		.mm-quiz-summary-number {
			font-size: xx-large;
		}

		.mm-quiz-round-container-header {
			font-size: x-large;
		}

		.mm-quiz-container {
			grid-template-columns: 50% 50%;
		}
	}
</style>
