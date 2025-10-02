import React from "react";
import styles from "./LoginForm.module.css";
import { useAuth } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import appConfig from "../../app.config";

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { isAuthenticated, setToken } = useAuth();
  const { fetchFunction, data, loadingFetch, errorFetch } = useFetch<{
    token: string;
  }>();

  React.useEffect(() => {
    if (data && data.token) {
      setToken(data.token);
    }
  }, [data, setToken]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchFunction(`${appConfig.baseUrl}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h1>Bem vindo</h1>
      <p>Por favor, faça o login em sua conta e comece a gerenciar.</p>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Digite seu email."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        name="password"
        placeholder="Digite sua senha."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loadingFetch}>
        {loadingFetch ? "Logando..." : "Logar"}
      </button>
      {errorFetch && <p className="errorMessage">{errorFetch}</p>}
    </form>
  );
}

export default LoginForm;
