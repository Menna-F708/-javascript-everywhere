function buildReport(id, done) {
  findStudent(id, gotStudent);

  function gotStudent(err, student) {
    if (err) {
      return done(err);
    }

    const data = {
      ...student,
    };

    findCourse(data.courseId, gotCourse);
  }

  function gotCourse(err, course) {
    if (err) {
      return done(err);
    }

    const data = {
      ...currentData,
      course,
    };

    findTeacher(course.teacherId, gotTeacher);
  }

  function gotTeacher(err, teacher) {
    if (err) {
      return done(err);
    }

    const data = {
      ...currentData,
      teacher,
    };

    findRoom(teacher.roomId, gotRoom);
  }

  function gotRoom(err, room) {
    if (err) {
      return done(err);
    }

    const report = {
      ...currentData,
      room,
    };

    done(null, report);
  }
}





// 6.4 Defend yourself
function once(fn) {
  let called = false;

  return function (...args) {
    if (called) {
      return;
    }

    called = true;

    return fn(...args);
  };
}

function callTwice(callback) {
  callback("First call");
  callback("Second call");
}

const safeCallback = once((message) => {
  console.log(message);
});

callTwice(safeCallback);