import {ethers} from 'ethers';
import abi from '../../helpers/abis/erc20Abi.json';
// import {networkRpc_url} from '../../config/config';

const getTrxns = async (smartAccountAddress: string) => {
  const networkRpc_url: {[chainId: number]: string} = {
    5: 'https://goerli.blockpi.network/v1/rpc/public',
  };
  const providerUrls = networkRpc_url;
  const chains = Object.keys(providerUrls);
  let txnsPArray = [];
  for (const chain of chains) {
    const provider = new ethers.providers.JsonRpcProvider(
      providerUrls[Number(chain)],
    );
    const smartAccountContract = new ethers.Contract(
      smartAccountAddress,
      abi,
      provider,
    );
    const currentBlock = await provider.getBlockNumber();

    const filter = smartAccountContract.filters.Transfer(null, null, null);
    const events = await smartAccountContract.queryFilter(
      filter,
      currentBlock - 1000,
      currentBlock,
    );
    txnsPArray.push(
      events.map(async event => {
        const tx = await provider.getTransaction(event.transactionHash);
        return tx;
      }),
    );
  }

  const transactions = await Promise.all(txnsPArray);
  console.log(transactions);
  return transactions;
};

export default getTrxns;
