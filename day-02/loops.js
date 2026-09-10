for (let index = 1; index <= 20; index++) {
  if (index % 3 === 0) {
    console.log("Fizz");
  } else {
    console.log(index);
  }
}

// For of
let tracks = [
  "Front-end",
  "Back-end",
  "UI/UX",
  "Automation",
  "React",
  "Node.js",
];
let index = 0;
for (const track of tracks) {
  console.log(`${index} → ${track}`);
  index++;
}

// For in
let objProperties = {
  name: "Menna",
  age: 23,
  role: "Frontend Developer",
  city: "Alexandria",
  level: "Junior",
};

for (const objPro in objProperties) {
  console.log(`${objPro} →  ${objProperties[objPro]}`);
}

// While
let number = 100;
while (number >= 1) {
  console.log(number);
  number = number / 2;
}

// do While
let numberDo = 10;

do {
  console.log(numberDo);
} while (numberDo < 5);

// breake and continue
let scores = [40, 55, 70, 30, 85, 97, 60, 100];
// Printed: 55, 70, 85
// 40 and 30 were skipped because they are below 50.
// 97 stopped the loop because it is above 95.
// 60 and 100 were never reached because the loop already stopped.
for (const score of scores) {
  if (score < 50) {
    continue;
  }

  if (score > 95) {
    break;
  }

  console.log(score);
}

let eightNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;

for (const number of eightNums) {
  sum += number;
}
let average = sum / eightNums.length;

// highest
let highest = eightNums[0];
for (const number of eightNums) {
  if (number > highest) {
    highest = number;
  }
}

// lowest
let lowest = eightNums[0];
for (const number of eightNums) {
  if (number < lowest) {
    lowest = number;
  }
}

console.log("Sum:", sum);
console.log("Average:", average);
console.log("Highest:", highest);
console.log("Lowest:", lowest);
