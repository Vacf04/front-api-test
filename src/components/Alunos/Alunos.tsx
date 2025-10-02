import React from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/UserContext";
import styles from "./Alunos.module.css";
import { BiTrash } from "react-icons/bi";
import appConfig from "../../app.config";

type AlunoData = {
  id: number;
  nome: string;
  sobrenome: string;
  idade: number;
  peso: number;
  altura: number;
};

function Alunos({
  reload,
  setReload,
}: {
  reload: number;
  setReload: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { data, fetchFunction, loadingFetch, errorFetch } =
    useFetch<AlunoData[]>();
  const { token } = useAuth();

  React.useEffect(() => {
    fetchFunction(`${appConfig.baseUrl}/alunos`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }, [token, reload]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) {
      return;
    }
    try {
      const response = await fetch(`${appConfig.baseUrl}/alunos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        setReload((prev) => prev + 1);
        return;
      }

      alert("Não foi possível apagar o aluno. Tente novamente.");
    } catch (e: unknown) {
      console.error(e);
    }
  };

  if (loadingFetch) return <p>Carregando...</p>;
  if (errorFetch) return <p>{errorFetch}</p>;
  if (!data) return null;
  if (data.length <= 0) return <p>Nenhum aluno encontrado.</p>;

  return (
    <section className={styles.alunos}>
      <div className="container">
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
                <td className={styles.actionButtons}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDelete(aluno.id)}
                  >
                    <BiTrash />
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
