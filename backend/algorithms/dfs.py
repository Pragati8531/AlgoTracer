def dfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    stack = [start]
    visited = set()
    parent = {}
    order = []

    visited.add(start)

    while stack:
        node = stack.pop()
        order.append(node)

        if node == end:
            break

        r, c = node
        for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:
            nr, nc = r + dr, c + dc
            if (
                0 <= nr < rows and
                0 <= nc < cols and
                grid[nr][nc] != 1 and
                (nr, nc) not in visited
            ):
                visited.add((nr, nc))
                parent[(nr, nc)] = node
                stack.append((nr, nc))

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
