import { combineReducers } from 'redux';

// Reducers
import Cripto from './reducers/walletsReducer';
import Login from './reducers/loginReducer';

const reducers = combineReducers({
  Cripto,
  Login
});

export default reducers;