const mergeMean = (input: number[]): number => {
    if(input.length === 1 || input.length === 0){
        return input[0] ?? 0;
    }

    const a = mergeMean(input.slice(0, Math.floor(input.length/2)));
    const b = mergeMean(input.slice(Math.floor(input.length/2), input.length));

    return (a+b)/2
}

export default mergeMean;