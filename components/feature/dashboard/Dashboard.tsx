import React from 'react';
import clsx from 'clsx';
import { useCellContext } from '../sheet/CellContext';
import ChartPicker from './tools/ChartsPicker';


class Position {
  y: number;
  x: number;
  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
  }
}
export class Chart {
  positionTopLeft : Position;
  positionBottomRight : Position;
  element : React.ReactNode;
  constructor(topLeftX : number, topLeftY : number, bottomRightX : number , bottomRightY : number, element: React.ReactNode) {
    this.positionTopLeft = new Position(topLeftY, topLeftX);
    this.positionBottomRight = new Position(bottomRightY, bottomRightX);
    this.element = element;
  }
}

export default function Dashboard({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const { cellsMap } = useCellContext();
  const [ chartsMap, setChartsMap ] = React.useState(new Map<string, Chart>());
  function addChart(topLeftX : number, topLeftY : number, bottomRightX : number , bottomRightY : number, element: React.ReactNode) {
    const newChart = new Chart(topLeftX, topLeftY, bottomRightX, bottomRightY, element);
    setChartsMap(new Map(chartsMap.set('chart'+Math.random() , newChart)));
    // print the map
    for (let [key, value] of chartsMap.entries()) {
      console.log(key, value);
    }
  }
  return (
    <div className={clsx('flex flex-col gap-4 p-4', className)}>
        <ChartPicker  addChart={addChart}/>
      {Array.from(chartsMap.values()).map((chart, index) => (
        <div key={index} className="absolute" style={{top: chart.positionTopLeft.y, left: chart.positionTopLeft.x, width: chart.positionBottomRight.x - chart.positionTopLeft.x, height: chart.positionBottomRight.y - chart.positionTopLeft.y}}>
          {chart.element}
        </div>
      ))}
    </div>
  );
}