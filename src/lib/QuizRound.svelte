<script>
	export let round = 1;
	export let questions = [];
</script>

<details>
	<summary
		><span class="summary-title">Fragen für Runde {round}</span>
		<div class="summary-chevron-up">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg
			>
		</div></summary
	>
	<div class="summary-content">
		<ol>
			{#each questions as question}
				<li>{question.question}</li>
			{/each}
		</ol>
	</div>
	<div class="summary-chevron-down">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15" /></svg
		>
	</div>
</details>

<style>
	details {
		background-color: #fba967;

		font-size: large;
		color: #264653;
		text-align: left;
		/* box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); */

		position: relative;
		width: 80%;
		margin: 2vh;

		border: 1px solid;
		border-radius: 8px;
		border-color: #e9c46a;
	}

	summary {
		list-style: none;
		padding: 1em;

		font-size: x-large;
		font-family: OpenSans-Bold;
		text-align: center;
	}

	.summary-title {
		user-select: none;
	}

	summary:hover {
		cursor: pointer;
	}

	.summary-content {
		font-weight: 300;
		line-height: 1.5;
		border-top: 1px solid #e9c46a;
	}

	summary:focus {
		outline: none;
	}

	summary:hover .summary-chevron-up svg {
		opacity: 1;
	}

	.summary-chevron-up svg {
		opacity: 0.5;
	}

	.summary-chevron-up,
	.summary-chevron-down {
		pointer-events: none;
		position: absolute;
		top: 20px;
		right: 20px;
		background: #e9c46a;
	}

	svg {
		display: block;
	}

	summary:--webkit-details-marker {
		display: none;
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
