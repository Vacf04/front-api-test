import React from "react";
import useFetch from "../../hooks/useFetch";
import appConfig from "../../app.config";
import { useAuth } from "../../context/UserContext";
import styles from "./AddAluno.module.css";

function AddAluno({
  setReload,
}: {
  setReload: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { fetchFunction, errorFetch, loadingFetch, data } = useFetch();
  const { token } = useAuth();
  const [nome, setNome] = React.useState("");
  const [sobrenome, setSobrenome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [idade, setIdade] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [altura, setAltura] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchFunction(`${appConfig.baseUrl}/alunos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        nome,
        sobrenome,
        email,
        idade: Number(idade),
        peso: Number(peso),
        altura: Number(altura),
      }),
    });
  };

  React.useEffect(() => {
    if (data) {
      if (errorFetch) {
        alert("Erro ao adicionar o aluno.");
      } else {
        alert("Aluno adicionado com sucesso.");
        setReload((prev) => prev + 1);
        setNome("");
        setSobrenome("");
        setEmail("");
        setIdade("");
        setPeso("");
        setAltura("");
      }
    }
  }, [data]);

  return (
    <section className={styles.addAlunoSection}>
      <div className="container">
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="sobrenome">Sobrenome:</label>
          <input
            type="text"
            name="sobrenome"
            id="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="idade">Idade:</label>
          <input
            type="number"
            name="idade"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />

          <label htmlFor="peso">Peso:</label>
          <input
            type="number"
            name="peso"
            id="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
          <label htmlFor="email">Altura:</label>
          <input
            type="number"
            name="altura"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />

          <button type="submit" disabled={loadingFetch}>
            {loadingFetch ? "Adicionando..." : "Adicionar"}
          </button>
        </form>
        {errorFetch && <p className="errorMessage">{errorFetch}</p>}
      </div>
    </section>
  );
}

export default AddAluno;
