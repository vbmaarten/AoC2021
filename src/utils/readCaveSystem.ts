import { readInput } from "."

export interface CaveLink {
    canVisit: boolean;
    links: string[]
}

export type CaveSystem = {[key: string]: CaveLink}

const readCaveSystem = (input: number, test: boolean = false) => 
{
    const data = readInput(input, test);
    
    const caveSystem: CaveSystem = {};

    const addOrCreate = (linkFrom: string, linkTo: string) => {
        if(!caveSystem[linkFrom]){
            caveSystem[linkFrom] = {
                canVisit: true,
                links: [linkTo],
            }
            return;
        }

        caveSystem[linkFrom].links.push(linkTo)
    }

    data.forEach(line => {
        const link: [string, string] = line.split('-') as [string, string]
        addOrCreate(...link);
        addOrCreate(...(link.reverse() as [string, string]))
    });

    return caveSystem;
}


export default readCaveSystem;