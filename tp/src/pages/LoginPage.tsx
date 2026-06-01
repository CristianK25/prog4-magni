import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

/**
 * Página de autenticación para el ingreso al sistema.
 * 
 * Gestiona el formulario de login, valida credenciales contra el backend
 * y redirige al listado si la autenticación es exitosa o si ya existe una sesión.
 * 
 * @returns {JSX.Element} Vista de login o redirección automática.
 */
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user, cargando } = useAuth();
  const navigate = useNavigate();

  if (!cargando && user) {
    return <Navigate to="/lista" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/lista");
    } catch (err: unknown) {
      const mensaje =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(mensaje);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Iniciar Sesión - Registro de Participantes
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded shadow hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>

      <Link
        to="/publica"
        className="mt-6 text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors"
      >
        Ir a la página pública
      </Link>
    </div>
  );
};

export default LoginPage;
