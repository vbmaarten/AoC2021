import {  readTargetArea, Target} from "../utils";

/*
Problem
============

//TODO

Solution 
============

Using the trick in last solution, you can hit any y value in the target.

//TODO
*/

const summation = (n) => (n*(n+1))/2

const xPosition = (initialVelocity: number, steps: number) => {
    return summation(initialVelocity) - summation(Math.max(initialVelocity-steps, 0))
}

const yPosition = (initialVelocity: number, steps: number) => {
    if(initialVelocity <= 0){
        const absVelocity = Math.abs(initialVelocity);

        return -(summation(absVelocity+steps-1) - summation(absVelocity-1));
    }

    const positiveChange = summation(initialVelocity) - summation(Math.max(initialVelocity-steps, 0))

    if(steps > initialVelocity +1){
        return positiveChange + yPosition(-1, steps - initialVelocity - 1);
    }

    return positiveChange;
}

const solve = (input: Target): number => {
   const maxYVelocity = Math.abs(input.y[0])-1;
   const minYVelocity = input.y[0];
   const maxXVelocity = input.x[1];

   let velos = 0;

   for(let yVel = minYVelocity; yVel <= maxYVelocity; yVel++){
       for(let xVel = 0; xVel <= maxXVelocity; xVel++){
           let step = 0;
           let [x, y] = [xPosition(xVel, step), yPosition(yVel, step)];
           let canReach = false;

           while(x <= input.x[1] && y >= input.y[0]){
               if(x >= input.x[0] && x <= input.x[1] && y >= input.y[0] && y <= input.y[1]){
                  canReach = true; 
               }

               step += 1;
               [x, y] = [xPosition(xVel, step), yPosition(yVel, step)];
           }

           if(canReach){
               velos += 1;
           }
       }
   }

   return velos;
}

export default () => solve(readTargetArea(17));
export const testSolve17B = () => solve(readTargetArea(17, true))