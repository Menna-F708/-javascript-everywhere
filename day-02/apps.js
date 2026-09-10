let scoreInput = document.getElementById("scoreInput");
let checkBtn = document.getElementById("checkBtn");
const message = document.getElementById("message");
let history = [];
const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearBtn");



checkBtn.addEventListener("click", () => {
    let inputValue = scoreInput.value;
    let inputValueNumber = Number(inputValue);
  if (inputValue === "" || inputValue === Number.isNaN(inputValueNumber)) {
    message.textContent = "Please enter a number between 0 and 100";
    return;
  }

  if (inputValueNumber > 100 || inputValueNumber < 0) {
    message.textContent = "Please enter a number between 0 and 100";
    return;
  }

  let grade;
  if (inputValueNumber >= 90) {
    grade = "A";
  } else if (inputValueNumber >= 80) {
    grade = "B";
  } else if (inputValueNumber >= 70) {
    grade = "C";
  } else if (inputValueNumber >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  history.push(`${inputValueNumber} → ${grade}`);
  console.log(history);
  historyList.innerHTML = "";

  for (const item of history) {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  }

  message.textContent = `Grade: ${grade}`;

  scoreInput.value = "";
});

clearBtn.addEventListener("click", () => {
  history = [];
  historyList.innerHTML = "";
  message.textContent = "";
});
