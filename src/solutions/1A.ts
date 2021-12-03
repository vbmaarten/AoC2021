import { compareOffset, countTrue, readNumbers } from '../utils';

/*
Problem
============

Given a list of numbers, determine how many numbers are higher than their predecessor. 

Solution 
============

1. Map the input to an array where each number is mapped to true if it is bigger than its predecessor, and false otherwise
2. Count how many times this array includes true
*/

const solve = (input: number[]): number => 
   countTrue(compareOffset(input, 1));


export default () => solve(readNumbers(1));
export const testSolve1A = () => solve(readNumbers(1, true))