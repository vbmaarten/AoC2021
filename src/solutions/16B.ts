import { evaluatePacket, readHexPacket, readInput } from "../utils";
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

   return evaluatePacket(packet);
}

export default () => solve(readInput(16)[0]);
export const testSolve16B = () => solve(readInput(16, true)[0])