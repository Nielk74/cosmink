import React from 'react';
import clsx from 'clsx';
import Button from './Button';


export default function MenuItem ({
    children,
    className,
    onClick,
  }: Readonly<{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}>) {
  return (
    <Button
      className={clsx(
        'block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};