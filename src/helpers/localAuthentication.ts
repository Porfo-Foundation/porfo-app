import ReactNativeBiometrics from 'react-native-biometrics';

export const localAuthentication = async () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const {success} = await rnBiometrics.simplePrompt({
    promptMessage: 'Authenticate Yourself',
    fallbackPromptMessage: 'Use passcode',
  });

  return success;
};

export const EmptyAuth = {
  isRecoveryAvailable: true,
  tokens: {
    access: {
      expires: '',
      token: '',
    },
    refresh: {
      expires: '',
      token: '',
    },
  },
  user: {
    email: '',
    mobile: '',
    id: '',
    name: '',
    role: '',
    smartAccounts: [],
  },
};
