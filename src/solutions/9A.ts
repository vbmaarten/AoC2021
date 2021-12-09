import {readNumberArray} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const alwaysTrue = () => true;

const solve = (input: number[][]): number => 
{
   let lowPoints = 0;
   
   input.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
         const checkIndexes = [
            // Top
            rowIndex !== 0 ? () => input[rowIndex-1][columnIndex] > value : alwaysTrue,
            // Bottom
            rowIndex !== input.length-1 ? () => input[rowIndex+1][columnIndex] > value : alwaysTrue,
            // Left
            columnIndex !== 0 ? () => input[rowIndex][columnIndex-1] > value : alwaysTrue,
            // Right
            columnIndex !== row.length-1 ? () => input[rowIndex][columnIndex+1] > value : alwaysTrue,
         ];

         if(checkIndexes.map(fn => fn()).every(value => value === true)){
            lowPoints += value + 1;
         }
      })
   })
   return lowPoints;
}


export default () => solve(readNumberArray(9));
export const testSolve9A = () => solve(readNumberArray(9, true))