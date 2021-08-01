<script>
	export let buttonText = 'Zurück';
	export let link = '#';
	export let next = false;
	export let style = "";
</script>

<a class="navbutton" class:next href={link} style={style}>{buttonText}</a>

<style>
	.navbutton {
		border: 1px solid ;
		border-color: #f4a261;
		border-radius: 5px;

		font-family: OpenSans-Bold;
		font-size: 28px;
		color: #f4a261;
		text-align: center;
		text-decoration: none;
		line-height: 24px;

		display: inline-block;
		padding: 8px 24px;
		margin-top: 5vh;

		transition-duration: 0.2s;
	}

	.navbutton:hover {
		background-color: var(--backgroundColor);
	}

	.next:hover {
		background-color: #162e38;
	}

	.next {
		background-color: #264653;
	}
</style>
