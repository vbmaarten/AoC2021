import { readInput } from "."

export interface Point {
    x: number,
    y: number,
    z: number
}

export type Scan = Point[]

const readNumberLine = (input: number, test: boolean = false): Scan[] => {
    const data = readInput(input, test);

    const scans: Scan[] = [];

    data.forEach(line => {
        if(line[0] === "-"){
            scans.push([])
            return;
        }

        const pointData = line.split(',').map(x => parseInt(x));

        scans[scans.length-1].push({x: pointData[0], y: pointData[1], z: pointData[2]})
    })

    return scans;
}


export default readNumberLine;