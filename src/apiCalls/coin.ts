import {mainAPI} from '../config/config';
import {sendAPIRequest} from './config';

export const getAllCoins = async () => {
  let data = sendAPIRequest(`${mainAPI}/coin/getall`, '', 'GET');
  return data;
};

export const getCoinNews = async (coinInfo: string) => {
  let data = sendAPIRequest(
    `${mainAPI}/coin/getCoinNews/${coinInfo}`,
    '',
    'GET',
  );
  return data;
};
export const getCoinDetails = async (coinId: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      {
        method: 'GET',
      },
    );

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log('inside getCoinDetails...', error);
    throw error;
  }
};

export const getCoinHistoricalPrice = async (coinId: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=max`,
      {
        method: 'GET',
      },
    );

    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log('inside getCoinHistoricalPrice...', error);
    throw error;
  }
};
