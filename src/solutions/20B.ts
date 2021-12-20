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
  const infiniteImage = enhanceMultipleTimes(image, enhancementMap, 50); 
  return countEnhancedLight(infiniteImage);
}

export default () => solve(readInfiniteCanvas(20));
export const testSolve20B = () => solve(readInfiniteCanvas(20, true))