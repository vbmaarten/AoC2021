import { readInput } from "."

const readNumberLine = (input: number, test: boolean = false) => 
    readInput(input, test)[0].split(',').map(value => parseInt(value, 10));


export default readNumberLine;