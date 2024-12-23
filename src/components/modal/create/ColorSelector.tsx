import { SCHEDULE_COLORS } from '../../../configs/color';
import { ScheduleColorId } from '../../../interface/color';

interface Props {
  selectedColor: string;
  onChange: (colorId: ScheduleColorId) => void;
}

export default function ColorSelector({ selectedColor, onChange }: Props) {
  return (
    <div className="ml-2 mt-4 flex flex-col">
      <div className="mb-4 text-sm text-google_gray">색상 선택</div>
      <div className="flex gap-3">
        {SCHEDULE_COLORS.map((color) => (
          <label
            key={color.id}
            className="group flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              name="color"
              value={color.value}
              checked={selectedColor === color.id}
              onChange={() => onChange(color.id)}
              className="hidden"
            />
            <div className="relative flex items-center">
              <div
                className={`size-8 rounded-full transition-all group-hover:border-gray-400
                  ${color.value}
                  ${
                    selectedColor === color.id
                      ? `ring ring-offset-2 ${color.ring}`
                      : 'border-2 border-transparent'
                  }`}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
