import { RebootCube, RebootRange, RebootStep } from ".";

// Returns the range of overlap between two ranges
const rangeOverlap = (rangeA: RebootRange, rangeB: RebootRange): RebootRange | undefined => {
  const ranges = [rangeA, rangeB].sort((a,b) => a[0]-b[0]);

  if(ranges[0][1] < ranges[1][0]) return undefined;
  
  return [Math.max(rangeA[0], rangeB[0]),Math.min(rangeA[1], rangeB[1])];

}

const cutAt = (cube: RebootCube, x: number, dimension: 'x'|'y'|'z'): RebootCube[] => {
  const left = {...cube};
  const right = {...cube};
  
  left[dimension] = [cube[dimension][0], x-1]
  right[dimension] = [x, cube[dimension][1]]
  
  return [left, right];
}

// Last returned in array is cut out piece
const cut = (cube: RebootCube, range: RebootRange, dimension: 'x'|'y'|'z'): RebootCube[] => {
  let leftOver = {...cube};
  const cutOut: RebootCube[] = [];
  
  if(cube[dimension][0] < range[0]){
    const cut = cutAt(leftOver, range[0], dimension);
    cutOut.push(cut[0]);
    leftOver = cut[1];
  }

  if(cube[dimension][1] > range[1]){
    const cut = cutAt(leftOver, range[1]+1, dimension);
    
    return [...cutOut, ...cut.reverse()];
  }
  
  return [...cutOut, leftOver];
}

// Last returned in array is cut out piece
const cutAway = (cube: RebootCube, cutCube: RebootCube): RebootCube[] => {
  let leftOvers = cut(cube, cutCube.x, 'x');  
  let toCut = leftOvers.pop();
  leftOvers.push(...cut(toCut, cutCube.y, 'y'))
  toCut = leftOvers.pop();
  leftOvers.push(...cut(toCut, cutCube.z, 'z'))
  return leftOvers
}

const minus = (cubeA: RebootCube, cubeB: RebootCube): RebootCube[] => {
  const overlapCube: RebootCube = {
    x: rangeOverlap(cubeA.x, cubeB.x),
    y: rangeOverlap(cubeA.y, cubeB.y),
    z: rangeOverlap(cubeA.z, cubeB.z),
  }  
  
  if(!overlapCube.x || !overlapCube.y || !overlapCube.z){
    return [cubeA];  
  }
  
  const cutOut = cutAway(cubeA, overlapCube);
  cutOut.pop();
  
  return cutOut;
}

const rangeLength = (range: RebootRange) => {
  return range[1] - range[0] + 1;
}

const cubeSize = (cube: RebootCube) => {
  return rangeLength(cube.x) * rangeLength(cube.y) * rangeLength(cube.z)
}

const cubesOn = (steps: RebootStep[]) => {
  return steps.reduce<RebootCube[]>((onPieces, cur) => {
    return [
      ...onPieces.flatMap(piece => minus(piece, cur.ranges)),
      ...(cur.on ? [cur.ranges] : [])
    ] 
  }, []).map(cubeSize).reduce<number>((prev,cur) => prev+cur, 0);
}

export default cubesOn;