import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo size={22} />
          <p>© 2026 TaskFlow</p>
        </div>
        <span className="footer-note">Keep it calm, one task at a time.</span>
      </div>
    </footer>
  );
}