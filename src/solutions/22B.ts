
import { cubesOn, readRebootSteps, RebootStep } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
  steps.foreach(step => {
    if(step.ranges.x[0] < -50 || step.ranges.x[1] > 50 ||
       step.ranges.y[0] < -50 || step.ranges.y[1] > 50 ||
       step.ranges.x[0] < -50 || step.ranges.z[1] > 50 
      ){
      return;
    }
    
*/


const solve = (steps: RebootStep[]): number => {
  return cubesOn(steps);
}

export default () => solve(readRebootSteps(22));
export const testSolve22B = () => solve(readRebootSteps(22, true))