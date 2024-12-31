import React from 'react';
import clsx from 'clsx';
import Cell from './Cell';
import { useCellContext } from './CellContext';


export default function Sheet ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const { cellsMap, setCellsMap } = useCellContext();
  const [selectedCell, setSelectedCell] = React.useState<string | null>(null);
  const [cellValue, setCellValue] = React.useState<string>('');



  const handleCellClick = (cellKey: string, value: string) => {
    setSelectedCell(cellKey);
    setCellValue(cellValue);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue(e.target.value);
    if (selectedCell) {
      const [rowKey, colKey] = selectedCell.split('-');
      const row = cellsMap.get(rowKey);
      if (row) {
        row.set(colKey, e.target.value);
        setCellsMap(new Map(cellsMap));
      }
    }
  };


  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    const rows = clipboardData.split('\n');
    
    if (selectedCell) {
      const [startRow, startCol] = selectedCell.split('-').map(Number);
      
      const newCellsMap = new Map(cellsMap);
      
      rows.forEach((row, rowIndex) => {
        const cells = row.split('\t');
        cells.forEach((cell, colIndex) => {
          const targetRow = `${startRow + rowIndex}`;
          const targetCol = `${startCol + colIndex}`;
          
          const rowMap = newCellsMap.get(targetRow) || new Map();
          rowMap.set(targetCol, cell.trim());
          newCellsMap.set(targetRow, rowMap);
        });
      });
      
      setCellsMap(newCellsMap);
    }
  };

  return (
    <div
      className={clsx(
        'grid grid-cols-10 gap-4',
        className,
      )}
    >
      {Array.from(cellsMap).map(([rowKey, row]) => (
        Array.from(row).map(([colKey, cellValue]) => {
          const cellId = `${rowKey}-${colKey}`;
          console.log(cellId);
          return (

                    <Cell
            key={cellId}
            isSelected={selectedCell === cellId}
            onClick={() => handleCellClick(cellId, cellValue)}
          >
            {selectedCell === cellId ? (
              <input
                type="text"
                autoFocus
                value={cellValue}
                onChange={handleInputChange}
                onPaste={handlePaste}
                className="w-full bg-transparent outline-none"
              />
            ) : (
              cellValue
            )}
          </Cell>
        )
})
      ))}
      {children}
    </div>
  );
}