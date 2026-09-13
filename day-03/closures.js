function makeCounter() {
  let count = 0;
  return function increment() {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
console.log(counter1());
console.log(counter1());

const counter2 = makeCounter();
console.log(counter2());
console.log(counter2());
// Because the returned function remembers and keeps access to count through a closure.

function makeMultiplier(factor) {
  return function multiplies(number) {
    return factor * number;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const half = makeMultiplier(0.5);

console.log(double(5));
console.log(triple(5));
console.log(half(10));

// grader factory
function makeGrader(passMark) {
  return function (score) {
    if (score >= passMark) {
      return "Pass";
    }

    return "Fail";
  };
}

const strictGrader = makeGrader(85); 
const lenientGrader = makeGrader(60);

console.log(strictGrader(70));
console.log(lenientGrader(70));




// own forEach
function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}

const skills = ["Web", "Mobile", "Desktop"];

myForEach(skills, (item, index) => {
  console.log(`${index + 1}. ${item}`);
});



// own map and filter

function myMap(array, callback) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i]));
  }

  return newArray;
}

const numbers = [1, 2, 3, 4];
const doubled = myMap(numbers, (number) => number * 2);
console.log(doubled);
console.log(numbers);



// Callback,not call

function sayHi() {
  console.log("Hi");
}

function runTwice(fn) {
  fn();
  fn();
}
runTwice(sayHi);