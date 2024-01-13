import {ICoin} from '../../interfaces/main';
import {bridgeAddress, networkRpc_url} from '../../config/config';
import crossSwapAbi from '../../helpers/abis/crossSwapAbi.json';
import erc20Abi from '../../helpers/abis/erc20Abi.json';
import ExchangeAbi from '../../helpers/abis/exchangeAbi.json';
import {ethers} from 'ethers';
import {get0xSwapData} from './api0x';
import Web3 from 'web3';

export const oneClickSwapTxnData = async (
  fromCoin: ICoin,
  toCoin: ICoin,
  networkId: number,
  destNetworkId: number,
  fromTokenAmount: number,
  address: string,
  porfoTokens: ICoin[],
) => {
  try {
    //Used for Cross Chain Swap
    const PFTinFromChain = porfoTokens.find(
      pftToken => pftToken.chainId === networkId,
    );
    // const PFTinToChain = porfoTokens.find(
    //   pftToken => pftToken.chainId === destNetworkId,
    // );
    const fromAmount = ethers.utils.parseUnits(
      fromTokenAmount.toString(),
      fromCoin.decimals,
    );
    if (!PFTinFromChain) {
      throw new Error('PFT not found in chain');
    }

    let txns = [];
    let provider = new ethers.providers.JsonRpcProvider(
      networkRpc_url[networkId],
    );

    const crossChainAbi = new ethers.utils.Interface(crossSwapAbi);
    let txData: Record<string, any> = {};
    if (networkId === 5) {
      if (fromCoin.address === PFTinFromChain.address) {
        txData = {calldata: '0x'};
      } else {
        const params = {
          sellToken: fromCoin.address,
          buyToken: PFTinFromChain.address,
          sellAmount: fromAmount.toString(),
          chainId: networkId,
        };
        const res = await get0xSwapData(params);
        txData = res;
      }
    }

    const fromTokenContract = new ethers.Contract(
      fromCoin.address,
      erc20Abi,
      provider,
    );
    let approvedAmount = Number(
      await fromTokenContract.allowance(address, bridgeAddress),
    );
    if (Number(approvedAmount) < Number(fromAmount)) {
      const erc20Interface = new ethers.utils.Interface(erc20Abi);
      let approveTxData = erc20Interface?.encodeFunctionData('approve', [
        bridgeAddress,
        fromAmount,
      ]);
      let txn = {
        to: fromCoin.address,
        data: approveTxData,
        value: '0',
      };
      txns.push(txn);
    }
    // console.log("finalTxData");
    let finalTxData;
    if (networkId === 5) {
      const calldata = ethers.utils.AbiCoder.prototype.encode(
        ['address', 'address', 'uint', 'bytes'],
        [
          fromCoin?.address,
          PFTinFromChain?.address,
          fromAmount.toString(),
          txData?.calldata,
        ],
      );
      finalTxData = crossChainAbi?.encodeFunctionData('lock', [
        calldata,
        Web3.utils
          .asciiToHex(
            destNetworkId === 5 ? 'eth' : destNetworkId === 97 ? 'bsc' : 'poly',
          )
          .padEnd(66, '0'),
        toCoin?.address,
      ]);
    } else {
      const exchangeAbi = new ethers.utils.Interface(ExchangeAbi);
      const swapCallData = exchangeAbi.encodeFunctionData('buyFunction', [
        fromCoin?.address,
        PFTinFromChain?.address,
        fromAmount,
      ]);
      const calldata = ethers.utils.AbiCoder.prototype.encode(
        ['address', 'address', 'uint', 'bytes'],
        [
          fromCoin?.address,
          PFTinFromChain?.address,
          fromAmount,
          swapCallData,
        ],
      );
      finalTxData = crossChainAbi?.encodeFunctionData('lock', [
        calldata,
        Web3.utils
          .asciiToHex(
            destNetworkId === 5 ? 'eth' : destNetworkId === 97 ? 'bsc' : 'poly',
          )
          .padEnd(66, '0'),
        toCoin?.address,
      ]);
    }
    let tx = {
      to: bridgeAddress,
      data: finalTxData,
      value:
        fromCoin.address.toLowerCase() ===
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          ? fromTokenAmount * 10 ** 18 + ''
          : '0',
    };
    // console.log(
    //   'dest chain in hex: ',
    //   Web3.utils
    //     .asciiToHex(
    //       destNetworkId === 5 ? 'eth' : destNetworkId === 97 ? 'bsc' : 'poly',
    //     )
    //     .padEnd(66, '0'),
    // );
    txns.push(tx);
    return txns;
  } catch (err) {
    console.log('Error in oneClickSwapTxnData: ', err);
    throw err;
  }
};
