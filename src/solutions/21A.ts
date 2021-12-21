import { readPlayers } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const MAX_SCORE = 1000;

let diceTop = 0;

const rollDeterministicDice = () => {
  const roll = diceTop+1;
  diceTop = (diceTop+1)%100;
  
  return roll
}

const solve = ([player1, player2]: [number, number]): number => {
  diceTop = 0;
  let positions = [player1-1, player2-1];
  let scores = [0,0]; 
  let rolls = 0;
  
  while(scores.every(score => score < MAX_SCORE)){
    for(let player = 0; player < positions.length; player++){
      const steps = (new Array(3).fill(0).map(rollDeterministicDice)).reduce((prev, cur)=> prev+cur, 0);
      rolls += 3;
      positions[player] = (positions[player] + steps)%10;
      scores[player] += positions[player]+1
      
      if(scores[player] >= MAX_SCORE){
        break;
      }
    }
  }

  return Math.min(...scores) * rolls;
}

export default () => solve(readPlayers(21));
export const testSolve21A = () => solve(readPlayers(21, true))
