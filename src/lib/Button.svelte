<script>
	export let buttonText = 'Text';
	export let next = false;
	export let disabled = false;
</script>

<button class="button" class:next on:click>{buttonText} disabled={disabled}</button>

<style>
	.button {
		width: max-content;
		border: 1px solid #f4a261;
		border-radius: 4px;
		font-family: OpenSans-Bold;
		font-size: 28px;
		color: #f4a261;
		text-align: center;
		line-height: 24px;
		padding: 12px 24px;
		transition-duration: 0.4s;
		cursor: pointer;
	}

	.next {
		background-color: #264653;
	}
</style>
