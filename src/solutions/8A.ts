import {readDigitDisplays} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const is1478 = (value: string) => 
   value.split('').filter(value => value==='1').length === 2 ||
   value.split('').filter(value => value==='1').length === 3 ||
   value.split('').filter(value => value==='1').length === 4 ||
   value.split('').filter(value => value==='1').length === 7 


const solve = (input: [string[], string[]][]): number => 
    input.reduce((prev,cur)=>
      prev + cur[1].filter(is1478).length
   , 0)


export default () => solve(readDigitDisplays(8));
export const testSolve8A = () => solve(readDigitDisplays(8, true))