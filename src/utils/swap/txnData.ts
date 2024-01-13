import { ethers } from 'ethers';
import { ICoin } from '../../interfaces/main';
import { bridgeAddress, networkRpc_url } from '../../config/config';
import swapABI from '../../helpers/abis/uniswapAbi.json';
import erc20Abi from '../../helpers/abis/erc20Abi.json';
import { get0xSwapData } from './api0x';

export const swapTxnData = async (
  fromCoin: ICoin,
  toCoin: ICoin,
  networkId: number,
  fromTokenAmount: number,
  address: string,
): Promise<any[]> => {
  try {
    let txns = [];
    let provider = new ethers.providers.JsonRpcProvider(
      networkRpc_url[fromCoin.chainId],
    );
    // const sellAmountInString = ethers.utils.formatUnits(
    //   fromTokenAmount,
    //   fromCoin.decimals,
    // );
    const sellAmount = ethers.utils.parseUnits(
      fromTokenAmount.toString(),
      fromCoin.decimals,
    );
    const uniswapInterface = new ethers.utils.Interface(swapABI);
    let txData;

    // if (networkId === 5) {
    //   const params = {
    //     sellToken: fromCoin.address,
    //     buyToken: toCoin.address,
    //     sellAmount: sellAmount.toString(),
    //     chainId: networkId,
    //   };
    //   txData = await get0xSwapData(params);
    // }

    if (fromCoin.address !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
      const fromTokenContract = new ethers.Contract(
        fromCoin.address,
        erc20Abi,
        provider,
      );
      let approvedAmount = ethers.utils.formatUnits(
        await fromTokenContract.allowance(address, bridgeAddress),
        fromCoin.decimals,
      );

      if (Number(approvedAmount) < Number(sellAmount)) {
        const erc20Interface = new ethers.utils.Interface(erc20Abi);
        const finalTxData = erc20Interface.encodeFunctionData('approve', [
          bridgeAddress,
          sellAmount,
        ]);
        let txn = {
          to: fromCoin?.address,
          data: finalTxData,
          value: '0',
        };
        txns.push(txn);
      }
    }
    let finalTxData;
    // if (networkId === 5 && txData?.calldata) {
    //   const calldata = ethers.utils.AbiCoder.prototype.encode(
    //     ['address', 'address', 'uint', 'bytes'],
    //     [fromCoin?.address, toCoin?.address, sellAmount, txData?.calldata],
    //   );

    //   finalTxData = uniswapInterface?.encodeFunctionData('swap', [
    //     calldata,
    //     address,
    //   ]);
    // } else {
    const calldata = ethers.utils.AbiCoder.prototype.encode(
      ['address', 'address', 'uint', 'bytes'],
      [fromCoin?.address, toCoin?.address, sellAmount, '0x'],
    );
    console.log('calldata for swap: ', calldata)
    finalTxData = uniswapInterface.encodeFunctionData('swap', [
      calldata,
      address,
    ]);
    // }
    let tx = {
      to: bridgeAddress,
      data: finalTxData,
      value:
        fromCoin.address.toLowerCase() ===
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          ? fromTokenAmount * 10 ** 18 + ''
          : '0',
    };
    txns.push(tx);
    return txns;
  } catch (err) {
    console.log('error in swapTxnData: ', err);
    throw err;
  }
};
