import React from 'react';
import clsx from 'clsx';
import { useCellContext } from '../sheet/CellContext';
import ChartPicker from './tools/ChartsPicker';

export default function Dashboard({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const { cellsMap } = useCellContext();

  return (
    <div className={clsx('flex flex-col gap-4 p-4', className)}>
        <ChartPicker />
    </div>
  );
}