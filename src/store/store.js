import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducer
import rootReducer from './rootReducer';

// Redux-thunk
const middleware = [thunk];

// InitialState
const initialState = {}

// Store
const store = createStore(rootReducer, initialState, 
  compose(applyMiddleware(...middleware), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) );

export default store;