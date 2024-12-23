import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { setDate } from '../../store/calendarSlice';

type Props = {
  currentWeek: Dayjs[];
  today: string;
};

export default function WeekHeader({ currentWeek, today }: Props) {
  return (
    <div className="sticky top-0 z-20 bg-white p-2 pb-0">
      <WeekDays currentWeek={currentWeek} today={today} />
      <WeekDates currentWeek={currentWeek} today={today} />
    </div>
  );
}

function WeekDays({ currentWeek, today }: Props) {
  return (
    <div className="grid grid-cols-8">
      <div className="p-2 text-center text-xs font-semibold" />
      {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
        const dayOfWeek = dayjs(currentWeek[index]).format('YYYY-MM-DD');
        const isToday = dayOfWeek === today;
        return (
          <div
            key={index}
            className={`p-2 text-center text-xs font-semibold ${isToday ? 'text-blue-400' : ''}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}

function WeekDates({ currentWeek, today }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-8">
      <div className="text-center text-xs" />
      {currentWeek.map((day, index) => {
        const dayFormatted = dayjs(day).format('YYYY-MM-DD');
        const isToday = dayFormatted === today;

        return (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-center text-center"
            onClick={() => dispatch(setDate(dayFormatted))}
          >
            <p
              className={`flex size-12 items-center justify-center rounded-full text-[26px] 
            ${isToday ? 'bg-blue-600 text-white' : ''}`}
            >
              {day.date()}
            </p>
          </div>
        );
      })}
    </div>
  );
}
