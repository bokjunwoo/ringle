import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ViewModeSelect from '../ViewModeSelect';
import {
  setDateNextMonth,
  setDateNextWeek,
  setDatePreviousMonth,
  setDatePreviousWeek,
  setDateToToday,
} from '../../../store/calendarSlice';
import { getFormattedDateRange } from '../../../utils/date';

export default function RightSection() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.date.date);
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  const formattedDateRange = getFormattedDateRange(selectedDate);

  const handleTodayClick = () => {
    dispatch(setDateToToday());
  };

  const handlePrevious = () =>
    dispatch(
      viewMode === '주' ? setDatePreviousWeek() : setDatePreviousMonth(),
    );

  const handleNext = () =>
    dispatch(viewMode === '주' ? setDateNextWeek() : setDateNextMonth());

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={handleTodayClick}
          className="block h-10 rounded-3xl border border-solid border-google_gray px-6 py-2.5 text-sm text-google_gray hover:bg-gray-200"
        >
          오늘
        </button>

        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center">
            <svg
              onClick={handlePrevious}
              focusable="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="cursor-pointer rounded-full fill-current text-google_gray hover:bg-gray-200"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
            </svg>
          </div>

          <div className="flex size-8 items-center justify-center">
            <svg
              onClick={handleNext}
              focusable="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="cursor-pointer rounded-full fill-current text-google_gray hover:bg-gray-200"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
            </svg>
          </div>

          <h2 className="p-2 text-[22px] text-google_gray">
            {formattedDateRange}
          </h2>
        </div>
      </div>

      <div className="md:mr-4">
        <ViewModeSelect />
      </div>
    </div>
  );
}
