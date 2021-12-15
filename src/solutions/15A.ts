import readNumberLine from "../utils/readNumberArray";
/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const stepMaze = (maze: number[][], costMap: number[][], x: number = 0, y: number = 0) => {
   const currentCost = costMap[y][x]
   const coordinatesToCheck = [
      [x-1, y],
      [x+1, y],
      [x, y-1],
      [x, y+1]
   ].filter(coordinate => coordinate[0] >= 0 && coordinate[0] < maze[0].length && coordinate[1] >= 0 && coordinate[1] < maze.length)

   const updatedCoordinates: [number, number][] = [];

   coordinatesToCheck.forEach(([nextX, nextY]) => {
      const nextCost = maze[nextY][nextX]+currentCost; 
      if(nextCost < costMap[nextY][nextX]){
         costMap[nextY][nextX] = nextCost;
         updatedCoordinates.push([nextX, nextY])
      }
   })

   return updatedCoordinates;
}


const solve = (input: number[][]): number => {
   const costMap: number[][] = new Array(input.length).fill(0).map(() => new Array(input[0].length).fill(Number.MAX_SAFE_INTEGER));
   costMap[0][0] = 0;

   let nextCoords = [[0,0]];

   while(nextCoords.length > 0){
      const followingCoords = new Set<[number, number]>();
      nextCoords.forEach(coord => (stepMaze(input, costMap, ...coord)).forEach(x => followingCoords.add(x)))
      nextCoords = [...followingCoords];
   }

   return costMap[costMap.length - 1][costMap[0].length - 1] 
}

export default () => solve(readNumberLine(15));
export const testSolve15A = () => solve(readNumberLine(15, true))