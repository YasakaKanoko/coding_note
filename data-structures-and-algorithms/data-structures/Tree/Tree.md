# Tree

在 JavaScript 中实现树（Tree）数据结构可以通过创建一个节点（Node）类和一个树（Tree）类来完成。树是一种层次结构的数据结构，由节点组成，每个节点可以有多个子节点。

**树的基本结构**

1. **节点（Node）**：每个节点包含数据和指向子节点的引用。
2. **树（Tree）**：树包含一个根节点，根节点是树的起始点。

1. **Node 类**：
   - `constructor(data)`：初始化节点的数据和子节点数组。
   - `addChild(childNode)`：添加子节点。
   - `removeChild(childNode)`：移除子节点。
2. **Tree 类**：
   - `constructor(rootData)`：初始化树的根节点。
   - `traverseDF(fn)`：深度优先遍历，接受一个函数作为参数，对每个节点执行该函数。
   - `traverseBF(fn)`：广度优先遍历，使用队列实现。
3. **测试代码**：
   - 创建一个树，添加节点，并进行深度优先和广度优先遍历，输出节点数据。