# BinaryTree

**代码说明**

1. **BinaryTreeNode 类**：
   - `constructor(data)`：初始化节点的数据和左右子节点。
   - `addLeft(childNode)`：添加左子节点。
   - `addRight(childNode)`：添加右子节点。
2. **BinaryTree 类**：
   - `constructor(rootData)`：初始化树的根节点。
   - `traversePreOrder(fn)`：前序遍历，访问顺序为：根 -> 左 -> 右。
   - `traverseInOrder(fn)`：中序遍历，访问顺序为：左 -> 根 -> 右。
   - `traversePostOrder(fn)`：后序遍历，访问顺序为：左 -> 右 -> 根。
   - `insert(data)`：插入新节点，使用层次遍历的方式找到合适的位置。
3. **测试代码**：
   - 创建一个二叉树，插入节点，并进行前序、中序和后序遍历，输出节点数据。