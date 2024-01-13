import {mainAPI} from '../config/config';
import {sendAPIRequest} from './config';
import {store} from '../redux/store';

export const getUserName = async () => {
  let data = await sendAPIRequest(`${mainAPI}/pns/getUserName`, '', 'GET');
  return data;
};

export const claimUserName = async (userName: string) => {
  const state = store.getState();
  const walletAddress = state.auth.walletAddress;
  const smartAccountAddress = state.auth.smartAccountAddress;
  const obj = {
    userName: userName,
    smartAccountAddress: smartAccountAddress,
    walletAddress: walletAddress,
  };
  const bodyContent = JSON.stringify(obj);
  let data = await sendAPIRequest(
    `${mainAPI}/pns/claimUserName`,
    bodyContent,
    'POST',
  );
  return data;
};

export const checkUserName = async (userName: string) => {
  let data = await sendAPIRequest(
    `${mainAPI}/pns/check/${userName}`,
    '',
    'GET',
  );
  return data;
};

export const updateProfile = async (name: string, avtarUrl: string) => {
  const obj = {
    name: name,
    avatar_2d_url: avtarUrl,
  };
  const bodyContent = JSON.stringify(obj);
  let data = await sendAPIRequest(
    `${mainAPI}/pns/updateProfile`,
    bodyContent,
    'POST',
  );
  return data;
};
