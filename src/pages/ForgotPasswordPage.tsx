import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("L'email és obligatori");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email no vàlid");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setEmailSent(true);
      toast.success("Revisa el teu email!");
    }
    setIsLoading(false);
  };

  if (emailSent) {
    return (
      <AuthLayout>
        <div className="text-center">
          <h1 className="mt-6 text-xl font-semibold text-gray-900">
            Revisa el teu email
          </h1>
          <p className="mt-4 text-gray-600">
            T'hem enviat un enllaç per restablir la contrasenya a{" "}
            <span className="font-medium">{email}</span>
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 text-primary-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Tornar a l'inici de sessió
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="mt-6 text-center text-xl font-semibold text-gray-900">
        Has oblidat la contrasenya?
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        Introdueix el teu email i t'enviarem un enllaç per restablir-la.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="tu@empresa.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary-900 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Envia l'enllaç"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="inline-flex items-center gap-2 text-gray-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Tornar a l'inici de sessió
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
