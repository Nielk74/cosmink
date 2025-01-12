import React from 'react';
import clsx from 'clsx';
import { useCellContext } from '../sheet/CellContext';
import ChartPicker from './tools/ChartsPicker';
import Highlight from './Highlight';


export class Position {
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
  constructor(positionTopLeft : Position, positionBottomRight : Position, element: React.ReactNode) {
    this.positionTopLeft = positionTopLeft;
    this.positionBottomRight = positionBottomRight;
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
  const [ highlightPositionTopLeft, setHighlightPositionTopLeft ] = React.useState(new Position(0,0));
  const [ highlightPositionBottomRight, setHighlightPositionBottomRight ] = React.useState(new Position(0,0));
  const [ highlightVisible, setHighlightVisible ] = React.useState(false);

  function addChart(cursorPosition : Position , element: React.ReactNode) {
    // compute the position of the chart in the grid
    const [ positionTopLeft , positionBottomRight ] = computeChartPosition(cursorPosition);
    const newChart = new Chart(positionTopLeft, positionBottomRight, element);
    setChartsMap(new Map(chartsMap.set('chart'+Math.random() , newChart)));
  }

  function displayHighlight(atPosition : Position) {
    const [positionTopLeft, positionBottomRight ] = computeChartPosition(atPosition);
    setHighlightPositionTopLeft(positionTopLeft);
    setHighlightPositionBottomRight(positionBottomRight);
    console.log(positionTopLeft, positionBottomRight);
    console.log(highlightVisible);
  }

  function computeChartPosition(cursorPosition : Position): [Position, Position] {
    // Example chart dimensions (you can replace these with dynamic or more accurate values)
    const chartWidth = 300;
    const chartHeight = 200;
    // Grid step (how coarse or fine you want the snap)
    const gridStep = 100;
    // Compute chart’s “natural” top-left position (centered around [centerX, centerY])
    let left = cursorPosition.x - chartWidth / 2;
    let top = cursorPosition.y - chartHeight / 2;
    // Snap to grid
    left = Math.round(left / gridStep) * gridStep;
    top = Math.round(top / gridStep) * gridStep;
    // Create Positions for top-left and bottom-right
    const topLeft = new Position(top, left);
    const bottomRight = new Position(top + chartHeight, left + chartWidth);
    // Return a tuple
    return [topLeft, bottomRight];
  }

  
  return (
    <div className={clsx('flex flex-col gap-4 p-4', className)}>
        <ChartPicker  addChart={addChart} displayHighlight={displayHighlight} setHighlightVisible={setHighlightVisible} className="!absolute"/>
        
      {Array.from(chartsMap.values()).map((chart, index) => (
        <div key={index} className="absolute border" style={{top: chart.positionTopLeft.y, left: chart.positionTopLeft.x, width: chart.positionBottomRight.x - chart.positionTopLeft.x, height: chart.positionBottomRight.y - chart.positionTopLeft.y}}>
          {chart.element}
        </div>
      ))}
      {highlightVisible && <Highlight topLeft={highlightPositionTopLeft} bottomRight={highlightPositionBottomRight}/>}
    </div>
  );
}