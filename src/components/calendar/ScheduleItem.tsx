import { useDispatch } from 'react-redux';
import { SCHEDULE_COLORS } from '../../configs/color';
import { openViewScheduleModal, MODAL_TYPES } from '../../store/modalSlice';
import { parseHour } from '../../utils/time';

type Props = {
  schedule: Schedule;
  position: SchedulePosition;
  dayIndex: number;
  hours: string[];
};

export default function ScheduleItem({
  schedule,
  position,
  dayIndex,
  hours,
}: Props) {
  const dispatch = useDispatch();
  const startHour = position.startHour;
  const endHour = position.endHour;
  const duration = endHour - startHour;
  const colorInfo = SCHEDULE_COLORS.find(
    (color) => color.id === schedule.color,
  );

  const top = (startHour - parseHour(hours[0])) * 48;
  const height = duration * 48 + 1;
  const width = `calc(100% / 8 - 4px - ${position.order * 10}px)`;
  const left = `calc(${(dayIndex + 2) * (100 / 8)}% - ${100 / 8}% + ${position.order * 10 + 1.5}px)`;

  const handleClick = () => {
    dispatch(
      openViewScheduleModal({
        type: MODAL_TYPES.VIEW_SCHEDULE,
        data: schedule,
      }),
    );
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute z-10 cursor-pointer rounded-md border
      ${colorInfo?.value || 'bg-gray-300'} 
      transition-colors duration-200`}
      style={{ top: `${top + 8}px`, height: `${height}px`, width, left }}
    >
      <div className="overflow-hidden p-1 text-xs text-white">
        <div>{schedule.title}</div>
        <div>{`${schedule.startTime} - ${schedule.endTime}`}</div>
      </div>
    </div>
  );
}
