import {combineReducers} from 'redux';
import {loginReducer} from '../../screens/Auth/Login/redux/reducer';

export const allReducers = combineReducers({
  login: loginReducer,
});
