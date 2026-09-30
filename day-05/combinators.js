function delayValue(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

function failAfter(ms, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });
}

const start = Date.now();
const result = Promise.all([
  delayValue(300, "A"),
  failAfter(100, "B"),
  delayValue(200, "C"),
])
  .then((result) => {
    console.log(result);
    const elapsed = Date.now() - start;

    console.log(`Took ${elapsed}ms`);
  })
  .catch((err) => {
    console.log(`Caught: ${err.message}`);
  });

// function loadAll(ids, done) {
//   const results = [];
//   let completed = 0;

//   for (const id of ids) {
//     getStudent(id, (err, student) => {
//       if (err) {
//         return done(err);
//       }

//       results.push(student);
//       completed++;

//       if (completed === ids.length) {
//         done(null, results);
//       }
//     });
//   }
// }

function loadAll(ids) {
  return Promise.all(ids.map((id) => getStudent(id)));
}

// Day 04: 17 lines
// Day 05: 3 lines

// Task 4.2 - Promise.allSettled
Promise.allSettled([
  delayValue(100, "A"),
  failAfter(200, "B failed"),
  delayValue(300, "C"),
]).then((results) => {
  // Print the result of each Promise
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`✓ ${result.value}`);
    } else {
      console.log(`✗ ${result.reason.message}`);
    }
  });

  // Count rejected Promises
  const failures = results.filter((result) => {
    return result.status === "rejected";
  });

  console.log(`Failures: ${failures.length}`);
});

// 1. Promise.race
Promise.race([delayValue(300, "Slow success"), failAfter(100, "Fast failure")])
  .then((result) => {
    console.log("Race:", result);
  })
  .catch((err) => {
    console.log("Race rejected:", err.message);
  });

// 2. Promise.any
Promise.any([delayValue(300, "Slow success"), failAfter(100, "Fast failure")])
  .then((result) => {
    console.log("Any fulfilled:", result);
  })
  .catch((err) => {
    console.log("Any rejected:", err.message);
  });

// 3. Promise.any
Promise.any([
  failAfter(100, "Error 1"),
  failAfter(200, "Error 2"),
  failAfter(300, "Error 3"),
]).catch((err) => {
  console.log("Error name:", err.name);
  console.log("Errors count:", err.errors.length);
});

// Promise.race: Use it when you need whichever Promise settles first, such as a request timeout.
// Promise.any: Use it when you need the first successful result, such as trying multiple servers.
