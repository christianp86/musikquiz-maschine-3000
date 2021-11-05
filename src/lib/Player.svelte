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
	<button class="button" on:click={addPlayer}>+</button>
	<p>{$numberOfPlayers} Spieler/Teams.</p>
</div>
<div>
	<ol>
		{#each allPlayers as player}
			<li>{player.name}</li>
		{/each}
	</ol>
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
	}
	.questions {
		background: #2a9d8f;
	}

	.input-questions {
		border: none;
		border-bottom: 4px solid #043b35;
	}

	.input-text {
		font-size: xx-large;
		text-align: center;
		color: #e9c46a;
		width: 45vw;
	}

	.button {
		width: max-content;
		border: 1px solid #043b35;
		border-radius: 4px;
		font-family: OpenSans-Bold;
		background: inherit;
		color: #e9c46a;
		text-align: center;
		transition-duration: 0.4s;
		cursor: pointer;
	}

	@media only screen and (min-width: 1280px) {
		.input-text {
			width: 15vw;
		}
	}
</style>
