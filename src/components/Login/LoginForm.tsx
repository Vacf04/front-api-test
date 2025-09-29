import React from "react";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("https://api-test-6v8d.onrender.com/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data) localStorage.setItem("token", data.token);
  };

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
      <button type="submit">Logar</button>
    </form>
  );
}

export default LoginForm;
