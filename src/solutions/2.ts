import { compareOffset, countTrue, readNumbers } from '../utils';

const solve = (input: number[]): number => 
   countTrue(compareOffset(input, 3));


export default () => solve(readNumbers(1))