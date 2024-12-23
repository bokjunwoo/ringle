import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import modalReducer from './modalSlice';
import scheduleReducer from './scheduleSlice';
import viewModeReducer from './viewModeSlice';

export const store = configureStore({
  reducer: {
    date: calendarReducer,
    modal: modalReducer,
    schedule: scheduleReducer,
    viewMode: viewModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
