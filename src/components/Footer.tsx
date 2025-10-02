import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <p>By Víttor Franceschi</p>
      </div>
    </footer>
  );
}

export default Footer;
