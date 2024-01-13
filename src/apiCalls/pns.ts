import {mainAPI} from '../config/config';
import {sendAPIRequest} from './config';

export const resolvePnsName = async (userName: string) => {
  const bodyContent = JSON.stringify({userName});
  const data = await sendAPIRequest(
    `${mainAPI}/pns/resolve`,
    bodyContent,
    'POST',
  );
  if (data.address) {
    return data.address;
  }
  return null;
};
