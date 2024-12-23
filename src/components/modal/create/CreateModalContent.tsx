import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CalendarSelector from '../../calendar/CalendarSelector';
import EndTimeSelector from './EndTimeSelector';
import StartTimeSelector from './StartTimeSelector';
import ColorSelector from './ColorSelector';
import { ScheduleColorId } from '../../../interface/color';
import { parseHour } from '../../../utils/time';
import RecurringScheduleSelector from './RecurringScheduleSelector';

interface Props {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedColor: ScheduleColorId;
  onColorChange: (colorId: ScheduleColorId) => void;
  selectedType: RepeatType;
  onTypeChange: (type: RepeatType) => void;
}

export function CreateModalContent({
  title,
  onTitleChange,
  selectedColor,
  onColorChange,
  selectedType,
  onTypeChange,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const selectedDate = useSelector((state: RootState) => state.date.date);
  const startTime = useSelector((state: RootState) => state.date.startTime);
  const endTime = useSelector((state: RootState) => state.date.endTime);

  const startHour = parseHour(startTime);
  const endHour = parseHour(endTime);

  const formattedDate = dayjs(selectedDate).format('M월 D일 (dddd)');
  const nextDayFormatted = dayjs(selectedDate)
    .add(1, 'day')
    .format('M월 D일 (dddd)');

  return (
    <div className="px-2 py-4">
      <input
        type="text"
        className="mb-4 mt-1 block w-full border-b border-gray-300 bg-[#f8fafd] py-1 text-xl focus:border-b-2 focus:border-blue-600 focus:outline-none"
        value={title}
        onChange={onTitleChange}
        placeholder="제목 추가"
      />

      <div className="flex">
        <button className="rounded-md bg-blue-200 p-2 text-sm text-google_gray">
          이벤트
        </button>
      </div>

      {isEditMode ? (
        <div className="flex-col text-sm text-google_gray">
          <div className="flex-col">
            <div className="my-3 flex items-start rounded-md py-6 ">
              <CalendarSelector />
              <StartTimeSelector />

              <div className="mr-2 py-2">-</div>

              <EndTimeSelector />

              {endHour < startHour && (
                <div className="mr-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2.5 hover:bg-gray-300">
                  {nextDayFormatted}
                </div>
              )}
            </div>
          </div>

          <div className="inline-block">
            <RecurringScheduleSelector
              selectedType={selectedType}
              onChange={onTypeChange}
            />
          </div>
        </div>
      ) : (
        <div>
          <div
            onClick={() => setIsEditMode(true)}
            className="my-3 flex cursor-pointer flex-col rounded-md p-2 text-sm text-google_gray hover:bg-gray-200"
          >
            <div className="flex">
              <div className="mr-4 border-b border-transparent transition-all hover:border-gray-500">
                {formattedDate}
              </div>
              <div className="mx-2 border-b border-transparent transition-all hover:border-gray-500">
                {startTime}
              </div>
              <div>-</div>
              <div className="mx-2 border-b border-transparent transition-all hover:border-gray-500">
                {endTime}
              </div>
            </div>

            <div className="flex text-xs text-gray-500">시간대 ⋅ 반복 안함</div>
          </div>
        </div>
      )}

      <ColorSelector selectedColor={selectedColor} onChange={onColorChange} />
    </div>
  );
}
