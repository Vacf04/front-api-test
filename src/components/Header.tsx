import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
