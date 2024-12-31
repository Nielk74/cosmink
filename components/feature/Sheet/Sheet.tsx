import React from 'react';
import clsx from 'clsx';
import Cell from './Cell';


export default function Sheet ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const [cellsMap, setCellsMap] = React.useState(new Map<string, Map<string, string>>());
  
  React.useEffect(() => {
    const cellsMap = new Map<string, Map<string, string>>();
    for (let i = 0; i < 10; i++) {
      const row = new Map<string, string>();
      for (let j = 0; j < 10; j++) {
        row.set(`${i}-${j}`, `${i}-${j}`);	
      }
      cellsMap.set(`${i}`, row);
    }
    setCellsMap(cellsMap);
  }, []);


  return (
    <div
      className={clsx(
        'grid grid-cols-10 gap-4',
        className,
      )}
    >
      {Array.from(cellsMap).map(([rowKey, row]) => (
        Array.from(row).map(([cellKey, cellValue]) => (
          <Cell key={cellKey}>{cellValue}</Cell>
        ))
      ))}
      {children}
    </div>
  );
}