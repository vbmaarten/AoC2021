import { homeworkUtils, Pair, readPairs } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/
const solve = (input: Pair[]): number => {
   const homework = [...input];
   const first = homework.shift();

   const addition = homework.reduce<Pair>((prev, cur) => homeworkUtils.add(prev, cur), first)
   return homeworkUtils.magnitude(addition);
}

export default () => solve(readPairs(18));
export const testSolve18A = () => solve(readPairs(18, true))