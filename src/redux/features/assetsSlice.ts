import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISelectedCoin} from '../../interfaces/main';
// Define a type for the slice state

interface assetsType {
  assets: ISelectedCoin[];
  senderAddress: string;
}

// Define the initial state using that type

const initialState: assetsType = {
  assets: [],
  senderAddress: '',
};

export const assetsSlice = createSlice({
  name: 'assets',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateAssets: (state, action: PayloadAction<ISelectedCoin[]>) => {
      state.assets = action.payload;
    },
    updateSenderAddress: (state, action: PayloadAction<string>) => {
      state.senderAddress = action.payload;
    },
  },
});

export const {updateAssets, updateSenderAddress} = assetsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default assetsSlice.reducer;
