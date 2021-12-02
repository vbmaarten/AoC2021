import solve1A from './solutions/1A';
import solve1B from './solutions/1B';
import solve2A, { testSolve2A } from './solutions/2A';
import solve2B, { testSolve2B } from './solutions/2B';

const solutions = [solve1A(), solve1B(), solve2A(), solve2B()];
const testSolutions = ['N/A', 'N/A', testSolve2A(), testSolve2B()];

console.log(`# [Advent of Code 2021](https://adventofcode.com/2021)

| Problem | Solution |
|---------|----------|`);

solutions.forEach((solution, index) => console.log(`|Day ${Math.floor(index/2)+1}${index%2 ? 'B' : 'A'}| ${solution} |`));

console.log(`
| Test problem | Solution |
|--------------|----------|`);
testSolutions.forEach((solution, index) => console.log(`|Day ${Math.floor(index/2)+1}${index%2 ? 'B' : 'A'}| ${solution} |`));
