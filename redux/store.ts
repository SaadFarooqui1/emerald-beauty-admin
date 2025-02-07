// import { configureStore } from '@reduxjs/toolkit'
// import authSlice from './features/auth-slice'
// import globalSlice from './features/global-slice'
// import themeConfigSlice from '@/redux/features/theme-config-slice'

// export const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         global: globalSlice,
//         themeConfig: themeConfigSlice,
//     },
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type RootStateAuth = RootState['auth']
// export type RootStateGlobal = RootState['global']



import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Default localStorage for web
import authSlice from './features/auth-slice';
import globalSlice from './features/global-slice';
import themeConfigSlice from '@/redux/features/theme-config-slice';

// Persist Configuration
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth'], // Only persist specific slices
};

// Use combineReducers to combine reducers if there are multiple reducers
const rootReducer = combineReducers({
    auth: authSlice,
    themeConfig: themeConfigSlice,
    global: globalSlice,
});


// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Configure the store as usual but with the persistedReducer
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootStateAuth = RootState['auth'];
// export type RootStateGlobal = RootState['global'];
