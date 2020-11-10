import { combineReducers } from 'redux';
import { todosReducer } from './todos';

export const reducers = combineReducers({
  todosReducer,
});
