/*
Problem
============

//TODO

Solution 
============

//TODO
*/

const STEPS = 40;

import { Polymer, readPolymer, Substitution } from "../utils";

export const substitutionName = (substitution: Substitution): string => substitution.join('');

export const objectToValues = <A>(input: {[key: string]: A}) => {
   return Object.entries(input).map(([_, value]) => value);
}

type RuleMap = {[key: string]: string[]}
export const buildRuleMap = (substitutions: Substitution[]): RuleMap => {
   // Build a map that maps rules, to a set of rules that will be aplied in the next iteration
   const ruleMap = {};
   substitutions.forEach(substitution => {
      const results = [ substitution[0].charAt(0)+substitution[1], substitution[1] + substitution[0].charAt(1) ]
      ruleMap[substitutionName(substitution)] = substitutions.filter(([rule, _]) => results.includes(rule)).map(substitutionName)
   })

   return ruleMap;
}

type CountMap = {[key: string]: number};
export const buildCountMap = (substitutions: Substitution[]) => {
   // Build a map where each substitution is mapped to the amount of times it is being applied
   const countMap: CountMap = {}; 

   substitutions.forEach(substitution => countMap[substitutionName(substitution)] = 0)

   return countMap;
}

type RuleStack = CountMap;

export const countLetters = (polymer: string) => polymer.split('').reduce((acc, cur) => {
      const count = {...acc};
      count[cur] = (count[cur] || 0) + 1;
      return count
}, {})


export const getActiveRules = (ruleStack: RuleStack) => Object.entries(ruleStack).filter(([_, value]) => value > 0).map(([key, _])=> key)
export const getSortedElementCounts = (count: CountMap) => Object.values(count).sort((a,b) => a-b)

const increaseElementCount = (count: CountMap, element: string, amount: number): CountMap => {
   const elementCount = {...count};
   elementCount[element] = (elementCount[element] ?? 0) + amount;
   return elementCount;
}

const increaseRuleStack = (stack: RuleStack, rules: string[], amount: number) => {
   const ruleStack = {...stack};

   rules.forEach(rule => ruleStack[rule] = (ruleStack[rule] ?? 0) + amount)

   return ruleStack;
}

const applyRuleStack = (ruleStack: RuleStack, charCount: CountMap, startMap: RuleStack, ruleMap: RuleMap) => {
   const rulesToApply = getActiveRules(ruleStack);

   return rulesToApply.reduce(([newRuleStack, elementCount], rule) => {
          const followingRules = ruleMap[rule];
          const ruleApplicationCount = ruleStack[rule];
          const addedChar = rule.charAt(2);

          return [
             increaseRuleStack(newRuleStack, followingRules, ruleApplicationCount), 
             increaseElementCount(elementCount, addedChar, ruleApplicationCount)
          ]
   }, [startMap, {...charCount}])
}

const getEmptyCountMap = (subs: Substitution[]): CountMap => ( buildCountMap(subs) );

const getInitialRuleStack = (substitutions: Substitution[], emptyMap: CountMap, polymer: string) => {
   // Build initial stack of rules that need to be applied
   const initialRuleStack = {...emptyMap};

   substitutions.map(substitution => initialRuleStack[substitutionName(substitution)] += polymer.match(new RegExp(substitution[0], 'g'))?.length || 0)
   return initialRuleStack;
}

const solve = (input: Polymer): number => {
   // ============ Initializations
   const ruleMap = buildRuleMap(input.substitutions);

   // ============ Algorithm implementation
   const initialCharCount = countLetters(input.polymer);
   const initialRuleStack: RuleStack = getInitialRuleStack(input.substitutions, getEmptyCountMap(input.substitutions), input.polymer); 
   
   const [_, charCount] = new Array(STEPS).fill(0).reduce(( [ruleStack, charCount]) => {
      return applyRuleStack(ruleStack, charCount, getEmptyCountMap(input.substitutions), ruleMap)
   }, [initialRuleStack, initialCharCount])
  

   const sorted = getSortedElementCounts(charCount);

   return sorted[sorted.length-1]-sorted[0];
}

export default () => solve(readPolymer(14));
export const testSolve14B = () => solve(readPolymer(14, true));