class Stack {
    #stack;
    constructor() {
        this.#stack = [];
    }

    // size(): 获取栈中元素的个数
    get size() {
        return this.#stack.length;
    }

    // isEmpty(): 判断栈是否为空
    isEmpty() {
        return this.#stack.length === 0;
    }

    // push(item): 入栈。栈顶添加元素
    push(item) {
        this.#stack.push(item);
    }

    // pop(): 出栈。弹出栈顶元素并返回
    pop() {
        if (this.isEmpty()) throw new Error('栈为空');
        return this.#stack.pop();
    }

    // peek(): 查看栈顶元素
    peek() {
        if (this.isEmpty()) throw new Error('栈为空');
        return this.#stack[this.#stack.length - 1];
    }

    // toString(): 以字符串的形式返回栈内数据
    toString() {
        let result = "";
        for (let item of this.#stack) {
            result += item + " ";
        }
        return result;
    }

    // toArray(): 返回Array
    toArray() {
        return this.#stack;
    }
}

module.exports = Stack;