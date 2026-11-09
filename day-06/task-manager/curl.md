 # Task API — cURL Tests

## 1. GET — List all tasks

**Request**
```bash
curl -i http://localhost:3000/api/tasks
```

**Expected result:** `200 OK`

**Observed result:** `200 OK`

**Observed output — HTTP status line and headers**
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sat, 10 Oct 2026 00:19:27 GMT
```

**Response:** Returns the list of tasks as a JSON array.

## 2. GET — Fetch one task

**Request**
```bash
curl -i http://localhost:3000/api/tasks/1
```

**Expected result:** `200 OK`

**Observed result:** `200 OK`

**Response headers**
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

**Response body**
```json
{
  "id": 1,
  "title": "Read the Day 06 README",
  "done": true,
  "priority": "high",
  "createdAt": "2026-09-27T09:00:00.000Z"
}
```

**Explanation:** The API returns the task matching ID `1` as a JSON object.

## 3. POST — Create a task

**Request**
```bash
curl -i -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{\"title\":\"Test my CRUD API\",\"priority\":\"medium\"}"
```

**Expected result:** `201 Created`

**Observed result:** `201 Created`

**Response:** Returns the newly created task with an `id`, `done: false`, and `createdAt`.

## 4. PATCH — Update a task

**Request**
```bash
curl -i -X PATCH http://localhost:3000/api/tasks/4 -H "Content-Type: application/json" -d "{\"done\":true}"
```

**Expected result:** `200 OK`

**Observed result:** `200 OK`

**Response:** Returns the updated task with `done: true`.

## 5. DELETE — Delete a task

**Request**
```bash
curl -i -X DELETE http://localhost:3000/api/tasks/4
```

**Expected result:** `204 No Content`

**Observed result:** `204 No Content`

**Response:** No response body. A subsequent GET confirmed that task 4 was removed.

## 6. POST — Missing title

**Request**
```bash
curl -i -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{\"priority\":\"high\"}"
```

**Expected result:** `400 Bad Request`

**Observed result:** `400 Bad Request`

**Response body**
```json
{"error":"title must be a string"}
```

**Responsibility:** Client error. The client did not provide a valid title in the request body.

## 7. POST — Malformed JSON

**Request**
```bash
curl -i -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{bad json}"
```

**Expected result:** `400 Bad Request`

**Observed result:** `400 Bad Request`

**Response body**
```json
{"error":"Body is not valid JSON"}
```

**Responsibility:** Client error. The request body is not valid JSON syntax.

## 8. PATCH — Task not found

**Request**
```bash
curl -i -X PATCH http://localhost:3000/api/tasks/9999 -H "Content-Type: application/json" -d "{\"done\":true}"
```

**Expected result:** `404 Not Found`

**Observed result:** `404 Not Found`

**Response body**
```json
{"error":"No task with id 9999"}
```

**Responsibility:** Client error. The requested task ID does not exist.

## 9. GET — Unknown route

**Request**
```bash
curl -i http://localhost:3000/api/unknown
```

**Expected result:** `404 Not Found`

**Observed result:** `404 Not Found`

**Response body**
```json
{"error":"No API route for GET /api/unknown"}
```

**Responsibility:** Client error. The requested API endpoint does not exist.

## 10. PUT — Method not allowed

**Request**
```bash
curl -i -X PUT http://localhost:3000/api/tasks
```

**Expected result:** `405 Method Not Allowed`

**Observed result:** `405 Method Not Allowed`

**Response body**
```json
{"error":"PUT is not allowed on /api/tasks"}
```

**Responsibility:** Client error. The HTTP method is not supported for the requested route.

## Client errors vs. server errors

The responses documented above are in the `4xx` range. They indicate that the client's request is invalid, refers to a missing resource, or uses an unsupported HTTP method.

`5xx` responses, in contrast, generally indicate that the server encountered an internal problem while processing a request.