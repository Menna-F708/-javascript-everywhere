const students = [
  {
    name: "Menna",
    address: {
      city: "Alexandria",
    },
    scores: [90, 95],
    attendance: 90,
  },

  {
    name: "Sara",
    scores: [80, 85],
    attendance: 85,
  },

  {
    name: "Yara",
    scores: [70, 75],
    attendance: 80,
  },

  {
    name: "Omar",
    address: {},
    scores: [60, 65],
    attendance: 75,
  },

  {
    name: "Nour",
    address: {
      city: "Cairo",
    },
    scores: [],
    attendance: 90,
  },

  {
    name: "Youssef",
    address: {
      city: "Giza",
    },
    scores: [88, 92],
    attendance: 0,
  },
];


for (const student of students) {
  console.log(student.address?.city ?? "Unknown");
}

for (const student of students) {
  console.log(student.scores?.[0] ?? "No scores yet");
}


for (const student of students) {
  console.log(student.attendance ?? "No attendance");
}

for (const student of students) {
  console.log(student.attendance || "No attendance");
}


function getCity(student) {
  return student.address?.city ?? "Unknown";
}


console.log(getCity(students[0]));
console.log(getCity(students[1]));
console.log(getCity(students[3]));



function safeFirstScore(student) {
  return student.scores?.[0] ?? null;
}

const student = {
  name: "Menna",
};

const result = student.getName?.();

console.log(result); 
