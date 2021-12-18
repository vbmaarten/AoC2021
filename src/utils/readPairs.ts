import { readInput } from "./"

export type Pair = [number | Pair, number | Pair];

const readPairs = (input: number, test: boolean = false): Pair[] => 
{
    const data = readInput(input, test);

    return data.map(line => JSON.parse(line));
}


export default readPairs;