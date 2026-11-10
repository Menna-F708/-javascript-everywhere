 

// ========================================
// Task 6.1 — Discriminated Unions & never
// states.ts
// ========================================

// ========================================
// 1. LoadState — Discriminated Union
// ========================================

interface Student {
  id: number;
  name: string;
}

type LoadState =
  | {
      status: "idle";
      message: string;
    }
  | {
      status: "loading";
      startedAt: Date;
    }
  | {
      status: "success";
      data: Student[];
      fetchedAt: Date;
    }
  | {
      status: "error";
      error: Error;
      retryCount: number;
    }
  | {
      status: "empty";
      message: string;
      searchedAt: Date;
    };

// ========================================
// 2. describe() — Narrowing with switch
// ========================================

function describe(state: LoadState): string {
  switch (state.status) {
    case "idle":
      return `Idle: ${state.message}`;

    case "loading":
      return `Loading started at ${state.startedAt.toISOString()}`;

    case "success":
      return `Loaded ${state.data.length} students`;

    case "error":
      return `Error: ${state.error.message}, retries: ${state.retryCount}`;

    case "empty":
      return `No results: ${state.message}`;

    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

// ========================================
// 3. Test the five states
// ========================================

const idleState: LoadState = {
  status: "idle",
  message: "Waiting to start",
};

const loadingState: LoadState = {
  status: "loading",
  startedAt: new Date(),
};

const successState: LoadState = {
  status: "success",
  data: [
    { id: 1, name: "Menna" },
    { id: 2, name: "Sara" },
  ],
  fetchedAt: new Date(),
};

const errorState: LoadState = {
  status: "error",
  error: new Error("Failed to load students"),
  retryCount: 2,
};

const emptyState: LoadState = {
  status: "empty",
  message: "No students found",
  searchedAt: new Date(),
};

console.log(describe(idleState));
console.log(describe(loadingState));
console.log(describe(successState));
console.log(describe(errorState));
console.log(describe(emptyState));

// ========================================
// 4. Experiment: Add a fifth member
// without handling it
// ========================================

// Before handling the new member, add this
// member to LoadState:
//
// | { status: "cancelled"; reason: string }
//
// Then add this test inside describe():
//
// case "cancelled":
//   return `Cancelled: ${state.reason}`;
//
// Temporarily REMOVE the cancelled case above.
// TypeScript will report an error here:
//
// default: {
//   const unreachable: never = state;
//   return unreachable;
// }
//
// Why?
// Because state can still be the "cancelled" member,
// so it cannot be assigned to never.
//
// Take a screenshot of the TypeScript error.
// Then restore the "cancelled" case to fix the error.

// ========================================
// 5. Experiment: Read the wrong member's data
// ========================================

// Inside case "loading", try:
//
// return state.error.message;
//
// TypeScript reports an error because the loading
// member has startedAt, not error.
//
// Inside case "success", try:
//
// return state.retryCount.toString();
//
// TypeScript reports an error because retryCount
// belongs to the error member, not success.
//
// Keep these incorrect examples as comments so
// the project compiles successfully.

// ========================================
// 6. A second Discriminated Union
// ========================================

type NotificationState =
  | {
      status: "draft";
      message: string;
    }
  | {
      status: "sending";
      message: string;
      recipient: string;
    }
  | {
      status: "sent";
      message: string;
      sentAt: Date;
    }
  | {
      status: "failed";
      message: string;
      error: Error;
    };

function describeNotification(
  state: NotificationState
): string {
  switch (state.status) {
    case "draft":
      return `Draft: ${state.message}`;

    case "sending":
      return `Sending "${state.message}" to ${state.recipient}`;

    case "sent":
      return `Sent at ${state.sentAt.toISOString()}`;

    case "failed":
      return `Failed: ${state.error.message}`;

    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

const draftNotification: NotificationState = {
  status: "draft",
  message: "Welcome!",
};

const sendingNotification: NotificationState = {
  status: "sending",
  message: "Your report is ready",
  recipient: "Menna",
};

const sentNotification: NotificationState = {
  status: "sent",
  message: "Your report is ready",
  sentAt: new Date(),
};

const failedNotification: NotificationState = {
  status: "failed",
  message: "Your report is ready",
  error: new Error("Network error"),
};

console.log(describeNotification(draftNotification));
console.log(describeNotification(sendingNotification));
console.log(describeNotification(sentNotification));
console.log(describeNotification(failedNotification));

// ========================================
// 7. Day 05 — allSettled + narrowing
// ========================================

const students: Student[] = [
  { id: 1, name: "Menna" },
  { id: 2, name: "Sara" },
  { id: 3, name: "Omar" },
];

function findStudent(id: number): Promise<Student> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = students.find(
        (student) => student.id === id
      );

      if (!student) {
        reject(new Error(`Student ${id} not found`));
        return;
      }

      resolve(student);
    }, 100);
  });
}

async function loadAllStudents(): Promise<void> {
  const promises: Promise<Student>[] = [
    findStudent(1),
    findStudent(2),
    findStudent(999),
    findStudent(3),
  ];

  const results: PromiseSettledResult<Student>[] =
    await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status === "fulfilled") {
      // TypeScript knows this is a successful result.
      // result.value is a Student.
      console.log("Success:", result.value.name);
    } else {
      // TypeScript knows this is a rejected result.
      // result.reason contains the rejection reason.
      const reason: unknown = result.reason;

      if (reason instanceof Error) {
        console.log("Failed:", reason.message);
      } else {
        console.log("Failed:", String(reason));
      }
    }
  }
}

loadAllStudents();

// Make this file a module.
export {};


