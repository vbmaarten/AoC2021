import { Substitution } from '../utils';
import { buildRuleMap, countLetters, substitutionName } from './14B'

const substitutionInput: [Substitution, string][] = [
    [["AA", "Z"], "AAZ"],
    [["NA", "U"], "NAU"]
]
const substitutionNameResult = substitutionInput.map(([sub, result]) => substitutionName(sub) === result ? true : substitutionName(sub)).every(v => v === true)
console.log('substitutionName', substitutionNameResult);

const countLettersInput: [string, {[key: string]: number}][] = [
    ['AB', {A: 1, B: 1}],
    ['', {}],
    ['AAB', {A: 2, B: 1}],
    ['ABB', {A: 1, B: 2}],
    ['AABB', {A: 2, B: 2}],
]

const countLettersResult = countLettersInput.map(( [input, result] ) => {
    const counted = countLetters(input); 

    return Object.keys(result).map(key => result[key] === counted[key]).every(v => v === true) && Object.keys(result).length === Object.keys(counted).length
})
.every(v => v === true);
console.log('countLettersResult', countLettersResult);



const buildRuleMapInput: [Substitution[], {[key: string]: string[]}][] = [[ [
         [ 'NC', 'H' ],
         [ 'HC', 'F'],
         [ 'VN', 'F' ],
         [ 'PK', 'V' ],
         [ 'SO', 'C' ],
         [ 'PH', 'F' ],
         [ 'FP', 'N' ],
         [ 'NP', 'B' ]
],
{"NCH": ['HCF'],"FPN": ['NPB'], "HCF": [], "VNF": [], "PKV": [], "SOC": [], "PHF": [], "NPB": []  } 
 ]]

    const arrayMatch = (a: any[], b: any[]) => {
        if(a === undefined && b === undefined) return true;

        return a.map(v => b.includes(v)).every(e => e === true) && a.length === b.length;
    }

const buildRuleMapResult = buildRuleMapInput.map(([input, result]) => {
    const build =buildRuleMap(input);

    return Object.keys(result).length === Object.keys(build).length && Object.keys(result).map(key => arrayMatch(result[key], build[key])).every(e => e === true)
}).every(e => e === true);

console.log('buildRuleMap', buildRuleMapResult);
