import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Linking, Platform} from 'react-native';
export const requestCameraPermission = async () => {
  const PERM = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
  try {
    const result = await check(PERM);
    let permission = false;
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        const permissionStatus = await request(PERM);
        if (permissionStatus === RESULTS.GRANTED) {
          permission = true;
        }
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        permission = true;
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        Linking.openSettings();
        // .catch(() => {
        console.log('The permission is denied and not requestable anymore');
        // });
        break;
    }
    return permission;
  } catch (err) {
    console.log(err);
    return false;
  }
};
