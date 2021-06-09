<script>
	import Container from '../lib/Container.svelte'
	import Header from '../lib/Header.svelte';
	import MainText from '../lib/Maintext.svelte';
	import Button from '../lib/Button.svelte';

	const introText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur sodales morbi dignissim sed diam pharetra vitae ipsum odio."
	const buttonText = "Erstellen! Jetzt!"
</script>

<svelte:head>
	<title>Musikquiz Maschine 3000</title>
</svelte:head>

<div class="welcome">
	<Container>
		<Header/>
		<MainText mainText={introText}></MainText>
		<a href='questions'><Button {buttonText}></Button></a>
	</Container>
</div>

<style>
	.welcome {
		background-color: #264653ff;
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Open Sans';
	}
</style>
