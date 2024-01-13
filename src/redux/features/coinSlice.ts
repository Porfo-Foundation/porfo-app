import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICoin} from '../../interfaces/main';
import {EmptyCoin} from '../../helpers/coin';
// Define a type for the slice state

interface coinType {
  baseCoin: ICoin;
  stableCoin: ICoin;
  buyCoin: ICoin;
}

// Define the initial state using that type
const initialState: coinType = {
  baseCoin: EmptyCoin,
  stableCoin: EmptyCoin,
  buyCoin: EmptyCoin,
};

export const coinSlice = createSlice({
  name: 'coin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateBaseCoin: (state, action: PayloadAction<ICoin>) => {
      state.baseCoin = action.payload;
    },
    updateStableCoin: (state, action: PayloadAction<ICoin>) => {
      state.stableCoin = action.payload;
    },
    updateSwapCoin: (state, action: PayloadAction<ICoin>) => {
      state.buyCoin = action.payload;
    },
  },
});

export const {updateBaseCoin, updateStableCoin, updateSwapCoin} =
  coinSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default coinSlice.reducer;
