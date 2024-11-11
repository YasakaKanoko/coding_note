const Graph = require('./Graph');
// 测试代码
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');

// 深度优先遍历
console.log('深度优先遍历:');
graph.depthFirstTraversal('A', vertex => console.log(vertex)); // 输出: A, B, D, C

// 广度优先遍历
console.log('广度优先遍历:');
graph.breadthFirstTraversal('A', vertex => console.log(vertex)); // 输出: A, B, C, D

// 删除边
console.log(graph.adjacencyList);
graph.removeEdge('A', 'C');
console.log('删除边 A-C 后的邻接表:', graph.adjacencyList);

// 删除节点
graph.removeVertex('B');
console.log('删除节点 B 后的邻接表:', graph.adjacencyList);