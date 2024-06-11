import {thunk} from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';

import userReduce from "./slices/userSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReduce)


export const store =  configureStore({
  //  enhanced reducer with configuration to persist the userReducer state to local storage.
  reducer: persistedReducer,  
  //  Thunk middleware, which will intercept and stop non-serializable values in action before they get to the reducer
  middleware: ()=>[thunk]

})

//  function that persists and rehydrates the state

export const persistor = persistStore(store)
