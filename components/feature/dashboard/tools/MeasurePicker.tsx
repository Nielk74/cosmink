import React from 'react';
import ColumnPicker from './ColumnPicker';

export default function MeasurePicker({
  className,
  setData,
}: Readonly<{
  className?: string;
  setData: (value: any) => void;
}>) {
  return (
    <ColumnPicker
      className={className}
      setData={setData}
      title="Select Measures"
      color="secondary"
    />
  );
}