const Stack = require('./array_stack');

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.toArray()); // (3) [1, 2, 3]

console.log(stack.pop()); // 3

console.log(stack.peek()); // 2

console.log(stack.isEmpty()); // false

console.log(stack.size); // 2

console.log(stack.toString()); // 1 2