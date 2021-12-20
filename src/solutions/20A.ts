import { countEnhancedLight, enhanceMultipleTimes, readInfiniteCanvas } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const solve = ([enhancementMap, image]: [string, string[]]): number => {
  const infiniteImage = enhanceMultipleTimes(image, enhancementMap, 2); 
  return countEnhancedLight(infiniteImage);
}

export default () => solve(readInfiniteCanvas(20));
export const testSolve20A = () => solve(readInfiniteCanvas(20, true))
