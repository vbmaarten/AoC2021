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

export const buildRuleMap = (substitutions: Substitution[]): {[key: string]: string[]} => {
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


const solve = (input: Polymer): number => {
   // ============ Initializations
   const ruleMap = buildRuleMap(input.substitutions);
   const emtpyCountMap = buildCountMap(input.substitutions);
   // ============ Utils

   const getEmptyCountMap = (): CountMap => ( {...emtpyCountMap} );

   const getInitialRuleStack = (substitutions: Substitution[]) => {
      // Build initial stack of rules that need to be applied
      const initialRuleStack = getEmptyCountMap();

      substitutions.filter(substitution => input.polymer.indexOf(substitution[0]) >= 0).map(substitutionName).forEach(name => initialRuleStack[name] += 1)
      return initialRuleStack;
   }

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

   const applyRuleStack = (ruleStack: RuleStack, charCount: CountMap) => {
      const rulesToApply = getActiveRules(ruleStack);

      return rulesToApply.reduce(([ruleStack, elementCount], rule) => {
             const followingRules = ruleMap[rule];
             const ruleApplicationCount = ruleStack[rule];
             const addedChar = rule.charAt(2);

             return [
                increaseRuleStack(ruleStack, followingRules, ruleApplicationCount), 
                increaseElementCount(elementCount, addedChar, ruleApplicationCount)
             ]
      }, [getEmptyCountMap(), {...charCount}])
   }
   // ============ Algorithm implementation

   let charCount = countLetters(input.polymer);
   let ruleStack: RuleStack = getInitialRuleStack(input.substitutions); 
  
   for(let i = 0; i < STEPS; i++){
      const result = applyRuleStack(ruleStack, charCount);
      ruleStack = result[0];
      charCount = result[1];
   }

   const sorted = getSortedElementCounts(charCount);

   return sorted[sorted.length-1]-sorted[0];
}

export default () => solve(readPolymer(14));
export const testSolve14B = () => solve(readPolymer(14, true));