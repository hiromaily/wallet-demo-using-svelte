<script lang="ts">
	import { onMount } from 'svelte';
	//import { fromBase64 } from '@cosmjs/encoding';
	import { updateKeplrAddress } from '$lib/keplr/address';
	import { conf } from '$lib/config';
	import { storeChainID } from '$lib/keplr/store';

	// import { SigningCosmosClient } from '@cosmjs/launchpad';
	// import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
	// import { SigningStargateClient } from '@cosmjs/stargate';

	let chainId = conf.keplr.chainIDs[0]; // use writable stores with chainID [https://svelte.dev/tutorial/writable-stores]
	let address = '';
	// UI related
	let signature = 'result';

	// initialization
	onMount(async () => {
		//address = await updateKeplrAddress(chainId);
		storeChainID.subscribe((value) => {
			chainId = value;
			// update address
			updateKeplrAddress(chainId)
				.then((res) => {
					address = res.address;
				})
				.catch((e) => {
					console.error(`fail to call updateKeplrAddress(): ${e}`);
				});
		});
	});

	// refer to https://github.com/chainapsis/keplr-example/blob/master/src/main.js
	const clickSign = () => {
		// check extension
		if (!window.getOfflineSigner || !window.keplr) {
			alert('Please install keplr extension');
			return;
		}
		// check message textarea
		const msg = document.getElementById('messageArbitrary').value;
		if (msg === '') {
			alert('Please input message');
			return;
		}
		console.log(`chainID: ${chainId}`);

		// call signArbitrary()
		(async () => {
			console.log('signArbitrary()');

			// refer to
			// https://github.com/johnletey/cosmos-signatures/blob/6d7ab6d8c9b3956e72aae5456632aa24c4aa1fdd/src/pages/index.tsx
			const res = await window.keplr.signArbitrary(chainId, address, msg);
			signature = res.signature;
			// FIXME: ReferenceError: Buffer is not defined
			//signature = Buffer.from(res.signature).toString('base64');
			//signature = new TextDecoder().decode(fromBase64(res.signature));
		})();
	};
</script>

<div class="mx-3 mt-4">
	<h4>signArbitrary</h4>
	<div class="mx-3">
		<div class="form-floating">
			<textarea type="input" class="form-control" id="messageArbitrary" placeholder="message" />
			<label for="message">message</label>
			<div class="mt-2">
				<button
					on:click={clickSign}
					type="button"
					class="btn btn-primary"
					name="send"
					style="width: 100px;"
				>
					Sign
				</button>
			</div>
		</div>
		<div class="mt-4">
			<h5>signature</h5>
			<div class="p-3 border bg-light text-muted">{signature}</div>
		</div>
	</div>
</div>

<style>
	textarea::placeholder {
		color: #aaa;
	}
</style>
