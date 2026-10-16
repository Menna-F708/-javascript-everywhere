import type { Item } from "./Shoppinglist";

type ShoppingItemProps = {
  item: Item;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onIncreaseByThree: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function ShoppingItem({
  item,
  onIncrease,
  onDecrease,
  onIncreaseByThree,
  onRemove,
}: ShoppingItemProps) {
  return (
    <li>
      <span>
        {item.name} ×{item.qty}
      </span>

      <button
        type="button"
        onClick={() => onDecrease(item.id)}
      >
        −
      </button>

      <button
        type="button"
        onClick={() => onIncrease(item.id)}
      >
        +
      </button>

      <button
        type="button"
        onClick={() => onIncreaseByThree(item.id)}
      >
        +3
      </button>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  );
}
