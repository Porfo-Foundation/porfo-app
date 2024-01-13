import {mainAPI} from '../config/config';
import {sendAPIRequest} from './config';

export const getAllTransactions = async () => {
  let data = await sendAPIRequest(`${mainAPI}/wallet/transactions`, '', 'GET');
  return data;
};

export const getWalletBalances = async () => {
  const data = await sendAPIRequest(`${mainAPI}/wallet/balances`, '', 'GET');
  return data;
};

export const addEOA = async (address: string) => {
  const data = await sendAPIRequest(
    `${mainAPI}/wallet/add-eoa/${address}`,
    '',
    'GET',
  );
  return data;
};

export const getEOAs = async () => {
  const data = await sendAPIRequest(`${mainAPI}/wallet/eoas`, '', 'GET');
  return data;
};

export const createNewWallet = async (
  smartAccountAddress: string,
  vaultAddress: string,
) => {
  let bodyObject = {smartAccountAddress, vaultAddress};
  let bodyContent = JSON.stringify(bodyObject);
  const data = await sendAPIRequest(
    `${mainAPI}/wallet/create`,
    bodyContent,
    'POST',
  );
  return data;
};
