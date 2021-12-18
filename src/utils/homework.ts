import { Pair } from "./readPairs";

enum ACTION {
   APPLY_LEFT="APPLY_LEFT",
   APPLY_RIGHT="APPLY_RIGHT",
   ACTION_TAKEN="ACTION_TAKEN"
}

interface Action {
  type: ACTION,
  payload: number, 
}

type Reduction = [Pair | number, Action[]];

const explode = (pair: Pair): Reduction => {
   const left = pair[0];
   const right = pair[1];

   if(typeof left !== "number" || typeof right !== "number"){
      throw new Error(`Unexplodable pair [${left} | ${right}](${pair})`)
   }

   return [0, [{type: ACTION.APPLY_LEFT, payload: left}, {type: ACTION.APPLY_RIGHT, payload: right}]]
}

const split = (number: number): Reduction => {
   if(number < 10){
      return [number, []];
   }
   const half = number/2;
   const newPair: [number, number] = [Math.floor(half), Math.ceil(half)]
   return [newPair, [{type: ACTION.ACTION_TAKEN, payload: 0}]];
}

const actionTaken = (actions: Action[]) => actions.length > 0;

const getActions = (splitableActions: Action[], type: ACTION): [Action | undefined, Action[]] => {
   const actions = [...splitableActions];
   const actionIndex = actions.findIndex(action => action.type === type);
   
   if(actionIndex < 0){
      return [undefined, actions];
   }
   
   const filteredAction = actions.splice(actionIndex, 1)
   return [filteredAction[0], actions];
}

const applyRight = (pair: Pair | number, apply: number): Pair | number => {
   if(typeof pair === "number"){
      return pair+apply;
   }
   
   return [pair[0], applyRight(pair[1], apply)]
}

const applyLeft = (pair: Pair | number, apply: number): Pair | number => {
   if(typeof pair === "number"){
      return pair+apply;
   }
   
   return [applyLeft(pair[0], apply), pair[1]]
}

const reduceExplode = (pair: Pair | number, depth: number = 0): Reduction => {
   if(typeof pair === "number"){
      return [pair, []];   
   }

   if(depth === 4){
      return explode(pair);
   }
   
   const [leftReduced, leftActions] = reduceExplode(pair[0], depth+1);
   
   if(!actionTaken(leftActions)){
      const [rightReduced, rightActions] = reduceExplode(pair[1], depth+1);
      const [executable, nonExecutable] = getActions(rightActions, ACTION.APPLY_LEFT);
      
      if(!executable){
         return [[pair[0], rightReduced], nonExecutable];
      }
      
      return [
         [applyRight(pair[0], executable.payload), rightReduced], 
         [...nonExecutable, {type: ACTION.ACTION_TAKEN, payload: 0}]
      ]
   }
  
   const [executable, nonExecutable] = getActions(leftActions, ACTION.APPLY_RIGHT);
   if(!executable){
      return [ [leftReduced, pair[1]], nonExecutable ]
   }
   
   return [
      [leftReduced, applyLeft(pair[1], executable.payload)], 
      [...nonExecutable, {type: ACTION.ACTION_TAKEN, payload: 0}]
   ]
}

const reduceSplit = (pair: Pair | number): Reduction => {
   if(typeof pair === 'number'){
      return split(pair);
   }
   
   const [leftSplit, leftActions] = reduceSplit(pair[0]);
   if(actionTaken(leftActions)){
      return [ [leftSplit, pair[1]], leftActions]
   }

   const [rightSplit, rightActions] = reduceSplit(pair[1]);
   if(actionTaken(rightActions)){
      return [ [pair[0], rightSplit], rightActions]
   }
   
   return [pair, []];
}
   
const reduce = (pair: Pair | number): Reduction => {
   const [exploded, actions] = reduceExplode(pair); 
   if(actionTaken(actions)){
      return reduce(exploded);
   }
   
   const [split, splitActions] = reduceSplit(exploded);
   if(actionTaken(splitActions)){
      return reduce(split);
   }
   
   return [split, []];
   
}

const magnitude = (pair: Pair | number): number => {
   if(typeof pair === "number"){
      return pair;
   }
   
   return 3*magnitude(pair[0])+2*magnitude(pair[1]);
}

const add = (a: Pair, b: Pair): Pair => {
   const [reduction] = reduce([a,b]);
   
   if(typeof reduction === "number"){
      throw Error('End result of addition is not a pair')
   }

   return reduction;
}

export default {add, magnitude};