<script lang="ts">
	import { storeChainID } from '$lib/store';
	import { conf } from '$lib/config';

	const chainIDChanged = (e: { target: HTMLSelectElement }) => {
		console.log(`chainID changed: ${e.target.value}`);
		//storeChainID.update((v) => chainID);
		storeChainID.set(e.target.value);
	};
</script>

<div class="mx-3 mt-4 row">
	<label for="chainid" class="col-sm-3 col-form-label">ChainID:</label>
	<div class="col-sm-9">
		<select
			on:change={chainIDChanged}
			name="chainid"
			id="chainid"
			class="form-select"
			aria-label="ChainID"
		>
			<option value={conf.chainID}>{conf.chainID}</option>
			<option value="cosmoshub-4">cosmoshub-4</option>
		</select>
	</div>
</div>
