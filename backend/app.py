# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from algorithms.bfs import bfs
# from algorithms.dfs import dfs
# from algorithms.astar import a_star  # ✅ NEW
# import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from algorithms.bfs import bfs
from algorithms.dfs import dfs
from algorithms.astar import a_star
from utils.grid_utils import manhattan_distance
import time

app = Flask(__name__)
CORS(app)

@app.route("/api/run-bfs", methods=["POST"])
def run_bfs():S
    try:
        data = request.get_json()
        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])
        
        result = bfs(grid, start, end)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/run-dfs", methods=["POST"])
def run_dfs():
    try:
        data = request.get_json()
        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])
        
        result = dfs(grid, start, end)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/run-astar", methods=["POST"])  # ✅ NEW ENDPOINT
def run_astar():
    try:
        data = request.get_json()
        grid = data["grid"]
        start = tuple(data["start"])
        end = tuple(data["end"])
        
        result = a_star(grid, start, end)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/algorithms", methods=["GET"])  # ✅ NEW ENDPOINT
def get_algorithms():
    """Returns available algorithms"""
    return jsonify({
        "algorithms": [
            {"id": "bfs", "name": "Breadth-First Search", "description": "Finds shortest path in unweighted graphs"},
            {"id": "dfs", "name": "Depth-First Search", "description": "Explores depth first, memory efficient"},
            {"id": "astar", "name": "A* Search", "description": "Optimal pathfinding with heuristics"}
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
    print("   GET  /api/algorithms")
    print("   GET  /api/health")
    app.run(debug=True, port=5000)
