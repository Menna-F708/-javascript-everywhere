interface HeaderProps {
  remaining: number;
}

export function Header({ remaining }: HeaderProps) {
  return (
    <header className="board-header">
      <h1>Task Board</h1>
      <p>{remaining === 0 ? "All done 🎉" : `${remaining} left`}</p>
    </header>
  );
}
 