from flask import Flask, request, jsonify
from flask_cors import CORS
from algorithms.bfs import bfs
from algorithms.dfs import dfs
from algorithms.astar import a_star
from algorithms.dijkstra import dijkstra
from algorithms.gbfs import gbfs
import time
import traceback

app = Flask(__name__)
CORS(app)

def validate_request(data):
    if "grid" not in data or not isinstance(data["grid"], list) or not data["grid"]:
        return "Invalid or empty grid received"
    if "start" not in data or "end" not in data:
        return "Missing start or end positions"

    grid = data["grid"]
    start = tuple(data["start"])
    end = tuple(data["end"])
    rows = len(grid)
    cols = len(grid[0]) if rows > 0 else 0

    if not (0 <= start[0] < rows and 0 <= start[1] < cols):
        return f"Start position {start} is out of bounds ({rows}x{cols})"
    if not (0 <= end[0] < rows and 0 <= end[1] < cols):
        return f"End position {end} is out of bounds ({rows}x{cols})"
    return None


def run_algorithm(algo_func, grid, start, end):
    start_time = time.perf_counter()
    result = algo_func(grid, start, end)
    end_time = time.perf_counter()
    result["time"] = (end_time - start_time) * 1000  # ms
    return result


@app.route("/api/run-bfs", methods=["POST"])
def run_bfs():
    try:
        data = request.get_json()
        error = validate_request(data)
        if error:
            return jsonify({"error": error}), 400

        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])

        print(f"🟩 BFS | Grid: {len(grid)}x{len(grid[0])}, Start: {start}, End: {end}")

        result = run_algorithm(bfs, grid, start, end)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/run-dfs", methods=["POST"])
def run_dfs():
    try:
        data = request.get_json()
        error = validate_request(data)
        if error:
            return jsonify({"error": error}), 400

        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])

        print(f"🟦 DFS | Grid: {len(grid)}x{len(grid[0])}, Start: {start}, End: {end}")

        result = run_algorithm(dfs, grid, start, end)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/run-astar", methods=["POST"])
def run_astar():
    try:
        data = request.get_json()
        error = validate_request(data)
        if error:
            return jsonify({"error": error}), 400

        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])

        print(f"🟨 A* | Grid: {len(grid)}x{len(grid[0])}, Start: {start}, End: {end}")

        result = run_algorithm(a_star, grid, start, end)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/run-dijkstra", methods=["POST"])
def run_dijkstra():
    try:
        data = request.get_json()
        error = validate_request(data)
        if error:
            return jsonify({"error": error}), 400

        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])

        print(f"🟧 Dijkstra | Grid: {len(grid)}x{len(grid[0])}, Start: {start}, End: {end}")

        result = run_algorithm(dijkstra, grid, start, end)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/run-gbfs", methods=["POST"])
def run_gbfs():
    try:
        data = request.get_json()
        error = validate_request(data)
        if error:
            return jsonify({"error": error}), 400

        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])

        print(f"🟪 GBFS | Grid: {len(grid)}x{len(grid[0])}, Start: {start}, End: {end}")

        result = run_algorithm(gbfs, grid, start, end)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/algorithms", methods=["GET"])
def get_algorithms():
    return jsonify({
        "algorithms": [
            {"id": "bfs", "name": "Breadth-First Search"},
            {"id": "dfs", "name": "Depth-First Search"},
            {"id": "astar", "name": "A* Search"},
            {"id": "dijkstra", "name": "Dijkstra’s Algorithm"},
            {"id": "gbfs", "name": "Greedy Best-First Search"}
        ]
    })


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "timestamp": time.time()})


if __name__ == "__main__":
    print("🚀 AlgoTracer Backend Server Started!")
    print("📊 Available endpoints:")
    print("   POST /api/run-bfs")
    print("   POST /api/run-dfs")
    print("   POST /api/run-astar")
    print("   POST /api/run-dijkstra")
    print("   POST /api/run-gbfs")
    print("   GET  /api/algorithms")
    print("   GET  /api/health")
    app.run(debug=True, port=5000)
