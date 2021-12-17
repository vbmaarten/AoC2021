import readInput from "./readInput";

export type Range = [number, number];
export interface Target {
    x: Range;
    y: Range
}

export default (input: number, test: boolean = false): Target => {
    const data = readInput(input, test);

    const split = data[0].slice(13).split(', ').map(x => x.slice(2).split('..').map(y => parseInt(y)))
    
    return {
        x: [ split[0][0], split[0][1]],
        y: [ split[1][0], split[1][1]],
    }
}