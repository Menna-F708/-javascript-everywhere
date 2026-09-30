// ========================================
// 6.1 promise-db.js
// ========================================

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

// ========================================
// Build Report
// ========================================

function buildReport(id) {
  const startTime = Date.now();

  let student;
  let course;
  let teacher;
  let room;

  return findStudent(id)
    .then((result) => {
      student = result;

      return findCourse(student.courseId);
      
    })
    .then((result) => {
      course = result;

      return findTeacher(course.teacherId);
    })
    .then((result) => {
      teacher = result;

      return findRoom(teacher.roomId);
    })
    .then((result) => {
      room = result;

      console.log(
        `${student.name} studies ${course.name} with ${teacher.name} in ${room.name}, ${room.city}.`
      );
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    })
    .finally(() => {
      const elapsed = Date.now() - startTime;
      console.log(`Chain took ${elapsed}ms`);
    });
}

 

//   buildReport(1);


// buildReport(999);
 
 

// return findCourse(student.courseId);
// return findTeacher(999);
// ========================================
// Test: Bad Teacher ID
// ========================================
//
 //
// return findTeacher(999);
  
  

// ========================================
// Day 04 vs Day 05
// ========================================
//
// Day 04 hell.js had 3 nested if (err) checks:
// 1. After findStudent
// 2. After findCourse
// 3. After findTeacher
//
// chain.js has only ONE error check:
// .catch((err) => { ... })
//
 

