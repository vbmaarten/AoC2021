import readInput from "./readInput";

export default (input: number, test: boolean = false): number[] => {
    const data = readInput(input, test);
    
    return data.split('\n').filter(input => !!input).map(input => parseInt(input, 10))
}