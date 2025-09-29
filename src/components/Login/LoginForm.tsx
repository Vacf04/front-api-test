import React from "react";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`
            Login feito, Credenciais:
            ${email}
            -------------
            ${password}
        `);
  };

  return (
    <form className={styles.form}>
      <h1>Bem vindo</h1>
      <p>Por favor, faça o login em sua conta e comece a gerenciar.</p>
      <form onSubmit={handleLogin}>
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
    </form>
  );
}

export default LoginForm;
