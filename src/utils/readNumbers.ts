import readInput from "./readInput";

export default (input: number, test: boolean = false): number[] => {
    const data = readInput(input, test);
    
    return data.map(input => parseInt(input, 10))
}