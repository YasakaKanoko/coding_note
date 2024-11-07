const Map = require('./Map');
const map = new Map();

// set(key, value)
map.set('name', 'Jolyne');
map.set('age', 18);
map.set('email', 'Cujoh@Jolyne.com');
console.log(map.items); // {name: 'Jolyne', age: 18, email: 'Cujoh@Jolyne.com'}

// has(key)
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