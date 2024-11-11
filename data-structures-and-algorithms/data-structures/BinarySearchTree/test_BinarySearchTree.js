const BinarySearchTree = require('./BinarySearchTree');
// 测试代码
const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);

// 中序遍历
console.log('中序遍历:');
bst.inOrderTraversal(node => console.log(node.data)); // 输出: 2, 3, 4, 5, 6, 7, 8

// 查找节点
console.log('查找节点 4:', bst.search(4) ? '找到' : '未找到'); // 输出: 找到
console.log('查找节点 10:', bst.search(10) ? '找到' : '未找到'); // 输出: 未找到

// 删除节点
bst.delete(3);
console.log('删除节点 3 后的中序遍历:');
bst.inOrderTraversal(node => console.log(node.data)); // 输出: 2, 4, 5, 6, 7, 8