const PriorityQueue = require('./PriorityQueue');
const priorityQueue = new PriorityQueue();

// 入队
priorityQueue.enqueue("A", 10);
priorityQueue.enqueue("B", 15);
priorityQueue.enqueue("C", 11);
priorityQueue.enqueue("D", 20);
priorityQueue.enqueue("E", 18);
console.log(priorityQueue.items);
// Output:
// QueueElement {element: "A", priority: 10}
// QueueElement {element: "C", priority: 11}
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// 出队
priorityQueue.dequeue();
priorityQueue.dequeue();
console.log(priorityQueue.items);
// Output:
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// isEmpty() 
console.log(priorityQueue.isEmpty()); // false

// size() 
console.log(priorityQueue.size()); // 3

// toString() 
console.log(priorityQueue.toString()); // B-15 E-18 D-20