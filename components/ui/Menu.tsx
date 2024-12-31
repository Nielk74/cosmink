import React from 'react';
import clsx from 'clsx';

export default function Menu ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <nav
      className={clsx(
        'flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg',
        className,
      )}
    >
      {children}
    </nav>
  );
}