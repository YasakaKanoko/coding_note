const Stack = require('./array_stack');
function dec2bin(dec) {
    const stack = new Stack();
    while (dec > 0) {
        stack.push(dec % 2);
        dec = Math.floor(dec / 2);
    }
    let binaryStr = "";
    while (!stack.isEmpty()) {
        binaryStr += stack.pop();
    }
    return binaryStr;
}
console.log(dec2bin(83)); // 1010011