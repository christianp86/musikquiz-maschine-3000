<script>
	export let round = 1;
	export let questions = [];
</script>

<details class="quiz-round-container">
	<summary class="quiz-round-container-header">Runde {round}</summary>
	<ol>
		{#each questions as question}
			<li>{question.question}</li>
		{/each}
	</ol>
</details>

<style>
	.quiz-round-container {
		color: #264653;
		text-align: left;
		border: 4px solid #e9c46a;
		border-radius: 4px;
	}

	.quiz-round-container-header {
		font-size: large;
		font-family: OpenSans-Bold;
		text-align: center;
	}

	ol {
		padding: 10px;
		text-align: left;
		list-style-position: inside;
	}

	ol li {
		margin-left: 0;
		margin-bottom: 0.5rem;
	}
</style>
