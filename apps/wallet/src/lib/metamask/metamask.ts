import detectEthereumProvider from '@metamask/detect-provider';
import { chainIDParamMap } from '$lib/metamask/chainid';
import { storeChainID } from '$lib/metamask/store';
import { toDecimal } from '$lib/hex/hex';

class Metamask {
	private provider: any;

	constructor(provider: any) {
		this.provider = provider;
	}

	// TODO: send transaction
	// https://docs.metamask.io/guide/sending-transactions.html

	public async getAccount(): Promise<string> {
		// https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts
		// this is equivalent to deprecated ethereum.enable()
		const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
		return accounts[0];
	}

	public async chainID(): Promise<string> {
		//https://docs.metamask.io/guide/ethereum-provider.html#ethereum-chainid-deprecated
		return await this.provider.request({ method: 'eth_chainId' });
	}

	public async networkVersion(): Promise<number> {
		// https://docs.metamask.io/guide/ethereum-provider.html#ethereum-networkversion-deprecated
		//return this.provider.networkVersion; // 1
		return await this.provider.request({ method: 'net_version' });
	}

	public async getAddress(): Promise<string | null> {
		// https://docs.metamask.io/guide/ethereum-provider.html#ethereum-selectedaddress-deprecated
		//return this.provider.selectedAddress; // null
		return await this.provider.request({ method: 'eth_accounts' });
	}

	public isConnected(): boolean {
		return this.provider.isConnected;
	}

	// if network is already added, it automatically switch
	public async addEthereumChain(chainID: number) {
		// get chainParam
		if (!chainIDParamMap[chainID]) {
			// switch chain
			await this.switchEthereumChain(chainID);
			return;
		}

		await this.provider.request({
			method: 'wallet_addEthereumChain',
			params: [chainIDParamMap[chainID]]
		});
	}

	public async switchEthereumChain(chainID: number) {
		//const chainIDStr = '0x' + chainID.toString(16).toUpperCase();
		const chainIDStr = '0x' + chainID.toString(16);

		await this.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainIDStr }]
		});
	}

	public readyEvent() {
		// TODO: events
		// https://docs.metamask.io/guide/ethereum-provider.html#events
		this.provider.on('accountsChanged', (accounts: any) => {
			// Time to reload your interface with accounts[0]!
			console.log(`event[accountsChanged]: ${accounts[0]}`);
		});
		this.provider.on('chainChanged', (chainId: number) => {
			console.log(`event[chainChanged]: ${chainId}`);
			// Handle the new chain.
			// Correctly handling chain changes can be complicated.
			// We recommend reloading the page unless you have good reason not to.
			//window.location.reload();

			// convert
			const chainId_ = toDecimal(chainId);
			console.log(`event[chainChanged] decimal: ${chainId}`);
			storeChainID.set(chainId_);
		});
	}
}

const isMetamaskInstalled = async (): Promise<unknown | undefined> => {
	// if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
	//   return true;
	// }
	const provider = await detectEthereumProvider();
	// FIXME: how to handle??
	if (provider !== window.ethereum) {
		console.error('Do you have multiple wallets installed?');
	}
	return provider;
};

const openExtension = () => {
	const link =
		'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related';
	window.open(link);
};

export { Metamask, isMetamaskInstalled, openExtension };