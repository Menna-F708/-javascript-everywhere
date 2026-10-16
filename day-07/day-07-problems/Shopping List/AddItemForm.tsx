import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

type AddItemFormProps = {
  onAdd: (name: string) => void;
};

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [input, setInput] = useState("");

  function handleAdd() {
    const trimmedName = input.trim();

    if (!trimmedName) {
      return;
    }
 
    onAdd(trimmedName);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleAdd(); 
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleOnChange}
        placeholder="Enter item name"
      />

      <button type="submit">Add</button>
    </form>
  );
}
 