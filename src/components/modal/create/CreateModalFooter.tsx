import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { RootState } from '../../../store';
import { closeModal, MODAL_TYPES } from '../../../store/modalSlice';
import {
  addRecurringSchedules,
  addSchedule,
} from '../../../store/scheduleSlice';
import { parseHour } from '../../../utils/time';

interface Props {
  title: string;
  selectedColor: string;
  selectedType: RepeatType;
}

export function CreateModalFooter({
  title,
  selectedColor,
  selectedType,
}: Props) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.date.date);
  const startTime = useSelector((state: RootState) => state.date.startTime);
  const endTime = useSelector((state: RootState) => state.date.endTime);

  const startHour = parseHour(startTime);
  const endHour = parseHour(endTime);

  const nextDayFormatted = dayjs(selectedDate)
    .add(1, 'day')
    .format('YYYY-MM-DD');

  const handleAddSchedule = () => {
    const newSchedule: Schedule = {
      id: dayjs().toISOString(),
      title: title.trim() || '(제목 없음)',
      startDate: selectedDate,
      endDate: endHour < startHour ? nextDayFormatted : selectedDate,
      startTime,
      endTime,
      color: selectedColor,
    };

    selectedType === 'none'
      ? dispatch(addSchedule(newSchedule))
      : dispatch(
          addRecurringSchedules({
            schedule: newSchedule,
            repeatType: selectedType,
          }),
        );

    dispatch(closeModal(MODAL_TYPES.CREATE_SCHEDULE));
  };

  return (
    <div className="flex justify-end space-x-2">
      <button
        onClick={handleAddSchedule}
        className="rounded-full bg-blue-600 px-6 py-3 text-sm text-white hover:bg-blue-700"
      >
        저장
      </button>
    </div>
  );
}
