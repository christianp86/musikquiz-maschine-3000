<script>
	import Header from '$lib/Header.svelte';
	import Highlights from '$lib/Highlights.svelte';
	import MainText from '$lib/Maintext.svelte';
	import NavButton from '$lib/NavButton.svelte';

	const highlights =
		'Für Musikquiz-Hosts · für deine Musikquiz-Bedürfnisse · für denkwürdige Quiz-Abende';
	const introText =
		'Es ist mega einfach. Lege fest wie viele Fragen du pro Runde spielen willst und wie viele Runden das Quiz haben soll. Die phänomenale Musikquiz Maschine 3000 wählt danach für dich zufällig die Quizmaster-Fragen aus uuuuund … Zack, fertig – dein Musikquiz!';
	const buttonText = 'Erstellen! Jetzt!';
</script>

<svelte:head>
	<title>Musikquiz Maschine 3000</title>
</svelte:head>

<Header />
<Highlights {highlights} />
<MainText mainText={introText} />
<NavButton {buttonText} next link="questions" />

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Open Sans';
	}

	:global(.section) {
		--theme-background: #264653ff;
	}
</style>
