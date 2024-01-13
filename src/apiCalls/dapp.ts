import {mainAPI} from '../config/config';
import {sendAPIRequest} from './config';

export const respondDappConnection = async (
  connectionHash: string,
  taskId: string,
  response: boolean,
) => {
  const bodyContent = JSON.stringify({response, taskId});
  const data = await sendAPIRequest(
    `${mainAPI}/dapp/respond/${connectionHash}`,
    bodyContent,
    'POST',
  );
  return data.connection.connected;
};

export const respondDappTrxn = async (
  connectionHash: string,
  taskId: string,
  response: boolean,
) => {
  const bodyContent = JSON.stringify({response, connectionHash});
  const data = await sendAPIRequest(
    `${mainAPI}/dapp/txnResponse/${taskId}`,
    bodyContent,
    'POST',
  );
  return data;
};
