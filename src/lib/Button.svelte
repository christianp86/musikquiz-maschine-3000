<script>
	export let buttonText = 'Text';
	export let next = false;
	export let disabled = false;
</script>

<button class="button" class:next on:click {disabled}>{buttonText}</button>

<style>
	.button {
		background-color: #264653;
		width: max-content;
		border: 1px solid #f4a261;
		border-radius: 4px;
		font-family: OpenSans-Bold;
		font-size: 28px;
		color: #f4a261;
		text-align: center;
		line-height: 24px;
		padding: 12px 24px;
	}

	.button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.button:enabled {
		cursor: pointer;
		color: #f4a261;
		transition-duration: 0.4s;
	}

	.next {
		background-color: #264653;
	}
</style>
