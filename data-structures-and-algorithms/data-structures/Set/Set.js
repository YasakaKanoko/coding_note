class Set {
    constructor() {
        this.items = {};
    };

    // has(value): 判断集合中是否存在 value 值
    has(value) {
        return this.items.hasOwnProperty(value);
    }

    // add(value): 集合中添加 value
    add(value) {
        if (this.has(value)) return false;
        this.items[value] = value;
        return true;
    }

    // clear(): 清空集合中所有 value
    clear() {
        this.items = {};
    }

    // remove(value): 删除集合中指定的 value
    remove(value) {
        if (!this.has(value)) return false;
        delete this.items[value];
    }

    // size(): 获取集合中的 value 个数
    get size() {
        return Object.keys(this.items).length;
    }

    // values(): 获取集合中所有的 value
    values() {
        return Object.keys(this.items);
    }

    // union(): 并集。
    union(otherSet) {
        // 1. 创建一个新集合
        let unionSet = new Set();

        // 2. 将当前(this)的集合的所有(value)添加到新集合(OtherSet)中
        for (let value of this.values()) {
            unionSet.add(value);
        }

        // 3. 将 otherSet 集合的所有 value，添加到新集合(unionSet)中
        for (let value of otherSet.values()) {
            unionSet.add(value);
        }
        return unionSet;
    }

    // intersection(): 交集
    intersection(otherSet) {
        // 1. 创建一个新集合
        let intersectionSet = new Set();

        // 2. 从当前(this)集合中的取一个value 判断在 otherSet集合中是否存在
        for (let value of this.values()) {
            if (otherSet.has(value)) {
                intersectionSet.add(value);
            }
        }

        return intersectionSet;
    }

    // difference(): 差集
    difference(otherSet) {
        // 1. 创建新集合
        let differenceSet = new Set();
        // 2. 从当前(this)中取一个value 判断是否在otherSet中存在, 不存在就是差集
        for (let value of this.values()) {
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        }
        return differenceSet;
    }

    // subset(): 子集
    subset(otherSet) {
        // 判断当前(this)集合中的每一个value, 判断是否在otherSet中存在, 不存在返回 false
        for (let value of this.values()) {
            if (!otherSet.has(value)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Set;