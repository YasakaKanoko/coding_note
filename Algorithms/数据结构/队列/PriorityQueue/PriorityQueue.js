const Queue = require('../ArrayQueue/array_queue');
class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
class PriorityQueue extends Queue {
    constructor() {
        super();
    }
    enqueue(element, priority) {
        const queueElement = new QueueElement(element, priority);
        // 判断队列是否为空, 如果为空, 不需要判断直接添加
        if (this.isEmpty()) {
            this.items.push(queueElement);
        } else {
            // 定义一个变量记录是否成功添加了新元素
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                // 新插入的元素进行优先级比较, priority越小, 优先级越大
                if (queueElement.priority < this.items[i].priority) {
                    // 在指定位置插入
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            // 如果遍历完所有元素，优先级都大于新插入的元素，就将新插入的元素插入到最后
            if (!added) {
                this.items.push(queueElement);
            }
        }
    }
    dequeue() {
        return super.dequeue();
    }
    peek() {
        return super.peek();
    }
    size() {
        return super.size();
    }
    toString() {
        let result = "";
        for (let item of this.items) {
            result += item.element + "-" + item.priority + " ";
        }
        return result;
    }
}
module.exports = PriorityQueue;