import { Position } from "./position";


export class Chart {
    key : string;
    static numberOfCharts : number = 0;
    positionTopLeft : Position;
    positionBottomRight : Position;
    static type : string = 'Chart';
    constructor(positionTopLeft : Position, positionBottomRight : Position) {
      Chart.numberOfCharts++;
      this.key = `chart-${Chart.numberOfCharts}`;
      this.positionTopLeft = positionTopLeft;
      this.positionBottomRight = positionBottomRight;
    }
    getType(){
      return (this.constructor as typeof Chart).type;
    }
  }
  