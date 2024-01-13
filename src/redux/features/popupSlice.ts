import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IPnsProfile} from '../../interfaces/pns';
import {EmptyPnsProfile} from '../../helpers/pns';
// import type {RootState} from '../store';

// Define a type for the slice state
interface popupState {
  showLoader: boolean;
  showPopup: boolean;
  popupName: string;
  fileUrl: string;
  pnsProfile: IPnsProfile;
}

// Define the initial state using that type
const initialState: popupState = {
  showLoader: false,
  showPopup: false,
  popupName: 'ShareLocationPopup',
  fileUrl: '',
  pnsProfile: EmptyPnsProfile,
};

export const popupSlice = createSlice({
  name: 'popup',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleLoader: state => {
      state.showLoader = !state.showLoader;
    },
    togglePopup: state => {
      state.showPopup = !state.showPopup;
    },
    updatepopupName: (state, action: PayloadAction<string>) => {
      state.popupName = action.payload;
    },
    updateFileUrl: (state, action: PayloadAction<string>) => {
      state.fileUrl = action.payload;
    },
    updatePnsProfile: (state, action: PayloadAction<IPnsProfile>) => {
      state.pnsProfile = action.payload;
    },
  },
});

export const {
  toggleLoader,
  togglePopup,
  updatepopupName,
  updateFileUrl,
  updatePnsProfile,
} = popupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default popupSlice.reducer;
