<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$components/metamask/Header.svelte';
	import AddWallet from '$components/metamask/AddWallet.svelte';
	import type { Metamask } from '$lib/metamask/metamask';
	import { storeMetamask, storeIsConnected } from '$lib/metamask/store';

	let meta: Metamask | undefined;
	let isConnected = false;

	// https://svelte.dev/tutorial/onmount
	// - onMount, which runs after the component is first rendered to the DOM
	// https://newbedev.com/referenceerror-document-is-not-defined-in-svelte-3
	onMount(async () => {
		// check metamask extension
		if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
			console.log('MetaMask is installed!');
		} else {
			alert('Please install metamask extension');
		}

		// subscribe
		storeMetamask.subscribe((value) => {
			if (!value) return;
			meta = value;
		});
		storeIsConnected.subscribe((value) => {
			isConnected = value;
		});
	});
</script>

<div class="mb-5">
	<h3 class="text-bg-primary p-3">Metamask Wallet</h3>
	<!-- Header component -->
	<Header />
	{#if meta && isConnected}
		<!-- AddWallet component -->
		<AddWallet />
	{/if}
</div>
