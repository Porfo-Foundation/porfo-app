import {BigNumber, ethers} from 'ethers';
import crossSwapAbi from './abis/crossSwapAbi.json';
import {Interface} from 'ethers/lib/utils';
import Web3 from 'web3';
import ExchangeAbi from './abis/exchangeAbi.json';
import {ICoin} from '../interfaces/main';
import {get0xSwapData} from '../utils/swap/api0x';
import {swapTxnData} from '../utils/swap/txnData';
import {oneClickSwapTxnData} from '../utils/swap/xChainTxnData';
import {networkRpc_url} from '../config/config';
import {ToastShowShort} from '../utils/toast';

const exchanges: {[key: number]: string} = {
  97: '0x98B01584b8A09Da8D87F498Fe0A29299c1895054',
  80001: '0x56543519C63DAb2e9C7f21C8bF12b0f94AEE57a9',
};

export const TokenList = [
  {
    name: 'Porfo',
    symbol: 'PFT',
    decimals: 18,
    chainId: 97,
    address: '0xe233903738b14b7F2734155621b96CA513839d66',
    graphAddress: '0xe233903738b14b7F2734155621b96CA513839d66',
  },
  {
    name: 'Porfo',
    symbol: 'PFT',
    decimals: 18,
    chainId: 80001,
    address: '0x02b137b42F291F11d54A937FD3349D51934F0C74',
    graphAddress: '0x02b137b42F291F11d54A937FD3349D51934F0C74',
  },
];

// export const bridgeAPI: string = 'https://sw-api.terablock.com/bridge';

export const ParseEthUtil = (amount: number | string, decimal: number) => {
  let response = Number(amount) * 10 ** decimal;
  return response;
};

export const getSwappedPrice = async (
  fromCoin: ICoin,
  toCoin: ICoin,
  network: number,
  amountfrom: number | BigNumber,
  porfoTokens: ICoin[],
) => {
  if (amountfrom === 0) {
    return '0';
  }
  let provider = new ethers.providers.JsonRpcProvider(networkRpc_url[network]);
  let amount = ethers.utils.parseUnits(
    amountfrom.toString(),
    fromCoin.decimals,
  );
  let fromaddress = fromCoin.address;
  let destAddress = toCoin.address;
  // console.log({amountfrom, fromCoin, toCoin, network});
  if (fromCoin.symbol === 'PFT') {
    const pftToken = porfoTokens.find(pft => pft.chainId === network);
    if (!pftToken) {
      throw new Error('From Chain not supported');
    }
    fromaddress = pftToken.address;
  } else if (toCoin.symbol === 'PFT') {
    const pftToken = porfoTokens.find(pft => pft.chainId === network);
    if (!pftToken) {
      throw new Error('To Chain not supported');
    }
    destAddress = pftToken.address;
  }
  try {
    //For GETH use 0xApi
    if (network === 5) {
      const params = {
        sellToken: fromaddress,
        buyToken: destAddress,
        sellAmount: ethers.utils
          .parseUnits(amountfrom.toString(), fromCoin.decimals)
          .toString(),
        chainId: network,
      };
      const data = await get0xSwapData(params);
      return ethers.utils.formatUnits(data.quote, toCoin.decimals);
    }
    //For other Chains
    let SwapContract = new ethers.Contract(
      exchanges[network],
      ExchangeAbi,
      provider,
    );
    let quote = await SwapContract.quote(fromaddress, destAddress, amount);
    return ethers.utils.formatUnits(quote, toCoin.decimals);
  } catch (err) {
    console.log('err in swapPrice: ', err);
    throw err;
  }
};

export const GetTxnData = async (
  fromamount: number,
  fromToken: ICoin,
  toToken: ICoin,
  fromChain: number,
  toChain: number,
  address: string,
  porfoTokens: ICoin[],
) => {
  try {
    console.log("Step 1 check");
    if (fromChain === toChain && fromToken?.symbol !== toToken?.symbol) {
      console.log("Step 1 if check");
      const swapTxn = await swapTxnData(
        fromToken,
        toToken,
        fromChain,
        fromamount,
        address,
      );
      return swapTxn;
    }
    console.log("Step 2 check");
    if (fromChain !== toChain && fromToken?.symbol === toToken?.symbol) {
      console.log("Step 2 same token bridge check");
      if (fromToken?.symbol === 'PFT') {
        console.log("Step 2 bridge for porfo check");
        const crossChainAbi = new Interface(crossSwapAbi);
        let finalTxData = crossChainAbi?.encodeFunctionData('lock', [
          '0x',
          Web3.utils
            .asciiToHex(toChain === 5 ? 'eth' : toChain === 97 ? 'bsc' : 'poly')
            .padEnd(66, '0'),
          toToken?.address,
        ]);

        if (finalTxData) {
          let tx = {
            to: address,
            data: finalTxData,
            value:
              fromToken?.address.toLowerCase() ===
              '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                ? fromamount * 10 ** 18 + ''
                : '0',
          };
          return [tx];
        }
      } else {
        console.log("Step 2 pure cross chain bridge  check");
        let oneClickTxn = await oneClickSwapTxnData(
          fromToken,
          toToken,
          fromChain,
          toChain,
          fromamount,
          address,
          porfoTokens,
        );
        return oneClickTxn;
      }
    }
    console.log("Step 3 check pure cross chain txn");
    let oneClickTxn = await oneClickSwapTxnData(
      fromToken,
      toToken,
      fromChain,
      toChain,
      fromamount,
      address,
      porfoTokens,
    );
    return oneClickTxn;
  } catch (err) {
    ToastShowShort('Error in Txn Data');
  }
};

// export const bridgeTxnData = async (
//   fromCoin: ICoin,
//   toCoin: ICoin,
//   fromNetworkId: number,
//   destNetworkId: number,
//   receiverAddress: string,
//   fromTokenAmount: number,
// ) => {
//   try {
//     let txns = [];
//     let provider = new ethers.providers.JsonRpcProvider(
//       networkRpc_url[fromCoin?.chainId],
//     );
//     const res = await axios.get(
//       `${bridgeAPI}?chainIdFrom=${fromNetworkId}&chainIdTo=${destNetworkId}&amountFrom=${ParseEthUtil(
//         fromTokenAmount,
//         fromCoin?.decimals,
//       ).toLocaleString('en', {
//         useGrouping: false,
//       })}&addressTo=${receiverAddress}`,
//     );
//     const fromTokenContract = await new ethers.Contract(
//       fromCoin?.address,
//       erc20Abi,
//       provider,
//     );
//     let approvedAmount =
//       Number(
//         await fromTokenContract.allowance(
//           receiverAddress,
//           res.data?.message?.rawTx?.to,
//         ),
//       ) /
//       10 ** fromCoin?.decimals;

//     if (Number(approvedAmount) < Number(fromTokenAmount)) {
//       const erc20Interface = new ethers.utils.Interface(erc20Abi);
//       let finalTxData = erc20Interface?.encodeFunctionData('approve', [
//         res?.data?.message?.rawTx?.to,
//         fromTokenAmount,
//       ]);
//       let txn = {
//         to: receiverAddress,
//         data: finalTxData,
//         value: 0,
//       };
//       txns.push(txn);
//     }

//     const txData = res.data?.message?.rawTx?.data;
//     if (txData) {
//       let tx = {
//         to: res?.data?.message?.rawTx?.to,
//         data: txData,
//         gasLimit: parseInt(res?.data?.message?.rawTx?.gasLimit?.hex, 10),
//         // gasPrice: gas.gasPrice, // to be filled by the user
//         value:
//           fromCoin.address.toLowerCase() ===
//           '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
//             ? ethers.utils.parseUnits(
//                 fromTokenAmount.toString(),
//                 fromCoin.decimals,
//               )
//             : // fromTokenAmount * 10 ** 18
//               0,
//       };
//       txns.push(tx);
//       return txns;
//     }
//   } catch (err) {
//     console.log('err in bridgeTx Data: ', err);
//     throw err;
//   }
// };
