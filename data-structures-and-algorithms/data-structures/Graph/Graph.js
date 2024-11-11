class Graph {
    constructor() {
        this.adjacencyList = {}; // 邻接表
    }

    // 添加节点
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = []; // 初始化邻接表
        }
    }

    // 添加边（无向图）
    addEdge(vertex1, vertex2) {
        this.addVertex(vertex1); // 确保节点存在
        this.addVertex(vertex2); // 确保节点存在
        this.adjacencyList[vertex1].push(vertex2); // 添加边
        this.adjacencyList[vertex2].push(vertex1); // 添加反向边
    }

    // 删除边
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
    }

    // 删除节点
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop(); // 移除所有相邻节点
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex]; // 删除节点
    }

    // 深度优先遍历
    depthFirstTraversal(startVertex, fn) {
        const visited = {};
        const traverse = (vertex) => {
            if (!vertex) return;
            visited[vertex] = true; // 标记为已访问
            fn(vertex); // 执行传入的函数
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    traverse(neighbor); // 递归遍历
                }
            });
        };
        traverse(startVertex);
    }

    // 广度优先遍历
    breadthFirstTraversal(startVertex, fn) {
        const queue = [startVertex];
        const visited = { [startVertex]: true }; // 标记为已访问

        while (queue.length) {
            const vertex = queue.shift(); // 从队列中取出第一个节点
            fn(vertex); // 执行传入的函数
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true; // 标记为已访问
                    queue.push(neighbor); // 加入队列
                }
            });
        }
    }
}
module.exports = Graph;