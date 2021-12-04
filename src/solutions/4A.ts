import BingoGame from '../utils/bingo/Game';
import readBingo from '../utils/readBingo';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const solve = (input: BingoGame): number => 
   input.decideWinner()


export default () => solve(readBingo(4));
export const testSolve4A = () => solve(readBingo(4, true))