## 1. Why is the task card a good candidate for a component?

The Task Card is a good candidate for a component because it is reusable and will be repeated for multiple tasks. Creating a component helps us avoid code duplication and makes the code easier to maintain.

## 2. What happens if a component name starts with a lowercase letter?

React treats lowercase names as HTML tags instead of custom React components. Therefore, the component will not be recognized as a React component.

## 3. Why do we wrap two sibling elements in `<> </>`?

We wrap two sibling elements in a Fragment (`<> </>`) because a React component must return a single parent element. A Fragment allows us to group multiple elements without adding an extra DOM element.

## 4. When would you choose type over interface?

I use type when I need unions, intersections, or other complex type combinations. I use interface mainly to describe object shapes.

## 5. Why do we pass the whole task as one prop?

It keeps related task data together and avoids passing many separate props. The component can access values like task.title and task.status.

## 6. What does ?? do differently from ||?

?? uses a fallback only for null or undefined. || uses a fallback for any falsy value, including 0, false, and "".


 ### 1. Why does `tasks.push(task)` followed by `setTasks(tasks)` not update the screen?

Because `push()` changes the original array instead of creating a new one. React may not detect the change because the array reference is still the same. We should create a new array using `[...tasks, task]`.

### 2. Why is the index a bad key for this list?

Because the list can change when tasks are added, deleted, or reordered. The index may point to a different task, which can confuse React. Using a unique task ID is safer.

### 3. Which values in your TaskList are state, and which are derived?

**State:**
- `tasks`
- `lastDeletedTask`
- `sortMode`

**Derived values:**
- `doneTasks`
- `progress`
- `sortedTasks`
- `displayedTasks`

State values are stored and updated using `useState`, while derived values are calculated from the existing state. 
 