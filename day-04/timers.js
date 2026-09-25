 // ========================================
// 5.1 — setTimeout
// ========================================

// The order should be:
// 100ms -> 200ms -> 300ms

setTimeout(() => {
  console.log("300ms");
}, 300);

setTimeout(() => {
  console.log("100ms");
}, 100);

setTimeout(() => {
  console.log("200ms");
}, 200);


// Pass extra arguments to setTimeout

function greet(name, message) {
  console.log(`${message}, ${name}`);
}

setTimeout(greet, 400, "Menna", "Hello");


// Cancel a timeout

const timeoutId = setTimeout(() => {
  console.log("This should NOT print");
}, 1000);

clearTimeout(timeoutId);


// setTimeout receives a function, not the result of calling a function

function sayHi() {
  console.log("Hi");
}

// Uncomment this line to see the error:
// setTimeout(sayHi(), 1000);

// Result:
// "Hi" prints immediately.
// Then a TypeError happens because sayHi() returns undefined,
// and setTimeout receives undefined instead of a function.


// ========================================
// 5.2 — setInterval
// ========================================

let count = 5;

const countInterval = setInterval(() => {
  console.log(count);

  count--;

  if (count === 0) {
    console.log("Lift off 🚀");
    clearInterval(countInterval);
  }
}, 1000);


// ========================================
// 5.3 — The delay is a minimum
// ========================================

function blockFor(ms) {
  const start = Date.now();

  while (Date.now() - start < ms) {
    // Busy-wait
  }
}

const startTime = Date.now();

setTimeout(() => {
  const actualTime = Date.now() - startTime;

  console.log(`Timer actually took: ${actualTime}ms`);
}, 100);

blockFor(1000);

// I asked for 100ms, but the timer took about 1000ms
// because JavaScript was blocked.