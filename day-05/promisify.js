 
// ============================================================
// 6.1 fake-db.js — fake database
// ============================================================

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
  },]

// ========================================
// Find Student
// ========================================

function findStudent(id, callback) {
  const delay = studentDelays[id] ?? 200;

  setTimeout(() => {
    const student = students.find((student) => student.id === id);

    if (!student) {
      return callback(new Error("Student not found"));
    }

    callback(null, student);
  }, delay);
}

const studentDelays = {
  1: 100,
  2: 300,
  3: 500,
};


// ========================================
// Find Course
// ========================================

function findCourse(id, callback) {
  setTimeout(() => {
    const course = courses.find((course) => course.id === id);

    if (!course) {
      return callback(new Error("Course not found"));
    }

    callback(null, course);
  }, 100);
}


// ========================================
// Find Teacher
// ========================================

function findTeacher(id, callback) {
  setTimeout(() => {
    const teacher = teachers.find((teacher) => teacher.id === id);

    if (!teacher) {
      return callback(new Error("Teacher not found"));
    }

    callback(null, teacher);
  }, 100);
}


// ========================================
// Find Room
// ========================================

function findRoom(id, callback) {
  setTimeout(() => {
    const room = rooms.find((room) => room.id === id);

    if (!room) {
      return callback(new Error("Room not found"));
    }

    callback(null, room);
  }, 100);
}


// ============================================================
// 3.1 Promisify
// ============================================================


function getStudent(id) {
  return new Promise((resolve, reject) => {
    findStudent(id, (err, student) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(student);
    });
  });
}

 

// ------------------------------------------------------------
// 2. Write our own promisify()
// ------------------------------------------------------------

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, value) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(value);
      });
    });
  };
}


// ------------------------------------------------------------
// 3. Wrap the other functions using our promisify()
// ------------------------------------------------------------

const getCourse = promisify(findCourse);

const getTeacher = promisify(findTeacher);


// ------------------------------------------------------------
// 4. Use Node.js built-in util.promisify()
// ------------------------------------------------------------

const util = require("util");

const getRoom = util.promisify(findRoom);

 

// ------------------------------------------------------------
// 5. Test getStudent()
// Good ID 
// ------------------------------------------------------------

getStudent(1)
  .then((student) => {
    console.log("Student:", student);
  })
  .catch((err) => {
    console.log("Student error:", err.message);
  });


// Bad ID 

getStudent(999)
  .then((student) => {
    console.log("Student:", student);
  })
  .catch((err) => {
    console.log("Student error:", err.message);
  });


// ------------------------------------------------------------
// Test getCourse()
// This one was wrapped using OUR promisify()
// ------------------------------------------------------------

// Good ID → .then()

getCourse(101)
  .then((course) => {
    console.log("Course:", course);
  })
  .catch((err) => {
    console.log("Course error:", err.message);
  });


// Bad ID → .catch()

getCourse(999)
  .then((course) => {
    console.log("Course:", course);
  })
  .catch((err) => {
    console.log("Course error:", err.message);
  });


// ------------------------------------------------------------
// Test getTeacher()
// This one was also wrapped using OUR promisify()
// ------------------------------------------------------------

// Good ID → .then()

getTeacher(201)
  .then((teacher) => {
    console.log("Teacher:", teacher);
  })
  .catch((err) => {
    console.log("Teacher error:", err.message);
  });


// Bad ID → .catch()

getTeacher(999)
  .then((teacher) => {
    console.log("Teacher:", teacher);
  })
  .catch((err) => {
    console.log("Teacher error:", err.message);
  });


// ------------------------------------------------------------
// Test getRoom()
// This one uses Node's util.promisify()
// ------------------------------------------------------------

// Good ID → .then()

getRoom(301)
  .then((room) => {
    console.log("Room:", room);
  })
  .catch((err) => {
    console.log("Room error:", err.message);
  });


// Bad ID → .catch()

getRoom(999)
  .then((room) => {
    console.log("Room:", room);
  })
  .catch((err) => {
    console.log("Room error:", err.message);
  });

