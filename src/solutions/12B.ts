import {CaveSystem, readCaveSystem} from '../utils';

/*
Problem
============

//TODO

Solution 
============
   
When forking and leaving the option open to visit twice,
we get that both forks might have overlapping paths. In order
to filter the overlapping paths, when we give a second twice option,
we only count the path if we actually visit twice.

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

const distinctPaths = (system: CaveSystem, start: string, canVisitTwice: boolean, reservedVisit?: string): number => {
   if(start === 'end'){
      // If we reserved a visit, but didn't use it, don't count it as a distinct path
      // This is to make sure that visits which don't use the visit twice option 
      // aren't counted in both the fork with the countTwice option, as well as the one
      // without the option
      if(!canVisitTwice && reservedVisit !== undefined){
         return 0;
      }
      return 1;
   }

   let additionalPaths = 0;

   return system[start].links.reduce((prev, next) => {
      if(!system[next].canVisit) return prev;

      const copy = deepCopyCaveSystem(system);

      if(isLowerKey(start)){
         if(canVisitTwice && start !== 'start'){
            additionalPaths = distinctPaths(copy, next, false, start);
         }

         copy[start].canVisit = false;
      }

      return prev + additionalPaths + distinctPaths(copy, next, canVisitTwice, start === reservedVisit ? undefined : reservedVisit);
   }, 0);
}


const solve = (input: CaveSystem): number => {
   return distinctPaths(input, 'start', true);
}


export default () => solve(readCaveSystem(12));
export const testSolve12B = () => solve(readCaveSystem(12, true))