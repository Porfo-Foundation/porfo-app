import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface authState {
  walletAddress: string | null;
  userAddress: string | null;
  smartAccountAddress: string | null;
  walletName: string | null;
  privateKey?: string;
  userInfo: any;
  tokens: {
    access: {
      expires: string;
      token: string;
    };
    refresh: {
      expires: string;
      token: string;
    };
  };
}

// Define the initial state using that type
const initialState: authState = {
  walletAddress: null,
  userAddress: null,
  smartAccountAddress: null,
  walletName: null,
  privateKey: undefined,
  userInfo: null,
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
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    updateUserAddress: (state, action: PayloadAction<string | null>) => {
      state.userAddress = action.payload;
    },
    updateSmartAccountAddress: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.smartAccountAddress = action.payload;
    },
    updateWalletName: (state, action: PayloadAction<string | null>) => {
      state.walletName = action.payload;
    },
    updatePrivateKey: (state, action: PayloadAction<string>) => {
      state.privateKey = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    updateTokens: (state, action: PayloadAction<authState['tokens']>) => {
      state.tokens = action.payload;
    },
  },
});

export const {
  updateWalletAddress,
  updateUserAddress,
  updateSmartAccountAddress,
  updateWalletName,
  updatePrivateKey,
  updateUserInfo,
  updateTokens,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
