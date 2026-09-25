// 6.2 - Callback Hell

findStudent(1, (err, student) => {
  if (err) {
    console.log("Student error:", err.message);
    return;
  }

  findCourse(student.courseId, (err, course) => {
    if (err) {
      console.log("Course error:", err.message);
      return;
    }

    findTeacher(course.teacherId, (err, teacher) => {
      if (err) {
        console.log("Teacher error:", err.message);
        return;
      }

      findRoom(teacher.roomId, (err, room) => {
        if (err) {
          console.log("Room error:", err.message);
          return;
        }

        console.log(
          `${student.name} is studying ${course.name} with ${teacher.name} in ${room.name}`,
        );

        // Deepest indentation: 8 levels
      });
    });
  });
});

// Broken 1: bad student
findStudent(999, (err, student) => {
  if (err) {
    console.log("Student error:", err.message);
    return;
  }

  console.log(student);
});

// Broken 2: bad course
findCourse(999, (err, course) => {
  if (err) {
    console.log("Course error:", err.message);
    return;
  }

  console.log(course);
});

// Broken 3: bad teacher
findTeacher(999, (err, teacher) => {
  if (err) {
    console.log("Teacher error:", err.message);
    return;
  }

  console.log(teacher);
});
