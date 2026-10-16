import { useState } from "react";
import AddItemForm from "./AddItemForm";
import ShoppingItem from "./ShoppingItem";

export interface Item {
  readonly id: number;
  name: string;
  qty: number;
}

/*
Component tree:
Shoppinglist
├── AddItemForm
└── ShoppingItem (one per item)

State ownership:
Shoppinglist owns items and nextId.
AddItemForm owns the input state.
ShoppingItem owns no list state.
*/

export default function Shoppinglist() {
  const [items, setItems] = useState<Item[]>([]);
  const [nextId, setNextId] = useState(1);

  function handleAdd(name: string) {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const existingItem = items.find(
      (item) =>
        item.name.trim().toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (existingItem) {
      setItems((previousItems) =>
        previousItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );

      return;
    }

    const newItem: Item = {
      id: nextId,
      name: trimmedName,
      qty: 1,
    };

    setItems((previousItems) => [...previousItems, newItem]);
    setNextId((previousId) => previousId + 1);
  }

  function handleIncrease(id: number) {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  }

  function handleDecrease(id: number) {
    setItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function handleIncreaseByThree(id: number) {
    handleIncrease(id);
    handleIncrease(id);
    handleIncrease(id);
  }

  function handleRemove(id: number) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  }

  const totalItems = items.length;

  const totalUnits = items.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <div>
      <h1>Shopping List</h1>

      <AddItemForm onAdd={handleAdd} />

      {items.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onIncreaseByThree={handleIncreaseByThree}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}

      <p>
        {totalItems} {totalItems === 1 ? "item" : "items"} ·{" "}
        {totalUnits} {totalUnits === 1 ? "unit" : "units"}
      </p>
    </div>
  );
}
