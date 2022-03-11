import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import baseReducer from './baseReducer';

const reducers = combineReducers({
    game: gameReducer,
    base: baseReducer
});

export default reducers;
