import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import clsx from 'clsx';
import { useCellContext } from '../../sheet/CellContext';

type ColumnPickerProps = {
  className?: string;
  setSelectedColumns: (value: string[]) => void;
  selectedColumns: string[];
  title: string;
  color?: 'primary' | 'secondary';
};

export default function ColumnPicker({
  className,
  setSelectedColumns,
  selectedColumns,
  title,
  color = 'primary',
}: Readonly<ColumnPickerProps>) {
  const { cellsMap } = useCellContext();
  const columnsName = Array.from(cellsMap.values())[0];

  function selectColumn(columnName: string) {
    let newSelectedColumns;
    if (selectedColumns.includes(columnName)) {
      newSelectedColumns = selectedColumns.filter(col => col !== columnName);
    } else {
      newSelectedColumns = [...selectedColumns, columnName];
    }
    setSelectedColumns(newSelectedColumns);
    const data = Array.from(new Set(newSelectedColumns));
    setSelectedColumns(data);
  }

  return (
    <div className={clsx('flex flex-col items-center justify-center h-full p-4 rounded-lg', className)}>
      <h1>{title}</h1>
      <ToggleButtonGroup
        color={color}
        value={selectedColumns}
        orientation="vertical"
        className="overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {columnsName && Array.from(columnsName.values()).map((cell, index) => (
          <ToggleButton key={index} value={cell} onClick={() => selectColumn(cell)}>{cell}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}