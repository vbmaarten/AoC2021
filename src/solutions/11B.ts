import {readNumberArray} from '../utils';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

// Returns number of flashes in tick
const flashTick = (octopuses: number[][]): number =>{
  const flashEntryPoints: [number, number][] = [];

   // Up by one
  octopuses.forEach((_, rowIndex) => {
      octopuses[rowIndex].forEach(( _, columnIndex ) => {
         octopuses[rowIndex][columnIndex] += 1; 
         if(octopuses[rowIndex][columnIndex] > 9){
           flashEntryPoints.push([rowIndex, columnIndex])
         }
      })
  }); 

  const increase = (row: number, column: number) => {
      if(octopuses[row][column] >= 0){
        octopuses[row][column] += 1;
        return;
      }
  }
  
  const flash = (row: number, column: number) => {
      let numberOfFlashes = 0;

      if(octopuses[row][column] > 9){
         octopuses[row][column] = -1;
         numberOfFlashes += 1;
         
         if(row > 0){
            increase(row - 1, column);
            numberOfFlashes += flash(row-1, column);
         }

         if(row < octopuses.length - 1){
            increase(row + 1, column);
            numberOfFlashes += flash(row + 1, column);
         }

         if(column > 0 && row > 0){
            increase(row - 1, column - 1);
            numberOfFlashes += flash(row - 1, column - 1);
         }

         if(column > 0 && row < octopuses.length - 1){
            increase(row + 1, column - 1);
            numberOfFlashes += flash(row + 1, column - 1);
         }

         if(column > 0){
            increase(row, column - 1);
            numberOfFlashes += flash(row, column - 1);
         }

         if(column < octopuses[row].length - 1){
            increase(row, column + 1);
            numberOfFlashes += flash(row, column + 1);
         }

         if(column < octopuses[row].length - 1 && row > 0){
            increase(row - 1, column + 1);
            numberOfFlashes += flash(row - 1, column + 1);
         }

         if(column < octopuses[row].length - 1 && row < octopuses.length - 1){
            increase(row + 1, column + 1);
            numberOfFlashes += flash(row + 1, column + 1);
         }
      }
      
      return numberOfFlashes;
  }
  
  const flashes = flashEntryPoints.reduce((prev, point) => prev+flash(...point), 0)
  
  octopuses.forEach((_, rowIndex) => {
      octopuses[rowIndex].forEach(( _, columnIndex ) => {
         if(octopuses[rowIndex][columnIndex] < 0){
            octopuses[rowIndex][columnIndex] += 1;
         }; 

         if(octopuses[rowIndex][columnIndex] < 0){
            octopuses[rowIndex][columnIndex] *= -1
         }
      })
  }); 
  
  return flashes;
}

const solve = (input: number[][]): number => {
   let octopusus = input.map(row => row.map(value => value));
   const syncedFlashNumber = input.length * input[0].length;
   let stepsDone = 1;
   
   while(flashTick(octopusus) < syncedFlashNumber){
      stepsDone += 1;
   }

   
   return stepsDone;
}


export default () => solve(readNumberArray(11));
export const testSolve11B = () => solve(readNumberArray(11, true))