const BinaryTree = require('./BinaryTree');
// 测试代码
const binaryTree = new BinaryTree('Root');
binaryTree.insert('Child 1');
binaryTree.insert('Child 2');
binaryTree.insert('Child 3');
binaryTree.insert('Child 4');

// 前序遍历
console.log('前序遍历:');
binaryTree.traversePreOrder(node => console.log(node.data));

// 中序遍历
console.log('中序遍历:');
binaryTree.traverseInOrder(node => console.log(node.data));

// 后序遍历
console.log('后序遍历:');
binaryTree.traversePostOrder(node => console.log(node.data));