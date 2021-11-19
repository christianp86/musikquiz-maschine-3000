<script lang="ts">
	import type { Player } from '$lib/utils/quiz_interfaces';

	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';

	import { players } from '../stores/player';
	const allPlayers: Player[] = $players;

	const playersResult = allPlayers.sort((a, b) => b.score - a.score);

	const question = 'Und der Gewinner des ultimativen Musikquiz ist...';
</script>

<svelte:head>
	<style>
		body {
			background-color: #e97c61;
		}
	</style>
</svelte:head>

<div class="quiz">
	<SmallHeader />
	<div class="quiz-color-text">
		<Step stepNumber={5} />
		<Question {question} />
		<ol>
			<li class="quiz-result-line quiz-result-header">
				<div />
				<div><span class="header">Spieler</span></div>
				<div><span class="header">Punkte</span></div>
			</li>

			{#each playersResult as player}
				<li class="player-result quiz-result-line">
					<div class="quiz-winner" />
					<div class="quiz-result-line-player">
						{player.name}
					</div>
					<div>
						{player.score}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style>
	.quiz-color-text {
		color: #ffffff;
	}

	.quiz-result-line {
		display: grid;
		grid-template-columns: 5% 50% 50%;
		margin-top: 20px;
	}

	.quiz-result-header {
		font-weight: bold;
		font-size: x-large;
	}

	.header {
		border-bottom: #ffffff 1px solid;
	}

	li {
		list-style: none;
	}

	ol li:nth-of-type(2) {
		font-size: x-large;
		color: rgb(241, 238, 8);
	}

	ol > li:nth-of-type(2) div.quiz-winner::before {
		content: '👑';
	}
</style>
