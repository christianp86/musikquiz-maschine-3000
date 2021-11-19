<script lang="ts">
    import type { MusikquizResult } from '$lib/utils/quiz_interfaces';

	import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';
    import QuizRoundQuestions from '$lib/QuizRoundQuestions.svelte';

    export let musicQuiz: MusikquizResult;
    
</script>

<div id="caroussel-container">
	<div id="caroussel-head" class="carousel-head">
		<button class="grid-left" aria-label="previous">
			<ChevronLeftIcon />
		</button>
		<div class="grid-center">TEXT</div>
		<button class="grid-right" aria-label="next">
			<ChevronRightIcon />
		</button>
	</div>
	<div id="caroussel-content" >
        <QuizRoundQuestions round={musicQuiz.rounds[0].roundNumber} questions={musicQuiz.rounds[0].questions} />
    </div>
</div>

<style>
	.carousel-head {
		display: grid;
        width: 100%;
        grid-template-columns: 5% 90% 5%;
	}

	button {
		width: 40px;
		height: 40px;
		border: none;
		background-color: transparent;
	}
</style>
