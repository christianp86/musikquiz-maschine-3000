<script lang="ts">
	import type { Question } from '$lib/utils/quiz_interfaces';
	import type { Player } from '$lib/utils/quiz_interfaces';

	import { createEventDispatcher } from 'svelte';

	import { players } from '../stores/player';

	const dispatch = createEventDispatcher();
	export let round = 1;
	export let question: Question;
	export let questionNumber = 1;

	let allPlayers: Player[] = $players;

	function onPlayerInput(
		event: Event & { currentTarget: EventTarget & HTMLInputElement; }
	): void {
		event.cancelBubble;

		const clickedPlayer = event.currentTarget.value;

		// Player selected or unselected
		dispatch('playerInput', {
			player: clickedPlayer,
			marked: event.currentTarget.checked
		});

		// Check if player had already been selected and awarded points
		if (!event.currentTarget.checked) {
			const foundPlayer = allPlayers.find((player) => player.name === clickedPlayer);
			if (foundPlayer === undefined) return;

			const questionIndex = foundPlayer.correctQuestions.findIndex(
				(question) => question.question === questionNumber && question.round === round
			);
			if (questionIndex === -1) return;

			foundPlayer.correctQuestions.splice(questionIndex, 1);
		}

		// Add correct answer to player
		if (event.currentTarget.checked) {
			const foundPlayer = allPlayers.find((player) => player.name === clickedPlayer);
			if (foundPlayer === undefined) return;

			foundPlayer.correctQuestions.push({ question: questionNumber, round: round });
		}
	}
</script>

<div class="container">
	<span class="summary-title">Runde {round}, Frage {questionNumber}</span>
	<div class="summary-content">
		<h4>{question.question}</h4>
		{#each allPlayers as player}
			<input
				type="checkbox"
				id="player-{player.name}"
				name="vehicle-{player.name}"
				value={player.name}
				on:change={onPlayerInput}
			/>
			<label for="vehicle-{player.name}">{player.name}</label>
		{/each}
	</div>
</div>

<style>
	.container {
		margin-top: 5%;
	}

	.summary-title {
		user-select: none;
	}

	.summary-content {
		font-weight: 300;
		line-height: 1.5;
		border-top: 1px solid #e9c46a;
	}
</style>
