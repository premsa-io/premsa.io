import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      errors.email = "L'email és obligatori";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email no vàlid";
    }
    
    if (!password) {
      errors.password = "La contrasenya és obligatòria";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  const handleMagicLink = async () => {
    setError(null);
    if (!email.trim()) {
      setFieldErrors({ email: "Introdueix el teu email primer" });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
      },
    });
    
    if (error) {
      setError(error.message);
    } else {
      toast.success("Revisa el teu email!");
    }
    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="mt-6 text-center text-xl font-semibold text-gray-900">
        Inicia sessió
      </h1>

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
            className={`w-full rounded-lg border p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              fieldErrors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="tu@empresa.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Contrasenya
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full rounded-lg border p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              fieldErrors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
          )}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-500"
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Recorda'm
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary-900 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-500">o</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        onClick={handleMagicLink}
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-xl border-2 border-primary-900 py-3 font-semibold text-primary-900 transition-colors hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Envia'm un enllaç màgic
      </button>

      <p className="mt-6 text-center text-sm">
        No tens compte?{" "}
        <Link to="/signup" className="font-medium text-primary-700 hover:underline">
          Registra't
        </Link>
      </p>

      <p className="mt-2 text-center text-sm">
        <Link to="/forgot-password" className="text-gray-600 hover:underline">
          Has oblidat la contrasenya?
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
