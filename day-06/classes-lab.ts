
// ========================================
// Task 7.1 + 7.2 + 7.3 — Classes Lab
// classes-lab.ts
// ========================================

// ========================================
// 1. Interface
// ========================================

interface AttendanceContract {
  readonly studentId: number;

  getAttendance(): number;

  updateAttendance(value: number): this;
}

// ========================================
// 2. Attendance Class
// ========================================

class Attendance implements AttendanceContract {
  readonly studentId: number;

  #attendance: number;
  #lastUpdated: Date;

  static count = 0;

  // ========================================
  // 3. Constructor
  // ========================================

  constructor(studentId: number, attendance: number) {
    this.studentId = studentId;

    this.validateAttendance(attendance);

    this.#attendance = attendance;
    this.#lastUpdated = new Date();

    Attendance.count++;
  }

  // ========================================
  // 4. Validation method
  // ========================================

  private validateAttendance(value: number): void {
    if (value < 0 || value > 100) {
      throw new Error(
        "Attendance must be between 0 and 100"
      );
    }
  }

  // ========================================
  // 5. Method required by interface
  // ========================================

  getAttendance(): number {
    return this.#attendance;
  }

  // ========================================
  // 6. Update attendance
  // ========================================

  updateAttendance(value: number): this {
    this.validateAttendance(value);

    this.#attendance = value;
    this.#lastUpdated = new Date();

    return this;
  }

  // ========================================
  // 7. Getter
  // ========================================

  get attendance(): number {
    return this.#attendance;
  }

  // ========================================
  // 8. Another method returning this
  // ========================================

  touch(): this {
    this.#lastUpdated = new Date();

    return this;
  }

  // ========================================
  // 9. Getter for last update
  // ========================================

  get lastUpdated(): Date {
    return this.#lastUpdated;
  }
}

// ========================================
// 10. Create Attendance objects
// ========================================

const student1 = new Attendance(1, 92);

const student3 = new Attendance(3, 95);

const student4 = new Attendance(4, 80);

console.log(
  "Student 1 attendance:",
  student1.attendance
);

console.log(
  "Student 1 ID:",
  student1.studentId
);

console.log(
  "Student 3 attendance:",
  student3.getAttendance()
);

console.log(
  "Created Attendance objects:",
  Attendance.count
);

// ========================================
// 11. Method chaining — three calls
// ========================================

student1
  .updateAttendance(94)
  .touch()
  .updateAttendance(96);

console.log(
  "Student 1 updated attendance:",
  student1.attendance
);

// ========================================
// 12. Getter
// ========================================

console.log(
  "Last updated:",
  student1.lastUpdated
);

// ========================================
// 13. Validation experiment
// ========================================

// Uncomment this to test the validation error:
//
// student1.updateAttendance(150);
//
// Error:
// Attendance must be between 0 and 100

// ========================================
// 14. readonly experiment
// ========================================

// Uncomment this to test readonly:
//
// student1.studentId = 10;
//
// Error:
// Cannot assign to 'studentId' because it is a read-only property.

// ========================================
// 15. #private experiment
// ========================================

// Uncomment this to test:
//
// console.log(student1.#attendance);
//
// Error:
// Property '#attendance' is not accessible
// outside class 'Attendance'.

// ========================================
// 16. Static counter
// ========================================

console.log(
  "Total Attendance objects:",
  Attendance.count
);

// ========================================
// Task 7.2 — Inheritance
// ========================================

// ========================================
// 17. Child Class
// ========================================

class StudentAttendance extends Attendance {
  studentName: string;

  constructor(
    studentId: number,
    attendance: number,
    studentName: string
  ) {
    super(studentId, attendance);

    this.studentName = studentName;
  }

  // ========================================
  // 18. Override parent method
  // ========================================

  override getAttendance(): number {
    const attendance = super.getAttendance();

    console.log(
      `${this.studentName}: ${attendance}%`
    );

    return attendance;
  }
}

// ========================================
// 19. Create Parent + Child objects
// ========================================

const records: AttendanceContract[] = [
  new Attendance(1, 92),
  new StudentAttendance(3, 95, "Sara"),
  new Attendance(4, 80),
  new StudentAttendance(5, 85, "Omar"),
];

// ========================================
// 20. Process both classes in one loop
// ========================================

for (const record of records) {
  console.log(
    `Student ${record.studentId}: ${record.getAttendance()}%`
  );

  if (record instanceof StudentAttendance) {
    console.log(
      `Student name: ${record.studentName}`
    );
  }
}

// ========================================
// Task 7.3 — Break it
// ========================================

// ========================================
// 21. Break readonly
// ========================================

// Try uncommenting:
//
// student1.studentId = 10;
//
// Error:
// Cannot assign to 'studentId' because it is a read-only property.
//
// Why?
// readonly allows the value to be assigned during initialization,
// but prevents reassignment afterward.

// ========================================
// 22. Break #private
// ========================================

// Try uncommenting:
//
// console.log(student1.#attendance);
//
// Error:
// Property '#attendance' is not accessible
// outside class 'Attendance'.
//
// Why?
// #attendance is a JavaScript private field.
// It can only be accessed from inside the class.

// ========================================
// 23. Break implements
// ========================================

// Experiment:
//
// Remove getAttendance() from Attendance.
//
// TypeScript will report an error similar to:
//
// Class 'Attendance' incorrectly implements interface
// 'AttendanceContract'.
//
// Property 'getAttendance' is missing in type 'Attendance'
// but required in type 'AttendanceContract'.
//
// Why?
// implements means the class promises to provide
// everything required by the interface.
//
// We restore getAttendance() above so the final file works.

// ========================================
// 24. Break erasableSyntaxOnly
// ========================================

// Experiment:
//
// Try replacing the StudentAttendance constructor
// with:
//
// constructor(
//   private name: string
// ) {}
//
// Depending on the project's TypeScript configuration,
// you will get an error related to:
//
// erasableSyntaxOnly
//
// Why?
// "private name: string" inside the constructor is a
// TypeScript parameter property.
// It is not just a type annotation; TypeScript uses it
// to generate a class property.
//
// The project configuration currently disallows
// this syntax with erasableSyntaxOnly.

// ========================================
// 25. Break instanceof with interface
// ========================================

// Try this inside the loop:
//
// if (record instanceof AttendanceContract) {
//   console.log("Attendance contract");
// }
//
// Error:
//
// 'AttendanceContract' only refers to a type,
// but is being used as a value here.
//
// Why?
//
// interface exists only during TypeScript type checking:
//
// TypeScript
//    ↓
// interface AttendanceContract
//    ↓
// compile
//    ↓
// JavaScript
//    ↓
// interface disappears
//
// But instanceof works at runtime and needs
// an actual JavaScript constructor/class.
//
// Therefore this works:
//
// record instanceof StudentAttendance
//
// because StudentAttendance is a real class.
//
// But this does not:
//
// record instanceof AttendanceContract
//
// because AttendanceContract is only an interface.

// ========================================
// 26. Final explanation
// ========================================

// readonly
// → prevents reassignment
//
// #private
// → prevents access from outside the class
//
// implements
// → forces the class to satisfy the interface
//
// parameter property
// → constructor(private name: string)
//
// interface + instanceof
// → cannot use instanceof with interfaces
//   because interfaces disappear at runtime.

// ========================================
// 27. Make this file a module
// ========================================

export {};
