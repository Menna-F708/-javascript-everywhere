 
// ========================================
// Task 5.2 + 5.3
// typed-db.ts
// ========================================


// ========================================
// 1. Import Types
// ========================================

import type {
  Student,
  Course,
  Teacher,
  Room,
  StudentWithCourse,
} from "./db-types.ts";


// ========================================
// 2. Typed Tables
// ========================================

const students: Record<number, Student> = {
  1: {
    id: 1,
    name: "Menna",
    courseId: 101,
    email: "menna@example.com",
  },

  2: {
    id: 2,
    name: "Sara",
    courseId: 102,
  },

  3: {
    id: 3,
    name: "Omar",
    courseId: 103,
  },
};


const courses: Record<number, Course> = {
  101: {
    id: 101,
    name: "JavaScript",
    teacherId: 201,
    level: "beginner",
  },

  102: {
    id: 102,
    name: "React",
    teacherId: 202,
    level: "intermediate",
  },

  103: {
    id: 103,
    name: "Node.js",
    teacherId: 203,
  },
};


const teachers: Record<number, Teacher> = {
  201: {
    id: 201,
    name: "Ahmed",
    roomId: 301,
    phone: "01000000000",
  },

  202: {
    id: 202,
    name: "Mariam",
    roomId: 302,
  },

  203: {
    id: 203,
    name: "Youssef",
    roomId: 303,
  },
};


const rooms: Record<number, Room> = {
  301: {
    id: 301,
    name: "Room A",
    city: "Alexandria",
  },

  302: {
    id: 302,
    name: "Room B",
    city: "Cairo",
  },

  303: {
    id: 303,
    name: "Room C",
    city: "Giza",
  },
};


// ========================================
// 3. Generic Lookup Helper
// ========================================

function lookup<T>(
  table: Record<number, T>,
  id: number,
  tableName: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = table[id];

      if (!item) {
        reject(
          new Error(`${tableName} with id ${id} not found`)
        );
        return;
      }

      resolve(item);
    }, 100);
  });
}


// ========================================
// 4. Get Functions
// ========================================

function getStudent(id: number): Promise<Student> {
  return lookup(students, id, "Student");
}


function getCourse(id: number): Promise<Course> {
  return lookup(courses, id, "Course");
}


function getTeacher(id: number): Promise<Teacher> {
  return lookup(teachers, id, "Teacher");
}


function getRoom(id: number): Promise<Room> {
  return lookup(rooms, id, "Room");
}


// ========================================
// 5. Report Interface
// ========================================

interface StudentReport extends StudentWithCourse {
  teacherName: string;
  roomName: string;
  city: string;
}


// ========================================
// 6. Build Report
// ========================================

async function buildReport(
  id: number
): Promise<StudentReport> {

  const student = await getStudent(id);

  const course = await getCourse(student.courseId);

  const teacher = await getTeacher(course.teacherId);

  const room = await getRoom(teacher.roomId);

  return {
    id: student.id,
    name: student.name,
    courseId: student.courseId,
    email: student.email,

    courseName: course.name,

    teacherName: teacher.name,

    roomName: room.name,

    city: room.city,
  };
}


// ========================================
// 7. Error Message Helper
// ========================================

function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
}


// ========================================
// 8. Main
// ========================================

async function main(): Promise<void> {
  try {
    const report = await buildReport(1);

    console.log("Student Report:");
    console.log(report);

  } catch (err: unknown) {
    console.error("Error:", errorMessage(err));
  }
}


// ========================================
// 9. Test Error
// ========================================

async function testError(): Promise<void> {
  try {
    const report = await buildReport(999);

    console.log(report);

  } catch (err: unknown) {
    console.error("Error:", errorMessage(err));
  }
}


main();

testError();


// ========================================
// 5.3 — Break it
// ========================================


// ----------------------------------------
// A. Misspelled property
// ----------------------------------------

// Original:
//
// const brokenStudent: Student = {
//   id: 4,
//   name: "Ali",
//   courseId: 101,
//   nmae: "Wrong",
// };
//
// Error:
// Object literal may only specify known properties,
// and 'nmae' does not exist in type 'Student'.
//
// The property name was restored by keeping this
// experiment commented.


const validStudent: Student = {
  id: 4,
  name: "Ali",
  courseId: 101,
};


// ----------------------------------------
// B. Missing required property
// ----------------------------------------

// Original:
//
// const incompleteStudent: Student = {
//   id: 5,
//   name: "Hana",
// };
//
// Error:
// Property 'courseId' is missing in type
// '{ id: number; name: string; }'
// but required in type 'Student'.
//
// courseId is required, so it cannot be omitted.


// ----------------------------------------
// C. Reassign readonly id
// ----------------------------------------

const readonlyStudent: Student = {
  id: 6,
  name: "Mona",
  courseId: 102,
};

// Original:
//
// readonlyStudent.id = 20;
//
// Error:
// Cannot assign to 'id' because it is a read-only property.
//
// The id is readonly through BaseEntity.


// ----------------------------------------
// D. import type experiment
// ----------------------------------------

// The correct import at the top of this file is:
//
// import type {
//   Student,
//   Course,
//   Teacher,
//   Room,
//   StudentWithCourse,
// } from "./db-types.ts";
//
//
// Experiment:
//
// Change:
//
// import type { Student } from "./db-types.ts";
//
// To:
//
// import { Student } from "./db-types.ts";
//
// Then run:
//
// node dist/typed-db.js
//
//
// Runtime error:
//
// Student is not defined at runtime
// because interfaces and type aliases are erased
// from the generated JavaScript.
//
// import type tells TypeScript:
//
// "This import is only needed for type checking."
//
// A plain import tells JavaScript to load something
// at runtime, but interfaces/types do not exist at runtime.
//
// The import type was restored above.


// ----------------------------------------
// E. Real Day 04 / Day 05 data mistakes
// ----------------------------------------

// Checked against the typed database:
//
// students:
// id, name, courseId
//
// courses:
// id, name, teacherId
//
// teachers:
// id, name, roomId
//
// rooms:
// id, name, city
//
// No real property/type mismatch was found
// in the Day 05 data provided for this lab.
//
// The relationships are consistent:
//
// Student courseId
//     ↓
// Course id
//
// Course teacherId
//     ↓
// Teacher id
//
// Teacher roomId
//     ↓
// Room id
//
// Therefore, no fake data mistake was added here.
//


// ========================================
// 10. Exports
// ========================================

export {
  students,
  courses,
  teachers,
  rooms,
  lookup,
  getStudent,
  getCourse,
  getTeacher,
  getRoom,
  buildReport,
  errorMessage,
};
