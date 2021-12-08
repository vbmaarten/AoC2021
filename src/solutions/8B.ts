import {readDigitDisplays} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const hasXOnes = (X: number) => (value: string) => value.split('').filter(char => char === '1').length === X;

const bitAnd = (value1: string, value2: string) => {
   const s1 = value1.split('');
   const s2 = value2.split('');

   return s1.map((v1, i1) => v1 === '1' && s2[i1] === '1' ? '1' : '0').join('');
}

const solve = (input: [string[], string[]][]): number => {
   return input.reduce((prev, instance) => {
      const digits = instance[0];
      const d235 = digits.filter(hasXOnes(5))
      const d069 = digits.filter(hasXOnes(6))

      const digitMapping = [ 
         undefined,
         digits.filter(hasXOnes(2))[0],
         undefined,
         undefined,
         digits.filter(hasXOnes(4))[0],
         undefined,
         undefined,
         digits.filter(hasXOnes(3))[0],
         digits.filter(hasXOnes(7))[0],
         undefined,
      ]; 

      digitMapping[3] = d235.splice(d235.findIndex((value) => hasXOnes(2)(bitAnd(digitMapping[1],value))),1)[0]
      digitMapping[2] = d235.splice(d235.findIndex((value) => hasXOnes(2)(bitAnd(digitMapping[4],value))),1)[0]
      digitMapping[5] = d235.splice(0,1)[0]

      digitMapping[6] = d069.splice(d069.findIndex((value) => hasXOnes(1)(bitAnd(digitMapping[1],value))),1)[0]
      digitMapping[9] = d069.splice(d069.findIndex((value) => hasXOnes(4)(bitAnd(digitMapping[4],value))),1)[0]
      digitMapping[0] = d069.splice(0,1)[0]

      const resultNumber = instance[1].map(value => digitMapping.findIndex(d => d === value)).join('');

      return prev+parseInt(resultNumber)
   }, 0)
}


export default () => solve(readDigitDisplays(8));
export const testSolve8B = () => solve(readDigitDisplays(8, true))