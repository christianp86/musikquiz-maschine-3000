<script>
	export let buttonText = 'Text';
	export let link = '#';
</script>

<a class="navbutton" href={link}>{buttonText}</a>

<style>
	.navbutton {
		background-color: #264653;
		border: 1px solid #f4a261;
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
		background-color: #162e38;
	}
</style>
