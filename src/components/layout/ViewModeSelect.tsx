import { useState, useEffect, useRef } from 'react';
import AutoScrollSelect from '../common/select/AutoScrollSelect';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setViewMode } from '../../store/viewModeSlice';

export default function ViewModeSelect() {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.viewMode.mode);

  const [open, setOpen] = useState(false);

  const options: ViewMode[] = ['주', '월'];

  const handleSelectChange = (selected: '주' | '월') => {
    dispatch(setViewMode(selected));
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTimeout(() => {
          setOpen(false);
        }, 0);
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <button
        className="flex h-10 w-[76px] items-center justify-center rounded-3xl border border-black bg-white px-4 py-2 text-sm leading-none hover:bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        {selected}

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
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {open && (
        <AutoScrollSelect
          options={options}
          selected={selected}
          handleChange={handleSelectChange}
          size="sm"
        />
      )}
    </div>
  );
}
