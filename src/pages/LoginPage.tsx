import Head from '../components/Head';
import Login from '../components/Login/Login';
import { useAuth } from '../context/UserContext';

function LoginPage() {
  const { token, isAuthenticated } = useAuth();

  console.log(token, isAuthenticated);
  return (
    <>
      <Head title="Login | Manager" description="Faça seu login." />
      <Login />
    </>
  );
}

export default LoginPage;
