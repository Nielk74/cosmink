import React from 'react';
import ColumnPicker from './ColumnPicker';

export default function DimensionPicker({
  className,
  setDimensions,
  dimensions,
}: Readonly<{
  className?: string;
  setDimensions: (value: string[]) => void;
  dimensions: string[];
}>) {
  return (
    <ColumnPicker
      className={className}
      setSelectedColumns={setDimensions}
      selectedColumns={dimensions}
      title="Select Dimensions"
    />
  );
}