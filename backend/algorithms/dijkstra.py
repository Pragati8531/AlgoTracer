import heapq
import time

def dijkstra(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    distance = {start: 0}
    parent = {}
    order = []

    start_time = time.time()
    pq = [(0, start)]

    while pq:
        dist, node = heapq.heappop(pq)
        if node in visited:
            continue
        visited.add(node)
        order.append(node)

        if node == end:
            break

        r, c = node
        for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                new_dist = dist + 1
                neighbor = (nr, nc)
                if new_dist < distance.get(neighbor, float("inf")):
                    distance[neighbor] = new_dist
                    parent[neighbor] = node
                    heapq.heappush(pq, (new_dist, neighbor))

    path = []
    node = end
    while node in parent:
        path.append(node)
        node = parent[node]
    path.reverse()

    exec_time = (time.time() - start_time) * 1000

    return {
        "visitedNodes": order,
        "path": path,
        "time": round(exec_time, 2)
    }
