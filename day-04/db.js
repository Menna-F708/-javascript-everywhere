// 6.1 fake-db.js — fake database
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