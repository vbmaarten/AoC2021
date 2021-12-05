import { Line } from "."

const smallestXY = (line: Line): {x: number, y: number} => {
   return {
      x: Math.min(line.a.x, line.b.x),
      y: Math.min(line.a.y, line.b.y)
   }
}

const biggestXY = (line: Line): {x: number, y: number} => {
   return {
      x: Math.max(line.a.x, line.b.x),
      y: Math.max(line.a.y, line.b.y)
   }
}

const lineLength = (line: Line): number => {
   const {x: startX, y: startY} = smallestXY(line);
   const {x: endX, y: endY} = biggestXY(line);
   
   return Math.max(
      endX - startX + 1,
      endY - startY + 1,
   )
}

const stepIncrease = (line: Line): {x: number, y: number} => ({
   x: line.a.x === line.b.x ? 0 : line.a.x < line.b.x ? 1 : -1, 
   y: line.a.y === line.b.y ? 0 : line.a.y < line.b.y ? 1 : -1, 
})

class Canvas {
   private canvas: number[][];
   
   constructor(length: number, height: number){
      this.canvas = new Array(height).fill(undefined).map(_ => new Array(length).fill(0));
   }
   
   public drawLine(line: Line, skipDiagonal = true){
      const {x: startX, y: startY} = line.a;
      const length = lineLength(line);
      const {x: xStep, y: yStep} = stepIncrease(line);
      
      if(xStep !== 0 && yStep !== 0 && skipDiagonal) return;
      
      for(let i = 0; i < length; i++){
         this.canvas[startY + i*yStep][startX + i*xStep] += 1;
      }
   };
   
   public amountOfOverlappingPoints(): number {
     return this.canvas.flat().reduce((acc, cur) => {
        return cur > 1 ? acc + 1 : acc;
     }, 0) 
   }
   
   public prettyPrint(canvas = this.canvas){
      canvas.forEach(row => {
         console.log(row.map(value => value === 0 ? '.' : value).join(''));
      })
   }
}

export default Canvas;