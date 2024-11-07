# Map

字典 ( Map ) 存储的是 **键值对**

`key` 不能重复且无序，`value` 可以重复

## 常见操作

- `set(key, value)`：字典中添加新元素
- `remove(key)`：通过指定键移除键对应的数据
- `has(key)`：判断某个键是否在字典中
- `get(key)`：通过键名获取特定键值并返回
- `clear()`：将字典的所有元素删除
- `size()`：返回字典的长度
- `keys()`：将字典的键名以数组形式返回
- `values()`：将字典的键值以数组形式返回

## Map 类

```javascript
class Map {
    constructor() {
        this.items = {};
    }
}
```

### `set()`

`set(key, value)`：字典中添加新元素

```javascript
// set(key, value): 字典中添加新元素
set(key, value) {
    this.items[key] = value;
}
```

### `has()`

`has(key)`：判断某个键是否存在于字典中

```javascript
has(key) {
    return this
}
```

### `remove()`

`remove(key)`：删除指定 `key`

```javascript
// remove(key): 删除指定key
remove(key) {
    if (!this.has(key)) return false;
    delete this.items[key];
}
```

### `get()`

`get(key)`：通过 `key` 获取指定 `value`

```javascript
// get(key): 通过key获取指定value
get(key) {
    return this.has(key) ? this.items[key] : undefined;
}
```

### `keys()`

`keys()`：获取所有 `key`，以数组形式返回

```javascript
// keys(): 获取所有key 
keys() {
    return Object.keys(this.items);
}
```

### `values()`

`values()`：获取所有 `value`, 以数组形式返回

```javascript
// values(): 获取所有value, 以数组形式返回
values() {
    return Object.values(this.items);
}
```

### `size()`

`size()`：获取字典长度

```javascript
// size(): 获取字典长度
get size() {
    return this.keys().length;
}
```

### `clear()`

`clear()`：清空字典

```javascript
// clear(): 清空字典
clear() {
    this.items = {};
}
```

# 完整代码

```javascript
class Map {
    constructor() {
        this.items = {};
    }

    // set(key, value): 字典中添加新元素
    set(key, value) {
        this.items[key] = value;
    }

    // has(key): 判断某个键是否存在于字典中
    has(key) {
        return this.items.hasOwnProperty(key);
    }

    // remove(key): 删除指定key
    remove(key) {
        if (!this.has(key)) return false;
        delete this.items[key];
    }

    // get(key): 通过key获取指定value
    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    // keys(): 获取所有key, 以数组形式返回
    keys() {
        return Object.keys(this.items);
    }

    // values(): 获取所有value, 以数组形式返回
    values() {
        return Object.values(this.items);
    }

    // size(): 获取字典长度
    get size() {
        return this.keys().length;
    }

    // clear(): 清空字典
    clear() {
        this.items = {};
    }

}
module.exports = Map;
```

# 测试

```javascript
const Map = require('./Map');
const map = new Map();

// set(key, value)
map.set('name', 'Jolyne');
map.set('age', 18);
map.set('email', 'Cujoh@Jolyne.com');
console.log(map.items); // {name: 'Jolyne', age: 18, email: 'Cujoh@Jolyne.com'}

// has(key
console.log(map.has('name')); // true
console.log(map.has('address')); // false

// remove(key)
map.remove('name');
console.log(map.items); // {age: 18, email: 'Cujoh@Jolyne.com'}

// get(key)
console.log(map.get('email')); // Cujoh@Jolyne.com

// size()
console.log(map.size); // 2

// keys()
console.log(map.keys()); // (2) ['age', 'email']

// values()
console.log(map.values()); // (2) [18, 'Cujoh@Jolyne.com']

// clear()
map.clear();
console.log(map.items); // {}
```

