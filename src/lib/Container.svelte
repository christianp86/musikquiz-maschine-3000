°^°“““<div class="section">
	<div id="container">
		<div class="card">
			<div class="card-details">
				<slot></slot>
			</div>
		</div>
	</div>
</div>

<style>
	.section {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	#container {
		max-width: 90%;
		margin: 30px 20px 30px;
		overflow: auto;
	}

	.card {
		border: 1px solid #bacdd8;
		padding: 8px;
		border-radius: 12px;
		color: white;
	}

	.card-details {
		padding: 16px 8px 8px 8px;
		overflow: auto;
	}

	@media only screen and (min-width: 1280px) {
		.section {
			padding-left: 4em;
		}

		#container {
			max-width: 60%;
			padding-left: 4em;
		}
	}
</style>
