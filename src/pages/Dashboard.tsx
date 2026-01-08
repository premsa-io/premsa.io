import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-primary-900">PREMSA.IO</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              <LogOut className="h-4 w-4" />
              Tancar sessió
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900">Benvingut/da!</h2>
        <p className="mt-2 text-gray-600">
          Has iniciat sessió correctament. Aquesta és la teva àrea privada.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
