import { readInput } from "."

const lineFormat = /([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/
    
export interface Line {
    a: {x: number, y: number}
    b: {x: number, y: number}
}

export interface Lines {
    lines: Line[];
    maxX: number;
    maxY: number;
}

const readLines = (input: number, test: boolean = false): Lines => {
    const data = readInput(input, test);
    
    let maxX = 0;
    let maxY = 0;
    
    const lines = data.map<Line>(lineString => {
        const numbers = lineString.match(lineFormat).slice(1,5).map(value => parseInt(value, 10));

        const line = {
            a: {x: numbers[0], y: numbers[1]},
            b: {x: numbers[2], y: numbers[3]}
        }
        
        maxX = Math.max(maxX, line.a.x, line.b.x);
        maxY = Math.max(maxY, line.a.y, line.b.y);
        
        return line;
    });
    
    return {
        lines,
        maxX,
        maxY
    }
}

export default readLines;