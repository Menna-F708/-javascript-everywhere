import TaskCard from "./Taskcard";
import Section from "./Section";
import Badge from "./Badge";
import tasks from "../data/data";
 export default function TaskList() {
  function handleDelete(id:number) {
    console.log(id)
  }
  console.log(tasks);
  return (
    <Section title="My Tasks" action={<Badge>{tasks.length} tasks</Badge>}>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.title} {...task} onDelete={handleDelete}/>
        ))}
      </div> 
    </Section>
  );
} 