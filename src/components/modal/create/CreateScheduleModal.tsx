import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { RootState } from '../../../store';
import { MODAL_TYPES, closeModal } from '../../../store/modalSlice';
import { CreateModalContent } from './CreateModalContent';
import { CreateModalFooter } from './CreateModalFooter';
import { CreateModalHeader } from './CreateModalHeader';
import { ScheduleColorId } from '../../../interface/color';

export default function CreateScheduleModal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(
    (state: RootState) => state.modal.activeModals[MODAL_TYPES.CREATE_SCHEDULE],
  );
  const { value: title, handleInputChange, setValue } = useInput('');

  const [selectedColor, setSelectedColor] = useState<ScheduleColorId>('blue');
  const [selectedType, setSelectedType] = useState<RepeatType>('none');

  const handleColorChange = (colorId: ScheduleColorId) => {
    setSelectedColor(colorId);
  };

  const handleTypehange = (type: RepeatType) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (!isOpen) {
      setValue('');
      setSelectedColor('blue');
    }
  }, [isOpen, setValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative min-w-[440px] rounded-lg bg-[#f8fafd] p-3 shadow-lg">
        <CreateModalHeader
          onClose={() => dispatch(closeModal(MODAL_TYPES.CREATE_SCHEDULE))}
        />
        <CreateModalContent
          title={title}
          onTitleChange={handleInputChange}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
          selectedType={selectedType}
          onTypeChange={handleTypehange}
        />
        <CreateModalFooter
          title={title}
          selectedColor={selectedColor}
          selectedType={selectedType}
        />
      </div>
    </div>
  );
}
