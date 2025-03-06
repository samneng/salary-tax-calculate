import { useState } from 'react';

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        className="text-gray-400 dark:text-gray-300 hover:text-gray-500 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <span className="h-4 w-4 text-xs inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-500">?</span>
      </button>
      {isVisible && (
        <div className="absolute z-10 w-48 px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg -right-24 top-full">
          <div className="relative">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}