import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import storage from 'redux-persist/lib/storage';
import authReducer from './features/authSlice';
import mainReducer from './features/mainSlice';
import popupReducer from './features/popupSlice';
import coinReducer from './features/coinSlice';
import onBoardingReducer from './features/onBoardingSlice';
import assetsReducer from './features/assetsSlice';
import notificationReducer from './features/notificationSlice';
import fileShareReducer from './features/fileShareSlice';
import keywordsReducer from './features/keywordsSlice';
import selectedTransactionReducer from './features/selectedTransactionSlice';
import selectedThemeReducer from './features/selectedThemeSlice';

const rootReducer = combineReducers({
  onBoarding: onBoardingReducer,
  auth: authReducer,
  main: mainReducer,
  popup: popupReducer,
  coin: coinReducer,
  assets: assetsReducer,
  notification: notificationReducer,
  fileShare: fileShareReducer,
  keywords: keywordsReducer,
  selectedTransaction: selectedTransactionReducer,
  selectedTheme: selectedThemeReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['auth', 'main'],
  storage: AsyncStorage,
};

const persistedLocationReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedLocationReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      //TODO: Remove this
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
