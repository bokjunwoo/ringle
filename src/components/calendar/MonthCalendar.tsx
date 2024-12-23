import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setDate, setSettingTime } from '../../store/calendarSlice';
import {
  MODAL_TYPES,
  openCreateScheduleModal,
  openViewScheduleModal,
} from '../../store/modalSlice';
import { SCHEDULE_COLORS } from '../../configs/color';
import { getDaysInMonth } from '../../utils/date';

export default function MonthCalendar() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.date.date);
  const scheduleList = useSelector(
    (state: RootState) => state.schedule.scheduleList,
  );
  const today = dayjs().format('YYYY-MM-DD');

  const handleDateClick = (date: string) => {
    dispatch(setDate(date));
    dispatch(setSettingTime());
    dispatch(openCreateScheduleModal());
  };

  const handleScheduleClick = (e: React.MouseEvent, schedule: Schedule) => {
    e.stopPropagation();
    dispatch(
      openViewScheduleModal({
        type: MODAL_TYPES.VIEW_SCHEDULE,
        data: schedule,
      }),
    );
  };

  const days = getDaysInMonth(selectedDate);
  const totalWeeks = Math.ceil(days.length / 7);

  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-y-auto rounded-2xl bg-white p-4 shadow-md">
      <div className="grid grid-cols-7">
        {/* 요일 헤더 */}
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
          <div key={day} className="p-2 text-center text-xs font-semibold">
            {day}
          </div>
        ))}

        {days.map(({ date, isCurrentMonth }, index) => {
          const formattedDate = date.format('YYYY-MM-DD');
          const isToday = formattedDate === today;
          const daySchedules = scheduleList.filter(
            (schedule) => schedule.startDate === formattedDate,
          );

          return (
            <div
              key={index}
              onClick={() => handleDateClick(formattedDate)}
              className={`cursor-pointer border-b border-r p-1
                ${totalWeeks === 6 ? 'h-[13.4vh]' : 'h-[16.1vh]'}
                ${!isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'}
                ${index < 7 ? 'border-t' : ''}
                ${index % 7 === 0 ? 'border-l' : ''}
              `}
            >
              <div className="flex justify-center">
                <div
                  className={`flex size-6 items-center justify-center rounded-full text-xs
                    ${isToday ? 'bg-blue-500 text-white' : ''}
                    ${date.day() === 0 ? 'text-red-500' : ''} 
                    ${date.day() === 6 ? 'text-blue-500' : ''}
                    ${!isCurrentMonth ? 'text-gray-400' : ''}
                  `}
                >
                  {date.format('D')}
                </div>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {daySchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex w-full items-center rounded-sm px-1 py-0.5 text-xs text-google_gray hover:bg-gray-200"
                    onClick={(e) => handleScheduleClick(e, schedule)}
                  >
                    <div
                      className={`mr-1 size-2 shrink-0 rounded-sm ${
                        SCHEDULE_COLORS.find(
                          (color) => color.id === schedule.color,
                        )?.value || 'bg-gray-300'
                      }`}
                    />
                    <div className="truncate">
                      {schedule.startTime} {schedule.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
