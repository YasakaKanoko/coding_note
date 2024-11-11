class TreeNode {
    constructor(data) {
        this.data = data; // 节点数据
        this.left = null; // 左子节点
        this.right = null; // 右子节点
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null; // 初始化树的根节点
    }

    // 插入节点
    insert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode; // 如果树为空，设置根节点
            return;
        }

        let currentNode = this.root;
        while (true) {
            if (data < currentNode.data) {
                // 插入左子树
                if (!currentNode.left) {
                    currentNode.left = newNode;
                    return;
                }
                currentNode = currentNode.left;
            } else {
                // 插入右子树
                if (!currentNode.right) {
                    currentNode.right = newNode;
                    return;
                }
                currentNode = currentNode.right;
            }
        }
    }

    // 查找节点
    search(data) {
        let currentNode = this.root;
        while (currentNode) {
            if (data === currentNode.data) {
                return currentNode; // 找到节点
            } else if (data < currentNode.data) {
                currentNode = currentNode.left; // 向左子树查找
            } else {
                currentNode = currentNode.right; // 向右子树查找
            }
        }
        return null; // 未找到节点
    }

    // 删除节点
    delete(data) {
        this.root = this._deleteNode(this.root, data);
    }

    _deleteNode(node, data) {
        if (!node) return null; // 如果节点为空，返回null

        if (data < node.data) {
            node.left = this._deleteNode(node.left, data); // 在左子树中删除
        } else if (data > node.data) {
            node.right = this._deleteNode(node.right, data); // 在右子树中删除
        } else {
            // 找到要删除的节点
            if (!node.left && !node.right) {
                return null; // 叶子节点
            } else if (!node.left) {
                return node.right; // 只有右子节点
            } else if (!node.right) {
                return node.left; // 只有左子节点
            } else {
                // 有两个子节点，找到右子树的最小值
                let minNode = this._findMin(node.right);
                node.data = minNode.data; // 替换数据
                node.right = this._deleteNode(node.right, minNode.data); // 删除最小值节点
            }
        }
        return node; // 返回更新后的节点
    }

    _findMin(node) {
        while (node.left) {
            node = node.left; // 找到最小值节点
        }
        return node;
    }

    // 中序遍历
    inOrderTraversal(fn) {
        function traverse(node) {
            if (node) {
                traverse(node.left);
                fn(node);
                traverse(node.right);
            }
        }
        traverse(this.root);
    }
}
module.exports = BinarySearchTree;