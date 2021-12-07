const findMedian = (input: number[]) => {
   return input.sort((a,b) => a-b)[Math.ceil(input.length/2)]
}

export default findMedian;