import notesReducer from './notes';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    notes: notesReducer
})

export default allReducers;