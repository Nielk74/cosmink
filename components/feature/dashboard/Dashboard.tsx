import React from 'react';
import clsx from 'clsx';

export default function Dashboard ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}