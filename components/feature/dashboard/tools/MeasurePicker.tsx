import React from 'react';
import ColumnPicker from './ColumnPicker';
import { Data } from './ChartWrapper';

export default function MeasurePicker({
  className,
  setData,
}: Readonly<{
  className?: string;
  setData: (value: Data) => void;
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