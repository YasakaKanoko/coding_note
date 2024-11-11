class BinaryTreeNode {
    constructor(data) {
        this.data = data; // 节点数据
        this.left = null; // 左子节点
        this.right = null; // 右子节点
    }

    // 添加左子节点
    addLeft(childNode) {
        this.left = childNode;
    }

    // 添加右子节点
    addRight(childNode) {
        this.right = childNode;
    }
}

class BinaryTree {
    constructor(rootData) {
        this.root = new BinaryTreeNode(rootData); // 初始化树的根节点
    }

    // 深度优先遍历（前序遍历）
    traversePreOrder(fn) {
        function traverse(node) {
            if (node) {
                fn(node); // 执行传入的函数
                traverse(node.left); // 遍历左子节点
                traverse(node.right); // 遍历右子节点
            }
        }
        traverse(this.root);
    }

    // 深度优先遍历（中序遍历）
    traverseInOrder(fn) {
        function traverse(node) {
            if (node) {
                traverse(node.left); // 遍历左子节点
                fn(node); // 执行传入的函数
                traverse(node.right); // 遍历右子节点
            }
        }
        traverse(this.root);
    }

    // 深度优先遍历（后序遍历）
    traversePostOrder(fn) {
        function traverse(node) {
            if (node) {
                traverse(node.left); // 遍历左子节点
                traverse(node.right); // 遍历右子节点
                fn(node); // 执行传入的函数
            }
        }
        traverse(this.root);
    }

    // 插入节点
    insert(data) {
        const newNode = new BinaryTreeNode(data);
        const queue = [this.root];

        while (queue.length) {
            const node = queue.shift(); // 从队列中取出第一个节点

            // 如果左子节点为空，插入左子节点
            if (!node.left) {
                node.addLeft(newNode);
                return;
            }
            // 如果右子节点为空，插入右子节点
            else if (!node.right) {
                node.addRight(newNode);
                return;
            }

            // 将子节点加入队列
            queue.push(node.left);
            queue.push(node.right);
        }
    }
}
module.exports = BinaryTree;