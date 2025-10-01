import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { BiLogOut } from "react-icons/bi";

function Header() {
  const location = useLocation();
  const { logout } = useAuth();

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>
              <span>Manager</span>
            </Link>
          </li>
          <li>
            <button onClick={logout}>
              <BiLogOut />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
