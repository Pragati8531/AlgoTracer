from collections import deque

def bfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    queue = deque([start])
    parent = {}
    order = []

    # ✅ Mark the start node as visited at the beginning
    visited.add(start)

    while queue:
        node = queue.popleft()
        order.append(node)

        if node == end:
            break

        for dr, dc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            r, c = node[0] + dr, node[1] + dc
            if (
                0 <= r < rows and
                0 <= c < cols and
                grid[r][c] != 1 and
                (r, c) not in visited
            ):
                visited.add((r, c))
                parent[(r, c)] = node
                queue.append((r, c))

    # Reconstruct the shortest path
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
