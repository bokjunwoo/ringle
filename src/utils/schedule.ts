import dayjs from 'dayjs';
import { parseHour } from './time';

export function calculateSchedulePositions(
  schedules: Schedule[],
  currentDate: string,
): SchedulePosition[] {
  const positions: SchedulePosition[] = [];

  schedules.forEach((schedule) => {
    let startHour = parseHour(schedule.startTime);
    let endHour = parseHour(schedule.endTime);

    // 날짜를 걸친 일정인 경우
    if (schedule.startDate !== schedule.endDate) {
      if (currentDate === schedule.startDate) {
        endHour = 24; // 시작일인 경우 자정까지
      } else if (currentDate === schedule.endDate) {
        startHour = 0; // 종료일인 경우 0시부터
      }
    }

    const overlapping = positions.filter(
      (pos) =>
        (startHour >= pos.startHour && startHour < pos.endHour) ||
        (endHour > pos.startHour && endHour <= pos.endHour) ||
        (startHour <= pos.startHour && endHour >= pos.endHour),
    );

    positions.push({
      id: schedule.id,
      startHour,
      endHour,
      order: overlapping.length,
    });
  });

  return positions;
}

export const generateRecurringSchedules = (
  schedule: Schedule,
  repeatType: 'daily' | 'weekly' | 'yearly',
): Schedule[] => {
  const generatedSchedules: Schedule[] = [];
  const startDate = dayjs(schedule.startDate);

  if (repeatType === 'daily') {
    for (let i = 0; i < 365; i++) {
      const newDate = startDate.add(i, 'day').format('YYYY-MM-DD');
      generatedSchedules.push({
        ...schedule,
        id: `${schedule.id}-${startDate}`,
        startDate: newDate,
        endDate: newDate,
      });
    }
  } else if (repeatType === 'weekly') {
    for (let i = 0; i < 52; i++) {
      const newDate = startDate.add(i, 'week').format('YYYY-MM-DD');
      generatedSchedules.push({
        ...schedule,
        id: `${schedule.id}-${startDate}`,
        startDate: newDate,
        endDate: newDate,
      });
    }
  } else if (repeatType === 'yearly') {
    for (let i = 0; i < 5; i++) {
      const newDate = startDate.add(i, 'year').format('YYYY-MM-DD');
      generatedSchedules.push({
        ...schedule,
        id: `${schedule.id}-${startDate}`,
        startDate: newDate,
        endDate: newDate,
      });
    }
  }

  return generatedSchedules;
};

export const getRepeatLabel = (
  value: RepeatType,
  startDate: string,
): string => {
  const today = dayjs(startDate);

  switch (value) {
    case 'daily':
      return '매일 반복';
    case 'weekly':
      return `매주 ${today.format('dddd')}`;
    case 'yearly':
      return `매년 ${today.format('M월 D일')}`;
    case 'none':
    default:
      return '반복 없음';
  }
};
