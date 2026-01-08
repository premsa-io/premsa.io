import { useAuth } from "@/lib/AuthContext";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Configuració</h1>
      <p className="mt-2 text-gray-600">
        Gestiona el teu compte i preferències.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Informació del compte</h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Nom</label>
              <p className="text-gray-900">{user?.user_metadata?.full_name || "No especificat"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Empresa</label>
              <p className="text-gray-900">{user?.user_metadata?.company || "No especificat"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
