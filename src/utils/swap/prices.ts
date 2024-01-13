import {getSwappedPrice} from '../../helpers/cross-chainSwap';
import {ICoin} from '../../interfaces/main';

export const getEstimatedExchangePrice = async (
  fromCoin: ICoin,
  fromAmount: string,
  toCoin: ICoin,
  porfoTokens: ICoin[],
) => {
  try {
    if (fromAmount === '0') {
      return 0;
    }
    console.log('into getEstimated Price function: ');
    const fromNetwork = fromCoin.chainId;
    const toNetwork = toCoin.chainId;
    // Handle Simple Swap
    if (fromNetwork === toNetwork && fromCoin.symbol !== toCoin.symbol) {
      let res = await getSwappedPrice(
        fromCoin,
        toCoin,
        fromNetwork,
        Number(fromAmount),
        porfoTokens,
      );
      return Number(res);
    }

    //Used for Cross Chain Swap
    const PFTinFromChain = porfoTokens.find(
      pftToken => pftToken.chainId === fromCoin.chainId,
    );
    const PFTinToChain = porfoTokens.find(
      pftToken => pftToken.chainId === toCoin.chainId,
    );
    if (!PFTinFromChain || !PFTinToChain) {
      throw new Error('PFT not found in chain');
    }

    //Handle Cross Chain Swap of Same Token
    if (fromNetwork !== toNetwork && fromCoin?.symbol === toCoin?.symbol) {
      if (fromCoin?.symbol === 'PFT') {
        return Number(fromAmount) - (Number(fromAmount) * 2) / 100;
      }
      let newAmt: number = Number(fromAmount);
      let after_swap_amt = await getSwappedPrice(
        fromCoin,
        PFTinFromChain,
        fromNetwork,
        newAmt,
        porfoTokens,
      );
      newAmt = Number(after_swap_amt);
      let after_sec_swap = await getSwappedPrice(
        PFTinToChain,
        toCoin,
        toNetwork,
        newAmt,
        porfoTokens,
      );
      const finalTokenPrice =
        Number(after_sec_swap) - (Number(after_sec_swap) * 2) / 100;

      if (Number(finalTokenPrice) <= 0 || isNaN(Number(finalTokenPrice))) {
        throw new Error(`Invalid Price in Cross Chain Swap ${finalTokenPrice}`);
      }
      return Number(finalTokenPrice);
    }
    //Handle Cross Chain Swap of Different Token
    if (fromNetwork !== toNetwork && fromCoin.symbol !== toCoin.symbol) {
      if (fromCoin.symbol === 'PFT') {
        let afterswapmat = await getSwappedPrice(
          PFTinToChain,
          toCoin,
          toNetwork,
          Number(fromAmount),
          porfoTokens,
        );

        let finalEstimatedPrice = afterswapmat;
        // console.log("second Swap: ", finalEstimatedPrice);
        if (
          Number(finalEstimatedPrice) <= 0 ||
          isNaN(Number(finalEstimatedPrice))
        ) {
          throw new Error(
            `Invalid Price in Cross Chain Swap ${finalEstimatedPrice}`,
          );
        }
        return (
          Number(finalEstimatedPrice) - (Number(finalEstimatedPrice) * 2) / 100
        );
      }
      if (toCoin?.symbol === 'PFT') {
        let after_swap_amt = await getSwappedPrice(
          fromCoin,
          toCoin,
          fromNetwork,
          Number(fromAmount),
          porfoTokens,
        );

        if (Number(after_swap_amt) <= 0 || isNaN(Number(after_swap_amt))) {
          throw new Error(
            `Invalid Price in Cross Chain Swap ${after_swap_amt}`,
          );
        }
        return Number(after_swap_amt) - (Number(after_swap_amt) * 2) / 100;
      }

      let newAmt = Number(fromAmount);

      let after_swap_amt = await getSwappedPrice(
        fromCoin,
        PFTinFromChain,
        fromNetwork,
        newAmt,
        porfoTokens,
      );
      console.log('newAmt before second swap: ', Number(after_swap_amt));

      let after_sec_swap = await getSwappedPrice(
        PFTinToChain,
        toCoin,
        toNetwork,
        Number(after_swap_amt),
        porfoTokens,
      );
      console.log('after_sec_swap: ', after_sec_swap);

      const finalTokenPrice = Number(after_sec_swap);
      if (Number(finalTokenPrice) <= 0 || isNaN(Number(finalTokenPrice))) {
        throw new Error(`Invalid Price in Cross Chain Swap ${finalTokenPrice}`);
      }
      return Number(finalTokenPrice) - (Number(finalTokenPrice) * 2) / 100;
    }
  } catch (err: any) {
    console.log('error in getEstimatedExchangePrice: ', err);
    throw new Error(err);
  }
};
