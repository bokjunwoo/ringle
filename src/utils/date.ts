import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/ko';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.locale('ko');
dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const getCurrentWeek = (currentDate: string) => {
  const startOfWeek = dayjs(currentDate).startOf('isoWeek');
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day')); // dayjs 객체 배열 반환
};

export const getHours = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i; // 1시부터 시작
    const period = hour < 12 ? '오전' : '오후'; // 오전/오후 구분
    const displayHour = hour <= 12 ? hour : hour - 12; // 12시 이후에는 12시로 변경
    return `${period} ${displayHour}`;
  });
};

export const getFormattedDateRange = (selectedDate: string) => {
  // 선택된 날짜 기준으로 해당 주의 시작일 (월요일)과 끝일 (일요일)을 구합니다.
  const startOfWeek = dayjs(selectedDate).startOf('isoWeek'); // 월요일
  const endOfWeek = dayjs(selectedDate).endOf('isoWeek'); // 일요일

  // 주 시작일과 종료일이 다른 월을 포함하는지 확인
  const startYear = startOfWeek.year(); // 시작일 년도
  const endYear = endOfWeek.year(); // 종료일 년도
  const startMonth = startOfWeek.month(); // 시작일 월
  const endMonth = endOfWeek.month(); // 종료일 월

  // 동일한 연도일 때
  if (startYear === endYear) {
    // 동일한 년도이면, '2024년 10월 - 11월' 형식으로 출력
    if (startMonth !== endMonth) {
      return `${startOfWeek.format('YYYY년 MM월')} - ${endOfWeek.format('MM월')}`;
    } else {
      return startOfWeek.format('YYYY년 MM월');
    }
  } else {
    // 다른 연도일 경우, '2024년 12월 - 2025년 1월' 형식으로 출력
    return `${startOfWeek.format('YYYY년 MM월')} - ${endOfWeek.format('YYYY년 MM월')}`;
  }
};

export const getDaysInMonth = (selectedDate: string) => {
  const date = dayjs(selectedDate);
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');

  let startDay = startOfMonth.day() as number;
  startDay = startDay === 0 ? 6 : startDay - 1;

  const days = [];

  // 이전 달의 날짜들
  for (let i = 0; i < startDay; i++) {
    days.push({
      date: startOfMonth.subtract(startDay - i, 'day'),
      isCurrentMonth: false,
    });
  }

  // 현재 달의 날짜들
  for (let i = 1; i <= endOfMonth.date(); i++) {
    days.push({
      date: date.date(i),
      isCurrentMonth: true,
    });
  }

  // 다음 달의 날짜들 (마지막 주 채우기)
  const lastDay = (days.length - 1) % 7;
  const remainingDays = lastDay === 6 ? 0 : 6 - lastDay;

  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: endOfMonth.add(i, 'day'),
      isCurrentMonth: false,
    });
  }

  return days;
};
