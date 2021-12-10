import solve1A, { testSolve1A } from './solutions/1A';
import solve1B, { testSolve1B } from './solutions/1B';
import solve2A, { testSolve2A } from './solutions/2A';
import solve2B, { testSolve2B } from './solutions/2B';
import solve3A, { testSolve3A } from './solutions/3A';
import solve3B, { testSolve3B } from './solutions/3B';
import solve4A, { testSolve4A } from './solutions/4A';
import solve4B, { testSolve4B } from './solutions/4B';
import solve5A, { testSolve5A } from './solutions/5A';
import solve5B, { testSolve5B } from './solutions/5B';
import solve6A, { testSolve6A } from './solutions/6A';
import solve6B, { testSolve6B } from './solutions/6B';
import solve7A, {testSolve7A} from './solutions/7A';
import solve7B, {testSolve7B} from './solutions/7B';
import solve8A, {testSolve8A} from './solutions/8A';
import solve8B, {testSolve8B} from './solutions/8B';
import solve9A, {testSolve9A} from './solutions/9A';
import solve9B, {testSolve9B} from './solutions/9B';
import solve10A, {testSolve10A} from './solutions/10A';
import solve10B, {testSolve10B} from './solutions/10B';

const solutions = [
    solve1A(), solve1B(), 
    solve2A(), solve2B(),
    solve3A(), solve3B(),
    solve4A(), solve4B(),
    solve5A(), solve5B(),
    solve6A(), solve6B(),
    solve7A(), solve7B(),
    solve8A(), solve8B(),
    solve9A(), solve9B(),
    solve10A(), solve10B()
];

const testSolutions = [
    testSolve1A(), testSolve1B(),
    testSolve2A(), testSolve2B(),
    testSolve3A(), testSolve3B(),
    testSolve4A(), testSolve4B(),
    testSolve5A(), testSolve5B(),
    testSolve6A(), testSolve6B(),
    testSolve7A(), testSolve7B(),
    testSolve8A(), testSolve8B(),
    testSolve9A(), testSolve9B(),
    testSolve10A(), testSolve10B()
];

console.log(`# [Advent of Code 2021](https://adventofcode.com/2021)

| Problem | Solution |
|---------|----------|`);

solutions.forEach((solution, index) => console.log(`|Day ${Math.floor(index/2)+1}${index%2 ? 'B' : 'A'}| ${solution} |`));

console.log(`
| Test problem | Solution |
|--------------|----------|`);
testSolutions.forEach((solution, index) => console.log(`|Day ${Math.floor(index/2)+1}${index%2 ? 'B' : 'A'}| ${solution} |`));
