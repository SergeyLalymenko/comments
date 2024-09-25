import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commentsSlice from './commentsSlice';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    comments: commentsSlice
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: () => [thunk],
});
