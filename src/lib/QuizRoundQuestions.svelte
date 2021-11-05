<script lang="ts">
	import type { Question } from '$lib/utils/quiz_interfaces';
	import type { Player } from '$lib/utils/quiz_interfaces';
	import { players } from '../stores/player';

	export let round = 1;
	export let question: Question;
	export let questionNumber = 1;

	let allPlayers: Player[] = $players;
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

	ol {
		padding: 10px;
		text-align: center;
		list-style-position: inside;
	}

	ol li {
		margin-bottom: 0.5rem;
	}
</style>
