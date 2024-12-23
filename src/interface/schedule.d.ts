// interface Schedule {
//   id: string;
//   title: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   color: string;
// }

interface ScheduleState {
  scheduleList: Schedule[];
}

interface SchedulePosition {
  id: string;
  startHour: number;
  endHour: number;
  order: number;
}

interface Schedule {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  color: string;
}

type RepeatType = 'none' | 'daily' | 'weekly' | 'yearly';
