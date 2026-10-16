# Day 07 Notes

**1. Props vs state.**
Difference: props come from the parent and the child can't change them, while
state is owned by the component and changed with its setter. Similarity: when
either changes, React re-renders the component. Example: `TaskItem` receives
`task` as a prop, but `AddTaskForm` owns `title` as state.

**2. Why you never mutate state.**
React decides whether to re-render by comparing references. In my break-it test
I wrote `task.done = !task.done; setTasks(tasks)` and the checkbox did not
update, because it was the same array. `.sort()` has the same trap: it mutates
the array it is called on, so `sortTasks` copies first with `[...tasks]`.

**3. Derived vs stored.**
`remaining` (`tasks.length - completed`) and the sorted/filtered list are
computed on every render. If I stored `remaining` in its own state, I would have
to update it in every handler; in my break-it test I forgot `removeTask` and the
counter showed the wrong number.

**4. One real bug.**
Running `npm run dev` gave `npm error Missing script: "dev"`. The terminal was
in the repo root (`javascript-everywhere`) and `package.json` is inside
`day-07/react-assignment`. I found it by reading which folder the prompt was in.
Fix: `cd` into the project folder, then run the command.