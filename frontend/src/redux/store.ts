import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';
import storage from './storage';


const persistOptions = {
    key:"user",
    storage
}

const persistedUser = persistReducer(persistOptions,userReducer);
export const makeStore = () =>{
  return configureStore({
    reducer: {
      userInfo: persistedUser,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore["dispatch"];