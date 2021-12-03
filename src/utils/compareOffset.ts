type compareNumbers = (a: number, b: number) => boolean;

const biggerThan: compareNumbers = (a: number, b: number) => a > b;

/**
 * Give a list of numbers, will determine for each number if it is bigger than the number at index - offset 
 * Will slice of the first numbers of the list for which there is no number at the offset
 * @param input list of input numbers
 * @param offset offset with which a number must be compared. 1 will compare each number with its predecessor 
 * @param compare function which compares to number
 * @returns A lists of booleans, indicating for each number how it compares to the number of given offset
 */
const compareOffset = (input: number[], offset: number = 1, compare: compareNumbers = biggerThan) => {
    // Remove first part of the list, for which there is no number at given offset 
    const comparableInput = input.slice(offset);
    
    return comparableInput.map((value, index) => compare(value, input[index]))    
}

export default compareOffset;