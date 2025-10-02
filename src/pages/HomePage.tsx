import React from "react";
import AddAluno from "../components/Alunos/AddAluno";
import Alunos from "../components/Alunos/Alunos";
import Head from "../components/Head";

function HomePage() {
  const [reload, setReload] = React.useState(0);

  return (
    <>
      <Head title="Home | Manager" description="Gerenciador de alunos." />
      <AddAluno setReload={setReload} />
      <Alunos reload={reload} setReload={setReload} />
    </>
  );
}

export default HomePage;
