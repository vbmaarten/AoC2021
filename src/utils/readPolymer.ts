import readInput from "./readInput";

export type Substitution = [string, string]

export interface Polymer {
    polymer: string;
    substitutions: Substitution[];
}

export default (input: number, test: boolean = false): Polymer => {
    const data = readInput(input, test);

    const polymer = data.shift()

    const substitutions: [string, string][] = data.map<[string,string]>(line => line.split(" -> ") as [string,string])
    
    return {
        polymer,
        substitutions
    }
}