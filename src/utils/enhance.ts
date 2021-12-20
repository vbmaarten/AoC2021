const pad = (input: string[], char: string): string[] => {
   const padded = input.map(line => `${char}${char}${char}${line}${char}${char}${char}`)
   
   const emptyLine = new Array(padded[0].length).fill(char).join('');
   
   return [
      emptyLine,
      emptyLine,
      emptyLine,
      ...padded,
      emptyLine,
      emptyLine,
      emptyLine,
   ]
}

const enhance = (image: string[], enhancementMap: string,infiniteChar: string) => {
   return image.map((row, rowIndex) => {
      return row.split('').map(( _, columnIndex ) => {
       if(rowIndex === 0 || columnIndex === 0 || rowIndex === image.length-1 || columnIndex === row.length -1){
           return infiniteChar; 
       }
       
       const mapSnap = [
          image[rowIndex-1].substr( columnIndex-1 ,1),
          image[rowIndex-1].substr( columnIndex ,1),
          image[rowIndex-1].substr( columnIndex+1 ,1),
          image[rowIndex].substr( columnIndex-1 ,1),
          image[rowIndex].substr( columnIndex ,1),
          image[rowIndex].substr( columnIndex+1 ,1),
          image[rowIndex+1].substr( columnIndex-1 ,1),
          image[rowIndex+1].substr( columnIndex ,1),
          image[rowIndex+1].substr( columnIndex+1 ,1),
       ]

       const mapIndex = parseInt(mapSnap.map(value => value === "#" ? "1" : "0").join(''), 2);       
       
       const mapped = enhancementMap.substr(mapIndex, 1);
       return mapped
      }).join('')
   })
}

export const countEnhancedLight = (image: string[]) => {
   let lightCount = 0;
   
   image.forEach(row => row.split('').forEach(value => {
      if(value === '#'){
         lightCount++;
      }
   }));

   return lightCount;
}

export const enhanceMultipleTimes =  (image: string[], enhancementMap: string, times: number) => {
   let infiniteImage = [...image];
   let prevInfiniteChar = '.';

   for(let i=0; i<times; i++){
      const char = prevInfiniteChar;
      const infiniteChar = enhancementMap.substr(parseInt(new Array(9).fill(char === '#' ? '1' : '0').join(''), 2), 1);
      prevInfiniteChar = infiniteChar;
      infiniteImage = enhance(pad(infiniteImage, char), enhancementMap, infiniteChar);
   }
   
   return infiniteImage;
}
