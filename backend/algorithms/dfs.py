import time

def dfs(grid, start, end):
    """
    DFS Algorithm - Explores depth first
    Time Complexity: O(V + E)
    Space Complexity: O(V)
    """
    start_time = time.time()
    rows, cols = len(grid), len(grid[0])
    stack = [start]
    visited = set([start])
    parent = {}
    directions = [(1,0), (-1,0), (0,1), (0,-1)]
    nodes_explored = 0
    
    while stack:
        current = stack.pop()
        nodes_explored += 1
        
        if current == end:
            break
            
        for dr, dc in directions:
            nr, nc = current[0] + dr, current[1] + dc
            
            if (0 <= nr < rows and 0 <= nc < cols and 
                grid[nr][nc] != "wall" and 
                (nr, nc) not in visited):
                
                visited.add((nr, nc))
                parent[(nr, nc)] = current
                stack.append((nr, nc))
    
    # Reconstruct path
    path = []
    node = end
    while node in parent:
        path.append(node)
        node = parent[node]
    if path:
        path.append(start)
    path.reverse()
    
    end_time = time.time()
    
    return {
        "visited": list(visited),
        "path": path,
        "distance": len(path) - 1 if path else 0,
        "time": round((end_time - start_time) * 1000, 2),
        "nodesExplored": nodes_explored,
        "algorithm": "DFS"
    }
