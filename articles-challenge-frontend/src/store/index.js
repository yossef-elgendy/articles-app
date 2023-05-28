import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountsReducer from './accounts';
import { composeWithDevTools } from 'redux-devtools-extension';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Specify the reducers to persist
};

const rootReducer = combineReducers({
    user: accountsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);


export default store;
