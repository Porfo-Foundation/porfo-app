import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';

//defile state interface

interface fileShareState {
  filePath: string;
  isFileRecovered: boolean;
}

//define initial state

const initialState: fileShareState = {
  filePath: '',
  isFileRecovered: false,
};

export const fileShareSlice = createSlice({
  name: 'fileShare',
  initialState,
  reducers: {
    updateFilePath: (state, action: PayloadAction<string>) => {
      state.filePath = action.payload;
    },
    updateFileRecovered: (state, action: PayloadAction<boolean>) => {
      state.isFileRecovered = action.payload;
    },
  },
});

export const {updateFilePath, updateFileRecovered} = fileShareSlice.actions;
export default fileShareSlice.reducer;
