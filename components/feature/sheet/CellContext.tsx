'use client';
import React, { createContext, useState, useContext } from 'react';

type CellContextType = {
  cellsMap: Map<string, Map<string, string>>;
  setCellsMap: React.Dispatch<React.SetStateAction<Map<string, Map<string, string>>>>;
};

const CellContext = createContext<CellContextType | undefined>(undefined);

export const CellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cellsMap, setCellsMap] = useState(new Map<string, Map<string, string>>());
      React.useEffect(() => {
        const cellsMap = new Map<string, Map<string, string>>();
        for (let i = 0; i < 10; i++) {
          const row = new Map<string, string>();
          for (let j = 0; j < 10; j++) {
            row.set(`${j}`, `${i}-${j}`);	
          }
          cellsMap.set(`${i}`, row);
        }
        setCellsMap(cellsMap);
      }, []);
  return (
    <CellContext.Provider value={{ cellsMap, setCellsMap }}>
      {children}
    </CellContext.Provider>
  );
};

export const useCellContext = () => {
  const context = useContext(CellContext);
  if (!context) {
    throw new Error('useCellContext must be used within a CellProvider');
  }
  return context;
};