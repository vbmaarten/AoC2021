import {readNumberArray} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/



const solve = (input: number[][]): number => {
   const higherSurroundingPoints = (rowIndex: number,columnIndex: number) => {
      if(input[rowIndex][columnIndex] === 9) return 0;
      const value = input[rowIndex][columnIndex];
      const row = input[rowIndex];

      input[rowIndex][columnIndex] = -1;

      const checkIndexes = [
         // Top
         rowIndex !== 0 ? input[rowIndex-1][columnIndex] > value ?higherSurroundingPoints(rowIndex-1, columnIndex) :0 
                        : 0,
         // Bottom
         rowIndex !== input.length-1 ? ( input[rowIndex+1][columnIndex] > value ?higherSurroundingPoints(rowIndex+1, columnIndex) :0) 
                                     : 0,
         // Left
         columnIndex !== 0 ? ( input[rowIndex][columnIndex-1] > value ?higherSurroundingPoints(rowIndex, columnIndex-1) :0) 
                           : 0,
         // Right
         columnIndex !== row.length-1 ? ( input[rowIndex][columnIndex+1] > value ?higherSurroundingPoints(rowIndex, columnIndex+1) :0) 
                                      : 0,
       ];

      return checkIndexes.reduce((prev, cur) => prev+cur, 1);
   }

   const lowPoints: [ number ,number][] = [];

   input.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
         const checkIndexes = [
            // Top
            rowIndex !== 0 ? input[rowIndex-1][columnIndex] > value : true,
            // Bottom
            rowIndex !== input.length-1 ? input[rowIndex+1][columnIndex] > value : true,
            // Left
            columnIndex !== 0 ? input[rowIndex][columnIndex-1] > value : true,
            // Right
            columnIndex !== row.length-1 ? input[rowIndex][columnIndex+1] > value : true,
         ];

         if(checkIndexes.every(value => value === true)){
            lowPoints.push([rowIndex, columnIndex])
         }
      })
   })

   const basinSizes = lowPoints.map(point => higherSurroundingPoints(...point))

   const sorted = basinSizes.sort((a,b)=>b-a)

   return sorted[0]*sorted[1]*sorted[2];
}


export default () => solve(readNumberArray(9));
export const testSolve9B = () => solve(readNumberArray(9, true))