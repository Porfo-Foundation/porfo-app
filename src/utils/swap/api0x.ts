import axios from 'axios';
import {SwapParams, SwapResp} from '../../interfaces/swap';
import {sleep} from '../helperFunctions';
import {APIKey0x, swapAPI} from '../../config/config';

export const get0xSwapData = async (params: SwapParams): Promise<SwapResp> => {
  try {
    const chainId = params.chainId;
    const res: any = await axios.get(swapAPI[chainId], {
      params,
      headers: {'0x-api-key': APIKey0x},
    });
    // console.log('res from 0x: ', res);
    await sleep(1); // force 1s wait to avoid RL
    return {
      quote: res.data.grossBuyAmount,
      calldata: res.data.data,
    };
  } catch (err: any) {
    if (err.response.status === 400) {
      if (
        err.response.data.validationErrors[0].reason ===
        'INSUFFICIENT_ASSET_LIQUIDITY'
      ) {
        throw new Error('Insufficient Liquidity');
      }
      console.log(
        'err in get0xSwapData: ',
        err.response.data.validationErrors[0].reason,
      );
      throw new Error(err.response.data.validationErrors[0].reason);
    }
    // console.log('err in get0xSwapData: ', err.response);
    throw err;
  }
};
