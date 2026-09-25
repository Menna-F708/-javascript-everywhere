 // ---- Part 1: unpacking ----

// 1
const { a } = { a: 1, b: 2 };
console.log(a, typeof b);
Output:1 , undefined

// 2
const { x: y } = { x: 10 };
console.log(x);
Output:ReferenceError

// 3
const { p = 5 } = { p: undefined };
console.log(p);
Output:5

// 4
const { q = 5 } = { q: null };
console.log(q);
Output:null

// 5
const [, , third] = ["a", "b", "c", "d"];
console.log(third);
Output:c

// 6
const arr = [1, 2];
const copy = arr;
copy.push(3);
console.log(arr.length);
Output:2

// 7
const obj = { nested: { v: 1 } };
const shallow = { ...obj };
shallow.nested.v = 99;
console.log(obj.nested.v);
Output:99

// 8
console.log({ ...{ b: 3 }, ...{ a: 1, b: 2 } });
Output:
b:2
a:1

// 9
function f({ a } = {}) { return a; }
console.log(f(), f({ a: 7 }));
Output:undefind , 7

// 10
function g({ a }) { return a; }
console.log(g());
Output:undefined

// 11
const s = { name: "Sara" };
console.log(s.address.city);
Output:undefined

// 12
console.log(0 || "fallback", 0 ?? "fallback");
Output:

// ---- Part 2: order ----

// 13
console.log("a");
setTimeout(() => console.log("b"), 0);
console.log("c");

// 14
setTimeout(() => console.log("timeout"), 0);
queueMicrotask(() => console.log("micro"));
console.log("sync");

// 15
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// 16
function later() {
  setTimeout(() => { return 42; }, 0);
}
console.log(later());

// 17
setTimeout(() => console.log("timer"), 0);
const start = Date.now();
while (Date.now() - start < 500) {}
console.log("loop finished");

// 18
setTimeout(() => console.log("outer"), 0);
setTimeout(() => {
  console.log("first");
  setTimeout(() => console.log("nested"), 0);
}, 0);
setTimeout(() => console.log("second"), 0);

// 19
setTimeout(() => {
  console.log("timer");
  queueMicrotask(() => console.log("micro inside timer"));
}, 0);
setTimeout(() => console.log("timer 2"), 0);

// 20
try {
  setTimeout(() => { throw new Error("late"); }, 0);
} catch (e) {
  console.log("caught", e.message);
}
console.log("after try");

// 21
function load(cb) {
  cb("sync call");
  setTimeout(() => cb("async call"), 0);
}
load((msg) => console.log(msg));
console.log("after load");

// 22
setTimeout(() => console.log("A"), 20);
setTimeout(() => console.log("B"), 10);
queueMicrotask(() => console.log("C"));
console.log("D");