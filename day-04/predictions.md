 ```js
// ---- Part 1: unpacking ----

// 1

const { a } = { a: 1, b: 2 };

console.log(a, typeof b);

Output:1 , undefined 


// 2

const { x: y } = { x: 10 };

console.log(x);

Output:ReferenceError: x is not defined


// 3

const { p = 5 } = { p: undefined };

console.log(p);

Output:5


// 4

const { q = 5 } = { q: null };

console.log(q);

Output:null

Mechanism: Destructuring default value.

Explaining: الـdefault value بتشتغل لما القيمة تكون undefined فقط، لكن null بتفضل null.


// 5

const [, , third] = ["a", "b", "c", "d"];

console.log(third);

Output:c


// 6

const arr = [1, 2];

const copy = arr;

copy.push(3);

console.log(arr.length);

Output:3

Explaining: الـcopy هنا مش نسخة جديدة من الـarray، لكنه بيمسك نفس الـreference بتاع arr، فلما عملنا push اتغيرت arr نفسها.


// 7

const obj = { nested: { v: 1 } };

const shallow = { ...obj };

shallow.nested.v = 99;

console.log(obj.nested.v);

Output:99

Mechanism: Shallow copy.

Explaining: الـspread عمل copy للـouter object فقط، لكن الـnested object لسه نفس الـreference، فالتغيير ظهر في obj كمان.


// 8

console.log({ ...{ b: 3 }, ...{ a: 1, b: 2 } });

Output:

b:2

a:1

Mechanism: Spread property overwrite / Last spread wins.

Explaining: لما نفس الـproperty تتكرر، القيمة الموجودة في الـspread الأخير بتعمل overwrite للقيمة القديمة، لذلك b بقت 2.


// 9

function f({ a } = {}) { return a; }

console.log(f(), f({ a: 7 }));

Output:undefined , 7


// 10

function g({ a }) { return a; }

console.log(g());

Output:undefined

Actual:TypeError

Mechanism: Destructuring undefined.

Explaining: لما استدعينا g() من غير Argument، الـparameter قيمته undefined، والـfunction بتحاول تعمل destructuring لـundefined، وده بيسبب TypeError.


// 11

const s = { name: "Sara" };

console.log(s.address.city);

Output:undefined

Actual:TypeError

Explaining: s.address نفسها قيمتها undefined، ولو كنا عملنا console.log(s.address) بس كانت هتطلع undefined، لكن لما حاولنا نوصل لـcity من undefined حصل TypeError.


// 12

console.log(0 || "fallback", 0 ?? "fallback");

Output:fallback , 0


// ---- Part 2: order ----

// 13

console.log("a");

setTimeout(() => console.log("b"), 0);

console.log("c");

Output:a , c , b


// 14

setTimeout(() => console.log("timeout"), 0);

queueMicrotask(() => console.log("micro"));

console.log("sync");

Output:sync , micro , timeout


// 15

for (var i = 0; i < 3; i++) {

  setTimeout(() => console.log(i), 0);

}

Output:

3

3

3

Mechanism: var function scope + closures.

Explaining: كل الـcallbacks بتعمل closure على نفس الـvar i، ولما الـcallbacks تشتغل يكون الـloop خلص وi بقت 3، لذلك كلهم بيطبعوا 3.


// 16

function later() {

  setTimeout(() => { return 42; }, 0);

}

console.log(later());

Output:undefined


// 17

setTimeout(() => console.log("timer"), 0);

const start = Date.now();

while (Date.now() - start < 500) {}

console.log("loop finished");

Output:loop finished , timer


// 18

setTimeout(() => console.log("outer"), 0);

setTimeout(() => {

  console.log("first");

  setTimeout(() => console.log("nested"), 0);

}, 0);

setTimeout(() => console.log("second"), 0);

Output:

outer

first

second

nested

Mechanism: Task queue ordering.

Explaining: الـnested timer بيتضاف للـTask Queue بعد الـtimers الموجودة بالفعل، لذلك second بتتنفذ قبله.


// 19

setTimeout(() => {

  console.log("timer");

  queueMicrotask(() => console.log("micro inside timer"));

}, 0);

setTimeout(() => console.log("timer 2"), 0);

Output:

timer

micro inside timer

timer 2

Mechanism: Microtask priority.

Explaining: بعد ما الـtimer الأول يخلص، JavaScript بتنّفذ الـmicrotask قبل ما تنتقل للـtimer التالي.


// 20

try {

  setTimeout(() => { throw new Error("late"); }, 0);

} catch (e) {

  console.log("caught", e.message);

}

console.log("after try");

Output:

after try

Error: late


// 21

function load(cb) {

  cb("sync call");

  setTimeout(() => cb("async call"), 0);

}

load((msg) => console.log(msg));

console.log("after load");

Output:

sync call

after load

async call

Mechanism: Synchronous vs asynchronous callback execution.

Explaining: أول callback بيتنفذ مباشرة بشكل synchronous، لكن callback الموجود داخل setTimeout بيتأجل لحد ما الـsynchronous code يخلص.


// 22

setTimeout(() => console.log("A"), 20);

setTimeout(() => console.log("B"), 10);

queueMicrotask(() => console.log("C"));

console.log("D");

Output:D C B A
```
