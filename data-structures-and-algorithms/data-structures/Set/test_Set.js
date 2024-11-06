const Set = require('./Set');
const set = new Set();

// add() 测试
set.add("a");
set.add("a");
set.add("b");
set.add("c");
console.log(set.items); // {a: 'a', b: 'b', c: 'c'}

// has() 测试
console.log(set.has('a')); // true
console.log(set.has('d')); // false

// remove() 测试
set.remove('a');
console.log(set.items); // {b: 'b', c: 'c'}

// size() 测试
console.log(set.size); // 2

// values() 测试
console.log(set.values()); // (2) ['b', 'c']

// clear() 测试
set.clear();
console.log(set.items); // {}

// 并集
let s1 = new Set();
s1.add('a');
s1.add('b');
s1.add('c');
let s2 = new Set();
s2.add('a');
s2.add('b');
s2.add('d');
console.log(s1.union(s2).items); // {a: 'a', b: 'b', c: 'c', d: 'd'}

// 交集
console.log(s1.intersection(s2).items); // {a: 'a', b: 'b'}

// 差集
console.log(s2.difference(s1).items); // {d: 'd'}

// 子集
console.log(s1.subset(s2)); // false
console.log((s1.intersection(s2)).subset(s1)); // true