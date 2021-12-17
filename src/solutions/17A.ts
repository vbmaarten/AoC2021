import {  readTargetArea, Target} from "../utils";

/*
Problem
============

//TODO

Solution 
============

It will go up with a velocity that decreases by one each step.
If it reaches zero upward velocity, it starts increasing downwards veloctiy
by one eachs step. Therefore it will reach (x, 0) with a downward velocity
equal to the initial upwards velocity. In the next step the velocity will be 
1 higher. If this specific downwards velocity is higher then the max y, it 
will overshoot the target. Therefore it should be equal to the max y.
Max y = initial velocity - 1


//TODO
*/

const summation = (n) => (n*(n+1))/2

const solve = (input: Target): number => {
   const maxYVelocity = Math.abs(input.y[0])-1;
   return summation(maxYVelocity);
}
export default () => solve(readTargetArea(17));
export const testSolve17A = () => solve(readTargetArea(17, true))