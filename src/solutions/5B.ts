
import {Canvas, Lines, readLines } from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const solve = (input: Lines): number => {
   const canvas = new Canvas(input.maxX+1, input.maxY+1);
   
   input.lines.forEach(line => canvas.drawLine.bind(canvas)(line, false));
   
   return canvas.amountOfOverlappingPoints();
}

export default () => solve(readLines(5));
export const testSolve5B = () => solve(readLines(5, true))