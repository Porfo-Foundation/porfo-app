import {ToastAndroid, Platform} from 'react-native';
import Toast from 'react-native-simple-toast';

export function ToastShowShort(message: string) {
  if (Platform.OS === 'android') {
    // ToastShowShort(message);
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Toast.show(message, Toast.SHORT);
  }
}
export function ToastShowLong(message: string) {
  if (Platform.OS === 'android') {
    // ToastShowShort(message);
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Toast.show(message, Toast.LONG);
  }
}
