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

const constructMaze = (input: number[][]) => {
   const bigMaze = new Array(5).fill(0).flatMap(()=> input.map(row => new Array(5).fill(0).flatMap(() => row)));
   const rowCount = input.length;
   const columnCount = input[0].length;

   return bigMaze.map((row, rowIndex) => row.map((value, columnIndex) => {
      const increase = Math.floor(rowIndex/rowCount)+Math.floor(columnIndex/columnCount);
      return (value+increase-1)%9 +1; 
   }));
}


const solve = (input: number[][]): number => {
   const maze = constructMaze(input);

   const costMap: number[][] = new Array(maze.length).fill(0).map(() => new Array(maze[0].length).fill(Number.MAX_SAFE_INTEGER));
   costMap[0][0] = 0;

   let nextCoords = [[0,0]];

   while(nextCoords.length > 0){
      const followingCoords = new Set<[number, number]>();
      nextCoords.forEach(coord => (stepMaze(maze, costMap, ...coord)).forEach(x => followingCoords.add(x)))
      nextCoords = [...followingCoords];
   }

   return costMap[costMap.length - 1][costMap[0].length - 1] 
}

export default () => solve(readNumberLine(15));
export const testSolve15B = () => solve(readNumberLine(15, true))