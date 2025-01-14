import React from 'react';
import ColumnPicker from './ColumnPicker';

export default function MeasurePicker({
  className,
  setMeasures,
  measures,
}: Readonly<{
  className?: string;
  setMeasures: (value: string[]) => void;
  measures: string[];
}>) {
  return (
    <ColumnPicker
      className={className}
      setSelectedColumns={setMeasures}
      selectedColumns={measures}
      title="Select Measures"
      color="secondary"
    />
  );
}