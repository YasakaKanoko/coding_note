const Queue = require('./array_queue');
function passGame(nameList, number) {
    const queue = new Queue();
    // 入队
    for (const name of nameList) {
        queue.enqueue(name);
    }
    while (queue.size() > 1) {
        for (let i = 0; i < number - 1; i++) {
            queue.enqueue(queue.dequeue());
        }
        queue.dequeue();
    }
    const endName = queue.peek();
    return nameList.indexOf(endName);
}

// passGame() 测试
const names = ["lily", "lucy", "tom", "tony", "jack"];
const targetIndex = passGame(names, 4);
console.log("击鼓传花", names[targetIndex]); // lily