'use client';
import React, { createContext, useState, useContext } from 'react';

type CellContextType = {
  cellsMap: Map<string, Map<string, string>>;
  setCellsMap: React.Dispatch<React.SetStateAction<Map<string, Map<string, string>>>>;
  getPossibleValuesByColumnName(columnName: string): (string)[];
  getMeasureSumByDimensionValues(measureName : string, dimensionName: string, columnsValues: string[]): number[];
};

const CellContext = createContext<CellContextType | undefined>(undefined);

export const CellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cellsMap, setCellsMap] = useState(new Map<string, Map<string, string>>());
  React.useEffect(() => {
    const cities = [
      "Springfield", "Riverside", "Greenville", "Centerville", "Fairview",
      "Madison", "Franklin", "Salem", "Clinton", "Georgetown"
    ];
  
    const regions = ["North", "South", "East", "West", "Central"];
    const cellsMap = new Map<string, Map<string, string>>();
  
    // First row: Headers
    const headerRow = new Map<string, string>();
    headerRow.set("0", "City");
    headerRow.set("1", "Region");
    headerRow.set("2", "Population");
    cellsMap.set("0", headerRow);
  
    // Data rows
    for (let i = 0; i <= 10; i++) {
      const row = new Map<string, string>();
      const city = cities[i % cities.length];
      const region = regions[i % regions.length];
      const population = Math.floor(Math.random() * 100000) + 1000; // Random population
      row.set("0", city);
      row.set("1", region);
      row.set("2", population.toString());
      cellsMap.set(`${i+1}`, row);
    }
    setCellsMap(cellsMap);
  }, []);

  function getColumnIndex(columnName: string): string | undefined {
    let columnIndex = undefined;
    Array.from(cellsMap.values())[0].forEach((value, index) => { if (value === columnName) {columnIndex = index; }});
    return String(columnIndex);
  }

  function getPossibleValuesByColumnName(columnName: string): (string)[] {
    const columnIndex = getColumnIndex(columnName);
    if (columnIndex === undefined) return [];
    const values = Array.from(cellsMap.values()).slice(1).map(row => row.get(String(columnIndex)));
    return Array.from(new Set(values)).filter(value => value !== undefined) as string[];
  }

  function getMeasureSumByDimensionValues(measureName : string, dimensionName: string, columnsValues: string[]): number[] {
    const dimensionIndex = getColumnIndex(dimensionName);
    const measureIndex = getColumnIndex(measureName);
    if (dimensionIndex === undefined || measureIndex === undefined) return [];
    // create a map from the column values to the sum of the values in the row
    const columnSumMap = new Map<string, number>();
    Array.from(cellsMap.values())
        .slice(1)
        .forEach(row => {
          const dimensionValue = row.get(dimensionIndex);
          const measureValue = row.get(measureIndex);
          if (dimensionValue && measureValue && columnsValues.includes(dimensionValue)) {
            const sum = columnSumMap.get(dimensionValue) || 0;
            columnSumMap.set(dimensionValue, sum + parseInt(measureValue));
          }
        });
    return columnsValues.map(value => columnSumMap.get(value) || 0);
  }
  return (
    <CellContext.Provider value={{ cellsMap, setCellsMap, getPossibleValuesByColumnName, getMeasureSumByDimensionValues }}> 
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