import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="container page-shell not-found-shell">
      <p className="eyebrow">[ ERROR ]</p>
      <h1>404 - EXPECTED PAGE, RECEIVED NOTHING</h1>
      <Link to="/" className="button-link">Return to home</Link>
    </main>
  );
}

export default NotFound;
