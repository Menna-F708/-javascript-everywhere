interface FooterProps {
  total: number;
  completed: number;
  onClearCompleted: () => void;
}

export function Footer({ total, completed, onClearCompleted }: FooterProps) {
  return (
    <footer className="board-footer">
      <span>
        {completed} of {total} done
      </span>
      {completed > 0 && (
        <button onClick={onClearCompleted}>Clear completed</button>
      )}
    </footer>
  );
}
