import { combineReducers } from 'redux';
import vacataionReducer from './vacationReducer';
import userReducer from './userReducer';

// export default combineReducers({
//   vacations: vacataionReducer,
//   user: userReducer
// });

const appReducer = combineReducers({
  vacations: vacataionReducer,
  user: userReducer
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};
