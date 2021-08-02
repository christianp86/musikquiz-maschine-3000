<script>
	let searchResult;

	async function search(event) {
		console.log(event.target.value);

		if (event.target.value === undefined) return;

		const uri = `/api/${event.target.value}`;
		const response = await fetch(uri);

		if (response.ok) searchResult = await response.json();
	}
</script>

<form class="search-form" on:submit|preventDefault={search}>
	<input on:change={search} type="text" class="search" placeholder="Band and/or song title" />
	<ul class="suggestions">
		{#if searchResult !== undefined}
			{#each searchResult.artists.items as artist}
				<li>
					<span class="name">{artist.name}</span>
				</li>
			{/each}
		{/if}
	</ul>
</form>

<style>
	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	input {
		width: 100%;
		padding: 20px;
	}

	.search-form {
		max-width: 400px;
		margin: 50px auto;
	}

	input.search {
		margin: 0;
		text-align: center;
		outline: 0;
		border: 10px solid #f7f7f7;
		width: 120%;
		left: -10%;
		position: relative;
		top: 10px;
		z-index: 2;
		border-radius: 5px;
		font-size: 40px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19);
	}

	.suggestions {
		margin: 0;
		padding: 0;
		position: relative;
		/*perspective: 20px;*/
	}

	.suggestions li {
		background: white;
		color: black;
		list-style: none;
		border-bottom: 1px solid #d8d8d8;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
		margin: 0;
		padding: 20px;
		transition: background 0.2s;
		display: flex;
		justify-content: space-between;
		text-transform: capitalize;
	}

	.suggestions li:nth-child(even) {
		transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
		background: linear-gradient(to bottom, #ffffff 0%, #efefef 100%);
	}

	.suggestions li:nth-child(odd) {
		transform: perspective(100px) rotateX(-3deg) translateY(3px);
		background: linear-gradient(to top, #ffffff 0%, #efefef 100%);
	}

	span.population {
		font-size: 15px;
	}

	.hl {
		background: #ffc600;
	}
</style>
