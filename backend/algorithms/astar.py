import heapq
import time
from utils.grid_utils import manhattan_distance

def a_star(grid, start, end):
    """
    A* Algorithm - Optimal pathfinding with heuristics
    Time Complexity: O(E log V)
    Space Complexity: O(V)
    """
    start_time = time.time()
    rows, cols = len(grid), len(grid[0])
    
    # Priority queue: (f_score, g_score, node)
    open_set = []
    heapq.heappush(open_set, (0, 0, start))
    
    came_from = {}
    g_score = {start: 0}  # Cost from start to node
    f_score = {start: manhattan_distance(start, end)}  # Estimated total cost
    
    visited = set()
    nodes_explored = 0
    
    while open_set:
        current_f, current_g, current = heapq.heappop(open_set)
        nodes_explored += 1
        visited.add(current)
        
        if current == end:
            break
            
        for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:
            neighbor = (current[0] + dr, current[1] + dc)
            
            if (0 <= neighbor[0] < rows and 0 <= neighbor[1] < cols and 
                grid[neighbor[0]][neighbor[1]] != "wall"):
                
                tentative_g = current_g + 1
                
                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + manhattan_distance(neighbor, end)
                    
                    if neighbor not in visited:
                        heapq.heappush(open_set, (f_score[neighbor], g_score[neighbor], neighbor))
    
    # Reconstruct path
    path = []
    node = end
    while node in came_from:
        path.append(node)
        node = came_from[node]
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
        "algorithm": "A*"
    }
