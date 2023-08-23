import { combineReducers } from '@reduxjs/toolkit';
import { SVReducer } from './SinhVienReducer/slice';

export const rootReducer = combineReducers({
    SVReducer,
});
