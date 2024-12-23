import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../store/calendarSlice';
import dayjs from 'dayjs';
import { RootState } from '../../../store';
import '../../../App.css';

export default function Calendar() {
  const dispatch = useDispatch();

  const selectedDate = useSelector((state: RootState) => state.date.date);

  const selected = selectedDate ? new Date(selectedDate) : undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      dispatch(setDate(formattedDate));
    }
  };

  const customFormatters = {
    formatCaption: (date: Date) =>
      `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
  };

  return (
    <DayPicker
      locale={ko}
      selected={selected}
      onSelect={handleSelect}
      mode="single"
      showOutsideDays
      formatters={customFormatters}
      weekStartsOn={1}
      className="text-xs"
      classNames={{
        today: 'bg-blue-600 text-white rounded-full hover:bg-blue-700',
        selected: 'bg-blue-200 rounded-full hover:bg-blue-300',
        outside: 'text-gray-400',
      }}
    />
  );
}
