import {CaveSystem, readCaveSystem} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const deepCopyCaveSystem = (system: CaveSystem): CaveSystem => {
   const copy: CaveSystem = {};

   Object.keys(system).forEach(key => {
      copy[key] = {canVisit: system[key].canVisit, links: [...system[key].links]}
   })

   return copy;
}

const isLowerKey = (input: string) => input.toLowerCase() === input;

const distinctPaths = (system: CaveSystem, start: string): number => {
   if(start === 'end'){
      return 1;
   }

   return system[start].links.reduce((prev, next) => {
      if(!system[next].canVisit) return prev;

      const copy = deepCopyCaveSystem(system);
      
      if(isLowerKey(start)){
         copy[start].canVisit = false;
      }

      return prev + distinctPaths(copy, next);
   }, 0);
}


const solve = (input: CaveSystem): number => {
   return distinctPaths(input, 'start');
}


export default () => solve(readCaveSystem(12));
export const testSolve12A = () => solve(readCaveSystem(12, true))