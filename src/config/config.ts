//ngrok Conifg
// export const authAPI = 'https://b696-203-122-9-18.ngrok-free.app/v1';

export const mainAPI = 'xxxxx';
export const socketAPI = 'xxxx';

//Stage Config
export const authAPI = 'xxxx';
export const ONESIGNAL_APP_ID = 'xxxx';
export const googleClientId =
  'xxxx';
export const NOTP_ENDPOINTURL = 'https://api.notp.world';
export const NOTP_APIKEY = 'xxxx';
export const COINMARKETCAP_APIKEY = 'xxxx';
export const providerUrl = 'xxxx';
export const rpcUrls: {[key: number]: string} = {
  // 5: 'https://eth-goerli.api.onfinality.io/public',
  97: 'https://data-seed-prebsc-2-s2.bnbchain.org:8545',
  80001: 'https://rpc.ankr.com/polygon_mumbai',
};

export const chains = Object.keys(rpcUrls).map(chainId =>
  parseInt(chainId, 10),
);

export const PaymasterUrls: {[key: number]: string} = {
  97: 'xxxx',
  80001:
    'xxxx',
};
export const blueChips1 = ['binance-usd', 'aave'];
export const APIKey0x = 'xxxx';

// Swap Helper
export const swapAPI: {[key: number]: string} = {
  // 5: 'https://goerli.api.0x.org/swap/v1/quote',
  80001: 'https://mumbai.api.0x.org/swap/v1/quote',
};

export const bridgeAddress = 'xxxxx';

export const networkRpc_url: {[chainId: number]: string} = {
  1: 'https://mainnet.infura.io/v3/xxxx',
  56: 'https://bsc-dataseed.binance.org/',
  137: 'https://rpc-mainnet.maticvigil.com',
  // 5: 'https://goerli.blockpi.network/v1/rpc/public',
  97: 'https://bsc-testnet.blockpi.network/v1/rpc/public',
  80001: 'https://rpc.ankr.com/polygon_mumbai',
};

export const CDNURL = 'xxxx';
export const QRCODEURL = 'xxxx';
