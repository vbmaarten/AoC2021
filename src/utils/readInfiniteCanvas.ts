import { readInput } from "."

const readInfiniteCanvas = (input: number, test: boolean = false):[string, string[]] => 
{
    const data = readInput(input, test);
    
    const enhancementMap = data.shift();
    
    return [enhancementMap, data]

}


export default readInfiniteCanvas;