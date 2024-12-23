import { useEffect, useRef } from 'react';

type Props<T extends string> = {
  options: T[];
  selected: T;
  handleChange: (selected: T) => void;
  size?: 'sm' | 'md';
};

export default function AutoScrollSelect<T extends string>({
  options,
  selected,
  handleChange,
  size = 'md',
}: Props<T>) {
  const ref = useRef<HTMLUListElement>(null);
  const width = size === 'sm' ? 'w-20' : 'w-32';

  useEffect(() => {
    if (ref.current) {
      const selectedIndex = options.indexOf(selected);
      if (selectedIndex !== -1) {
        const itemHeight = ref.current.children[0]?.clientHeight || 0;
        const scrollPosition = selectedIndex * itemHeight;
        const listHeight = ref.current.clientHeight;

        ref.current.scrollTop =
          scrollPosition - listHeight / 2 + itemHeight / 2;
      }
    }
  }, [selected, options]);

  return (
    <ul
      ref={ref}
      className={`absolute z-50 mt-2 max-h-48 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg ${width}`}
    >
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => handleChange(option)}
          className={`cursor-pointer px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 ${
            option === selected ? 'bg-gray-200 font-bold' : ''
          }`}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
