// store.js
import {thunk} from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PURGE, PERSIST, REGISTER, REHYDRATE } from 'redux-persist/es/constants'; // Import constants from redux-persist

import enquirysReducer from './slices/enquirysSlice';
import userReducer from './slices/userSlice';
import environmentReducer from './slices/environmentSlice';


const rootReducer = combineReducers({
  environment: environmentReducer,
  user: userReducer, // Make sure userReducer is correctly imported and used here
  enquirys: enquirysReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
