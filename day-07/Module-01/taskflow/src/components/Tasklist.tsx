import TaskCard from "./Taskcard";

export default function TaskList() {
  return (
    <section className="task-list">
      <TaskCard
        title="Sample Task"
        description="This is a sample task"
        dueDate="2026-11-05"
        status="todo"
        late
      />
      <TaskCard
        title="Sample Task 2"
        description="This is a sample task 2"
        status="doing"
      />
      <TaskCard
        title="Sample Task 3"
        description="This is a sample task 3"
        dueDate="2026-11-12"
        status="done"
      />
    </section>
  );
}