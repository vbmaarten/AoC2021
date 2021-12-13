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
   return dot > fold ? (fold - (dot - fold)) : dot;
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

   const folded = fold(dots, folds[0]);
   return folded.length;
}

export default () => solve(readDotInput(13));
export const testSolve13A = () => solve(readDotInput(13, true))