 # Task 13 — Predict, Then Run

## 13.1 — Predictions

> Predictions were written before running the snippets.

---

## #1

```ts
const res = await fetch("http://localhost:3000/api/tasks/999");
console.log(res.ok, res.status);
```

**Prediction:**

```text
false 404
```

**Actual:**

**Why:**

`fetch()` does not reject just because the server returns an HTTP error status such as `404`. It resolves with a `Response` object, where `res.ok` is `false` and `res.status` is `404`.

**Mechanism:**

HTTP error status does not cause `fetch()` to reject.

---

## #2

```ts
try {
  const res = await fetch("http://localhost:3000/api/tasks/999");
  console.log("no throw", res.status);
} catch {
  console.log("threw");
}
```

**Prediction:**

```text
no throw 404
```

**Actual:**

**Why:**

`fetch()` does not throw for an HTTP `404`, so the `catch` block is not executed.

**Mechanism:**

`fetch()` resolves normally for HTTP error statuses.

---

## #3

```ts
try {
  await fetch("http://localhost:3999/api/tasks");
  console.log("ok");
} catch (err) {
  console.log(err instanceof Error ? err.name : "?");
}
```

**Prediction:**

```text
TypeError
```

**Actual:**

**Why:**

There is no Task API server expected to be running on port `3999`. This is a network/connection failure, so the `fetch()` Promise rejects and the `catch` block runs.

**Mechanism:**

Network failure → `fetch()` rejects → `catch` runs.

---

## #4

```ts
const res = await fetch("http://localhost:3000/api/tasks/1");
const a: unknown = await res.json();
const b: unknown = await res.json();
console.log(a, b);
```

**Prediction:**

```text
TypeError
```

**Actual:**

**Why:**

The first `res.json()` consumes the response body. The second attempt to read the same body fails because the response body has already been consumed.

**Mechanism:**

A `Response` body can be consumed only once.

---

## #5

```ts
const pending = fetch("http://localhost:3000/api/tasks");
console.log(pending instanceof Promise);

const res = await pending;

console.log(typeof res.json, Array.isArray(res));
```

**Prediction:**

```text
true
function false
```

**Actual:**

**Why:**

`fetch()` immediately returns a Promise. After `await`, `res` becomes the resolved `Response` object. `res.json` is a function, while the `Response` itself is not an Array.

---

## #6

```ts
const res = await fetch("http://localhost:3000/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "  Trim me  " }),
});

const task = (await res.json()) as {
  title: string;
  priority: string;
  done: boolean;
};

console.log(
  res.status,
  JSON.stringify(task.title),
  task.priority,
  task.done
);
```

**Prediction:**

```text
[expected successful POST status] "Trim me" medium false
```

**Actual:**

**Why:**

The request sends a JSON object containing only `title`. The API processes the submitted task, including trimming the title and applying its default values for fields that were not provided.

**Mechanism:**

Server-side request-body processing, normalization, and default values.

---

## #7

```ts
const url = "http://localhost:3000/api/tasks/3";

const first = await fetch(url, { method: "DELETE" });
const second = await fetch(url, { method: "DELETE" });

console.log(first.status, second.status);
```

**Prediction:**

```text
204 404
```

**Actual:**

**Why:**

The first `DELETE` removes task `3`. The second `DELETE` runs after the data has changed, so task `3` no longer exists and the API returns `404`.

**Mechanism:**

Sequential requests mutate shared API state.

---

## #8

```ts
const res = await fetch("http://localhost:3000/api/tasks/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ done: "yes" }),
});

console.log(res.status, await res.text());
```

**Prediction:**

```text
[validation error status] [API error response]
```

**Actual:**

**Why:**

`done` is expected to be a boolean value such as `true` or `false`, but the request sends the string `"yes"`. The API should reject the invalid value through its runtime validation.

**Mechanism:**

Server-side runtime validation of JSON input.

---

## #9

```ts
const res = await fetch("http://localhost:3000/api/tasks/1", {
  method: "PUT"
});

console.log(res.status, res.statusText);
```

**Prediction:**

```text
400 Bad Request
```

**Actual:**

**Why:**

The `PUT` request does not provide the request data required by the API, so the server rejects the request as invalid.

**Mechanism:**

HTTP request validation / missing request body.

---

## #10

```ts
const res = await fetch("http://localhost:3000/");

console.log(res.status, res.headers.get("content-type"));

const data: unknown = await res.json();

console.log(data);
```

**Prediction:**

```text
404 [content-type returned by the API]
```

If the root endpoint does not exist, `res.json()` may then fail because the `404` response is not necessarily JSON.

**Actual:**

**Why:**

The request targets `/`, not `/api/tasks`. The result depends on how the Task API handles the root route. The response must be inspected to know the exact `content-type` and whether its body is valid JSON.

**Mechanism:**

HTTP routing + response `Content-Type` + JSON body parsing.

---

## #11

```ts
const u = new URL("https://example.com/search");

u.searchParams.set("q", "tom & jerry");
u.searchParams.set("page", "2");

console.log(u.search);

console.log(
  new URL(
    "/api/tasks?q=a%20b",
    "http://localhost:3000"
  ).searchParams.get("q")
);
```

**Prediction:**

```text
?q=tom+%26+jerry&page=2
a b
```

**Actual:**

**Why:**

`URLSearchParams` encodes special characters when constructing the query string. When reading a parameter with `.get()`, the encoded value `%20` is decoded back into a space.

**Mechanism:**

URL encoding / `URLSearchParams` encoding and decoding.

---

## #12

```ts
console.log("start");

fetch("http://localhost:3000/api/tasks")
  .then(() => console.log("response"));

setTimeout(() => console.log("timer"), 0);

Promise.resolve().then(() => console.log("microtask"));

console.log("end");
```

**Prediction:**

```text
start
end
microtask
timer
response
```

**Actual:**

**Why:**

The synchronous logs execute first. Promise callbacks are microtasks, so the `microtask` callback runs after the synchronous code and before the timer. The fetch callback depends on the asynchronous network response.

**Mechanism:**

Event Loop + Microtask Queue + Timer/Network callbacks.

---

## #13

```ts
const controller = new AbortController();

controller.abort();

const outcome = await fetch(
  "http://localhost:3000/api/tasks",
  { signal: controller.signal }
)
  .then((res) => `status ${res.status}`)
  .catch((err: Error) => err.name);

console.log(outcome);
```

**Prediction:**

```text
AbortError
```

**Actual:**

**Why:**

The controller is aborted before the fetch starts. The fetch therefore rejects, and the `.catch()` handler returns the error name.

**Mechanism:**

`AbortController` cancellation → `fetch()` rejection → `.catch()` handling.

---

## #14

```ts
const results = await Promise.all([
  fetch("http://localhost:3000/api/tasks/1"),
  fetch("http://localhost:3000/api/tasks/999"),
]);

console.log(results.map((r) => r.status));
```

**Prediction:**

```text
[200, 404]
```

**Actual:**

**Why:**

Both `fetch()` calls resolve to `Response` objects. The second request returns `404`, but `fetch()` does not reject because of an HTTP status. Therefore `Promise.all()` fulfills with both responses.

**Mechanism:**

`Promise.all()` rejects only when an input Promise rejects. An HTTP `404` from `fetch()` is still a fulfilled Promise.

---

## #15

```ts
const results = await Promise.allSettled([
  fetch("http://localhost:3000/api/tasks/1"),
  fetch("http://localhost:3999/api/tasks/1"),
]);

console.log(results.map((r) => r.status));
```

**Prediction:**

```text
[ 'fulfilled', 'rejected' ]
```

**Actual:**

**Why:**

The first fetch reaches the API and fulfills with a Response. The second fetch cannot connect to port `3999`, so it rejects. `Promise.allSettled()` waits for both and reports the settlement status of each Promise.

**Mechanism:**

`Promise.allSettled()` waits for every Promise regardless of fulfillment or rejection.

---

## #16

```ts
const res = await fetch("http://localhost:3000/api/tasks", {
  method: "POST",
  body: { title: "Object body" },
});

console.log(res.status);
```

**Prediction:**

```text
TypeScript compile error
```

**Actual:**

**tsc: rejects:**

```text
REJECT
```

**tsc actual:**

**Why:**

The `body` property of `fetch()` expects a valid `BodyInit` value. A plain object does not satisfy that type.

The object should be converted to JSON with:

```ts
JSON.stringify({ title: "Object body" })
```

**Mechanism:**

 TypeScript rejects the plain object because fetch's body expects a valid BodyInit, not an ordinary JavaScript object.
---

## #17

```ts
const res = await fetch("http://localhost:3000/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Hi",
    priority: "urgent"
  }),
});

const body = (await res.json()) as { error: string };

console.log(res.status, body.error);
```

**Prediction:**

```text
[validation error status] [API error message]
```

**Actual:**

**Why:**

The request sends `priority: "urgent"`. If `"urgent"` is not one of the valid priority values accepted by the Task API, the server rejects the request.

The `as { error: string }` assertion does not perform runtime validation. It only tells TypeScript how to treat the value.

**Mechanism:**

Server-side runtime validation + TypeScript type assertion.

---

## #18

```ts
const res = await fetch("http://localhost:3000/api/tasks/1");

const data = await res.json();

console.log(data.titel.toUpperCase());
```

**Prediction:**

```text
TypeError
```

**Actual:**

**tsc prediction:**

```text
ACCEPT
```

**tsc actual:**

**Why:**

The API returns a property named `title`, but the code accesses `titel`. Because the result of `res.json()` is not strongly typed here, TypeScript does not know that `titel` is invalid.

At runtime:

```text
data.titel
↓
undefined
↓
undefined.toUpperCase()
↓
TypeError
```

**Mechanism:**

Untyped JSON data + runtime property access on `undefined`.

---

# 13.2 — Summary

## TypeScript predictions

### #16

```text
tsc: REJECT
```

Reason: `body` receives an object that does not satisfy the expected `BodyInit` type.

### #18

```text
tsc: ACCEPT
```

Reason: `res.json()` does not provide a strong compile-time type for the returned object, so the typo `titel` is not detected.

---

## Important comparison

```text
#16
TypeScript knows the expected type of fetch body
        ↓
invalid object
        ↓
tsc catches it
```

```text
#18
JSON response is not strongly typed
        ↓
TypeScript cannot verify "titel"
        ↓
tsc accepts it
        ↓
runtime gets undefined
        ↓
.toUpperCase()
        ↓
TypeError
```

---

## Actual Results

The `Actual` fields above should be filled **only after running the snippets in order** against the reset Task API.

The snippets must be run in order because some snippets modify the API data.
 