import { compareOffset, countTrue, readNumbers } from '../utils';

/*
Problem
============

Given a list of numbers, consider a sliding window of size 3 going up the list. 
Compare the sum of each window, with the sum of its predecessor, and 

Solution 
============

Each succesive window shares 2 numbers. Therefore these do not have to be regarded when comparing their sums. 
Therefore for 2 successive windows, only the first number of the first window needs to be compared with the last
number of the second window. This is equal to walking through the list, comparing each number to the number at 
i - 3, starting at the 4th number.
*/

const solve = (input: number[]): number => 
   countTrue(compareOffset(input, 3));


export default () => solve(readNumbers(1))
export const testSolve1B = () => solve(readNumbers(1, true))