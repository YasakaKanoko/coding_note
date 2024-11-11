class Node {
    constructor(data) {
        this.data = data; // 节点数据
        this.children = []; // 子节点数组
    }

    // 添加子节点
    addChild(childNode) {
        this.children.push(childNode);
    }

    // 移除子节点
    removeChild(childNode) {
        this.children = this.children.filter(child => child !== childNode);
    }
}

class Tree {
    constructor(rootData) {
        this.root = new Node(rootData); // 初始化树的根节点
    }

    // 深度优先遍历
    traverseDF(fn) {
        function traverse(node) {
            fn(node); // 执行传入的函数
            node.children.forEach(traverse); // 遍历子节点
        }
        traverse(this.root);
    }

    // 广度优先遍历
    traverseBF(fn) {
        const queue = [this.root]; // 初始化队列
        while (queue.length) {
            const node = queue.shift(); // 从队列中取出第一个节点
            fn(node); // 执行传入的函数
            queue.push(...node.children); // 将子节点加入队列
        }
    }
}
module.exports = {
    Tree,
    Node
};