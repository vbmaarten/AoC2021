import { compareOffset, countTrue, readNumbers } from '../utils';

const solve = (input: number[]): number => 
   countTrue(compareOffset(input, 1));


export default () => solve(readNumbers(1))
export const testSolve1A = () => solve(readNumbers(1, true))