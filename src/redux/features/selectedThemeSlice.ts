import {createSlice} from '@reduxjs/toolkit';
// import {PayloadAction} from '@reduxjs/toolkit';
// import {ITransaction} from '../../interfaces/main';
// import {EmptyTransaction} from '../../helpers/transactions';
//defile state interface

// interface transactionState {
//   selectedTheme: ITransaction;
// }

//define initial state

const initialState = {
  selectedTheme: 'dark',
};

export const selectedThemeSlice = createSlice({
  name: 'selectedTheme',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.selectedTheme = action.payload;
    },
  },
});

export const {updateTheme} = selectedThemeSlice.actions;
export default selectedThemeSlice.reducer;
