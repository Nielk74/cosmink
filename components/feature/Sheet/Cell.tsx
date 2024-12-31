import React from 'react';
import clsx from 'clsx';


export default function Cell ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        'px-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}