import { useDispatch } from 'react-redux';
import Calendar from '../common/calendar/Calendar';
import { openCreateScheduleModal } from '../../store/modalSlice';
import { setSettingTime } from '../../store/calendarSlice';

export default function SideBar() {
  const dispatch = useDispatch();

  const handleOpenScheduleAddModal = () => {
    dispatch(openCreateScheduleModal());
    dispatch(setSettingTime());
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={handleOpenScheduleAddModal}
        className="mt-2 flex w-fit items-center justify-center rounded-2xl border bg-white p-4 shadow-md transition-shadow duration-300 hover:bg-[#EDF2FC]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="text-sm font-medium">만들기</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="ml-2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="mr-4 mt-4 block">
        <Calendar />
      </div>
    </div>
  );
}
