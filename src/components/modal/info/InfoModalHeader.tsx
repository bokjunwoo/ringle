import { useDispatch } from 'react-redux';
import { closeModal, MODAL_TYPES } from '../../../store/modalSlice';
import { deleteSchedule } from '../../../store/scheduleSlice';

interface Props {
  scheduleId: string;
}

export function InfoModalHeader({ scheduleId }: Props) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSchedule(scheduleId));
    dispatch(closeModal(MODAL_TYPES.VIEW_SCHEDULE));
  };

  const handleClose = () => {
    dispatch(closeModal(MODAL_TYPES.VIEW_SCHEDULE));
  };

  return (
    <div className="gap flex items-center justify-end gap-2">
      <button
        onClick={handleDelete}
        className="rounded-full p-2 text-gray-400 hover:bg-gray-200"
      >
        <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
          <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
          <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
        </svg>
      </button>

      <button
        onClick={handleClose}
        className="rounded-full p-2 text-gray-400 hover:bg-gray-200"
      >
        <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
        </svg>
      </button>
    </div>
  );
}
