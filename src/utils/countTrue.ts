/**
 * @param input List of booleans
 * @returns Amount of times true occurs in the boolean 
 */
const countTrue = (input: boolean[]): number => input.reduce((accumulator, value) => value ? accumulator + 1 : accumulator, 0); 

export default countTrue;