import React from 'react';
import clsx from 'clsx';
import ChartPicker from './tools/ChartsPicker';
import Highlight from './Highlight';


export class Position {
  y: number;
  x: number;
  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
  }

  /**
   * isInBounds
   */
  public isInBoundsOfDOM(element : HTMLElement | null) : boolean {
    if(element === null)
      return false;
    const rect = element.getBoundingClientRect();
    return this.y >= rect.top && this.y <= rect.bottom && this.x >= rect.left && this.x <= rect.right
  }
  /**
   bottomRight.x <= chart.positionTopLeft.x || 
          topLeft.x >= chart.positionBottomRight.x || 
          bottomRight.y <= chart.positionTopLeft.y || 
          topLeft.y >= chart.positionBottomRight.y

    */

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
  className,
}: Readonly<{
  className?: string;
}>) {
  const [ chartsMap, setChartsMap ] = React.useState(new Map<string, Chart>());
  const [ highlightPositionTopLeft, setHighlightPositionTopLeft ] = React.useState(new Position(0,0));
  const [ highlightPositionBottomRight, setHighlightPositionBottomRight ] = React.useState(new Position(0,0));
  const [ highlightVisible, setHighlightVisible ] = React.useState(false);

  function addChart(cursorPosition : Position , element: React.ReactNode) {
    if(!cursorPosition.isInBoundsOfDOM(document.querySelector("#dashboard")))
      return;
    // compute the position of the chart in the grid
    const [ positionTopLeft , positionBottomRight ] = computeChartPosition(cursorPosition);
    const newChart = new Chart(positionTopLeft, positionBottomRight, element);
    setChartsMap(new Map(chartsMap.set('chart'+Math.random() , newChart)));
  }

  function displayHighlight(atPosition : Position) {
    if (!atPosition.isInBoundsOfDOM(document.querySelector("#dashboard"))) {
      setHighlightVisible(false);
      return;
    }
    const [positionTopLeft, positionBottomRight ] = computeChartPosition(atPosition);
    setHighlightPositionTopLeft(positionTopLeft);
    setHighlightPositionBottomRight(positionBottomRight);
    // console.log(positionTopLeft, positionBottomRight);
    // console.log(highlightVisible);
  }

  function computeChartPosition(cursorPosition: Position): [Position, Position] {
    const chartWidth = 300;
    const chartHeight = 200;
    const gridStep = 100;

    const [left, top] = computeInitialPosition(cursorPosition, chartWidth, chartHeight, gridStep);
    let [topLeft, bottomRight] = createPositions(top, left, chartWidth, chartHeight);

    const dashboardElement = document.querySelector("#dashboard") as HTMLElement;

    if (!arePositionsInBounds(topLeft, bottomRight, dashboardElement)) {
      return [new Position(0, 0), new Position(0, 0)];
    }

    [topLeft, bottomRight] = adjustPositionForOverlaps(topLeft, bottomRight, chartWidth, chartHeight, gridStep, dashboardElement);

    return [topLeft, bottomRight];
  }

  function computeInitialPosition(cursorPosition: Position, chartWidth: number, chartHeight: number, gridStep: number): [number, number] {
    let left = cursorPosition.x - chartWidth / 2;
    let top = cursorPosition.y - chartHeight / 2;

    left = Math.round(left / gridStep) * gridStep;
    top = Math.round(top / gridStep) * gridStep;

    return [left, top];
  }

  function createPositions(top: number, left: number, chartWidth: number, chartHeight: number): [Position, Position] {
    const topLeft = new Position(top, left);
    const bottomRight = new Position(top + chartHeight, left + chartWidth);
    return [topLeft, bottomRight];
  }

  function arePositionsInBounds(topLeft: Position, bottomRight: Position, dashboardElement: HTMLElement): boolean {
    return topLeft.isInBoundsOfDOM(dashboardElement) && bottomRight.isInBoundsOfDOM(dashboardElement);
  }

  function adjustPositionForOverlaps(topLeft: Position, bottomRight: Position, chartWidth: number, chartHeight: number, gridStep: number, dashboardElement: HTMLElement): [Position, Position] {
    for (const chart of chartsMap.values()) {
      let isOverlapping = true;

      while (isOverlapping) {
      const isLeftOfChart = bottomRight.x <= chart.positionTopLeft.x;
      const isRightOfChart = topLeft.x >= chart.positionBottomRight.x;
      const isAboveChart = bottomRight.y <= chart.positionTopLeft.y;
      const isBelowChart = topLeft.y >= chart.positionBottomRight.y;

      isOverlapping = !(isLeftOfChart || isRightOfChart || isAboveChart || isBelowChart);

      if (isOverlapping) {
        topLeft.x += gridStep;
        bottomRight.x += gridStep;

        if (!arePositionsInBounds(topLeft, bottomRight, dashboardElement)) {
        return [new Position(0, 0), new Position(0, 0)];
        }
      }
      }
    }
    return [topLeft, bottomRight];
  }
  
  return (
    <div id="dashboard" className={clsx('flex flex-col gap-4 p-4 w-full h-full', className)}>
        <ChartPicker  addChart={addChart} displayHighlight={displayHighlight} setHighlightVisible={setHighlightVisible} className="!absolute z-50"/>
        
      {Array.from(chartsMap.values()).map((chart, index) => (
        <div key={index} className="absolute border" style={{top: chart.positionTopLeft.y, left: chart.positionTopLeft.x, width: chart.positionBottomRight.x - chart.positionTopLeft.x, height: chart.positionBottomRight.y - chart.positionTopLeft.y}}>
          {chart.element}
        </div>
      ))}
      {highlightVisible && <Highlight topLeft={highlightPositionTopLeft} bottomRight={highlightPositionBottomRight}/>}
    </div>
  );
}