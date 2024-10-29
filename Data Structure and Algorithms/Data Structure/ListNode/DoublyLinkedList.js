// 双向链表
// None <- 1 <=> 2 <=> 3 <=> 4 <=> 5-> None
class ListNode {
    constructor(val, next, prev) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
        this.prev = prev === undefined ? null : prev;
    }
}