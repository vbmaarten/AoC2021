// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const readInput = () => fs.readFileSync('./inputs/1', 'utf-8')
  .split('\n')
  .filter(line => !!line)
  .map(line => parseInt(line, 10))

const sum = (a: number, b:number):number => a+b;


const solve = (input: number[]): number => {
    const start: [number, number, number] = input.splice(0,3) as [number, number, number];
    const result = input.reduce<[[number,number,number], number[]] >((prev, cur) => {

      const [input, list] = prev;

      const next: [number, number, number] = [...input.slice(1,3), cur] as [number,number,number];

      return [next, [...list, next.reduce(sum, 0)]]

    }, [start, [start.reduce<number>(sum, 0)]]);

    return result[1].reduce((prev, cur) => 
        [cur, prev[1] + (cur > prev[0] ? 1:0)], [Number.MAX_VALUE,0]
    )[1];
;
}

export default () => solve(readInput())