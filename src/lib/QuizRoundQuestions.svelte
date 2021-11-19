<script context="module" lang="ts">
	enum PlayerInputAction {
		Added = 1,
		Removed = -1
	}

	export type PlayerInput = {
		playerName: string;
		checked: boolean;
	};
</script>

<script lang="ts">
	import type { Question, Player } from '$lib/utils/quiz_interfaces';

	import { createEventDispatcher } from 'svelte';

	import { players } from '../stores/player';
	const allPlayers: Player[] = $players;

	export let round = 1;
	export let questionNumber = 1;
	export let question: Question;
	export let totalQuestionIndex = 0;

	let numberOfSelectedPlayers = 0;
	const dispatch = createEventDispatcher();
	
	$: dispatch('message', { numberOfSelectedPlayers: numberOfSelectedPlayers });

	/** Handes player checkbox input changes
	 * @param {Event} event Change event from input
	 */
	function onPlayerInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
		event.cancelBubble;

		const playerInput: PlayerInput = {
			playerName: event.currentTarget.value,
			checked: event.currentTarget.checked
		};

		numberOfSelectedPlayers += updatePlayerCorrectAnswer(playerInput);
	}

	/** Updates the correct answer of the player
	 * @param {PlayerInput} playerInput Player input
	 * @returns {number} Number of selected players
	 */
	function updatePlayerCorrectAnswer(playerInput: PlayerInput): PlayerInputAction {
		// Check if player had already been selected and awarded points
		if (!playerInput.checked) {
			const foundPlayer = allPlayers.find((player) => player.name === playerInput.playerName);
			if (foundPlayer === undefined) return;

			const questionIndex = foundPlayer.correctQuestions.findIndex(
				(question) => question.question === questionNumber && question.round === round
			);
			if (questionIndex === -1) return;

			foundPlayer.correctQuestions[questionIndex].correct = false;
			foundPlayer.score -= 1;
			return PlayerInputAction.Removed;
		}

		// Add correct answer to player
		if (playerInput.checked) {
			const foundPlayer = allPlayers.find((player) => player.name === playerInput.playerName);
			if (foundPlayer === undefined) return;

			const questionIndex = foundPlayer.correctQuestions.findIndex(
				(question) => question.question === questionNumber && question.round === round
			);
			if (questionIndex === -1) return;

			foundPlayer.correctQuestions[questionIndex].correct = true;
			foundPlayer.score += 1;
			return PlayerInputAction.Added;
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
				name="player-{player.name}"
				value={player.name}
				bind:checked={player.correctQuestions[totalQuestionIndex].correct}
				on:change={onPlayerInput}
			/>
			<label for="player-{player.name}">{player.name}</label>
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
