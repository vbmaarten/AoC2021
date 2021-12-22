import { cubesOn, readRebootSteps, RebootStep } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/


const solve = (input: RebootStep[]): number => {
  const steps = input.filter(step => 
    !(step.ranges.x[0] < -50 || step.ranges.x[1] > 50 ||
       step.ranges.y[0] < -50 || step.ranges.y[1] > 50 ||
       step.ranges.x[0] < -50 || step.ranges.z[1] > 50 
      ))
  return cubesOn(steps);
}

export default () => solve(readRebootSteps(22));
export const testSolve22A = () => solve(readRebootSteps(22, true))