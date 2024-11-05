class Queue {
    constructor() {
        this.items = [];
    }

    // enqueue(item): 入队。将元素添加至队列尾部
    enqueue(item) {
        this.items.push(item);
    }

    // dequeue(): 出队，删除队首元素并返回
    dequeue() {
        return this.items.shift();
    }

    // peek(): 查看队首元素——最先被添加的元素，也是最先被移出的元素
    peek() {
        return this.items[0];
    }

    // isEmpty(): 查看队列是否为空
    isEmpty() {
        return this.items.length === 0;
    }

    // size(): 查看队列中的元素个数
    size() {
        return this.items.length;
    }

    // toString(): 以字符串的形式返回栈内数据
    toString() {
        let result = "";
        for (let item of this.items) {
            result += item + " ";
        }
        return result;
    }
}

module.exports = Queue;