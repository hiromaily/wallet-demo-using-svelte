<script lang="ts">
	import { conf } from '$lib/config';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
		<a class="navbar-brand" href="{conf.server.urlPath}/">Wallet</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNavAltMarkup"
			aria-controls="navbarNavAltMarkup"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
			<div class="navbar-nav">
				<a class="nav-link active" aria-current="page" href="{conf.server.urlPath}/">Top</a>
				<a class="nav-link" href="{conf.server.urlPath}/metamask">Metamask</a>
				<a class="nav-link" href="{conf.server.urlPath}/keplr">Keplr</a>
			</div>
		</div>
	</div>
</nav>
