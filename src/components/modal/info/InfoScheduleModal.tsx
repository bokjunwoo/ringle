import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { MODAL_TYPES } from '../../../store/modalSlice';
import { InfoModalContent } from './InfoModalContent';
import { InfoModalHeader } from './InfoModalHeader';

export default function ScheduleModal() {
  const { isOpen, data } = useSelector(
    (state: RootState) => state.modal.activeModals[MODAL_TYPES.VIEW_SCHEDULE],
  );

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[460px] rounded-3xl bg-[#f8fafd] p-3 shadow-lg">
        <InfoModalHeader scheduleId={data.id} />
        <InfoModalContent schedule={data} />
      </div>
    </div>
  );
}
