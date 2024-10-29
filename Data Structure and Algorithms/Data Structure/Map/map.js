const map = new Map();

// 添加元素
map.set(1, 'S');
map.set(2, 'H');
map.set(3, 'I');
map.set(4, 'T');

for (const v of map.values()) {
    console.info(v)
}