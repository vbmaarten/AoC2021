import { readInput } from "../utils"

export enum SUBMARINE_INSTRUCTION {
    FORWARD = 'forward',
    DOWN = 'down',
    UP = 'up'
}

export interface SubmarineInstruction {
    instruction: SUBMARINE_INSTRUCTION,
    amount: number,
}

const readSubmarineInstructions = (input: number, test: boolean = false): SubmarineInstruction[] => {
    const data = readInput(input, test);

    return data.split('\n').filter(line => !!line).map<SubmarineInstruction>(line => {
        const [instruction, amount] = line.split(' ');

        let parsedInstruction: SUBMARINE_INSTRUCTION;

        switch(instruction){
            case SUBMARINE_INSTRUCTION.FORWARD:
                parsedInstruction = SUBMARINE_INSTRUCTION.FORWARD;
                break;
            case SUBMARINE_INSTRUCTION.DOWN:
                parsedInstruction = SUBMARINE_INSTRUCTION.DOWN;
                break;
            case SUBMARINE_INSTRUCTION.UP:
                parsedInstruction = SUBMARINE_INSTRUCTION.UP;
                break;
            default:
                throw new Error(`Unknown instruction: ${instruction}`)
        }

        return {
           instruction: parsedInstruction,
           amount: parseInt(amount, 10) 
        }
    })

}

export default readSubmarineInstructions;