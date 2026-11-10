 
 // ========================================
// Task 6.2 — Type Guards & Untrusted Data
// guards.ts
// ========================================

// ========================================
// 1. Student type
// ========================================

interface Student {
  id: number;
  name: string;
  courseId: number;
  score: number;
}

// ========================================
// 2. isStudent() — Custom Type Guard
// ========================================

// بنستقبل unknown لأننا مش واثقين في شكل البيانات.
// value is Student بتقول لـ TypeScript إننا لو رجعنا true،
// يبقى value اتأكدنا إنها Student.

function isStudent(value: unknown): value is Student {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("id" in value) || typeof value.id !== "number") {
    return false;
  }

  if (!("name" in value) || typeof value.name !== "string") {
    return false;
  }

  if (
    !("courseId" in value) ||
    typeof value.courseId !== "number"
  ) {
    return false;
  }

  if (!("score" in value) || typeof value.score !== "number") {
    return false;
  }

  // الـ score لازم يكون بين 0 و100.
  if (value.score < 0 || value.score > 100) {
    return false;
  }

  return true;
}

// ========================================
// 3. JSON string — valid and invalid records
// ========================================

const rawJson = `
[
  {
    "id": 1,
    "name": "Menna",
    "courseId": 101,
    "score": 95
  },
  {
    "id": 2,
    "name": "Sara",
    "courseId": 102,
    "score": 88
  },
  {
    "id": 3,
    "name": "Omar",
    "courseId": 103,
    "score": 76
  },
  {
    "id": "4",
    "name": "Ali",
    "courseId": 101,
    "score": 90
  },
  {
    "id": 5,
    "name": "Mona",
    "courseId": 102,
    "score": 120
  },
  {
    "id": 6,
    "name": 123,
    "courseId": 103,
    "score": 80
  },
  {
    "id": 7,
    "name": "Hana",
    "courseId": 101,
    "score": -5
  },
  {
    "id": 8,
    "name": "Youssef",
    "courseId": 103
  }
]
`;

// ========================================
// 4. Parse as unknown
// ========================================

// JSON.parse بترجع any افتراضيًا في TypeScript.
// عشان نتعامل مع البيانات بحذر، بنسند النتيجة إلى unknown.

const parsedData: unknown = JSON.parse(rawJson);

// ========================================
// 5. Check array, filter valid students
// ========================================

let validStudents: Student[] = [];
let rejectedCount = 0;

if (Array.isArray(parsedData)) {
  // filter بيستخدم الـ Type Predicate في isStudent
  // وبيستنتج إن النتيجة Student[].
  validStudents = parsedData.filter(isStudent);

  rejectedCount = parsedData.length - validStudents.length;
} else {
  console.log("The JSON data is not an array.");
}

// ========================================
// 6. Print valid names and rejected count
// ========================================

console.log("Valid student names:");

for (const student of validStudents) {
  console.log(student.name);
}

console.log("Valid students:", validStudents.length);
console.log("Rejected records:", rejectedCount);

// ========================================
// 7. Experiment: boolean vs Type Predicate
// ========================================

// غيّري توقيع الدالة مؤقتًا من:
//
// function isStudent(value: unknown): value is Student
//
// إلى:
//
// function isStudent(value: unknown): boolean
//
// بعدها جرّبي:
//
// const result = parsedData.filter(isStudent);
//
// في الحالة دي، TypeScript مش بيستخدم نوع boolean العادي
// عشان يستنتج إن كل عنصر Student، وبالتالي النتيجة
// مش هتكون مضمونة النوع Student[].
//
// لو كتبنا:
//
// const result: Student[] = parsedData.filter(isStudent);
//
// ممكن يظهر خطأ لأن filter مش قادر يثبت نوع العناصر.
//
// رجّعي التوقيع إلى:
//
// value is Student
//
// عشان TypeScript يعرف إن الدالة بتتحقق فعلًا
// من إن العنصر Student، ويقدر يستنتج Student[].

// ========================================
// 8. A second guard — Course from Task 5
// ========================================

interface Course {
  id: number;
  name: string;
  teacherId: number;
}

// Guard تاني بيتأكد إن البيانات Course سليمة.

function isCourse(value: unknown): value is Course {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("id" in value) || typeof value.id !== "number") {
    return false;
  }

  if (!("name" in value) || typeof value.name !== "string") {
    return false;
  }

  if (
    !("teacherId" in value) ||
    typeof value.teacherId !== "number"
  ) {
    return false;
  }

  return true;
}

const rawCourse: unknown = {
  id: 101,
  name: "JavaScript",
  teacherId: 201,
};

if (isCourse(rawCourse)) {
  // هنا TypeScript عارف إن rawCourse هو Course.
  console.log("Valid course:", rawCourse.name);
} else {
  console.log("Invalid course data");
}

// ========================================
// 9. as Student vs isStudent(raw)
// ========================================

// `raw as Student` مجرد Type Assertion.
// إنتِ بتقولي لـ TypeScript: "اعتبر البيانات دي Student".
// لكنه مش بيفحص البيانات في وقت التشغيل.
//
// مثال:
// const raw: unknown = { id: "wrong" };
// const student = raw as Student;
//
// TypeScript ممكن يقبل الـ assertion، لكن البيانات
// تفضل غير سليمة فعلًا، وممكن يحصل Bug وقت التشغيل.
//
// أما isStudent(raw):
// فهي بتفحص نوع كل property مطلوبة، وكمان الـ score
// لازم يكون بين 0 و100، وبترجع true أو false.
//
// عشان كده مع بيانات API أو JSON غير الموثوقة،
// الـ Type Guard أفضل من الاعتماد على `as Student`.

// ========================================
// End of file
// ========================================

export {};

