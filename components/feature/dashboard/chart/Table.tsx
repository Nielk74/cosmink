import React from 'react';
import clsx from 'clsx';
import { useCellContext } from'../../sheet/CellContext';

export default function Table({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const { cellsMap } = useCellContext();

  return (
    <div className={clsx('flex flex-col gap-4 p-4', className)}>
      {Array.from(cellsMap.values()).map((row, index) => (
        <div key={index} className="flex gap-4">
          {Array.from(row.values()).map((cell, index) => (
            <div key={index} className="w-16 h-8 border border-gray-300">
              {cell}
            </div>
          ))}
        </div>
      ))}
      {children}
    </div>
  );
}