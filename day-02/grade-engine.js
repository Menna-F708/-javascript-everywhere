let scores = [95, 85, 75, 65, 45];

for (let score of scores) {
  if (score > 100 || score < 0) {
    console.log("Invalid score");
  } else if (score >= 90) {
    console.log(score, "→ A");
  } else if (score >= 80) {
    console.log(score, "→ B");
  } else if (score >= 70) {
    console.log(score, "→ C");
  } else if (score >= 60) {
    console.log(score, "→ D");
  } else {
    console.log(score, "→ F");
  }
}

// I would not use a nested ternary for five bands because it becomes hard to read and maintain.
let score = 75;
let result = score >= 60 ? "pass" : "fail";
console.log(result);

// Switch
let grade = "B";

switch (grade) {
  case "A":
    console.log("Excellent!");
    break;

  case "B":
    console.log("Very good!");
    break;

  case "C":
    console.log("Good!");
    break;

  case "D":
    console.log("You passed.");
    break;

  case "E":
    console.log("Almost there.");
    break;

  case "F":
    console.log("You failed.");
    break;

  default:
    console.log("Invalid grade");
}

// Logical operators
let scoreLogical = 85;
let attendance = 90;

if (scoreLogical >= 70 && attendance >= 80) {
  console.log("Certificate awarded");
}

if (scoreLogical < 60 || attendance < 50) {
  console.log("Review needed");
}
