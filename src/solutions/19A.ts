import { readScans, Scan, Point } from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/
const rotateX = (point: Point) => ({...point, z: point.y, y: -point.z});
const rotateY = (point: Point) => ({...point, z: point.x, x: -point.z});
const rotateZ = (point: Point) => ({...point, x: point.y, y: -point.x});

const applyXTimes = (fn: (point: Point) => Point, times: number): (point: Point) => Point => {
   return (point: Point) => {
      let newPoint = point;
      for(let x = 0; x < times; x++){
         fn(newPoint);
      }
      return newPoint;
   }
}

const zRotations = (new Array(4).fill(undefined)).map((_,i) => {
   return applyXTimes(rotateZ, i);
})

const XYRotations: ((point: Point) => Point)[] = [
   (point) => point,
   applyXTimes(rotateX, 1),
   applyXTimes(rotateX, 2),
   applyXTimes(rotateX, 3),
   applyXTimes(rotateY, 1),
   applyXTimes(rotateY, 3),
];

const rotations = zRotations.flatMap(zRotation => XYRotations.map(xyRotation => 
   (point: Point) => xyRotation(zRotation(point))
))

console.log('rotations', rotations.length)

// Anchor points
const anchorOnPoint = (scan: Scan, point: Point) => {
   return scan.map(scanPoint => ({x: scanPoint.x - point.x, y: scanPoint.y - point.y, z: scanPoint.z - point.z}))
}

// Compare two points
const arePointsEqual = (a: Point, b: Point) => {
   return a.x === b.x && a.y === b.y && a.z === b.z;
}

// Merge two sets of points
const mergePoints = (a: Scan, b: Scan) => {
   const merged = [...a];

   b.forEach(point => {
      if(merged.findIndex((value) => arePointsEqual(value, point)) === -1){
         merged.push(point);
      }
   })

   return merged;
}

// Overlap between to scans in equal orientation
const overlapSameOrientation = (a: Scan, b: Scan): Scan | undefined => {
   let sufficientOverlap: Scan | undefined = undefined;

   a.forEach((pointA) => {
      b.forEach((pointB) => {
         const anchorA = anchorOnPoint(a, pointA);
         const anchorB = anchorOnPoint(b, pointB);
         const totalLength = anchorA.length + anchorB.length;

         const merged = mergePoints(anchorA, anchorB);

         if(totalLength - merged.length >= 12){
            sufficientOverlap = merged;
            return;
         }
      })

      if(sufficientOverlap){
         return;
      }
   })
   
   return sufficientOverlap;
}

const overlap = (a: Scan, b: Scan) => {
   const bRotations = rotations.map(rotation => b.map(rotation))
   
   for(let instance of bRotations){
      const merged = overlapSameOrientation(a, instance);
      if(merged){
         return merged
      }
   }
   
   return undefined;
}

const solve = (input: Scan[]): number => {
   let scans = [...input];

   while(scans.length > 1){
      const currentInstance = [...scans];
      scans = [];
   }
}

export default () => solve(readScans(19));
export const testSolve19A = () => solve(readScans(19, true))