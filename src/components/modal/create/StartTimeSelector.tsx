import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setStartTime } from '../../../store/calendarSlice';
import { generateFullDayTimeSlots } from '../../../utils/time';
import AutoScrollSelect from '../../common/select/AutoScrollSelect';

export default function StartTimeSelector() {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const startTime = useSelector((state: RootState) => state.date.startTime);

  const startTimeOptions = generateFullDayTimeSlots();

  const [isSelectedVisible, setIsSelectedVisible] = useState(false);

  const handleStartTimeChange = (selectedStartTime: string) => {
    dispatch(setStartTime(selectedStartTime));
    setIsSelectedVisible(false);
  };

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
        {startTime}
      </div>

      {isSelectedVisible && (
        <AutoScrollSelect
          options={startTimeOptions}
          selected={startTime}
          handleChange={handleStartTimeChange}
        />
      )}
    </div>
  );
}
