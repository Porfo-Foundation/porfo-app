import {ethers} from 'ethers';
import {networkRpc_url} from '../../config/config';

export const newTxnWorker = async (walletAddress: string) => {
  Object.keys(networkRpc_url).forEach(async chain => {
    const provider = new ethers.providers.JsonRpcProvider(
      networkRpc_url[Number(chain)],
    );

    provider.on({address: walletAddress}, (event: any) => {
      console.log(event);
    });
  });
};
