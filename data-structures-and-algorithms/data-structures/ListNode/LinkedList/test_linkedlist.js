const { LinkedList } = require('./LinkedList');

const linkedList = new LinkedList();

// 测试 append 方法
linkedList.append("1");
linkedList.append("2");
linkedList.append("3");
console.log(linkedList.toString()); // 1 -> 2 -> 3 -> null

// 测试 insert 方法
linkedList.insert(0, "0");
linkedList.insert(4, "4");
console.log(linkedList.toString()); // 0 -> 1 -> 2 -> 3 -> 4 -> null

// 测试 getData 方法
console.log(linkedList.getData(0)); // 0
console.log(linkedList.getData(1)); // 1

// 测试 indexOf 方法
console.log(linkedList.indexOf("1")); // 1
console.log(linkedList.indexOf("A")); // -1

// 测试 update 方法
linkedList.update(0, "A");
console.log(linkedList.toString()); // A -> 1 -> 2 -> 3 -> 4 -> null
linkedList.update(1, "B");
console.log(linkedList.toString()); // A -> B -> 2 -> 3 -> 4 -> null

// 测试 removeAt 方法
linkedList.removeAt(3);
console.log(linkedList.toString()); // A -> B -> 2 -> 4 -> null

// 测试 remove 方法
linkedList.remove("A");
console.log(linkedList.toString()); // B -> 2 -> 4 -> null

// 测试 isEmpty 方法
console.log(linkedList.isEmpty()); // false

// 测试 size 方法
console.log(linkedList.size); // 3