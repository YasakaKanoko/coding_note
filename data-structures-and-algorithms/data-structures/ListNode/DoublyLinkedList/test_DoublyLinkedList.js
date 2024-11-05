const DoublyLinkedList = require('./DoublyLinkedList');
const doublyLinkedList = new DoublyLinkedList();

// append() 测试
doublyLinkedList.append("Z");
doublyLinkedList.append("X");
doublyLinkedList.append("C");
console.log(doublyLinkedList.forwardToString()); // z->x->c
console.log(doublyLinkedList.backwardString()); // c->x->z

// insert() 测试
doublyLinkedList.insert(0, "0");
doublyLinkedList.insert(2, "2");
console.log(doublyLinkedList.forwardToString());// 0->z->2->x->c
console.log(doublyLinkedList.backwardString()); // c->x->2->z->0 

// getData() 测试
console.log(doublyLinkedList.getData(1)); // z

// indexOf() 测试
console.log(doublyLinkedList.indexOf("X")); // 3

// removeAt() 测试
doublyLinkedList.removeAt(0);
doublyLinkedList.removeAt(1);
console.log(doublyLinkedList.forwardToString());// z->x->c
console.log(doublyLinkedList.backwardString()); // c->x->2->z

// update() 测试
doublyLinkedList.update(0, "1");
console.log(doublyLinkedList.forwardToString());// 1->x->c
console.log(doublyLinkedList.backwardString());// c->x->1

// remove() 测试
doublyLinkedList.remove("1")
console.log(doublyLinkedList.forwardToString()); // x->c
console.log(doublyLinkedList.backwardString()); // c->x