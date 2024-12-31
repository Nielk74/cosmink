import React from 'react';
import clsx from 'clsx';


export default function Cell ({
  children,
  className,
  isSelected,
    onClick,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;

}>) {
  return (
    <div
    className={clsx(
        'px-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-text overflow-hidden',
        isSelected && 'outline outline-2 outline-blue-500',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}