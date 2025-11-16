import heapq
from utils.grid_utils import manhattan_distance

def a_star(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    open_set = []
    heapq.heappush(open_set, (0, start))
    parent = {}
    g_score = {start: 0}
    visited_nodes = set()
    order = []

    while open_set:
        _, current = heapq.heappop(open_set)

        if current in visited_nodes:
            continue
        visited_nodes.add(current)
        order.append(current)

        if current == end:
            break

        r, c = current
        for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                tentative_g = g_score[current] + 1
                neighbor = (nr, nc)
                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    g_score[neighbor] = tentative_g
                    f_score = tentative_g + manhattan_distance(neighbor, end)
                    heapq.heappush(open_set, (f_score, neighbor))
                    parent[neighbor] = current

    path = []
    node = end
    while node in parent:
        path.append(node)
        node = parent[node]
    path.reverse()

    return {
        "visitedNodes": order,
        "path": path
    }
