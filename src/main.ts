import solve1 from './solutions/1';
import solve2 from './solutions/2';

const solutions = [solve1(), solve2()];

solutions.forEach((solution, index) => console.log(`|Day ${index+1}| ${solution} |`));