import {mergeMean, readNumberLine} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const sum = (num: number)=> {
  if ( num <= 1 ) return num; 

  return num + sum(num-1)
}

const solve = (input: number[]): number => {
   const mean = mergeMean(input);

   const syncPoint = Math.round(mean);

   return input.reduce((prev, cur) => prev + sum(Math.abs(syncPoint-cur)), 0)
}

export default () => solve(readNumberLine(7));
export const testSolve7B = () => solve(readNumberLine(7, true))