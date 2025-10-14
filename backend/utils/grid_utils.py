def manhattan_distance(point1, point2):
    """Calculate Manhattan distance between two points"""
    return abs(point1[0] - point2[0]) + abs(point1[1] - point2[1])

def is_valid_move(grid, position):
    """Check if move is valid (within bounds and not wall)"""
    rows, cols = len(grid), len(grid[0])
    row, col = position
    return 0 <= row < rows and 0 <= col < cols and grid[row][col] != "wall"
