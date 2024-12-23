import dayjs from 'dayjs';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setEndTime } from '../../../store/calendarSlice';
import { generateTimeSlots } from '../../../utils/time';
import AutoScrollSelect from '../../common/select/AutoScrollSelect';

export default function EndTimeSelector() {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const startDate = useSelector((state: RootState) => state.date.startDate);
  const endTime = useSelector((state: RootState) => state.date.endTime);

  const [endTimeOptions, setEndTimeOptions] = useState<string[]>([]);

  const [isSelectedVisible, setIsSelectedVisible] = useState(false);

  const handleEndTimeChange = (selectedEndTime: string) => {
    dispatch(setEndTime(selectedEndTime));
    setIsSelectedVisible(false);
  };

  useEffect(() => {
    const availableTimes = generateTimeSlots(dayjs(startDate));
    setEndTimeOptions(availableTimes);
  }, [startDate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTimeout(() => {
          setIsSelectedVisible(false);
        }, 0);
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${isSelectedVisible && 'h-48'}`}>
      <div
        className="mr-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2.5 hover:bg-gray-300"
        onClick={() => setIsSelectedVisible(!isSelectedVisible)}
      >
        {endTime}
      </div>

      {isSelectedVisible && (
        <AutoScrollSelect
          options={endTimeOptions}
          selected={endTime}
          handleChange={handleEndTimeChange}
        />
      )}
    </div>
  );
}
