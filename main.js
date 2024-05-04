// Generate board

function generateBoard() {
  const chessBoard = [];
  let counter = 0;
  for (let i = 0; i < 8; i++) {
    chessBoard[i] = [];
    console.log(1);
    for (let j = 0; j < 8; j++) {
      chessBoard[i].push(counter++);
    }
  }

  return chessBoard;
}

function numberToMovement(nodeNumber) {
  const table = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.push([i, j]);
    }
  }

  return table[nodeNumber];
}

function generatePathsGraph(board) {
  const graph = [];
  // Preparing graph representation
  for (let i = 0; i < 64; i++) {
    // Push all vertices list
    graph.push([]);
  }

  const movements = [
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [2, 1],
    [-2, 1],
    [2, -1],
    [-2, -1],
  ];

  // Apply edges
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const vertex = chessBoard[i][j];
      const possibleMovements = movements.filter((mov) => {
        if (i + mov[0] < 0 || i + mov[0] > 7) {
          return false;
        }
        if (j + mov[1] < 0 || j + mov[1] > 7) {
          return false;
        }

        return true;
      });

      possibleMovements.forEach((e) => {
        const fullMovement = [i + e[0], j + e[1]];
        const neighbor = chessBoard[fullMovement[0]][fullMovement[1]];
        graph[vertex].push(neighbor);
      });
    }
  }

  return graph;
}

function solve(s, graph) {
  const q = [];
  q.push(s);

  const visited = [];
  const prev = [];

  for (var i = 0; i < graph.length; i++) {
    visited.push(false);
    prev.push(null);
  }

  visited[s] = true;

  while (q.length !== 0) {
    const node = q.shift();
    neighbors = graph[node];

    for (let i = 0; i < neighbors.length; i++) {
      const next = neighbors[i];
      if (!visited[next]) {
        q.push(next);
        visited[next] = true;
        console.log(next);
        prev[next] = node;
      }
    }
  }

  return prev;
}

function bfs(s, e) {
  const prev = solve(s, graph);

  return reconstructPath(s, e, prev);
}

function reconstructPath(s, e, prev) {
  const path = [];
  for (at = e; at != null; at = prev[at]) {
    path.push(at);
  }

  path.reverse();

  if (path[0] === s) {
    const newPath = path.map(numberToMovement);
    return newPath;
  }
  return [];
}

function knightMoves(sPos, ePos) {
  const chessBoard = generateBoard();
  sTrans = chessBoard[sPos[0]][sPos[1]];
  eTrans = chessBoard[ePos[0]][ePos[1]];

  return bfs(sTrans, eTrans);
}

const chessBoard = generateBoard();
const graph = generatePathsGraph(chessBoard);
const path = bfs(3, 23);
console.log(knightMoves([0, 0], [3, 3]));
