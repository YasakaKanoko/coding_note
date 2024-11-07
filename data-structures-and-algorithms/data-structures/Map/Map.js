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