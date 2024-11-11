# Graph

图（Graph）数据结构可以通过使用邻接表（Adjacency List）或邻接矩阵（Adjacency Matrix）来表示。

**图的基本结构**

1. **节点（Vertex）**：图中的基本单位，可以是任何数据类型。
2. **边（Edge）**：连接两个节点的关系，可以是有向的或无向的。

**代码说明**

1. **Graph 类**：
   - `constructor()`：初始化邻接表。
   - `addVertex(vertex)`：添加节点到图中。
   - `addEdge(vertex1, vertex2)`：添加无向边，确保两个节点都存在。
   - `removeEdge(vertex1, vertex2)`：删除无向边。
   - `removeVertex(vertex)`：删除节点及其所有相邻边。
   - `depthFirstTraversal(startVertex, fn)`：深度优先遍历，接受一个函数作为参数，对每个节点执行该函数。
   - `breadthFirstTraversal(startVertex, fn)`：广度优先遍历，接受一个函数作为参数，对每个节点执行该函数。
2. **测试代码**：
   - 创建一个图，添加节点和边，进行深度优先和广度优先遍历，输出节点数据。
   - 删除边和节点，并输出更新后的邻接表。