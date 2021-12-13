import { readInput } from "."

export interface Fold {
    x: number;
    y: number;
}

export type Dot = [number, number]

const readDotInput = (input: number, test: boolean = false): [Dot[], Fold[]] => 
{
    const data = readInput(input, test);

    const startFoldData = data.findIndex((value) => value.slice(0, 4) === 'fold')

    const dotData = data.splice(0, startFoldData).map(value => value.split(',').map<number>(number => parseInt(number, 10)) as Dot);
    const foldData = data.map(line => {
        const split = line.split('=');
        const dimension = split[0].split('')[split[0].length-1];
        const number = parseInt(split[1], 10);

        const fold: Fold = {x: 0, y: 0};
        fold[dimension] = number;

        return fold;
    });

    return [dotData, foldData]
}


export default readDotInput;