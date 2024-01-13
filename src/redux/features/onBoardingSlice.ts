import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICoin, ISelectedCoin} from '../../interfaces/main';
import {EmptyCoin} from '../../helpers/coin';
import {EmptyAuth} from '../../helpers/localAuthentication';
import {IAuth} from '../../interfaces/main';

// Define a type for the slice state
interface onBoardingState {
  customerObject: IAuth;
  isRecoveryAvailable: boolean;
  MPIN: string;
  keywords: string[];
  coinList: ICoin[];
  portfolioName: string;
  baseCoin: ICoin;
  stableCoin: ICoin;
  // selectedCoins: ISelectedCoin[];
  selectedCoins: ISelectedCoin[];
}

// Define the initial state using that type
const initialState: onBoardingState = {
  customerObject: EmptyAuth,
  isRecoveryAvailable: false,
  MPIN: '',
  keywords: ['', ''],
  coinList: [],
  portfolioName: '',
  baseCoin: EmptyCoin,
  stableCoin: EmptyCoin,
  selectedCoins: [],
};

export const onBoardingSlice = createSlice({
  name: 'onBoarding',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCustomerObject: (state, action: PayloadAction<IAuth>) => {
      state.customerObject = action.payload;
    },
    updateIsRecoveryAvailable: (state, action: PayloadAction<boolean>) => {
      state.isRecoveryAvailable = action.payload;
    },
    updateKeywords: (state, action: PayloadAction<string[]>) => {
      state.keywords = action.payload;
    },
    updateMPIN: (state, action: PayloadAction<string>) => {
      state.MPIN = action.payload;
    },
    updateCoinList: (state, action: PayloadAction<ICoin[]>) => {
      state.coinList = action.payload;
    },
    updatePortfolioName: (state, action: PayloadAction<string>) => {
      state.portfolioName = action.payload;
    },
    updateBaseCoin: (state, action: PayloadAction<ICoin>) => {
      state.baseCoin = action.payload;
    },
    updateStableCoin: (state, action: PayloadAction<ICoin>) => {
      state.stableCoin = action.payload;
    },
    updateSelectedCoins: (state, action: PayloadAction<ISelectedCoin[]>) => {
      state.selectedCoins = action.payload;
    },
  },
});

export const {
  updateCustomerObject,
  updateIsRecoveryAvailable,
  updateKeywords,
  updateMPIN,
  updateCoinList,
  updatePortfolioName,
  updateBaseCoin,
  updateStableCoin,
  updateSelectedCoins,
} = onBoardingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default onBoardingSlice.reducer;
