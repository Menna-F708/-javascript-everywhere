 
# React Questions & Answers

### 1. Why can't TaskList call `useTasks()` directly on every page?

Because `useTasks()` manages shared tasks state. If every page calls it separately, each page may get its own state instead of sharing the same data.

### 2. What does the `end` prop on `NavLink` fix?

It makes the link active only when the URL exactly matches the link path. It prevents the Home link from staying active on other routes that start with `/`.

### 3. Why does `ProjectPage` give `TaskList` a `key`?

Because React uses the `key` to identify components. When the key changes, React resets the component and creates a new instance. This helps reset its internal state when switching between projects.
