<script lang="ts">
	import type { Player } from '$lib/utils/quiz_interfaces';
	import { players } from '../stores/player';
	import { numberOfPlayers } from '../stores/inputStore';
	let newPlayer = '';
	let allPlayers: Player[] = [];

	/**
	 * Add a new player to the player store
	 */
	function addPlayer() {
		console.log(`New player: ${newPlayer}`);
		const player: Player = { name: newPlayer, correctQuestions: [] };
		allPlayers = [...allPlayers, player];
		players.set(allPlayers);
		newPlayer = '';
		numberOfPlayers.update((n) => n + 1);
	}
</script>

<form on:submit|preventDefault|stopPropagation={addPlayer}>
	<div class="container">
		<div>
			<input
				type="text"
				bind:value={newPlayer}
				required
				class="input-questions input-text questions"
				id="newplayer"
				min="3"
				max="20"
			/>
			<button on:click={addPlayer}>+</button>
		</div>
		<div class="container">
			<ol>
				{#each allPlayers as player}
					<li>{player.name}</li>
				{/each}
			</ol>
		</div>
	</div>
</form>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
	div {
		display: flex;
		flex-direction: row;
	}
	.questions {
		background: none;
	}

	.input-questions {
		border: none;
		border-bottom: 4px solid #043b35;
	}

	.input-text {
		font-size: xx-large;
		text-align: left;
		color: #000000;
		width: 45vw;
	}

	button {
		width: max-content;
		border: none;
		font-family: OpenSans-Bold;
		font-size: xx-large;
		background: inherit;
		color: #000000;
		text-align: center;
		cursor: pointer;
		padding-left: 0.5vw;
		padding-right: 0.5vw;
	}

	@media only screen and (min-width: 1280px) {
		.input-text {
			width: 15vw;
		}
	}
</style>
