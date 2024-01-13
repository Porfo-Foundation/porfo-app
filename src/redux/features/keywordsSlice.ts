import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';

//defile state interface

interface keywordsState {
  keywordsArray: string[];
  secureTextEntry1: boolean;
  secureTextEntry2: boolean;
}

//define initial state

const initialState: keywordsState = {
  keywordsArray: ['', ''],
  secureTextEntry1: true,
  secureTextEntry2: true,
};

export const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    updateKeywordsArray: (state, action: PayloadAction<string[]>) => {
      state.keywordsArray = action.payload;
    },
    updateSecureTextEntry1: (state, action: PayloadAction<boolean>) => {
      state.secureTextEntry1 = action.payload;
    },

    updateSecureTextEntry2: (state, action: PayloadAction<boolean>) => {
      state.secureTextEntry2 = action.payload;
    },
  },
});

export const {
  updateKeywordsArray,
  updateSecureTextEntry1,
  updateSecureTextEntry2,
} = keywordsSlice.actions;
export default keywordsSlice.reducer;
