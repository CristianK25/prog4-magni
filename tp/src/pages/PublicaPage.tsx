/**
 * Página de acceso público sin restricciones de autenticación.
 * 
 * @returns {JSX.Element} Vista informativa libre.
 */
const PublicaPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Página Pública</h1>
      <p className="mt-4 text-gray-600 max-w-md">
        Esta es una página de acceso libre. No necesitás estar logueado para ver este contenido.
      </p>
    </div>
  );
};

export default PublicaPage;
