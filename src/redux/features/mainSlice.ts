import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ICoinBalance,
  IPortfolio,
  IPortfolioAndEoas,
  ISelectedCoin,
  ITransaction,
} from '../../interfaces/main';
import {EmptyPortfolio} from '../../helpers/portfolio';
import {EmptyBalance} from '../../helpers/coin';

// Define a type for the slice state
interface mainState {
  portfolios: IPortfolio[];
  EOAs: {
    walletAddress: string;
    balances: ICoinBalance[];
    transactions: ITransaction[];
  }[];
  transactions: ITransaction[] | [];
  balances: ICoinBalance[] | [];
  selectedBalance: ICoinBalance;
  selectedPortfolio: IPortfolioAndEoas | null;
  selectedCoin: ISelectedCoin | null;
}

// Define the initial state using that type
const initialState: mainState = {
  portfolios: [EmptyPortfolio],
  EOAs: [],
  transactions: [],
  balances: [],
  selectedBalance: EmptyBalance,
  selectedPortfolio: null,
  selectedCoin: null,
};

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updatePortfolios: (state, action: PayloadAction<IPortfolio[]>) => {
      state.portfolios = action.payload;
    },
    updateEOAs: (state, action: PayloadAction<mainState['EOAs']>) => {
      state.EOAs = action.payload;
    },
    updateTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.transactions = action.payload;
    },
    updateSelectedPortfolio: (
      state,
      action: PayloadAction<IPortfolioAndEoas>,
    ) => {
      state.selectedPortfolio = action.payload;
    },
    updateSelectedCoin: (state, action: PayloadAction<ISelectedCoin>) => {
      state.selectedCoin = action.payload;
    },
    updateSelectedBalance: (state, action: PayloadAction<ICoinBalance>) => {
      state.selectedBalance = action.payload;
    },
  },
});

export const {
  updatePortfolios,
  updateEOAs,
  updateTransactions,
  updateSelectedPortfolio,
  updateSelectedCoin,
  updateSelectedBalance,
} = mainSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default mainSlice.reducer;
