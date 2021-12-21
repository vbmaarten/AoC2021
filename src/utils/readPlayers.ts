import { readInput } from "."

const readPlayers = (input: number, test: boolean = false): [number, number] => 
{
    const data = readInput(input, test);
    
    return data.map(line => parseInt(line.split(": ")[1],10)) as [number, number];
}


export default readPlayers;