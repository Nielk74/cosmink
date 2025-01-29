import { JSX } from "react";
import { Position } from "./position";


export class Chart {
    key : string;
    static numberOfCharts : number = 0;
    positionTopLeft : Position;
    positionBottomRight : Position;
    component : React.ComponentType<{ dimensions: string[]; measures: string[] }>;
    constructor(positionTopLeft : Position, positionBottomRight : Position, component : React.ComponentType<{ dimensions: string[]; measures: string[] }>) {
      Chart.numberOfCharts++;
      this.key = `chart-${Chart.numberOfCharts}`;
      this.positionTopLeft = positionTopLeft;
      this.positionBottomRight = positionBottomRight;
      this.component = component;
    }
  }
  