<script lang="ts">
	export let round = 1;
	export let questions = [];

	import type { Player } from '$lib/utils/quiz_interfaces';
	import { players } from '../stores/player';
	let allPlayers: Player[] = $players
	let currentQuestion = questions[0]
</script>

<span class="summary-title">Fragen für Runde {round}</span>
	<div class="summary-content">
		<ol>
			{#each allPlayers as player}
				<li>{player.name}</li>
			{/each}
		</ol>
	</div>
	

<style>

	.summary-title {
		user-select: none;
	}

	.summary-content {
		font-weight: 300;
		line-height: 1.5;
		border-top: 1px solid #e9c46a;
	}

	svg {
		display: block;
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
