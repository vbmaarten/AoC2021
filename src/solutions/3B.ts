import { binaryToDecimal, readInput } from '../utils';

const countBinaryAtPosition = (input: string[], position: number) => {
   return input.reduce<[number, number]>((acc, cur) => {
      acc[parseInt(cur[position])] += 1;
      return acc;
   }, [0,0])
}

const filterBitCriteria = (input: string[], mostCommon: boolean = true): string => {
   let inputs = [...input];
   const stringLength = input[0].length;

   for(let i=0; i<stringLength; i++){
      if(inputs.length === 1) break;
      const [zeros, ones] = countBinaryAtPosition(inputs, i);

      const keep = (value: string) => zeros > ones ? value === '0' : value === '1'; 

      inputs = inputs.filter((value) => mostCommon ? keep(value[i]) : !keep(value[i]))
   }

   return inputs[0];
}

const solve = (input: string[]): number => {
   const toInt = (input: string) => binaryToDecimal(input.split('').map(value => parseInt(value, 10)));

   const oxygen = toInt(filterBitCriteria(input))
   const co2scrubber = toInt(filterBitCriteria(input,false))

   return oxygen * co2scrubber;
}

export default () => solve(readInput(3))
export const testSolve3B = () => solve(readInput(3, true))