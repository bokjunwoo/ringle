import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Calendar from '../common/calendar/Calendar';
import dayjs from 'dayjs';

export default function CalendarSelector() {
  const ref = useRef<HTMLDivElement>(null);
  const selectedDate = useSelector((state: RootState) => state.date.date);

  const formattedDate = dayjs(selectedDate).format('M월 D일 (dddd)');

  const [isSelectedVisible, setIsSelectedVisible] = useState(false);

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
    <div ref={ref} className={`relative ${isSelectedVisible && 'h-80'}`}>
      <div
        className="mr-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2.5 hover:bg-gray-300"
        onClick={() => setIsSelectedVisible(!isSelectedVisible)}
      >
        {formattedDate}
      </div>

      {isSelectedVisible && (
        <div className="absolute z-10 mt-2 bg-white">
          <Calendar />
        </div>
      )}
    </div>
  );
}
