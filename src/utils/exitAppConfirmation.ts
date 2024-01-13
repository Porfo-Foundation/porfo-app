import {BackHandler, Alert} from 'react-native';
export const exitAppConfirmation = () => {
  Alert.alert(
    'Exit Porfo',
    'Are you sure you want to exit?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => BackHandler.exitApp(),
      },
    ],
    {cancelable: false},
  );
  return true; // Prevents the default behavior (exit) if the user selects Cancel
};
