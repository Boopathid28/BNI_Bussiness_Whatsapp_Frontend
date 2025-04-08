import { configureStore } from '@reduxjs/toolkit';
import layoutSliceReducer from './layout_slice';
import grouplistSliceReducer from "./groups_slice";

export const store = configureStore({
  reducer: {
    layoutSlice: layoutSliceReducer,
    grouplistSlice: grouplistSliceReducer
  },
})