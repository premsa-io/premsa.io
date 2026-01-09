import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Enllaç no vàlid o expirat");
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError("La contrasenya és obligatòria");
      return;
    }

    if (password.length < 6) {
      setError("La contrasenya ha de tenir almenys 6 caràcters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les contrasenyes no coincideixen");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      toast.success("Contrasenya actualitzada!");
      setTimeout(() => navigate("/dashboard"), 2000);
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            Contrasenya actualitzada
          </h1>
          <p className="mt-2 text-gray-600">
            Redirigint al dashboard...
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="mt-6 text-center text-xl font-semibold text-gray-900">
        Restableix la contrasenya
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        Introdueix la teva nova contrasenya.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Nova contrasenya
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="••••••••"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
            Confirma la contrasenya
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary-900 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Actualitzar contrasenya"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
