import {authAPI} from '../config/config';
import {sendAPIRequest, sendAPIRequestWithToken} from './config';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const loginWithNOTP = async (mobile: string, name: string) => {
  let bodyObject = {mobile, name};
  let bodyContent = JSON.stringify(bodyObject);
  let data = await sendAPIRequest(
    `${authAPI}/auth/login/Notp`,
    bodyContent,
    'POST',
  );
  return data;
};

//add Smart Account
export const addSmartAccount = async (smartAccountAddress: string) => {
  let bodyObject = {smartAccountAddress};
  let bodyContent = JSON.stringify(bodyObject);
  let data = await sendAPIRequestWithToken(
    `${authAPI}/auth/add-smart-account`,
    bodyContent,
    'POST',
  );
  return data;
};

//Check Smart Account
export const checkSmartAccount = async (smartAccountAddress: string) => {
  let bodyObject = {smartAccountAddress};
  let bodyContent = JSON.stringify(bodyObject);
  let data = await sendAPIRequestWithToken(
    `${authAPI}/auth/check-smart-account`,
    bodyContent,
    'POST',
  );
  return data;
};
// google SignIn option
export const loginWithGoogle = async () => {
  try {
    GoogleSignin.configure();
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    let bodyObject = {
      email: userInfo.user.email,
      name: userInfo.user.name ?? '',
    };
    let bodyContent = JSON.stringify(bodyObject);
    let data = await sendAPIRequest(
      `${authAPI}/auth/login/google`,
      bodyContent,
      'POST',
    );
    return data;
    // You can now use userInfo to access user details like userInfo.user.email, userInfo.user.name, etc.
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Google Sign-In Cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Google Sign-In is in progress.');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services is not available.');
    } else {
      console.log('Google Sign-In Error:', error);
    }
    throw error;
  }
};
