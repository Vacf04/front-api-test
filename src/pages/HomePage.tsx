import Alunos from "../components/Alunos/Alunos";
import Head from "../components/Head";

function HomePage() {
  return (
    <>
      <Head title="Home | Manager" description="Gerenciador de alunos." />
      <Alunos />
    </>
  );
}

export default HomePage;
