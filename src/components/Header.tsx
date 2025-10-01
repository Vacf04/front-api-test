import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { BiLogOut } from "react-icons/bi";
import styles from "./Header.module.css";

function Header() {
  const location = useLocation();
  const { logout } = useAuth();

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to={"/"}>
                <span className={styles.logo}>Manager</span>
              </Link>
            </li>
            <li>
              <button onClick={logout} className={styles.button}>
                <BiLogOut />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
