// 链表类
// 单向链表: 1 -> 2 -> 3 -> 4 -> 5 -> None
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
// 初始化链表
const n0 = new ListNode(1);
const n1 = new ListNode(3);
const n2 = new ListNode(2);
const n3 = new ListNode(5);
const n4 = new ListNode(4);

n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;

// 插入
// 在n0后插入节点p
function insert(n0, p) {
    // n0->n1, p->n1, n0->p->n1
    const n1 = n0.next;
    p.next = n1;
    n0.next = p;
}

// 删除: 删除n0之后的首个节点p
function remove(n0) {
    if (!n0.next) return;
    // n0->p->n1
    const p = n0.next;
    // p->n1
    const n1 = p.next;
    // n0->n1
    n0.next = n1;
}

// 访问
function access(head, index) {
    for (let i = 0; i < index; i++) {
        if (!head) {
            return null;
        }
        head = head.next;
    }
    return head;
}

// 查找
function find(head, target) {
    let index = 0;
    while (head !== null) {
        if (head.val === target) {
            return index;
        }
        head = head.next;
        index += 1;
    }
    return -1;
}