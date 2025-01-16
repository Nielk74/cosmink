import React from 'react';
import clsx from 'clsx';
import ChartPicker from './tools/ChartsPicker';
import Highlight from './Highlight';
import { Position } from '@/lib/classes/position';
import { Chart } from '@/lib/classes/chart';
import ChartWrapper from './tools/ChartWrapper';

const chartWidth = 500;
const chartHeight = 300;
const gridStep = 100;

  function computeChartPosition(cursorPosition: Position, chartsMap : Map<string, Chart>): [Position, Position] {


    //const [left, top] = computeInitialPosition(cursorPosition, chartWidth, chartHeight, gridStep);
    const topLeftPosition = new Position(cursorPosition.x - chartWidth / 2, cursorPosition.y - chartHeight / 2); 
    //let [topLeft, bottomRight] = createPositions(top, left, chartWidth, chartHeight);
    const bottomRightPosition = new Position(topLeftPosition.x + chartWidth, topLeftPosition.y + chartHeight);
    const dashboardElement = document.querySelector("#dashboard") as HTMLElement;
    const chartIsInBounds = topLeftPosition.isInBoundsOfDOM(dashboardElement) && bottomRightPosition.isInBoundsOfDOM(dashboardElement);
    if (!chartIsInBounds) {
      return [new Position(0, 0), new Position(0, 0)];
    }
    return adjustPositionForOverlaps(topLeftPosition, bottomRightPosition, chartsMap);
  }

  function adjustPositionForOverlaps(topLeft: Position, bottomRight: Position, chartsMap: Map<string, Chart>): [Position, Position] {
    const dashboardElement = document.querySelector("#dashboard") as HTMLElement;

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
        const chartIsInBounds = topLeft.isInBoundsOfDOM(dashboardElement) && bottomRight.isInBoundsOfDOM(dashboardElement);

        if (!chartIsInBounds) {
        return [new Position(0, 0), new Position(0, 0)];
        }
      }
      }
    }
    return [topLeft, bottomRight];
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

  function addChart(cursorPosition : Position , newChart : Chart) { // TODO: l'idée est de faire abstraction des classes chart en d'appeler le wrapper directement ici AFIN de créer la suppression plus simplement par exemple
    if(!cursorPosition.isInBoundsOfDOM(document.querySelector("#dashboard")))
      return;
    // compute the position of the chart in the grid
    const [ positionTopLeft , positionBottomRight ] = computeChartPosition(cursorPosition , chartsMap);
    // TMP
    newChart.positionTopLeft = positionTopLeft;
    newChart.positionBottomRight = positionBottomRight;
    
    setChartsMap(new Map(chartsMap.set(newChart.key , newChart)));
  }

  function deleteChart(chartToDelete: Chart) {
    const newMap = new Map(chartsMap);
    newMap.delete(chartToDelete.key);
    setChartsMap(newMap);
  }

  function displayHighlight(atPosition : Position) {
    if (!atPosition.isInBoundsOfDOM(document.querySelector("#dashboard"))) {
      setHighlightVisible(false);
      return;
    }
    const [positionTopLeft, positionBottomRight ] = computeChartPosition(atPosition, chartsMap);
    setHighlightPositionTopLeft(positionTopLeft);
    setHighlightPositionBottomRight(positionBottomRight);
    // console.log(positionTopLeft, positionBottomRight);
    // console.log(highlightVisible);
  }

  return (
    <div id="dashboard" className={clsx('flex flex-col gap-4 p-4 w-full h-full', className)}>
        <ChartPicker  addChart={addChart}
                      displayHighlight={displayHighlight}
                      setHighlightVisible={setHighlightVisible}
                      className="!absolute z-50"/>
        
      {Array.from(chartsMap.values()).map((chart, index) => (
        <div key={index} className="absolute border" style={{top: chart.positionTopLeft.y, left: chart.positionTopLeft.x, width: chart.positionBottomRight.x - chart.positionTopLeft.x, height: chart.positionBottomRight.y - chart.positionTopLeft.y}}>
          <ChartWrapper chart={chart} deleteChart={deleteChart}/>
        </div>
      ))}
      {highlightVisible && <Highlight topLeft={highlightPositionTopLeft} bottomRight={highlightPositionBottomRight}/>}
    </div>
  );
}