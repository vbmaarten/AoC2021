import { readInput } from "."

export type RebootRange = [number, number];

export interface RebootCube {
    x: RebootRange; 
    y: RebootRange; 
    z: RebootRange; 
}

export interface RebootStep {
    on: boolean;
    ranges: RebootCube; 
}

const readRebootSteps = (input: number, test: boolean = false): RebootStep[] => 
{
    const data = readInput(input, test);

    return data.map(line => {
        const [toggle, ranges] = line.split(' ');
        const on = toggle === 'on'; 
        
        const step: RebootStep = {
            on,
            ranges: {
                x: [0,0],
                y: [0,0],
                z: [0,0],
            }
        }
        
        ranges.split(',').forEach(range => {
            const [dimension, numberRange] = range.split('=');
            step.ranges[dimension] = numberRange.split('..').map(number => parseInt(number, 10))
        })
        
        return step;
    })
}


export default readRebootSteps;