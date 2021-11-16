<script lang="ts">
	import SmallHeader from '$lib/SmallHeader.svelte';
	import Step from '$lib/Step.svelte';
	import Question from '$lib/Question.svelte';
	import MainText from '$lib/Maintext.svelte';
	import NavButton from '$lib/NavButton.svelte';
    import Player from '$lib/Player.svelte';

	import { numberOfQuestions, numberOfRounds } from '../stores/inputStore';
	

	const introText =
		'Um so mehr Leute, desto unterhaltsamer wird dein Musikquiz. Trage hier die Namen der Spieler:innen🙆‍♀️🙆‍♂️ oder der Teams ein 👫👭👬';
	const buttonText = 'Musikquiz erstellen';

	const question = 'Wieviele Spieler oder Teams sind am Start?';
</script>

<svelte:head>
	<style>
		body {
			background-color: #f4a261;
		}
	</style>
</svelte:head>

<SmallHeader />
<div class="questions-color-text">
	<Step stepNumber={3}/>
	<Question {question} />
	<MainText mainText={introText} />
    <Player />
</div>

<NavButton backToRounds link="rounds" />
<NavButton {buttonText} next link="quiz?rounds={$numberOfRounds}&questions={$numberOfQuestions}" />

<style>
	.questions-color-text {
		color: rgb(0, 0, 0);
	}
</style>
