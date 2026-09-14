// ========================================
// 1. COMPOSE
// ========================================

function compose(f, g) {
  return function (value) {
    return f(g(value));
  };
}

const double = (number) => number * 2;
const addOne = (number) => number + 1;

const doubleAfterAddOne = compose(double, addOne);

console.log(doubleAfterAddOne(5)); 

// ========================================
// 2. ONCE
// ========================================

function once(fn) {
  let hasRun = false;
  let result;

  return function () {
    if (hasRun === false) {
      result = fn();
      hasRun = true;
    }

    return result;
  };
}

const initialize = once(() => {
  console.log("Initialized!");
  return 100;
});

console.log(initialize()); 
console.log(initialize()); 
console.log(initialize()); 

// ========================================
// 3. MEMOIZE
// ========================================

function memoize(fn) {
  const cache = {};

  return function (number) {
    if (cache[number] !== undefined) {
      return cache[number];
    }

    const result = fn(number);

    cache[number] = result;

    return result;
  };
}

function slowSquare(number) {
  console.log("Calculating...");

  for (let i = 0; i < 1000000; i++) {
   }

  return number * number;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); 
console.log(fastSquare(5)); 
console.log(fastSquare(10)); 
console.log(fastSquare(10)); 

// ========================================
// 4. MY REDUCE
// ========================================

function myReduce(array, callback, initial) {
  let accumulator = initial;

  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i);
  }

  return accumulator;
}

const numbers = [10, 20, 30];

const total = myReduce(
  numbers,
  (sum, number) => {
    return sum + number;
  },
  0,
);

console.log(total); 

// ========================================
// 5. AVERAGE USING MY REDUCE
// ========================================

function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  const total = myReduce(
    numbers,
    (sum, number) => {
      return sum + number;
    },
    0,
  );

  return total / numbers.length;
}

console.log(average([10, 20, 30])); 

// ========================================
// 6. WEIGHTED SCORE
// ========================================

function weightedScore(student) {
  return student.score * 0.7 + student.attendance * 0.3;
}

const student = {
  name: "Menna",
  score: 80,
  attendance: 90,
};

console.log(weightedScore(student)); 

// ========================================
// 7. STUDENTS + SORT USING OUR OWN LOOP
// ========================================

const students = [
  { name: "Menna", score: 80, attendance: 90 },
  { name: "Ahmed", score: 90, attendance: 70 },
  { name: "Sara", score: 75, attendance: 100 },
  { name: "Omar", score: 95, attendance: 80 },
];

 
for (let i = 0; i < students.length - 1; i++) {
  for (let j = i + 1; j < students.length; j++) {
    if (weightedScore(students[j]) > weightedScore(students[i])) {
      const temp = students[i];

      students[i] = students[j];

      students[j] = temp;
    }
  }
}

console.log(students);

// ========================================
// 8. ID GENERATOR
// ========================================

function makeIdGenerator(prefix) {
  let counter = 0;

  return function () {
    counter++;

    return `${prefix}-${counter}`;
  };
}

const generateStudentId = makeIdGenerator("STU");

console.log(generateStudentId()); 
console.log(generateStudentId()); 
console.log(generateStudentId()); 

// ========================================
// 9. VALIDATE STUDENT
// ========================================

function validateStudent(student) {
  const errors = [];

  if (!student.name || student.name.trim() === "") {
    errors.push("Name is required");
  }

  if (typeof student.score !== "number" || Number.isNaN(student.score)) {
    errors.push("Score must be a number");
  } else if (student.score < 0 || student.score > 100) {
    errors.push("Score must be between 0 and 100");
  }

  if (
    typeof student.attendance !== "number" ||
    Number.isNaN(student.attendance)
  ) {
    errors.push("Attendance must be a number");
  } else if (student.attendance < 0 || student.attendance > 100) {
    errors.push("Attendance must be between 0 and 100");
  }

  return errors;
}

console.log(
  validateStudent({
    name: "",
    score: 120,
    attendance: 90,
  }),
);


// ========================================
// 10. REMOVE BUTTON + CLOSURE
// ========================================

const studentList = [{ name: "Menna" }, { name: "Ahmed" }, { name: "Sara" }];

function createRemoveHandler(index) {
  return function () {
    studentList.splice(index, 1);

    console.log(studentList);
  };
}

const removeMenna = createRemoveHandler(0);
const removeAhmed = createRemoveHandler(1);

removeMenna();
