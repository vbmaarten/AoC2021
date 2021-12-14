/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const STEPS = 10;

import { Polymer, readPolymer } from "../utils";

const applySubstitutions = (input: Polymer): Polymer => {
   let polymer = input.polymer;
   const insertions: [string, number][] = [];

   for(const substitution of input.substitutions){
      const indexes: number[] = [];
      
      let lastIndex = polymer.indexOf(substitution[0])

      while(lastIndex >= 0){
         indexes.push(lastIndex);
         lastIndex = polymer.indexOf(substitution[0], lastIndex + 1)
      }


      insertions.push(...indexes.map<[string, number]>(index => ([substitution[1], index])))
   }

   insertions.sort((a,b) => a[1] - b[1]).forEach(( insertion, index) => {
      polymer = polymer.slice(0, insertion[1]+index+1) + insertion[0] + polymer.slice(insertion[1]+1+index);
   })

   return {
      polymer,
      substitutions: input.substitutions,
   }
}

const solve = (input: Polymer): number => {
   let polymer = input;

   for(let i = 0; i<STEPS; i++){
      polymer = applySubstitutions(polymer);
   }

   const counts = {};

   polymer.polymer.split('').forEach(element => counts[element] = (counts[element] || 0) + 1);

   const sorted = Object.keys(counts).map(key => counts[key]).sort((a, b) => a-b);

   return sorted[sorted.length-1]-sorted[0];
}

export default () => solve(readPolymer(14));
export const testSolve14A = () => solve(readPolymer(14, true))