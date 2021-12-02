import { readSubmarineInstructions, SubmarineInstruction, SUBMARINE_INSTRUCTION } from "../utils";

interface Position {
    x: number;
    depth: number;
    aim: number;
}

const calculatePositionFromInstructions = (instructions: SubmarineInstruction[]): Position => {
    const position: Position = {
        x: 0,
        depth: 0,
        aim: 0
    }

    instructions.forEach(instruction => {
        switch(instruction.instruction){
            case SUBMARINE_INSTRUCTION.FORWARD:
                position.x += instruction.amount
                position.depth += instruction.amount * position.aim
                break;
            case SUBMARINE_INSTRUCTION.DOWN:
                position.aim += instruction.amount 
                break;
            case SUBMARINE_INSTRUCTION.UP:
                position.aim -= instruction.amount 
                break;
        }
    })

    return position;
}

const solve = (instructions: SubmarineInstruction[]) => {
    const position = calculatePositionFromInstructions(instructions);

    return `${position.x * position.depth}`
}

export default () => solve(readSubmarineInstructions(2));
export const testSolve2B = () => solve(readSubmarineInstructions(2, true));
