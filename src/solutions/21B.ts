import { readPlayers } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const MAX_SCORE = 21;

const dieMap = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
}

const winningPaths = (position: number, score: number): number[] => {
  const rolls = new Array(7).fill(0).map((_, i) => i+3);
  
  return rolls.map(roll =>{ 
    const newPosition = (position+roll)%10 
    const newScore = score + newPosition + 1; 
    
    if(newScore >= MAX_SCORE){
      const steps: number[] = new Array(21).fill(0);
      steps[0] = dieMap[roll];
      return steps;
    }
    
    const steps = winningPaths(newPosition, newScore).map(value => value*dieMap[roll])
    steps.pop();
    steps.unshift(0);
    
    return steps;
  }).reduce((prev, cur) => prev.map((value,i) => value+cur[i]), new Array(21).fill(0) as number[]);
}

const losingPaths = (input: number[]) => input.reduce<number[]>((prev, cur)=>{
    const possiblePaths = (prev[prev.length-1]||1)*27;
    const losingPaths = possiblePaths - cur;
    
    return [...prev, losingPaths];
  }, []);
 

const solve = ([player1, player2]: [number, number]): number => {
  const step1 = (winningPaths(player1-1, 0));
  const dontWin1 = losingPaths(step1);
  const step2 = (winningPaths(player2-1, 0));
  const dontWin2 = losingPaths(step2); 
  
  const oneWin =step1.map((value, step) => 
  value * (dontWin2[step-1] ?? 1) 
  ).reduce((prev, cur) => prev+cur, 0)

  const twoWin =step2.map((value, step) => 
  value * (dontWin1[step] ?? 1) 
  ).reduce((prev, cur) => prev+cur, 0)
  
  return Math.max(oneWin, twoWin) 
}

export default () => solve(readPlayers(21));
export const testSolve21B = () => solve(readPlayers(21, true))
