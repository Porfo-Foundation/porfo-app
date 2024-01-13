import {authAPI} from '../config/config';
import {sendAPIRequestWithToken} from './config';

//Link UserProfile
export const linkUserProfile = async (email: string, mobile: string) => {
  const bodyObject = {email, mobile};
  const bodyContent = JSON.stringify(bodyObject);
  const data = await sendAPIRequestWithToken(
    `${authAPI}/user/link-user`,
    bodyContent,
    'POST',
  );
  return data;
};
