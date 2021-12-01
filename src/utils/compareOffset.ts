type compareNumbers = (a: number, b: number) => boolean;

const biggerThan: compareNumbers = (a: number, b: number) => a > b;

/**
 * 
 * @param input list of input numbers
 * @param offset offset with which a number must be compared. 1 will compare each number with its predecessor 
 * @param compare function which compares to number
 * @returns A lists of booleans, indicating for each number how it compares to the number of given offset
 */
const compareOffset = (input: number[], offset: number = 1, compare: compareNumbers = biggerThan) => {
    const comparableInput = input.slice(offset);
    
    return comparableInput.map((value, index) => compare(value, input[index]))    
}

export default compareOffset;