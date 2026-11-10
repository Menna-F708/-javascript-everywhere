
// ========================================
// Task 5.1 — Type Your Own Database
// db-types.ts
// ========================================


// ========================================
// 1. Base Entity
// ========================================

export interface BaseEntity {
  readonly id: number;
}


// ========================================
// 2. Literal Union
// ========================================

export type CourseLevel =
  | "beginner"
  | "intermediate"
  | "advanced";


// ========================================
// 3. Student Table
// ========================================

export interface Student extends BaseEntity {
  name: string;
  courseId: number;

  // Optional: a student may not have an email
  email?: string;
}


// ========================================
// 4. Course Table
// ========================================

export interface Course extends BaseEntity {
  name: string;
  teacherId: number;

  // Optional: a course may not have a level
  level?: CourseLevel;
}


// ========================================
// 5. Teacher Table
// ========================================

export interface Teacher extends BaseEntity {
  name: string;
  roomId: number;

  // Optional: a teacher may not have a phone number
  phone?: string;
}


// ========================================
// 6. Room Table
// ========================================

export interface Room extends BaseEntity {
  name: string;
  city: "Alexandria" | "Cairo" | "Giza";
}


// ========================================
// 7. Intersection Type
// Student + Course information
// ========================================

export type StudentWithCourse = Student & {
  courseName: string;
};
