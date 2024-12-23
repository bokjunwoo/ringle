interface Props {
  onClose: () => void;
}

export function CreateModalHeader({ onClose }: Props) {
  return (
    <div className="flex items-center justify-end">
      <button
        onClick={onClose}
        className="rounded-full p-1 text-gray-400 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
