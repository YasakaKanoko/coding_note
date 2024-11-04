const LinkedList = require('./LinkedList');

const linkedList = new LinkedList();
// 测试 append 方法
linkedList.append("A");
linkedList.append("B");
linkedList.append("C");
console.log(linkedList.toString()); // A->B->C->null
// 测试 insert 方法
linkedList.insert(0, "123");
linkedList.insert(2, "456");
console.log(linkedList.toString()); // 123->A->456->B->C->null

// 测试 getData 方法
console.log(linkedList.getData(0)); // 123
console.log(linkedList.getData(1)); // A

// 测试 indexOf 方法
console.log(linkedList.indexOf("A")); // 1
console.log(linkedList.indexOf("ABC")); // -1

// 测试 update 方法
linkedList.update(0, "12345");
console.log(linkedList.toString()); // 12345->A->456->B->C->null
linkedList.update(1, "54321");
console.log(linkedList.toString()); // 12345->54321->456->B->C->null

// 测试 removeAt 方法
linkedList.removeAt(3);
console.log(linkedList.toString()); // 12345->54321->456->C->null

// 测试 remove 方法
linkedList.remove("C");
console.log(linkedList.toString()); // 12345->54321->456->null

// 测试 isEmpty 方法
console.log(linkedList.isEmpty()); // false

// 测试 size 方法
console.log(linkedList.size); // 3