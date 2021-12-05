
/*
Problem
============

//TODO

Solution 
============

//TODO
*/

import { Lines, Line, readLines } from "../utils";

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

class Canvas {
   private canvas: number[][];
   
   constructor(length: number, height: number){
      this.canvas = new Array(height).fill(undefined).map(_ => new Array(length).fill(0));
   }
   
   public drawLine(line: Line, skipDiagonal = true){
      
      // If line is vertical, draw vertical line
      if(line.a.x === line.b.x){
         for(let i = smallestXY(line).y; i <= biggestXY(line).y; i++){
            this.canvas[i][line.a.x] += 1;
         }
         
         return;
      }
      
      // If line is horizontal, draw horizontal line 
      if(line.a.y === line.b.y){
         for(let i = smallestXY(line).x; i <= biggestXY(line).x; i++){
            this.canvas[line.a.y][i] += 1;
         }
      }
   };
   
   public amountOfOverlappingPoints(): number {
     return this.canvas.flat().reduce((acc, cur) => {
        return cur > 1 ? acc + 1 : acc;
     }, 0) 
   }
   
   public prettyPrint(){
      this.canvas.forEach(row => {
         console.log(row.map(value => value === 0 ? '.' : value).join(''));
      })
   }
}

const solve = (input: Lines): number => {
   const canvas = new Canvas(input.maxX+1, input.maxY+1);
   
   input.lines.forEach(canvas.drawLine.bind(canvas));
   
   return canvas.amountOfOverlappingPoints();
}

export default () => solve(readLines(5));
export const testSolve5A = () => solve(readLines(5, true))