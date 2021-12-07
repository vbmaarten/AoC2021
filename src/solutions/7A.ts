import {findMedian, readNumberLine} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/


const solve = (input: number[]): number => {
   const syncPoint = findMedian(input);
   console.log(syncPoint);

   return input.reduce((prev, cur) => prev + Math.abs(cur-syncPoint) , 0)
}

export default () => solve(readNumberLine(7));
export const testSolve7A = () => solve(readNumberLine(7, true))