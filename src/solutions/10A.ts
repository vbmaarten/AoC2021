import {readInput} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const solve = (input: string[]): number => {
   const points = {
      ")": 3,
      "]": 57,
      "}": 1197,
      ">": 25137,
   }

   const closingChars = [')', ']', '}', '>'];
   const matchingOpening = {
      ")": "(",
      "]": "[",
      "}": "{",
      ">":"<",     
   }

   return input.map<number>(line => {
      const opening: string[] = [];

      for(const char of line.split('')){
         if(closingChars.some(closingChar => closingChar === char)){
            if(opening.length === 0) return 0;

            if(opening.pop() !== matchingOpening[char]){
               return points[char]
            }
         } else {
            opening.push(char);
         }
      }

      return 0
   }).reduce((prev, cur) => prev+cur, 0)
}


export default () => solve(readInput(10));
export const testSolve10A = () => solve(readInput(10, true))