import {mainAPI} from '../config/config';
import {sendAPIRequest} from './config';
import {store} from '../redux/store';
import { ToastShowShort } from '../utils/toast';

export const sendQuery = async (prompt: string) => {
  try {
    const state = store.getState();
    const smartAddress = state.auth.smartAccountAddress;
    // const smartAddress = '0x5FfcCB9d17175b52e69C386Ed671ef41BeCd262a';
    const aiRequest = {
      messages: [
        {
          role: 'user',
          content: ` ${prompt}. (User Information : {
            "walletAddress": "${smartAddress}"
          })`,
        },
      ],
    };
    let bodyContent = JSON.stringify(aiRequest);
    let data = await sendAPIRequest(`${mainAPI}/ai/ask`, bodyContent, 'POST');
    // console.log('inside aichat.......', data);
    return data;
  } catch (error) {
    ToastShowShort('Error in sending query');
  }
};

export const getQueries = async (cursor: number) => {
  const data = await sendAPIRequest(
    `${mainAPI}/ai/getchat?cursor=${cursor}`,
    '',
    'GET',
  );
  return data;
};
