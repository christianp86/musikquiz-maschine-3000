<script lang="ts">
	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import MainText from '$lib/Maintext.svelte';
	import NavButton from '$lib/NavButton.svelte';
    import Player from '$lib/Player.svelte';
	

	const introText =
		'Um so mehr Leute, desto unterhaltsamer wird dein Musikquiz. Trage hier die Namen der Spieler:innen🙆‍♀️🙆‍♂️ oder der Teams ein 👫👭👬';
	const buttonText = 'Weiter';

	const question = 'Wieviele Spieler oder Teams sind am Start?';
</script>

<svelte:head>
	<style>
		body {
			background-color: #2a9d8f;
		}
	</style>
</svelte:head>

<SmallHeader />
<div class="questions-color-text">
	<Step />
	<Question {question} />
	<MainText mainText={introText} />
    <Player />
</div>

<NavButton backToStart link="/" />
<NavButton {buttonText} next link="questions" />

<style>
	.questions-color-text {
		color: #043b35;
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
		width: 10vw;
	}
</style>
