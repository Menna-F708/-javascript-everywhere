 const attendanceData = {
  1: 92,
  3: 95,
  4: 80,
  5: 85,
  6: 65,
  7: 75,
  8: 60,
  9: 91,
  10: 78,
};

const attendanceDelays = {
  1: 700,
  2: 200,
  3: 1000,
  4: 400,
  5: 900,
  6: 100,
  7: 800,
  8: 300,
  9: 500,
  10: 600,
};

const attempts = {};

async function getAttendance(id) {
  const delay = attendanceDelays[id] ?? 200;

  await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

  attempts[id] = (attempts[id] ?? 0) + 1;

  // Ahmed always fails.
  if (id === 2) {
    throw new Error("Attendance not found");
  }

  // Sara is flaky: first two attempts fail, then succeeds.
  if (id === 3 && attempts[id] < 3) {
    throw new Error("Temporary attendance error");
  }

  const attendance = attendanceData[id];

  if (attendance === undefined) {
    throw new Error("Attendance not found");
  }

  return attendance;
}

export default getAttendance;

