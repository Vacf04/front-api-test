import React from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/UserContext";
import styles from "./Alunos.module.css";
import { BiEdit, BiTrash } from "react-icons/bi";

type AlunoData = {
  id: number;
  nome: string;
  sobrenome: string;
  idade: number;
  peso: number;
  altura: number;
};

function Alunos() {
  const { data, fetchFunction, loadingFetch, errorFetch } =
    useFetch<AlunoData[]>();
  const { token } = useAuth();

  React.useEffect(() => {
    fetchFunction("https://api-test-6v8d.onrender.com/alunos", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }, [token]);

  if (loadingFetch) return <p>Carregando...</p>;
  if (errorFetch) return <p>{errorFetch}</p>;
  if (!data) return null;
  if (data.length <= 0) return <p>Nenhum aluno encontrado.</p>;

  return (
    <section>
      <div className="container">
        <h1>Alunos</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((aluno) => (
              <tr key={aluno.id}>
                <td>
                  {aluno.nome} {aluno.sobrenome}
                </td>
                <td>{aluno.idade}</td>
                <td>{aluno.altura}</td>
                <td>{aluno.peso}</td>
                <td>
                  <button>
                    <BiTrash />
                  </button>
                  <button>
                    <BiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Alunos;
