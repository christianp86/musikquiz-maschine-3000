<script>
	import Header from '$lib/Header.svelte';
	import MainText from '$lib/Maintext.svelte';
	import NavButton from '$lib/NavButton.svelte';

	const introText =
		'Es ist mega einfach. Lege fest wie viele Fragen du pro Runde spielen willst und wie viele Runden das Quiz haben soll. Die phänomenale Musikquiz Maschine 3000 wählt danach für dich zufällig die Quizmaster-Fragen aus uuuuund … Zack, fertig – dein Musikquiz!';
	const buttonText = 'Erstellen! Jetzt!';
</script>

<svelte:head>
	<title>Musikquiz Maschine 3000</title>
</svelte:head>

<Header />
<MainText mainText={introText} />
<NavButton {buttonText} link="questions"/>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Open Sans';
	}
	:global(body) {
		background-color: #264653ff;
	}
</style>
