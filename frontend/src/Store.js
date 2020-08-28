import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { UserReducer } from './UserReducer/Reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, UserReducer)

const initialState = {};
const reducer = combineReducers({
    user: UserReducer
})

export const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);