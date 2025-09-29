import LoginForm from "./LoginForm";
import styles from "./Login.module.css";

function Login() {
  return (
    <section className={styles.login}>
      <div className={styles.wallpaper}></div>
      <LoginForm />
    </section>
  );
}

export default Login;
