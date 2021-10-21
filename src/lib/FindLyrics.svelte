<script>
	import { createEventDispatcher } from 'svelte';
	import { getStores } from '$app/stores';

	const dispatch = createEventDispatcher();
	const { page } = getStores();

	let searchResult;
	let searchSong = '';
	const baseUrl = $page.host

	async function search() {
		console.log(searchSong);

		if (searchSong === undefined) return;

		const uri = `/api/song/${searchSong}`;
		const response = await fetch(uri);

		if (response.ok) searchResult = await response.json();
	}

	async function songSelected(event) {
		// We only want Artist and Song
		searchSong = event.target.innerText.substring(0, event.target.innerText.indexOf('(') - 1);
		const artist = searchSong.substring(0, searchSong.indexOf('-')).trimEnd();
		const track = searchSong.substring(searchSong.indexOf('-') + 1).trimStart();
		console.log(`Artist: ${artist}, track: ${track}`);
		
		const urlParameter = new URLSearchParams()
		urlParameter.append('artist', encodeURI(artist));
		urlParameter.append('track', track);
		const apiUrl = `/api/lyrics?${urlParameter.toString()}`
		console.log(`URL: ${apiUrl}`)

		const response = await fetch(apiUrl);

		if (response.ok) {
			searchResult = undefined;
			console.log(response)
			let lyrics = await response.json();
			dispatch('lyrics_found', {
				lyrics: lyrics.text
			});
		}
	}
</script>

<div class="search-form">
	<div class="input-container">
		<input
			bind:value={searchSong}
			on:change={search}
			on:input={() => (searchResult = undefined)}
			type="text"
			class="search"
			placeholder="Song title"
		/>
	</div>
	<ul class="suggestions">
		{#if searchResult !== undefined}
			{#each searchResult.tracks.items as track}
				<li on:click={songSelected}>
					<div class="suggestions">
						<img src={track.album.images[2].url} alt="Album cover" />
						<span class="name">{track.artists[0].name} - {track.name} ({track.album.name})</span>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>

<style>
	input {
		padding: 20px;
	}

	.search-form {
		width: auto;
		max-width: 600px;
		margin: 50px auto;
	}

	.input-container {
		width: auto;
		max-width: 600px;
		border: 5px solid #f7f7f7;
		border-radius: 5px;
	}

	input.search {
		z-index: 2;
		font-size: larger;
		border: none;
		width: -moz-available;
		outline: none;
	}

	.suggestions {
		margin-top: 0;
		padding: 0;
		position: relative;
	}

	div.suggestions {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.suggestions li {
		background: white;
		color: black;
		list-style: none;
		border-bottom: 1px solid #d8d8d8;
		margin: 0;
		padding: 10px 20px;
		transition: background 0.2s;
		display: flex;
		justify-content: space-between;
		text-transform: capitalize;
		font-size: large;
	}

	.suggestions li:hover {
		background: rgb(219, 216, 216);
		cursor: pointer;
	}

	.name {
		padding-left: 10px;
	}
</style>
