import { readInput } from "."

const VALID_CHARS = ['A', 'B', 'C', 'D'];

export type Chamber = [string, string];
export type Puzzle = [string[], string[]];

const readAmphipods = (input: number, test: boolean = false): Puzzle => 
{
    const data = readInput(input, test);
    data.shift();
    data.shift();
    const row1 = data.shift().split('').filter(char => VALID_CHARS.includes(char))
    const row2 = data.shift().split('').filter(char => VALID_CHARS.includes(char))
    
    return [row1, row2];
}


export default readAmphipods;