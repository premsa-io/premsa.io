const AlertsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Alertes</h1>
      <p className="mt-2 text-gray-600">
        Configura alertes per paraules clau i mencions.
      </p>

      <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">Encara no tens cap alerta configurada.</p>
      </div>
    </div>
  );
};

export default AlertsPage;
