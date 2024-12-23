import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateRecurringSchedules } from '../utils/schedule';

const initialState: ScheduleState = {
  scheduleList: [
    {
      id: '1',
      title: '링글 프론트엔드 과제 제출 마감 🧑🏻‍💻',
      startDate: '2024-12-23',
      endDate: '2024-12-23',
      startTime: '오후 11:00',
      endTime: '오전 0:00',
      color: 'purple',
    },
    {
      id: '2',
      title: '가족과 함께 크리스마스 이브 🎄',
      startDate: '2024-12-24',
      endDate: '2024-12-24',
      startTime: '오후 5:00',
      endTime: '오후 10:00',
      color: 'yellow',
    },
    {
      id: '3',
      title: '크리스마스 🎄',
      startDate: '2024-12-25',
      endDate: '2024-12-25',
      startTime: '오전 0:00',
      endTime: '오전 1:00',
      color: 'red',
    },
    {
      id: '4',
      title: '링글팀 감사합니다 😄',
      startDate: '2024-12-26',
      endDate: '2024-12-26',
      startTime: '오전 0:00',
      endTime: '오전 09:00',
      color: 'purple',
    },
    {
      id: '5',
      title: '연말 약속 🍽️',
      startDate: '2024-12-29',
      endDate: '2024-12-29',
      startTime: '오후 02:00',
      endTime: '오후 08:00',
      color: 'blue',
    },
    {
      id: '6',
      title: '내 생일 🎁🎂',
      startDate: '2025-01-01',
      endDate: '2025-01-02',
      startTime: '오전 0:00',
      endTime: '오전 0:00',
      color: 'green',
    },
  ],
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addSchedule(state, action: PayloadAction<Schedule>) {
      state.scheduleList.push(action.payload);
    },
    deleteSchedule(state, action: PayloadAction<string>) {
      state.scheduleList = state.scheduleList.filter(
        (schedule) => schedule.id !== action.payload,
      );
    },
    addRecurringSchedules(
      state,
      action: PayloadAction<{
        schedule: Schedule;
        repeatType: 'daily' | 'weekly' | 'yearly';
      }>,
    ) {
      const { schedule, repeatType } = action.payload;
      const generatedSchedules = generateRecurringSchedules(
        schedule,
        repeatType,
      );
      state.scheduleList.push(...generatedSchedules);
    },
  },
});

export const { addSchedule, deleteSchedule, addRecurringSchedules } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
