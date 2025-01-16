import { Chart } from "../chart";
import { Position } from "../position";


export class Pie extends Chart {
    static type : string = 'Pie Chart';
    constructor(positionTopLeft: Position, positionBottomRight: Position) {
        super(positionTopLeft, positionBottomRight);
    }
}