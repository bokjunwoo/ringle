import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AutoScrollSelect from '../../common/select/AutoScrollSelect';
import { getRepeatLabel } from '../../../utils/schedule';

interface Props {
  selectedType: RepeatType;
  onChange: (type: RepeatType) => void;
}

export default function RecurringScheduleSelector({
  selectedType,
  onChange,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const startDate = useSelector((state: RootState) => state.date.startDate);

  const [isSelectedVisible, setIsSelectedVisible] = useState(false);

  const repeatOptions = ['none', 'daily', 'weekly', 'yearly'].map((type) =>
    getRepeatLabel(type as RepeatType, startDate),
  );

  const handleChange = (label: string) => {
    const type = ['none', 'daily', 'weekly', 'yearly'].find(
      (t) => getRepeatLabel(t as RepeatType, startDate) === label,
    ) as RepeatType;

    onChange(type);
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
      <div className="mb-4 ml-2 text-sm text-google_gray">일정 반복</div>
      <div
        className="mr-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2.5 hover:bg-gray-300"
        onClick={() => setIsSelectedVisible(!isSelectedVisible)}
      >
        {getRepeatLabel(selectedType, startDate)}
      </div>

      {isSelectedVisible && (
        <AutoScrollSelect
          options={repeatOptions}
          selected={getRepeatLabel(selectedType, startDate)}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
