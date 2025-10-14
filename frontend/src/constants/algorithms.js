export const ALGORITHMS = {
  BFS: {
    name: "Breadth-First Search",
    description: "Finds shortest path in unweighted graphs",
    complexity: "O(V + E)",
    guarantee: "Finds shortest path",
  },
  DFS: {
    name: "Depth-First Search", 
    description: "Explores depth first, memory efficient",
    complexity: "O(V + E)",
    guarantee: "Does not guarantee shortest path",
  },
  ASTAR: {
    name: "A* Search",
    description: "Optimal pathfinding with heuristics",
    complexity: "O(E log V)", 
    guarantee: "Finds shortest path with good heuristics",
  },
};

export const NODE_TYPES = {
  EMPTY: "empty",
  WALL: "wall", 
  START: "start",
  END: "end",
  VISITED: "visited",
  PATH: "path",
};
