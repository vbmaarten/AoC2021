import readDotInput, { Dot, Fold } from '../utils/readDotInput';

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const foldOneDimension = (dot: number, fold: number) => {
   return ( dot > fold && fold !== 0  )? (fold - (dot - fold)) : dot;
}

const fold = (dots: Dot[], fold: Fold): Dot[] => {
   return dots.map<Dot>(dot => 
       {
          return  [foldOneDimension(dot[0], fold.x), foldOneDimension(dot[1], fold.y)] 
       }
   ).sort((a, b) => {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0
   }).reduce((prev, cur) => {
      if(prev.length === 0){
         return [cur];
      }
      if(cur[0] === prev[prev.length-1][0] && cur[1] === prev[prev.length-1][1]){
         return prev;
      }

      return [...prev, cur];
   }, [])   
}

const solve = (input: [Dot[], Fold[]]): number => {
   const [dots, folds] = input;

   const result = folds.reduce<Dot[]>((prev, cur) => fold(prev, cur), dots);

   const [ maxX, maxY ] = result.reduce((prev, cur) => ([Math.max(prev[0], cur[0]), Math.max(prev[1], cur[1])]), [0,0])

   const canvas = new Array(maxY+1).fill(0).map(() => new Array(maxX+1).fill(' '));

   result.forEach(dot => { canvas[dot[1]][dot[0]] = '#' });

   // Uncomment to see answer
   // canvas.forEach(row => console.log(row.join('')));
   return NaN;
}
4

export default () => solve(readDotInput(13));
export const testSolve13B = () => solve(readDotInput(13, true))