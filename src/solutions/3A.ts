import { binaryToDecimal, readInput } from '../utils';


const solve = (input: string[]): number => {
   const offsets = input.reduce<number[]>((acc, cur)=>{
      cur.split('').forEach(( value,index )=>{
         const offset = value === "1" ? 1 : -1;
         acc[index] = (acc[index] ?? 0) + offset;
      })

      return acc;
   },[])

   const gammaBinary = offsets.map(offset => offset > 0 ? 1 : 0);
   const epsilonBinary = offsets.map(offset => offset > 0 ? 0 : 1);

   return binaryToDecimal(gammaBinary) * binaryToDecimal(epsilonBinary);
}

export default () => solve(readInput(3))
export const testSolve3A = () => solve(readInput(3, true))