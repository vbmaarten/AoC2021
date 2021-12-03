const binaryToDecimal = (binary: number[]): number => {
   return binary.reverse().reduce((acc, cur, index) => {
      return acc + Math.pow(2, index)*cur;
   }, 0)
}

export default binaryToDecimal;