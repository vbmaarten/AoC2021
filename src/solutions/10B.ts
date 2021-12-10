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
      "(": 1,
      "[": 2,
      "{": 3,
      "<": 4,
   }

   const closingChars = [')', ']', '}', '>'];
   const matchingOpening = {
      ")": "(",
      "]": "[",
      "}": "{",
      ">":"<",     
   }

   const scores = input.map<number>(line => {
      const opening: string[] = [];

      for(const char of line.split('')){
         if(closingChars.some(closingChar => closingChar === char)){
            if(opening.length === 0) return 0;

            if(opening.pop() !== matchingOpening[char]){
               return 0;
            }
         } else {
            opening.push(char);
         }
      }

      return opening.reverse().reduce((prev, char) => prev*5+points[char],0)
   }).filter(value => !!value).sort((a,b) => a-b);

   return scores[Math.floor(scores.length/2)];
}


export default () => solve(readInput(10));
export const testSolve10B = () => solve(readInput(10, true))