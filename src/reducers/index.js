import notesReducer from './notes';
import authReducer from './auth';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    notes: notesReducer,
    user: authReducer
})

export default allReducers;