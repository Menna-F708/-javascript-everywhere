 interface Student {
  id: number;
  name: string;
  age: number;
  grade: number;
}

// 9.1 Omit
type NewStudent = Omit<Student, "id">;

function addStudent(input: NewStudent): Student {
  return {
    id: 1,
    ...input,
  };
}

const newStudent = addStudent({
  name: "Menna",
  age: 22,
  grade: 90,
});

console.log("New student:", newStudent);

// Partial + Omit
type StudentUpdate = Partial<Omit<Student, "id">>;

function updateStudent(
  student: Student,
  update: StudentUpdate
): Student {
  return {
    ...student,
    ...update,
  };
}

const updatedStudent = updateStudent(newStudent, {
  grade: 95,
});

console.log("Updated student:", updatedStudent);

// Proved updateStudent rejects an id and a wrong value type
// updateStudent(newStudent, {
//   id: 2,       // Error: id is not allowed
//   age: "22",   // Error: age must be a number
// });

// Pick
type PublicStudentCard = Pick<Student, "name" | "grade">;

function makePublicStudentCard(
  student: Student
): PublicStudentCard {
  return {
    name: student.name,
    grade: student.grade,
  };
}

const publicCard = makePublicStudentCard(updatedStudent);

console.log("Public card:", publicCard);

// Readonly
const readonlyStudent: Readonly<Student> = {
  id: 1,
  name: "Menna",
  age: 22,
  grade: 95,
};

// readonlyStudent.name = "Sara";
// Error: Cannot assign to 'name' because it is a read-only property.

console.log("Readonly student:", readonlyStudent);

// Record
type LetterGrade = "A" | "B" | "C" | "D" | "F";

const gradeCounts: Record<LetterGrade, number> = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  F: 0,
};

console.log("Grade counts:", gradeCounts);

// ReturnType + Awaited
async function getStudent(): Promise<Student> {
  return {
    id: 1,
    name: "Menna",
    age: 22,
    grade: 90,
  };
}

type StudentPromise = ReturnType<typeof getStudent>;
type StudentResult = Awaited<StudentPromise>;

console.log("Student result type:", {} as StudentResult);

getStudent().then((student) => {
  console.log("Async student:", student);
});

// as const + union
const subjects = ["JavaScript", "TypeScript", "React"] as const;

type Subject = (typeof subjects)[number];

const selectedSubject: Subject = "TypeScript";

console.log("Subjects:", subjects);
console.log("Selected subject:", selectedSubject);

// Added property to the base interface
// Uncomment this interface to observe the errors:
//
// interface Student {
//   email: string;
// }
//
// After adding email, TypeScript will mark the places
// that create a Student without email.
// This is good because TypeScript shows us
// every place that needs to be updated.
 