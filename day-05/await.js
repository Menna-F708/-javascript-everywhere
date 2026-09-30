const students = [
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

const courses = [
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

const teachers = [
  {
    id: 201,
    name: "Ahmed",
    roomId: 301,
  },
  {
    id: 202,
    name: "Mariam",
    roomId: 302,
  },
  {
    id: 203,
    name: "Youssef",
    roomId: 303,
  },
];

const rooms = [
  {
    id: 301,
    name: "Room A",
    city: "Alexandria",
  },
  {
    id: 302,
    name: "Room B",
    city: "Cairo",
  },
  {
    id: 303,
    name: "Room C",
    city: "Giza",
  },
];

// ========================================
// Student Delays
// ========================================

const studentDelays = {
  1: 100,
  2: 300,
  3: 500,
};

// ========================================
// Shared Helper Function
// ========================================

function findById(data, id, tableName, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = data.find((item) => item.id === id);

      if (!item) {
        return reject(new Error(`${tableName} with id ${id} not found`));
      }

      resolve(item);
    }, delay);
  });
}

// ========================================
// Find Student
// ========================================

function findStudent(id) {
  const delay = studentDelays[id] ?? 200;

  return findById(students, id, "Student", delay);
}

// ========================================
// Find Course
// ========================================

function findCourse(id) {
  return findById(courses, id, "Course", 100);
}

// ========================================
// Find Teacher
// ========================================

function findTeacher(id) {
  return findById(teachers, id, "Teacher", 100);
}

// ========================================
// Find Room
// ========================================

function findRoom(id) {
  return findById(rooms, id, "Room", 100);
}

async function buildReport(id) {
  const student = await findStudent(id);
  const course = await findCourse(student.courseId);
  const teacher = await findTeacher(course.teacherId);
  const room = await findRoom(teacher.roomId);

  console.log(
    `${student.name} studies ${course.name} with ${teacher.name} in ${room.name}, ${room.city}.`,
  );
}

console.log(buildReport(1));

async function main() {
  try {
    await buildReport(1);
    await buildReport(288888);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    console.log("Done");
  }
}
main()

main().catch((err) => {
  console.log(`Unhandled error: ${err.message}`);
}); 




 // ========================================
// 5.2 - Sequential vs Parallel
// ========================================

 async function loadSequentially(ids) {
  const start = Date.now();
  const students = [];

  for (const id of ids) {
    const student = await findStudent(id);
    students.push(student);
  }

  const elapsed = Date.now() - start;

  console.log("Sequential:", students);
  console.log(`Sequential time: ${elapsed}ms`);

  return elapsed;
}

// Parallel
async function loadInParallel(ids) {
  const start = Date.now();

  const students = await Promise.all(
    ids.map((id) => findStudent(id))
  );

  const elapsed = Date.now() - start;

  console.log("Parallel:", students);
  console.log(`Parallel time: ${elapsed}ms`);

  return elapsed;
}

 async function compare() {
  const ids = [1, 2, 3];

  await loadSequentially(ids);
  await loadInParallel(ids);
}

compare();


// Sequential is correct when the next operation depends on the result
// of the previous operation.
 


 // ========================================
// The forEach Trap
// ========================================

const ids = [1, 2, 3];

async function loadWithForEach(ids) {
  ids.forEach(async (id) => {
    const student = await findStudent(id);
    console.log("Student:", student.name);
  });

  console.log("done");
}

loadWithForEach(ids);



async function loadWithForOf(ids) {
  for (const id of ids) {
    const student = await findStudent(id);
    console.log("Student:", student.name);
  }

  console.log("done");
}

loadWithForOf(ids);

 

async function loadWithPromiseAll(ids) {
  const students = await Promise.all(
    ids.map((id) => findStudent(id))
  );

  students.forEach((student) => {
    console.log("Student:", student.name);
  });

  console.log("done");
}

loadWithPromiseAll(ids);


// ----------------------------------------
// Why is forEach a trap?
// ----------------------------------------

// forEach does NOT wait for the async callback.
// So "done" can print before the students.

// for...of + await:
// waits for each student before moving to the next one.

// Promise.all + map:
// starts all requests together and waits for all of them.
 




// ========================================
// 5.4 - return await
// ========================================

function risky() {
  return Promise.reject(new Error("Something went wrong"));
}

 

async function testWithoutAwait() {
  try {
    return risky();
  } catch (err) {
    console.log("Caught:", err.message);
  }
}

testWithoutAwait()
  .catch((err) => {
    console.log("Outer catch:", err.message);
  });


 

async function testWithAwait() {
  try {
    return await risky();
  } catch (err) {
    console.log("Caught:", err.message);
  }
}

testWithAwait();


// return risky() returns the rejected Promise before the try/catch can catch it,
// while return await risky() waits for the Promise rejection inside the try.
 