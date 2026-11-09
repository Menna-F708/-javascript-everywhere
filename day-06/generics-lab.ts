// ========================================
// Task 8 — Generics Lab
// 8.1 Generic Functions
// ========================================

// ========================================
// 1. first<T>
// ========================================

function first<T>(items: T[]): T {
  return items[0];
}

// inferred type: number
const result1 = first([1, 2, 3]);

// inferred type: string
const result2 = first(["A", "B", "C"]);

// inferred type: object
const result3 = first([
  {
    name: "Menna",
    id: 12,
  },
]);

console.log("First number:", result1);
console.log("First string:", result2);
console.log("First object:", result3);

// ========================================
// 2. last<T>
// ========================================

function last<T>(items: T[]): T {
  return items[items.length - 1];
}

// inferred type: number
const lastNumber = last([10, 20, 30]);

// inferred type: string
const lastString = last(["A", "B", "C"]);

// inferred type: object
const lastObject = last([
  {
    name: "Menna",
    id: 3,
  },
]);

console.log("Last number:", lastNumber);
console.log("Last string:", lastString);
console.log("Last object:", lastObject);

// ========================================
// 3. findById<T extends { id: number }>
// ========================================

interface Student {
  id: number;
  name: string;
  courseId: number;
}

interface Course {
  id: number;
  name: string;
  teacherId: number;
}

const students: Student[] = [
  {
    id: 1,
    name: "Menna",
    courseId: 101,
  },
  {
    id: 3,
    name: "Sara",
    courseId: 102,
  },
  {
    id: 4,
    name: "Omar",
    courseId: 103,
  },
];

const courses: Course[] = [
  {
    id: 101,
    name: "JavaScript",
    teacherId: 201,
  },
  {
    id: 102,
    name: "React",
    teacherId: 202,
  },
  {
    id: 103,
    name: "Node.js",
    teacherId: 203,
  },
];

function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

// Valid call — T is inferred as Student
const foundStudent = findById(students, 3);

// Valid call — T is inferred as Course
const foundCourse = findById(courses, 101);

console.log("Found student:", foundStudent);
console.log("Found course:", foundCourse);

// Invalid call — constraint rejects this
//
// const invalidResult = findById(
//   ["A", "B", "C"],
//   1
// );
//
// Error because string does not have:
// id: number

// ========================================
// 4. pluck<T, K extends keyof T>
// ========================================

function pluck<T, K extends keyof T>(
  items: T[],
  key: K
): T[K][] {
  return items.map((item) => item[key]);
}

// Valid calls
const studentNames = pluck(students, "name");

const studentIds = pluck(students, "id");

const courseNames = pluck(courses, "name");

console.log("Student names:", studentNames);
console.log("Student IDs:", studentIds);
console.log("Course names:", courseNames);

// Invalid key — TypeScript rejects it
//
// const invalidPluck = pluck(students, "email");
//
// Error because "email" is not a key of Student.

// ========================================
// 5. groupBy<T, K extends string>
// ========================================

function groupBy<T, K extends string>(
  items: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  const groups = {} as Record<K, T[]>;

  for (const item of items) {
    const key = getKey(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
  }

  return groups;
}

// Group students by letter grade

const studentsWithScores = [
  { id: 1, name: "Menna", score: 92 },
  { id: 2, name: "Sara", score: 85 },
  { id: 3, name: "Omar", score: 72 },
  { id: 4, name: "Yara", score: 65 },
];

const studentsByGrade = groupBy(
  studentsWithScores,
  (student) => {
    if (student.score >= 90) return "A";
    if (student.score >= 80) return "B";
    if (student.score >= 70) return "C";
    return "D";
  }
);

console.log("Students by grade:", studentsByGrade);

// ========================================
// 6. unique<T>
// ========================================

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

// Numbers
const uniqueNumbers = unique([
  1,
  2,
  2,
  3,
  3,
  4,
]);

// Strings
const uniqueNames = unique([
  "Menna",
  "Sara",
  "Menna",
  "Omar",
]);

console.log("Unique numbers:", uniqueNumbers);
console.log("Unique names:", uniqueNames);
 

 // ============================================
// 8.2 Generic Types
// ============================================

// --------------------------------------------
// 1. Result<T> as a discriminated union
// --------------------------------------------

type Result<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: string;
    };


// --------------------------------------------
// 2. safeParse<T>(json, check)
// --------------------------------------------

function safeParse<T>(
  json: string,
  check: (value: unknown) => value is T
): Result<T> {
  try {
    const parsed: unknown = JSON.parse(json);

    if (check(parsed)) {
      return {
        ok: true,
        value: parsed,
      };
    }

    return {
      ok: false,
      error: "Invalid shape",
    };
  } catch {
    return {
      ok: false,
      error: "Invalid JSON",
    };
  }
}


// --------------------------------------------
// Student type + type guard
// --------------------------------------------

interface Student {
  id: number;
  name: string;
  courseId: number;
}

function isStudent(value: unknown): value is Student {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "courseId" in value &&
    typeof value.courseId === "number"
  );
}


// --------------------------------------------
// 3. Test safeParse
// --------------------------------------------

// Valid JSON + correct shape
const validResult = safeParse<Student>(
  '{"id": 1, "name": "Menna", "courseId": 101}',
  isStudent
);

console.log("Valid:", validResult);

// Wrong shape
const wrongShapeResult = safeParse<Student>(
  '{"name": "Menna", "age": 25}',
  isStudent
);

console.log("Wrong shape:", wrongShapeResult);

// Invalid JSON
const invalidJsonResult = safeParse<Student>(
  '{"id": 1, "name": "Menna"',
  isStudent
);

console.log("Invalid JSON:", invalidJsonResult);


// --------------------------------------------
// 4. Prove result.value needs result.ok
// --------------------------------------------

if (validResult.ok) {
  console.log(validResult.value.name);
}

// ❌ Error: Property 'value' does not exist on the
// 'error' side of the discriminated union.

// console.log(validResult.value);


// --------------------------------------------
// 5. Generic Store interface
// --------------------------------------------

interface Store<T extends { id: number }> {
  add(item: T): void;
  get(id: number): T | undefined;
  all(): T[];
  remove(id: number): void;
}


// --------------------------------------------
// 6. Course type
// --------------------------------------------

interface Course {
  id: number;
  name: string;
  teacherId: number;
}


// --------------------------------------------
// 7. createStore<T>()
// --------------------------------------------

function createStore<T extends { id: number }>(): Store<T> {
  const data = new Map<number, T>();

  return {
    add(item: T): void {
      data.set(item.id, item);
    },

    get(id: number): T | undefined {
      return data.get(id);
    },

    all(): T[] {
      return [...data.values()];
    },

    remove(id: number): void {
      data.delete(id);
    },
  };
}


// --------------------------------------------
// 8. Two stores for two tables
// --------------------------------------------

const studentStore = createStore<Student>();

const courseStore = createStore<Course>();


// Add students
studentStore.add({
  id: 1,
  name: "Menna",
  courseId: 101,
});

studentStore.add({
  id: 2,
  name: "Sara",
  courseId: 102,
});


// Add courses
courseStore.add({
  id: 101,
  name: "JavaScript",
  teacherId: 1,
});

courseStore.add({
  id: 102,
  name: "React",
  teacherId: 2,
});


// --------------------------------------------
// 9. Test Store methods
// --------------------------------------------

console.log("Student:", studentStore.get(1));

console.log("All students:", studentStore.all());

console.log("Course:", courseStore.get(101));

courseStore.remove(102);

console.log("Courses after remove:", courseStore.all());


// --------------------------------------------
// 10. Wrong shape - recorded error
// --------------------------------------------

// ❌ Error:
// Argument of type 'Course' is not assignable
// to parameter of type 'Student'.

// studentStore.add({
//   id: 101,
//   name: "React",
//   teacherId: 2,
 
// })
 





 // ============================================
// 8.3 Generic Async
// ============================================ 
interface Student {
  id: number;
  name: string;
  courseId: number;
}

interface Course {
  id: number;
  name: string;
  teacherId: number;
}

interface Teacher {
  id: number;
  name: string;
  roomId: number;
}


// --------------------------------------------
// 1. withTimeout<T>
// --------------------------------------------

function withTimeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Operation timed out"));
    }, ms);
  });

  return Promise.race([promise, timeout]);
}


// Test with different types

const studentPromise: Promise<Student> = Promise.resolve({
  id: 1,
  name: "Menna",
  courseId: 101,
});

const studentWithTimeout = withTimeout(studentPromise, 2000);

// Hover over studentWithTimeout:
// Promise<Student>


const numberPromise: Promise<number> = Promise.resolve(100);

const numberWithTimeout = withTimeout(numberPromise, 2000);

// Hover:
// Promise<number>


const stringPromise: Promise<string> = Promise.resolve("JavaScript");

const stringWithTimeout = withTimeout(stringPromise, 2000);

// Hover:
// Promise<string>


// --------------------------------------------
// 2. retry<T>
// --------------------------------------------

function retry<T>(
  fn: () => Promise<T>,
  attempts: number
): Promise<T> {
  return fn().catch((error: unknown) => {
    if (attempts <= 1) {
      throw error;
    }

    return retry(fn, attempts - 1);
  });
}


// Example

let attempts = 0;

function unstableRequest(): Promise<string> {
  attempts++;

  if (attempts < 3) {
    return Promise.reject(new Error("Request failed"));
  }

  return Promise.resolve("Success!");
}

retry(unstableRequest, 3)
  .then((result) => {
    console.log("Retry result:", result);
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("Retry failed:", error.message);
    } else {
      console.error("Retry failed:", error);
    }
  });


// --------------------------------------------
// 3. mapAsync<T, U>
// --------------------------------------------

async function mapAsync<T, U>(
  items: T[],
  fn: (item: T) => Promise<U>
): Promise<U[]> {
  return Promise.all(items.map(fn));
}


// --------------------------------------------
// 4. Task 5 database functions
// --------------------------------------------

function findStudent(id: number): Promise<Student> {
  const students: Student[] = [
    {
      id: 1,
      name: "Menna",
      courseId: 101,
    },
    {
      id: 2,
      name: "Sara",
      courseId: 102,
    },
    {
      id: 3,
      name: "Omar",
      courseId: 103,
    },
  ];

  const student = students.find((student) => student.id === id);

  if (!student) {
    return Promise.reject(new Error("Student not found"));
  }

  return Promise.resolve(student);
}


function findCourse(id: number): Promise<Course> {
  const courses: Course[] = [
    {
      id: 101,
      name: "JavaScript",
      teacherId: 1,
    },
    {
      id: 102,
      name: "React",
      teacherId: 2,
    },
    {
      id: 103,
      name: "Node.js",
      teacherId: 3,
    },
  ];

  const course = courses.find((course) => course.id === id);

  if (!course) {
    return Promise.reject(new Error("Course not found"));
  }

  return Promise.resolve(course);
}


function findTeacher(id: number): Promise<Teacher> {
  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Ahmed",
      roomId: 1,
    },
    {
      id: 2,
      name: "Mariam",
      roomId: 2,
    },
    {
      id: 3,
      name: "Youssef",
      roomId: 3,
    },
  ];

  const teacher = teachers.find((teacher) => teacher.id === id);

  if (!teacher) {
    return Promise.reject(new Error("Teacher not found"));
  }

  return Promise.resolve(teacher);
}


// --------------------------------------------
// 5. Call mapAsync with all three
// --------------------------------------------

async function main(): Promise<void> {
  // Student database function
  const students = await mapAsync(
    [1, 2, 3],
    findStudent
  );

  console.log("Students:", students);


  // Course database function
  const courses = await mapAsync(
    [101, 102, 103],
    findCourse
  );

  console.log("Courses:", courses);


  // Teacher database function
  const teachers = await mapAsync(
    [1, 2, 3],
    findTeacher
  );

  console.log("Teachers:", teachers);
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
});


 
 
 








// ========================================
// Make this file a module
// ========================================

export {};
