import { readHexPacket, readInput, versionSum } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/
const solve = (input: string): number => {
   const [ packet ] = readHexPacket(input);

   return versionSum(packet);
}
export default () => solve(readInput(16)[0]);
export const testSolve16A = () => solve(readInput(16, true)[0])