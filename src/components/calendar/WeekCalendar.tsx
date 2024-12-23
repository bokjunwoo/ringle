import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCurrentWeek, getHours } from '../../utils/date';
import { setDate, setStartTime } from '../../store/calendarSlice';
import { openCreateScheduleModal } from '../../store/modalSlice';
import { calculateSchedulePositions } from '../../utils/schedule';
import WeekHeader from './WeekHeader';
import ScheduleItem from './ScheduleItem';

export default function WeekCalendar() {
  const today = dayjs().format('YYYY-MM-DD');
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.date.date);
  const scheduleList = useSelector(
    (state: RootState) => state.schedule.scheduleList,
  );

  const currentWeek = getCurrentWeek(selectedDate);
  const hours = getHours();

  const handleTimeSlotClick = (formattedDate: string, hour: string) => {
    dispatch(setDate(formattedDate));
    dispatch(setStartTime(`${hour}:00`));
    dispatch(openCreateScheduleModal());
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-y-auto rounded-2xl bg-white shadow-md">
      <WeekHeader currentWeek={currentWeek} today={today} />

      <div className="relative py-2">
        {/* 시간대 그리드 */}
        {hours.map((hour, index) => (
          <div key={index} className="grid grid-cols-8">
            <div className="h-12 border-r py-2 pr-3 text-end text-xs">
              <p className="mt-[-15px]">{hour}시</p>
            </div>
            {currentWeek.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="relative h-12 cursor-pointer border-r border-t text-center"
                onClick={() =>
                  handleTimeSlotClick(dayjs(day).format('YYYY-MM-DD'), hour)
                }
              />
            ))}
          </div>
        ))}

        {/* 일정 표시 */}
        {currentWeek.map((day, dayIndex) => {
          const currentDate = dayjs(day).format('YYYY-MM-DD');

          // 해당 날짜에 표시되어야 할 일정 필터링
          const daySchedules = scheduleList.filter((schedule) => {
            // 시작일과 종료일 사이에 있는 모든 날짜 포함
            return (
              dayjs(currentDate).isSameOrAfter(schedule.startDate, 'day') &&
              dayjs(currentDate).isSameOrBefore(schedule.endDate, 'day')
            );
          });

          const schedulePositions = calculateSchedulePositions(
            daySchedules,
            currentDate,
          );

          return daySchedules.map((schedule) => {
            const position = schedulePositions.find(
              (p) => p.id === schedule.id,
            )!;

            return (
              <ScheduleItem
                key={schedule.id}
                schedule={schedule}
                position={position}
                dayIndex={dayIndex}
                hours={hours}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
