 // 1
console.log("a");
new Promise((resolve) => {
  console.log("b");
  resolve();
});
console.log("c");
output:a b c

// 2
const p2 = new Promise((resolve) => {
  resolve("first");
  resolve("second");
});
p2.then((v) => console.log(v));
output:first 
mechanism explicitly:هي هتاخود اول Resolve لان ال Promise لا يمكن ترجع من Fulfilledالي Rejected او من Fulfilled الي Fulfuilled الـ Promise can settle only once. أول resolve أو reject بيحدد النتيجة، وأي محاولة بعد كده يتم تجاهلها
 
// 3
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
Promise.resolve("start")
  .then(() => {
    delay(100).then(() => "slow value");
  })
  .then((v) => console.log(v));
output:undefined 
mechanism explicitly:مفيش Return

// 4
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("then"));
console.log("sync");
output:sync then timeout

// 5
async function f() {
  console.log("B");
  await null;
  console.log("D");
}
console.log("A");
f();
console.log("C");
output:A B C D

// 6
async function run() {
  [3, 1, 2].forEach(async (n) => {
    await delay(n * 10);
    console.log(n);
  });
  console.log("done");
}
run();
output:done 1 2 3 
mechanism explicitly:ال forEach مش بتستنا ال async callback

// 7
const later = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
Promise.all([later(300, "slow"), later(100, "fast")]).then((values) => console.log(values));
output:slow fast 

// 8
Promise.all([later(100, "a"), Promise.reject(new Error("b failed")), later(50, "c")])
  .then((values) => console.log(values))
  .catch((e) => console.log("all:", e.message));
output:all: b failed

// 9
const failAt = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error(`failed at ${ms}`)), ms));
Promise.race([later(200, "win"), failAt(100)])
  .then((v) => console.log("race:", v))
  .catch((e) => console.log("race:", e.message));
Promise.any([later(200, "win"), failAt(100)])
  .then((v) => console.log("any:", v));
output:
race: failed at 100
any: win

// 10
async function risky() {
  throw new Error("boom");
}
async function main10() {
  try {
    return risky();
  } catch (e) {
    console.log("caught inside:", e.message);
  }
}
main10().catch((e) => console.log("caught outside:", e.message));
output:caught outside: boom
mechanism explicitly:الـ async function بتحول الـ throw إلى Rejected Promise، وبما إننا استخدمنا return risky() من غير await، فالـ catch الداخلي مش هيمسك الخطأ، والـ catch الخارجي هو اللي هيمسكه 



<!-- Part 3 — Modules -->

// 11 — a.js
exports.x = 1;
exports = { y: 2 };

// main.js
console.log(require("./a"));

My output:
{x:1}, {y:2}

Actual output:
{x:1}

Mechanism explicitly:
في البداية `exports` و`module.exports` بيشيروا لنفس الـ object.
`exports.x = 1` بتضيف `x` للـ object الأصلي.
لكن `exports = { y: 2 }` بتغير reference الخاص بـ `exports` فقط،
ولا تغير `module.exports`.
والـ `require()` بيرجع `module.exports`، لذلك الناتج `{x:1}`.

--------------------------------------------------

// 12 — counter.js
let count = 0;
module.exports = () => ++count;

// main.js
const c1 = require("./counter");
const c2 = require("./counter");
console.log(c1(), c2(), c1());

My output:
1 2 3

--------------------------------------------------

// 13 — main.mjs
console.log("main");
import "./b.mjs";

// b.mjs
console.log("b");

My output:
b main

Mechanism explicitly:
الـ static `import` بيتعمل له processing قبل تنفيذ الـ module body.
لذلك `main.mjs` لازم يجهز وينفذ الـ dependency `b.mjs` أولًا،
فيطبع `b`، وبعد انتهاء `b.mjs` يبدأ تنفيذ `main.mjs` ويطبع `main`.

--------------------------------------------------

// 14 — lib.mjs
export default function hello() {}

// main.mjs
import greet from "./lib.mjs";
console.log(greet.name);

My output:
undefined

Actual output:
hello

Mechanism explicitly:
الـ default export هو function اسمها `hello`.
عند استيرادها باسم `greet`، الاسم المحلي يتغير لكن اسم الـ function
نفسها يظل `hello`. لذلك `greet.name` ترجع `"hello"`.

--------------------------------------------------

// 15 — counter.mjs
export let count = 0;
export function inc() { count++; }

// main.mjs
import { count, inc } from "./counter.mjs";
inc();
inc();
console.log(count);

My output:
2

Mechanism explicitly:
الـ `count` في ES Modules عبارة عن Live Binding، يعني الـ main.mjs
مرتبط بالمتغير الأصلي الموجود في counter.mjs وليس نسخة منفصلة منه.
يبدأ count بـ 0، أول inc() تجعله 1، والثانية تجعله 2،
لذلك console.log(count) يطبع 2.

--------------------------------------------------

// 16 — counter.js
let count = 0;
function inc() { count++; }
module.exports = { count, inc };

// main.js
const { count, inc } = require("./counter");
inc();
inc();
console.log(count);

My output:
0 1

Actual output:
0

Mechanism explicitly:
في CommonJS، عند `module.exports = { count, inc }` يتم وضع القيمة
الحالية لـ count داخل الـ object، وكانت وقتها 0.
بعد ذلك inc() تغير المتغير الداخلي count إلى 1 ثم 2،
لكن الـ count الذي تم تصديره كان primitive value وهي 0،
لذلك لا يتحدث تلقائيًا. ولهذا console.log(count) يطبع 0.

--------------------------------------------------

// 17 — main.mjs
import { count } from "./counter.mjs";
count = 5;

My output:
error

Actual output:
TypeError

Mechanism explicitly:
`count` المستورد من ES Module هو Imported Binding، والـ imported
bindings لا يمكن إعادة إسناد قيمة لها من الـ importing module.
لذلك `count = 5` غير مسموح وينتج عنه TypeError.

--------------------------------------------------

// 18 — lib.mjs
export const x = 1;

// main.mjs
import { X } from "./lib.mjs";
console.log(X);

My output:
undefined

Actual output:
SyntaxError

Mechanism explicitly:
الـ module بيصدر named export اسمه `x`، لكن main.mjs يحاول استيراد
named export اسمه `X`. أسماء الـ named exports لازم تتطابق،
والـ JavaScript case-sensitive. لذلك الـ import يفشل أثناء تحميل
الـ module، وبالتالي console.log(X) لا يتم تنفيذه.