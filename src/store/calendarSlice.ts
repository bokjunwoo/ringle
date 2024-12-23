import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { parseHour } from '../utils/time';

dayjs.locale('ko');

interface CalendarState {
  date: string;
  startTime: string;
  endTime: string;
  startDate: string; // Dayjs 객체 대신 문자열로 저장
}

const initialState: CalendarState = {
  date: dayjs().format('YYYY-MM-DD'),
  startTime: '',
  endTime: '',
  startDate: dayjs().toISOString(), // Dayjs를 문자열로 변환
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setDateToToday(state) {
      state.date = dayjs().format('YYYY-MM-DD');
    },
    setDatePreviousWeek(state) {
      state.date = dayjs(state.date).subtract(1, 'week').format('YYYY-MM-DD');
    },
    setDateNextWeek(state) {
      state.date = dayjs(state.date).add(1, 'week').format('YYYY-MM-DD');
    },
    setDatePreviousMonth(state) {
      state.date = dayjs(state.date).subtract(1, 'month').format('YYYY-MM-DD');
    },
    setDateNextMonth(state) {
      state.date = dayjs(state.date).add(1, 'month').format('YYYY-MM-DD');
    },
    setSettingTime(state) {
      const start = dayjs()
        .minute(Math.ceil(dayjs().minute() / 30) * 30)
        .second(0);

      state.startTime = start.format('A h:mm');
      state.startDate = start.toISOString();

      state.endTime = start.add(60, 'minute').format('A h:mm');
    },
    setStartTime(state, action: PayloadAction<string>) {
      state.startTime = action.payload;
      const hour = parseHour(action.payload);

      const start = dayjs(`${state.date} ${hour}:00`, 'YYYY-MM-DD h:mm');

      state.startDate = start.toISOString();

      const endTime = start.add(1, 'hour');
      state.endTime = endTime.format('A h:mm');
    },
    setEndTime(state, action: PayloadAction<string>) {
      state.endTime = action.payload;
    },
  },
});

export const {
  setDate,
  setDateToToday,
  setDatePreviousWeek,
  setDateNextWeek,
  setDatePreviousMonth,
  setDateNextMonth,
  setSettingTime,
  setStartTime,
  setEndTime,
} = calendarSlice.actions;

export default calendarSlice.reducer;
