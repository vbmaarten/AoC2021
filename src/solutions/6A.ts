import {readNumberLine} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const SIMULATION_DAYS = 80;

const solve = (input: number[]): number => {
   let fishNumber = new Array(9).fill(0)
   input.forEach(fish => fishNumber[fish] += 1)

   for(let i = 0; i < SIMULATION_DAYS; i++){
      const curIndex = i % 9;
      fishNumber[( curIndex + 7)%9] += fishNumber[curIndex]
   }   

   return fishNumber.reduce((prev, cur) => prev + cur, 0) ;
}

export default () => solve(readNumberLine(6));
export const testSolve6A = () => solve(readNumberLine(6, true))