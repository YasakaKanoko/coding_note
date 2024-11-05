const Queue = require('./array_queue');

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.items); // (4) [1, 2, 3, 4]

queue.dequeue();
console.log(queue.items); // (3) [2, 3, 4]

console.log(queue.peek()); // 2

console.log(queue.isEmpty()); //false

console.log(queue.size()); // 3

console.log(queue.toString()); // 2 3 4