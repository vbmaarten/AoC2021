import { Puzzle, readAmphipods} from "../utils";

/*
Problem
============

//TODO

Solution 
============

//TODO
*/

enum AMPHIPOD_STATE {
  START="START",
  MOVING_HALL="MOVING_HALL",
  READY_FOR_HOME="READY_FOR_HOME",
  GOING_HOME="GOING_HOME",
  HOME="HOME",
}

enum AMPHIPOD_TYPE {
  AMBER = "A",
  BRONZE = "B",
  COPPER = "C",
  DESERT = "D"
}

const podCost = {
  [AMPHIPOD_TYPE.AMBER]: 1,
  [AMPHIPOD_TYPE.BRONZE]: 10,
  [AMPHIPOD_TYPE.COPPER]: 100,
  [AMPHIPOD_TYPE.DESERT]: 1000,
}

interface Amphipod {
  state: AMPHIPOD_STATE,
  type: AMPHIPOD_TYPE,
  visited: Node[],
  position: Node,
  cost: number,
}

interface Edge {
  end: Node,
  length: number,
}


interface Node {
  edges: Edge[],
  isChamber: undefined | AMPHIPOD_TYPE,
}

interface State {
  pods: Amphipod[],
  cost: number,
}

let hall: Node[];
let topChambers: Node[];
let bottomChambers: Node[];

const copyState = (state: State): State => {
  return {
    cost: state.cost,
    pods: state.pods.map(pod => ({...pod, visited: [...pod.visited]}))
  }
}

const podAtPosition = (pods: Amphipod[], node: Node) => {
  return pods.some(pod => pod.position === node);
} 

const mapMovingState = (state: State, movingPod: number): State[] => {
  const states: State[] = [];
  
  const readyState = copyState(state);    
  readyState.pods[movingPod].state = AMPHIPOD_STATE.READY_FOR_HOME;
  readyState.pods[movingPod].visited = [];
  states.push(readyState);
  
  const pod = state.pods[movingPod];
  
  pod.position.edges
    // Remove all edges at which end there is already a pod or which we already visited     
    .filter(edge => !podAtPosition(state.pods,edge.end) && !pod.visited.includes(edge.end))
    // Create states for the remaining edges 
    .forEach(edge => {
      // Edge is leading to chamber, which could be home of pod
      if(edge.end.isChamber){
        if(edge.end.isChamber !== pod.type) return;
        const topEdge = edge;
        const bottomEdge = topEdge.end.edges.find(edge => edge.end.isChamber);
        const bottomChamber = bottomEdge.end;
        const podAtBottom = state.pods.find(pod => pod.position === bottomChamber);
        
        if(podAtBottom && podAtBottom.type === pod.type){
          const topState = copyState(state);
          topState.pods[movingPod].position = topEdge.end;
          topState.pods[movingPod].state = AMPHIPOD_STATE.HOME;
          topState.cost += podCost[pod.type] * topEdge.length;
          states.push(topState)
          // Move into top chamber
        }
        
        if(!podAtBottom){
          // Move into bottom chamber
          const bottomState = copyState(state);
          const length = topEdge.length + bottomEdge.length;
          bottomState.pods[movingPod].position = bottomChamber;
          bottomState.pods[movingPod].state = AMPHIPOD_STATE.HOME;
          bottomState.cost += pod.cost * length;
          states.push(bottomState)
        }
      }
      
      // Edge is not leading to chamber and not yet visited
      const stepState = copyState(state);
      stepState.pods[movingPod].visited.push(stepState.pods[movingPod].position);
      stepState.pods[movingPod].position = edge.end;
      stepState.cost += edge.length * pod.cost;
    })
      
  return states;
}

const mapReturningState = (state: State, returningPod: number): State[] => {
  const states: State[] = [];
  const pod = state.pods[returningPod];
  
  pod.position.edges
    // Remove all edges at which end there is already a pod or which we already visited     
    .filter(edge => !podAtPosition(state.pods,edge.end) && !pod.visited.includes(edge.end))
    // Create states for the remaining edges 
    .forEach(edge => {
      // Edge is leading to chamber, which could be home of pod
      if(edge.end.isChamber && edge.end.isChamber === pod.type){
        const topEdge = edge;
        const bottomEdge = topEdge.end.edges.find(edge => edge.end.isChamber);
        const bottomChamber = bottomEdge.end;
        const podAtBottom = state.pods.find(pod => pod.position === bottomChamber);
        
        if(podAtBottom && podAtBottom.type === pod.type){
          const topState = copyState(state);
          topState.pods[returningPod].position = topEdge.end;
          topState.pods[returningPod].state = AMPHIPOD_STATE.HOME;
          topState.cost += podCost[pod.type] * topEdge.length;
          states.push(topState)
          // Move into top chamber
        }
        
        if(!podAtBottom){
          // Move into bottom chamber
          const bottomState = copyState(state);
          const length = topEdge.length + bottomEdge.length;
          bottomState.pods[returningPod].position = bottomChamber;
          bottomState.pods[returningPod].state = AMPHIPOD_STATE.HOME;
          bottomState.cost += pod.cost * length;
          states.push(bottomState)
        }

        return;
      }
      
      // Edge is not leading to chamber and not yet visited
      const stepState = copyState(state);
      stepState.pods[returningPod].visited.push(stepState.pods[returningPod].position);
      stepState.pods[returningPod].position = edge.end;
      stepState.cost += edge.length * pod.cost;
    })
  
  return states;
}

const mapReadyPods = (state: State, readyPods: Amphipod[]) => {
  const homeState = copyState(state);
  
  readyPods.forEach(pod => {
    const podIndex = state.pods.findIndex(p => p === pod);
    if(podIndex < 0) return;
    homeState.pods[podIndex].state = AMPHIPOD_STATE.HOME;
    
    const topChamber = homeState.pods[podIndex].position.edges[0].end;
    const podAtTop = homeState.pods.find(p => p.position === topChamber);
    if(podAtTop && podAtTop.type === homeState.pods[podIndex].type){
      podAtTop.state = AMPHIPOD_STATE.HOME
    }
  });
  
  return [homeState];
}

const mapStartState = (state: State): State[] => {
  const states: State[] = [];
  // Pods that start their journey
  state.pods.forEach((pod, i) => {
    if(pod.state !== AMPHIPOD_STATE.START) return;

    if(pod.position.edges.length === 1){
      // Pod is at bottom
      if(podAtPosition(state.pods, pod.position.edges[0].end)){
        // Can't move through pod above
        return;
      }
      
      pod.position.edges[0].end.edges // Edges at node above
        .filter(edge => edge.end.isChamber) // Don't go back from the top
        .filter(edge => podAtPosition(state.pods, edge.end)) // Can't follow an edge with pod at end
        .forEach(nextEdge => {
          const hallState = copyState(state);
          const length = pod.position.edges[0].length + nextEdge.length;
          hallState.pods[i].position = nextEdge.end;
          hallState.cost = hallState.pods[i].cost * length;
          hallState.pods[i].state = AMPHIPOD_STATE.MOVING_HALL;
          states.push(hallState)
        })
      return;
    }
    
    // Pod is at top
    pod.position.edges
      .filter(edge => !edge.end.isChamber) // Don't go down to the bottom
      .filter(edge => !podAtPosition(state.pods, edge.end)) // Can't follow an edge with pod at end
      .forEach(nextEdge => {
        const hallState = copyState(state);
        const length = nextEdge.length;
        hallState.pods[i].position = nextEdge.end;
        hallState.cost = hallState.pods[i].cost * length;
        hallState.pods[i].state = AMPHIPOD_STATE.MOVING_HALL;
        states.push(hallState)
      })
  });
  
  return states;
}


const mapReturnHomeState = (state: State): State[] => {
  const states: State[] = [];
  
  state.pods.forEach((pod, i) => {
    if(pod.state === AMPHIPOD_STATE.READY_FOR_HOME){
      const newState = copyState(state);
      newState.pods[i].state = AMPHIPOD_STATE.GOING_HOME;
      states.push(newState);
    } 
  });
  
  return states;
}

const mapState = (state: State): State[] => {
  const readyPods = state.pods
    .filter(pod => bottomChambers.includes(pod.position))
    .filter(pod => pod.type === pod.position.isChamber)
    .filter(pod => pod.state === AMPHIPOD_STATE.START)
  
  // Pods already at right position
  if(readyPods.length > 0){
    return mapReadyPods(state, readyPods);
  }

  // Pods currently on the move
  const movingPod = state.pods.findIndex(pod => pod.state === AMPHIPOD_STATE.MOVING_HALL);
  if(movingPod >= 0){
    return mapMovingState(state, movingPod);
  } 
  
  // Pods currently on the move home
  const returningPod = state.pods.findIndex(pod => pod.state === AMPHIPOD_STATE.GOING_HOME);
  if(returningPod >= 0){
    return mapReturningState(state, returningPod);
  }
  
  const startStates: State[] = mapStartState(state);

  // Send some pods home 
  const returnHomeStates: State[] = mapReturnHomeState(state)

  return [...startStates, ...returnHomeStates];
  
}

const connectNodes = (a: Node, b: Node, length: number) => {
  a.edges.push({end: b, length});
  b.edges.push({end: a, length});
}  

const types: AMPHIPOD_TYPE[] = [AMPHIPOD_TYPE.AMBER, AMPHIPOD_TYPE.BRONZE, AMPHIPOD_TYPE.COPPER, AMPHIPOD_TYPE.DESERT];

const initializeBoard = () => {
  hall = new Array(7).fill(0).map<Node>(() => ({isChamber: undefined, edges: []}))
  topChambers = new Array(4).fill(0).map<Node>((_, i) => ({isChamber: types[i], edges: []}))
  bottomChambers = new Array(4).fill(0).map<Node>((_, i) => ({isChamber: types[i], edges: []}))
  
  // Connect all nodes together
  hall.forEach((chamber, i) => i > 1 && i < 6 ? connectNodes(chamber, hall[i-1], 2) : undefined);
  connectNodes(hall[0], hall[1], 1);
  connectNodes(hall[5], hall[6], 1);
  bottomChambers.forEach((chamber, i) => connectNodes(chamber, topChambers[i], 1));
  topChambers.forEach((chamber, i) => {
    connectNodes(chamber, hall[i+1], 2);
    connectNodes(chamber, hall[i+2], 2);
  });
}

const solve = (input: Puzzle): number => {
  initializeBoard();
  
  const topPods = input[0].map<Amphipod>((pod, i) => ({
    position: topChambers[i],
    state: AMPHIPOD_STATE.START,
    type: pod as AMPHIPOD_TYPE,
    visited: [],
    cost: podCost[pod as AMPHIPOD_TYPE]
  }));

  const bottomPods = input[1].map<Amphipod>((pod, i) => ({
    position: bottomChambers[i],
    state: AMPHIPOD_STATE.START,
    type: pod as AMPHIPOD_TYPE,
    visited: [],
    cost: podCost[pod as AMPHIPOD_TYPE]
  }))
  
  let states: State[] = [{pods:[...topPods, ...bottomPods], cost: 0}];
  let minCost = Number.MAX_SAFE_INTEGER;
  
  // Calculate solution
  while(states.length > 0){
    const newStates = states.flatMap(mapState);
    if(newStates.length === 1){
      console.log(newStates);
    }
    
    // Filter out finished states and update minCost
    minCost = Math.min(minCost, ...newStates
      .filter(state => state.pods.every(pod => pod.state === AMPHIPOD_STATE.HOME))
      .map(state => state.cost))

    // Filter out states with no potential
    states = newStates.filter(state => state.cost < minCost);
  }
  
  return minCost; 
}

export default () => solve(readAmphipods(23));
export const testSolve23A = () => solve(readAmphipods(23, true))