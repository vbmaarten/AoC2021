import readInput from "./readInput";

export default (input: number): number[] => {
    const data = readInput(input);
    
    return data.split('\n').filter(input => !!input).map(input => parseInt(input, 10))
}