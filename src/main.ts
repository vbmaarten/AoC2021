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
import solve11A, {testSolve11A} from './solutions/11A';
import solve11B, {testSolve11B} from './solutions/11B';
import solve12A, {testSolve12A} from './solutions/12A';
import solve12B, {testSolve12B} from './solutions/12B';
import solve13A, {testSolve13A} from './solutions/13A';
import solve13B, {testSolve13B} from './solutions/13B';
import solve14A, {testSolve14A} from './solutions/14A';
import solve14B, {testSolve14B} from './solutions/14B';
import solve15A, {testSolve15A} from './solutions/15A';
import solve15B, {testSolve15B} from './solutions/15B';
import solve16A, {testSolve16A} from './solutions/16A';
import solve16B, {testSolve16B} from './solutions/16B';

const performanceFn = <T>(fn: () => T): [number, T] => {
    const t = performance.now();
    const result = fn();
    const d = performance.now() - t;
    
    return [d, result]
}


const solutions = [
    solve1A, solve1B, 
    solve2A, solve2B,
    solve3A, solve3B,
    solve4A, solve4B,
    solve5A, solve5B,
    solve6A, solve6B,
    solve7A, solve7B,
    solve8A, solve8B,
    solve9A, solve9B,
    solve10A, solve10B,
    solve11A, solve11B,
    solve12A, solve12B,
    solve13A, solve13B,
    solve14A, solve14B,
    solve15A, solve15B,
    solve16A, solve16B,
].map(performanceFn)

const testSolutions = [
    testSolve1A, testSolve1B,
    testSolve2A, testSolve2B,
    testSolve3A, testSolve3B,
    testSolve4A, testSolve4B,
    testSolve5A, testSolve5B,
    testSolve6A, testSolve6B,
    testSolve7A, testSolve7B,
    testSolve8A, testSolve8B,
    testSolve9A, testSolve9B,
    testSolve10A, testSolve10B,
    testSolve11A, testSolve11B,
    testSolve12A, testSolve12B,
    testSolve13A, testSolve13B,
    testSolve14A, testSolve14B,
    testSolve15A, testSolve15B,
    testSolve16A, testSolve16B,
].map(performanceFn);

const totalSolutions = solutions.reduce((prev, cur) => prev+cur[0], 0)/1000;
const totalTestSolutions = testSolutions.reduce((prev, cur) => prev+cur[0], 0)/1000;

console.log(`# [Advent of Code 2021](https://adventofcode.com/2021)

| Problem | Solution | Runtime |
|---------|----------|---------|`);

solutions.forEach(([runtime, solution], index) => console.log(`|Day ${Math.floor(index/2)+1}${index%2 ? 'B' : 'A'}| ${solution} | ${runtime.toFixed(2)} ms |`));

console.log(`
| Test problem | Solution | Runtime |
|--------------|----------|---------|`);
testSolutions.forEach(([runtime, solution], index) => console.log(`|Day ${Math.floor(index/2)+1}${index%2 ? 'B' : 'A'}| ${solution} | ${runtime.toFixed(2)} ms |`));

console.log(`
| Solution set | Total Runtime |
|--------------|---------------|
| Actual problems | ${totalSolutions.toFixed(2)} seconds |
| Test problems | ${totalTestSolutions.toFixed(2)} seconds |
`)

