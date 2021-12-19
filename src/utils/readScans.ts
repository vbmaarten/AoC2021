import { readInput } from "."

export interface Point {
    x: number,
    y: number,
    z: number
}

export type Scan = {
    scanners: Point[];
    points: Point[];
} 

const readScans = (input: number, test: boolean = false): Scan[] => {
    const data = readInput(input, test);

    const scans: Scan[] = [];

    data.forEach(line => {
        if(line.slice(0, 3) === "---"){
            scans.push({scanners: [{x: 0, y: 0, z: 0}], points: []})
            return;
        }

        const pointData = line.split(',').map(x => parseInt(x));

        scans[scans.length-1].points.push({x: pointData[0], y: pointData[1], z: pointData[2]})
    })

    return scans;
}


export default readScans;