import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {Chat} from '../../realm/schema/chat.schema';
//defile state interface

interface realmState {
  chats: Realm.Results<Chat> | undefined;
}

//define initial state

const initialState: realmState = {
  chats: undefined,
};

export const realmSlice = createSlice({
  name: 'realm',
  initialState,
  reducers: {
    updateChats: (state, action: PayloadAction<Realm.Results<Chat>>) => {
      state.chats = action.payload;
    },
  },
});

export const {updateChats} = realmSlice.actions;
export default realmSlice.reducer;
