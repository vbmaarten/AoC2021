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
   const pairs: [Pair, Pair][] = [];
   input.forEach((a, ai) => input.forEach((b, bi) =>{
      if(ai !== bi){
         pairs.push([a,b])
      }
   }))
   
   return Math.max(...pairs.map(pair => homeworkUtils.magnitude(homeworkUtils.add(...pair))));
}

export default () => solve(readPairs(18));
export const testSolve18B = () => solve(readPairs(18, true))