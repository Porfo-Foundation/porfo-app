import Crypto from 'crypto';

export const hasJsonStructure = (str: string) => {
  if (typeof str !== 'string') {
    return false;
  }
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
};

export const getTextfromMsg = (msg: any): string => {
  if (hasJsonStructure(msg)) {
    return getTextfromMsg(JSON.parse(msg).content);
  }
  if (msg.content) {
    return msg.content;
  } else {
    let txtMsg = '';
    try {
      txtMsg = JSON.parse(msg);
    } catch {
      txtMsg = msg;
    }
    return txtMsg;
  }
};

export const sleep = async (secs: number): Promise<void> => {
  await new Promise(r => setTimeout(r, secs * 1000));
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const randomString = (size = 30) => {
  return Crypto.randomBytes(size)
    .toString('base64')
    .slice(0, size)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');
};
