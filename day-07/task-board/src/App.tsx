// import Rating from "../../day-07-problems/Rating/Rating.ts";
// import ProductCatalog from "../../day-07-problems/Product Catalog/Catalog.tsx";
// import type { Product } from "../../day-07-problems/Product Catalog/Catalog.ts";

import { useState } from "react";
import { Header } from "./components/Header";
import { AddTaskForm } from "./components/AddTaskForm";
import { FilterBar } from "./components/FilterBar";
import { TaskList } from "./components/TaskList";
import { Footer } from "./components/Footer";
import { nextId, sortTasks, visibleTasks } from "./tasks";
import type { Sort } from "./tasks";
import type { Filter, Priority, Task } from "./types";

const INITIAL: Task[] = [
  { id: 1, title: "Read the Day 07 README", done: true, priority: "high" },
  { id: 2, title: "Set up Vite", done: true, priority: "low" },
  { id: 3, title: "Build the Task Board", done: false, priority: "high" },
];

// const examples = [
//   { value: 3 },
//   { value: 4.6, max: 10, label: "Food" },
//   { value: 2.5 },
//   { value: -2 },
//   { value: 9, max: 3 },
//   { value: NaN, label: "Service" },
//   { value: 2, max: 0 },
//   { value: 2, max: 2.5 },
// ];

// const PRODUCTS: Product[] = [
//   { id: 1, name: "Milk", category: "Dairy", price: 32, inStock: true },
//   { id: 2, name: "Apple", category: "Fruit", price: 45.5, inStock: true },
//   { id: 3, name: "Cheese", category: "Dairy", price: 120, inStock: false },
//   { id: 4, name: "Banana", category: "Fruit", price: 30, inStock: true },
//   { id: 5, name: "Yogurt", category: "Dairy", price: 15, inStock: true },
//   { id: 6, name: "Bread", category: "Bakery", price: 15, inStock: false },
// ];

// const PRODUCTS_WITH_BUTTER: Product[] = [
//   ...PRODUCTS,
//   {
//     id: 7,
//     name: "Butter",
//     category: "Dairy",
//     price: 15,
//     inStock: true,
//   },
// ];

// const EMPTY_PRODUCTS: Product[] = [];

// const SOLD_OUT_PRODUCTS: Product[] = [
//   {
//     id: 3,
//     name: "Cheese",
//     category: "Dairy",
//     price: 120,
//     inStock: false,
//   },
//   {
//     id: 6,
//     name: "Bread",
//     category: "Bakery",
//     price: 15,
//     inStock: false,
//   },
// ];

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("added");
  const [editingId, setEditingId] = useState<number | null>(null);

  function addTask(title: string, priority: Priority) {
    setTasks((prev) => [
      ...prev,
      { id: nextId(prev), title, done: false, priority },
    ]);
  }
  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
  function removeTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  function changePriority(id: number, priority: Priority) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, priority } : t)));
  }
  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  function startEdit(id: number) {
    setEditingId(id);
  }
  function saveTitle(id: number, title: string) {
    const trimmed = title.trim();
    if (trimmed !== "") {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)),
      );
    }
    setEditingId(null);
  }
  function cancelEdit(id: number) {
    setEditingId((current) => (current === id ? null : current));
  }

  const visible = sortTasks(visibleTasks(tasks, filter, search), sort);
  const completed = tasks.filter((t) => t.done).length;

  return (
    <main>
      {/* <h1>Rating Examples</h1>

      {examples.map((example, index) => (
        <Rating key={index} {...example} />
      ))}

      <hr />

      <h1>Product Catalog Examples</h1>

      <section>
        <h2>Example 1: Show all products</h2>
        <ProductCatalog products={PRODUCTS} showSoldOut={true} />
      </section>

      <hr />

      <section>
        <h2>Example 2: Hide sold-out products</h2>
        <ProductCatalog products={PRODUCTS} showSoldOut={false} />
      </section>

      <hr />

      <section>
        <h2>Example 3: Products with Butter</h2>
        <ProductCatalog products={PRODUCTS_WITH_BUTTER} showSoldOut={false} />
      </section>

      <hr />

      <section>
        <h2>Example 4: Empty products</h2>
        <ProductCatalog products={EMPTY_PRODUCTS} showSoldOut={true} />
      </section>

      <hr />

      <section>
        <h2>Example 5: Everything is sold out</h2>
        <ProductCatalog products={SOLD_OUT_PRODUCTS} showSoldOut={false} />
      </section> */}

      <main className="board">
        <Header remaining={tasks.length - completed} />
        <AddTaskForm onAdd={addTask} />
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />
        <TaskList
          tasks={visible}
          hasTasks={tasks.length > 0}
          editingId={editingId}
          onToggle={toggleTask}
          onRemove={removeTask}
          onPriorityChange={changePriority}
          onStartEdit={startEdit}
          onSaveTitle={saveTitle}
          onCancelEdit={cancelEdit}
        />
        <Footer
          total={tasks.length}
          completed={completed}
          onClearCompleted={clearCompleted}
        />
      </main>
    </main>
  );
}

export default App;
