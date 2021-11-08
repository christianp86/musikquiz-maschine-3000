<script context="module">
	export const ssr = false;
</script>

<script>
	import FindLyrics from '$lib/FindLyrics.svelte';

	let synth = window.speechSynthesis;

	let selected = '';
	let lyrics = '';
	let pitch = 1;
	let rate = 1;
	let voices = [];

	function populateVoiceList() {
		voices = synth.getVoices().sort(function (a, b) {
			const aname = a.name.toUpperCase(),
				bname = b.name.toUpperCase();
			if (aname < bname) return -1;
			else if (aname == bname) return 0;
			else return +1;
		});
	}

	populateVoiceList();

	if (speechSynthesis.onvoiceschanged !== undefined) {
		speechSynthesis.onvoiceschanged = populateVoiceList;
	}

	function speak() {
		if (synth.speaking) {
			console.error('speechSynthesis.speaking');
			return;
		}

		if (lyrics !== '') {
			var utterThis = new SpeechSynthesisUtterance(lyrics);
			utterThis.onend = function (event) {
				console.log('SpeechSynthesisUtterance.onend');
			};
			utterThis.onerror = function (event) {
				console.error('SpeechSynthesisUtterance.onerror');
			};

			for (let i = 0; i < voices.length; i++) {
				if (voices[i].name === selected) {
					utterThis.voice = voices[i];
					break;
				}
			}
			utterThis.pitch = pitch;
			utterThis.rate = rate;
			synth.speak(utterThis);
		}
	}

	function handleSubmit() {
		speak();
	}

	function voiceSelected() {
		speak();
	}

	function playLyrics(event) {
		lyrics = event.detail.lyrics
		speak()
	}
</script>

<FindLyrics on:lyrics_found={playLyrics} />

<h1>Speech synthesiser</h1>

<p>
	Enter some text in the input below and press return or the "play" button to hear it. change voices
	using the dropdown menu.
</p>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" class="txt" bind:value={lyrics} />
	<!-- 	<div>
		<label for="rate">Rate</label>
		<input
			bind:value={rate}
			type="range"
			min="0.5"
			max="2"
			value="1"
			step="0.1"
			id="rate"
		/>
		<div class="rate-value">1</div>
		<div class="clearfix" />
	</div>
	<div>
		<label for="pitch">Pitch</label>
		<input bind:value={pitch}
			type="range"
			min="0"
			max="2"
			value="1"
			step="0.1"
			id="pitch"
		/>
		<div class="pitch-value">1</div>
		<div class="clearfix" />
	</div> -->
	<select bind:value={selected} on:blur={voiceSelected}>
		{#each voices as voice}
			<option value={voice.name}>
				{voice.name} - ({voice.lang})
			</option>
		{/each}
	</select>
	<div class="controls">
		<button id="play" type="submit">Play</button>
	</div>
</form>

<style>
	:global(body) {
		color: black;
		background: #ffc600;
	}

	h1,
	p {
		font-family: sans-serif;
		text-align: center;
		padding: 20px;
	}

	.txt,
	select,
	form > div {
		display: block;
		margin: 0 auto;
		font-family: sans-serif;
		font-size: 16px;
		padding: 5px;
	}

	.txt {
		width: 80%;
	}

	select {
		width: 83%;
	}

	form > div {
		width: 81%;
	}

	.txt,
	form > div {
		margin-bottom: 10px;
		overflow: auto;
	}

	/* .clearfix {
		clear: both;
	}

	label {
		float: left;
		width: 10%;
		line-height: 1.5;
	}

	.rate-value,
	.pitch-value {
		float: right;
		width: 5%;
		line-height: 1.5;
	}

	#rate,
	#pitch {
		float: right;
		width: 81%;
	} */

	.controls {
		text-align: center;
		margin-top: 10px;
	}

	.controls button {
		padding: 10px;
	}
</style>
