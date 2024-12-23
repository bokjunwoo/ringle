import dayjs, { Dayjs } from 'dayjs';

export const generateFullDayTimeSlots = (): string[] => {
  const timeSlots: string[] = [];
  let currentTimeSlot = dayjs().startOf('day'); // 오전 12:00 (00:00)로 초기화

  while (currentTimeSlot.isBefore(dayjs().endOf('day'))) {
    timeSlots.push(currentTimeSlot.format('A h:mm')); // 현재 시간 추가
    currentTimeSlot = currentTimeSlot.add(15, 'minute'); // 15분 단위로 추가
  }

  return timeSlots;
};

export const generateTimeSlots = (startTime: Dayjs): string[] => {
  const timeSlots: string[] = [];
  let currentTimeSlot = startTime;

  // 1시간 이내는 15분 단위로 끝 시간을 선택할 수 있도록 추가
  for (let i = 0; i < 4; i++) {
    if (currentTimeSlot.isAfter(startTime)) {
      timeSlots.push(currentTimeSlot.format('A h:mm')); // 15분 단위
    }
    currentTimeSlot = currentTimeSlot.add(15, 'minute'); // 15분씩 추가
  }

  // 1시간 이후부터는 30분 단위로 끝 시간을 선택할 수 있도록 추가
  currentTimeSlot = startTime.add(1, 'hour'); // 시작 시간을 1시간 뒤로 설정

  for (let i = 0; i <= 45; i++) {
    if (currentTimeSlot.isAfter(startTime)) {
      timeSlots.push(currentTimeSlot.format('A h:mm')); // 30분 단위
    }
    currentTimeSlot = currentTimeSlot.add(30, 'minute'); // 30분씩 추가
  }

  return timeSlots;
};

export const parseHour = (time: string): number => {
  // "오전 2:00" 또는 "오후 4:00" 형식
  const [period, timeStr] = time.trim().split(' '); // "오전", "2:00"

  // 시간과 분 파싱
  const [hourStr, minuteStr = '0'] = timeStr.split(':'); // "2", "00"

  const hour = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  let totalHours = hour;
  if (period === '오후' && hour !== 12) {
    totalHours += 12;
  } else if (period === '오전' && hour === 12) {
    totalHours = 0;
  }

  return totalHours + minutes / 60;
};
