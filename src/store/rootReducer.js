import { combineReducers } from '@reduxjs/toolkit';
import snippets from '../slices/snippets';

const rootReducer = combineReducers({
  snippets,
});

export default rootReducer;
