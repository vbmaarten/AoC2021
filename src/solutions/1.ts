// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const readInput = () => fs.readFileSync('./inputs/1', 'utf-8')
  .split('\n')
  .filter(line => !!line)
  .map(line => parseInt(line, 10))


const solve = (input: number[]): number => {
    const result = input.reduce<[number, number]>((prev, cur) => 
        [cur, prev[1] + (cur > prev[0] ? 1:0)], [Number.MAX_VALUE,0]
    );

    return result[1];
}

export default () => solve(readInput())