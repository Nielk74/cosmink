export class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
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