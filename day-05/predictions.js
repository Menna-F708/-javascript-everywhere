//  // 1
// console.log("a");
// new Promise((resolve) => {
//   console.log("b");
//   resolve();
// });
// console.log("c");
 
// 2
// const p2 = new Promise((resolve) => {
//   resolve("first");
//   resolve("second");
// });
// p2.then((v) => console.log(v));
   
// 3
// const delay = (ms) => new Promise((r) => setTimeout(r, ms));
// Promise.resolve("start")
//   .then(() => {
//     delay(100).then(() => "slow value");
//   })
//   .then((v) => console.log(v));
  
// // 4
// setTimeout(() => console.log("timeout"), 0);
// Promise.resolve().then(() => console.log("then"));
// console.log("sync");
 
// // 5
// async function f() {
//   console.log("B");
//   await null;
//   console.log("D");
// }
// console.log("A");
// f();
// console.log("C");
 
// 6
// async function run() {
//   [3, 1, 2].forEach(async (n) => {
//     await delay(n * 10);
//     console.log(n);
//   });
//   console.log("done");
// }
// run();
 

// // 7
// const later = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
// Promise.all([later(300, "slow"), later(100, "fast")]).then((values) => console.log(values));
 
// // 8
// Promise.all([later(100, "a"), Promise.reject(new Error("b failed")), later(50, "c")])
//   .then((values) => console.log(values))
//   .catch((e) => console.log("all:", e.message));
 
// // 9
// const failAt = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error(`failed at ${ms}`)), ms));
// Promise.race([later(200, "win"), failAt(100)])
//   .then((v) => console.log("race:", v))
//   .catch((e) => console.log("race:", e.message));
// Promise.any([later(200, "win"), failAt(100)])
//   .then((v) => console.log("any:", v));
 

// // 10
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
  
