import type { Task} from "../types/type";
 
 const tasks: Task[] = [
   {
     id: 1,
     title: "Sample Task",
     description: "This is a sample task",
     dueDate: "2026-11-05",
     status: "todo",
     late: true,
    },
   {
     id: 2,
     title: "Sample Task 2",
     description: "This is a sample task 2",
     status: "doing",
     priority: "medium",
   },
   {
     id: 3,
     title: "Sample Task 3",
     description: "This is a sample task 3",
     dueDate: "2026-11-12",
     status: "done",
   },
   {
     id: 4,
     title: "Sample Task 4",
     description: "This is a sample task 4",
     dueDate: "2026-11-04",
     status: "doing",
     priority: "high",
     late: true,
   },
 ];

export default tasks;