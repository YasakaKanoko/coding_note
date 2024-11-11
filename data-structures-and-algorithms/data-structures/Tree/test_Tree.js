const { Tree, Node } = require('./Tree');
// 测试代码
const tree = new Tree('Root');
const child1 = new Node('Child 1');
const child2 = new Node('Child 2');
const grandChild1 = new Node('Grandchild 1');

tree.root.addChild(child1);
tree.root.addChild(child2);
child1.addChild(grandChild1);

// 深度优先遍历
console.log('深度优先遍历:');
tree.traverseDF(node => console.log(node.data));

// 广度优先遍历
console.log('广度优先遍历:');
tree.traverseBF(node => console.log(node.data));