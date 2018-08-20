import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AnimalsReducer from './reducer_animals';

const rootReducer = combineReducers({
  // dummy reducer state: (state = {}) => state
  animals: AnimalsReducer,
  // All other reducers should be above formReducer
  //you have to pass formReducer under 'form' key. 
  form: formReducer
});

export default rootReducer;
