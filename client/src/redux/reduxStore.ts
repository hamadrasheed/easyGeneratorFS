import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import user from './user/reducer'
import { UserStore } from './user/types';
import thunkMiddleWare from 'redux-thunk';

export interface RootState {
  user: UserStore;
}

const rootReducer = combineReducers({
  user,
});


const store: Store<RootState> = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;