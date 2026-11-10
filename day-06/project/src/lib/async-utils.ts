export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${ms}ms`));
      }, ms);
    }),
  ]);
}

export function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
}

export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 100,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      lastError = error;

      console.log(`Attempt ${attempt} failed: ${errorMessage(error)}`);

      if (attempt < attempts) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}