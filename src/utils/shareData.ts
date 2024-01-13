import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';

export const convertAndShareImage = async (viewRef: any) => {
  try {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 0.7,
    });
    await Share.open({url: uri});
  } catch (error) {
    console.error(error);
  }
};
