// ============================================================
// 2.1 Create
// ============================================================

// Create a Promise that resolves after a delay
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

delay(1000);

// Create a Promise that resolves with a value after a delay
function delayValue(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

const promise = delayValue(2000, "Hello");

// Promise is still pending immediately
console.log(promise);

// Promise is fulfilled after 2 seconds
promise.then(() => {
  console.log(promise);
});

// Create a Promise that rejects after a delay
function failAfter(ms, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });
}

failAfter(1000, "Something went wrong").catch((error) => {
  console.log(error.message);
});

// ============================================================
// 2.2 Settles Once
// ============================================================

// resolve called twice:
// only the FIRST resolve counts
const promiseSet = new Promise((resolve, reject) => {
  resolve("First");
  resolve("Second");
});

promiseSet.then((value) => {
  console.log(value);
});

// resolve then reject:
// once the Promise is fulfilled, the reject is ignored
const promiseIgnored = new Promise((resolve, reject) => {
  resolve("success");
  reject(new Error("failed"));
});

promiseIgnored
  .then((value) => {
    console.log(value); 
  })
  .catch((error) => {
    console.log(error.message);
  });

// Day 04 callback bug:
//
// In callbacks, the callback could accidentally be called more than once.
//
// Promise solves this at the settlement level:
// once a Promise is fulfilled or rejected, later resolve/reject calls
// are ignored.
//
// Example:
//
// function getStudent(id) {
//   findStudent(id, (err, student) => {
//     if (err) return;
//     return student;
//   });
// }
//
// The return above returns from the callback,
// NOT from getStudent().
//
// With Promise:
//
// function getStudent(id) {
//   return new Promise((resolve, reject) => {
//     findStudent(id, (err, student) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//
//       resolve(student);
//     });
//   });
// }

// ============================================================
// 2.3 Chain
// ============================================================

// 1. Chain four .then() calls that transform a number

const changeNum = Promise.resolve(1);

changeNum
  .then((value) => {
    return value + 1;
  })
  .then((value) => {
    return value + 1;
  })
  .then((value) => {
    return value + 1;
  })
  .then((value) => {
    return value + 1;
  })
  .then((value) => {
    console.log("Final number:", value);
  });

// 2. Three steps, each returning delayValue()

delayValue(100, 1)
  .then((value) => {
    return delayValue(100, value + 1);
  })
  .then((value) => {
    return delayValue(200, value + 1);
  })
  .then((value) => {
    return delayValue(300, value + 1);
  })
  .then((value) => {
    console.log("Chain result:", value);
  });

// 3. Remove return and prove the next step receives undefined

delayValue(100, 10)
  .then((value) => {
    delayValue(100, value + 10);
  })
  .then((value) => {
    console.log("Without return:", value);
  });

delayValue(100, 10)
  .then((value) => {
    return delayValue(100, value + 10);
  })
  .then((value) => {
    console.log("After putting return back:", value);
  });

// 4. Destructure an object directly inside .then()

delayValue(100, {
  name: "Menna",
  score: 95,
}).then(({ name, score }) => {
  console.log("Name:", name);
  console.log("Score:", score);
});

// ============================================================
// 2.4 Errors
// ============================================================

// 1. Throw inside .then()
// The error skips the next .then() steps
// and is caught three steps later.

Promise.resolve()
  .then(() => {
    console.log("step 1");

    throw new Error("boom");
  })
  .then(() => {
    console.log("step 2");
  })
  .then(() => {
    console.log("step 3");
  })
  .catch((err) => {
    console.log("caught:", err.message);
  });

// 2. catch() can return a fallback
// After catch returns a value, the chain continues as fulfilled.

Promise.reject(new Error("failed"))
  .catch((err) => {
    console.log("caught:", err.message);

    return "fallback";
  })
  .then((value) => {
    console.log("next:", value); 
  });

// 3. finally() runs when the Promise is fulfilled

Promise.resolve("success").finally(() => {
  console.log("cleanup");
});

// finally() also runs when the Promise is rejected

Promise.reject(new Error("failed"))
  .finally(() => {
    console.log("cleanup");
  })
  .catch((err) => {
       console.log("handled:", err.message); 
  });

// 4. Reject with a string

Promise.reject("Something went wrong").catch((err) => {
  console.log(err);
});

// Reject with a real Error

Promise.reject(new Error("Something went wrong")).catch((err) => {
  console.log(err.message);
});

// 5. Unhandled rejected Promise
Promise.reject(new Error("boom")) 
 