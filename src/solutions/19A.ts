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
      let newPoint = {...point};
      for(let i = 0; i < times; i++){
         newPoint = fn(newPoint);
      }
      return newPoint;
   }
}

const zRotations = (new Array(4).fill(undefined)).map((_,i) => {
   return applyXTimes(rotateZ, i);
})

const XYRotations: ((point: Point) => Point)[] = [
   (point) => ({...point}),
   applyXTimes(rotateX, 1),
   applyXTimes(rotateX, 2),
   applyXTimes(rotateX, 3),
   applyXTimes(rotateY, 1),
   applyXTimes(rotateY, 3),
];

const rotations = zRotations.flatMap(zRotation => XYRotations.map(xyRotation => 
   (point: Point) => xyRotation(zRotation(point))
))

// Anchor points
const anchorOnPoint = (scan: Scan, point: Point): Scan => {
   return {
      points: scan.points.map(scanPoint => ({x: scanPoint.x - point.x, y: scanPoint.y - point.y, z: scanPoint.z - point.z})),
      scanners: scan.scanners.map(scanPoint => ({x: scanPoint.x - point.x, y: scanPoint.y - point.y, z: scanPoint.z - point.z})),
   }
}

// Compare two points
const arePointsEqual = (a: Point, b: Point) => {
   return a.x === b.x && a.y === b.y && a.z === b.z;
}

// Merge two sets of points
const mergeScans = (a: Scan, b: Scan): Scan => {
   const merged: Scan = {
      points: [...a.points],
      scanners: [...a.scanners, ...b.scanners]
   };

   b.points.forEach(point => {
      if(merged.points.findIndex((value) => arePointsEqual(value, point)) === -1){
         merged.points.push(point);
      }
   })
   
   return merged;
}

// Overlap between to scans in equal orientation
const overlapSameOrientation = (a: Scan, b: Scan): Scan | undefined => {
   let sufficientOverlap: Scan | undefined = undefined;

   a.points.forEach((pointA) => {
      b.points.forEach((pointB) => {
         const anchorA = anchorOnPoint(a, pointA);
         const anchorB = anchorOnPoint(b, pointB);
         const totalLength = anchorA.points.length + anchorB.points.length;

         const merged = mergeScans(anchorA, anchorB);

         if(totalLength - merged.points.length >= 12){
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
   const bRotations: Scan[] = rotations.map(rotation => ({
      scanners: b.scanners.map(rotation),
      points: b.points.map(rotation),  
   }))
   
   for(let instance of bRotations){
      const merged = overlapSameOrientation(a, instance);
      if(merged){
         return merged
      }
   }
   
   return undefined;
}

const calculateManhatten = (a: Point, b: Point) => {
   return Math.abs(a.x - b.x) +
   Math.abs(a.y - b.y) +
   Math.abs(a.z - b.z) 
}

const solve = (input: Scan[]): number => {
   let scans = [...input];

   while(scans.length > 1){
      console.log(scans.length);
      let mergeScan = scans.shift();

      const unmerged: Scan[] = [];

      scans.forEach((scan) => {
         const merged = overlap(mergeScan, scan);
         if(!merged){
            unmerged.push(scan);
            return;
         }

         mergeScan = merged;
      })

      unmerged.push(mergeScan);
      scans = unmerged;
   }
   
   console.log("Done");
   console.log(scans[0].points.length)
   
   let maxManhatten = 0;
   
   scans[0].scanners.forEach(scanner1 => {
      scans[0].scanners.forEach(scanner2 => {
         const manhatten = calculateManhatten(scanner1, scanner2);
         if(manhatten > maxManhatten){
            maxManhatten = manhatten;
         }  
      })
   })
   
   console.log("Manhatten", maxManhatten)

   return scans[0].points.length;
}

export default () => solve(readScans(19));
export const testSolve19A = () => solve(readScans(19, true))