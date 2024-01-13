import {mainAPI} from '../config/config';
import {sendAPIRequest} from './config';
import {store} from '../redux/store';
import {ISelectedCoin} from '../interfaces/main';
import { ToastShowShort } from '../utils/toast';

export const getAllportfolios = async () => {
  let data = await sendAPIRequest(`${mainAPI}/portfolio/getall`, '', 'GET');
  return data;
};

export const addPortfolio = async (
  portFolioName: string,
  baseCoin: string,
  stableCoin: string,
  selectedCoin: ISelectedCoin[],
) => {
  try {
    const state = store.getState();
    const smartAccountAddress = state.auth.smartAccountAddress;
    const selectedCoinsArray = [];
    for (let i = 0; i < selectedCoin.length; i++) {
      selectedCoinsArray.push({
        coin: selectedCoin[i].coin.id,
        percentage: '' + selectedCoin[i].percentage,
      });
    }
    const portfolioObj = {
      name: portFolioName,
      smartAccountAddress: smartAccountAddress,
      baseCoin: baseCoin,
      stableCoin: stableCoin,
      coins: selectedCoinsArray,
    };

    let bodyContent = JSON.stringify(portfolioObj);
    console.log('reached API');
    let data = sendAPIRequest(`${mainAPI}/portfolio/add`, bodyContent, 'POST');
    return data;
  } catch (error) {
    ToastShowShort('Error in adding portfolio');
  }
};
