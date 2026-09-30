 export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${ms}ms`));
      }, ms);
    }),
  ]);
}

export async function retry(fn, attempts = 3, delayMs = 100) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      console.log(
        `Attempt ${attempt} failed: ${error.message}`
      );

      if (attempt < attempts) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}
 