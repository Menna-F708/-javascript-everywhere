import TaskCard from "./Taskcard";
import Section from "./Section";
import Badge from "./Badge";
import tasks from "../data/data";

export default function TaskList() {
  return (
    <Section title="My Tasks" action={<Badge>{tasks.length} tasks</Badge>}>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.title} {...task} />
        ))}
      </div>
    </Section>
  );
}