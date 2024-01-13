import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {ITransaction} from '../../interfaces/main';
import {EmptyTransaction} from '../../helpers/transactions';
//defile state interface

interface transactionState {
  selectedTransaction: ITransaction;
}

//define initial state

const initialState: transactionState = {
  selectedTransaction: EmptyTransaction,
};

export const selectedTransactionSlice = createSlice({
  name: 'selectedTransaction',
  initialState,
  reducers: {
    updateSelectedTransaction: (state, action: PayloadAction<ITransaction>) => {
      state.selectedTransaction = action.payload;
    },
  },
});

export const {updateSelectedTransaction} = selectedTransactionSlice.actions;
export default selectedTransactionSlice.reducer;
