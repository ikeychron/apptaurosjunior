import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducer
import rootReducer from './rootReducer';

// InitialState
const initialState = {}

// Store
const store = createStore(rootReducer, initialState, 
  applyMiddleware(thunk)
);

export default store;
