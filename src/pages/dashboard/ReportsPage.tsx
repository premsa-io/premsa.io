const ReportsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Informes</h1>
      <p className="mt-2 text-gray-600">
        Genera i consulta informes de cobertura mediàtica.
      </p>

      <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">Encara no tens cap informe generat.</p>
      </div>
    </div>
  );
};

export default ReportsPage;
