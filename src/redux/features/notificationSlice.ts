import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
// import type {RootState} from '../store';

// Define a type for the slice state
interface notificationState {
  showNotification: boolean;
  notificationType: string;
  txHash?: string;
}

// Define the initial state using that type
const initialState: notificationState = {
  showNotification: false,
  notificationType: '',
  txHash: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateNotification: (state, action: PayloadAction<boolean>) => {
      state.showNotification = action.payload;
    },
    updateNotificationType: (state, action: PayloadAction<string>) => {
      state.notificationType = action.payload;
    },
    updateTxHash: (state, action: PayloadAction<string>) => {
      state.txHash = action.payload;
    },
  },
});

export const {updateNotification, updateNotificationType} =
  notificationSlice.actions;

export default notificationSlice.reducer;
