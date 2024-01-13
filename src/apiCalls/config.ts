import {store} from '../redux/store';
import { ToastShowShort } from '../utils/toast';

export const sendAPIRequest = async (
  route: string,
  body: any,
  method: string = 'POST',
) => {
  try {
    let state = store.getState();
    let headersList = {
      smartaccountaddress: state.auth.smartAccountAddress
        ? state.auth.smartAccountAddress
        : '',
      'Content-Type': 'application/json',
    };
    // let headersList = {
    //   smartaccountaddress: '0xeefaceadf9d8353a7eb6793f9908086bca93546c',
    // };
    let response = await fetch(route, {
      method: method,
      body: body,
      headers: headersList,
    });
    const data = await response.json();
    // console.log('data.......', data);
    return data;
  } catch (error) {
    ToastShowShort('Internal Server Error');
  }
};

export const sendAPIRequestWithToken = async (
  route: string,
  body: any,
  method: string = 'POST',
) => {
  try {
    let state = store.getState();
    let headersList = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.auth.tokens.access.token}`,
    };
    let response = await fetch(route, {
      method: method,
      body: body,
      headers: headersList,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    ToastShowShort('Internal Server Error');
  }
};
