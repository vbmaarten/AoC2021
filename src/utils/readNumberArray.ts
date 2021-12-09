import { readInput } from "."

const readNumberLine = (input: number, test: boolean = false) => 
{
    const data = readInput(input, test);

    return data.map(line => line.split('').map(value => parseInt(value, 10)))
}


export default readNumberLine;