import readInput from "./readInput";

const CHARCODE_A = 97;

const mapToFlag = (input: string) => {
    const flags = new Array(7).fill(0);

    input.split('').forEach(char => flags[char.charCodeAt(0)-CHARCODE_A] = 1);

    return flags.join('');
}

export default (input: number, test: boolean = false): [string[], string[]][]=> {
    const data = readInput(input, test);
    
    return data.map((line) => {
        const [digits1, digits2] = line.split('|')

        return [
            digits1.split(' ').filter(value => !!(value.trim())).map(mapToFlag),
            digits2.split(' ').filter(value => !!(value.trim())).map(mapToFlag),
        ]
    })
}