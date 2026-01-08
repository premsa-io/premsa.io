import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "El nom és obligatori";
    }

    if (!formData.email.trim()) {
      errors.email = "L'email és obligatori";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email no vàlid";
    }

    if (!formData.password) {
      errors.password = "La contrasenya és obligatòria";
    } else if (formData.password.length < 8) {
      errors.password = "Mínim 8 caràcters";
    }

    if (!formData.companyName.trim()) {
      errors.companyName = "El nom de l'empresa és obligatori";
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "Has d'acceptar els termes";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // TODO: Connect to Supabase
  };

  return (
    <AuthLayout>
      <h1 className="mt-6 text-center text-xl font-semibold text-gray-900">
        Crea el teu compte
      </h1>

      <form onSubmit={handleSubmit} className="mt-8">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
            Nom complet
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              fieldErrors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Joan Garcia"
          />
          {fieldErrors.fullName && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email corporatiu
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              fieldErrors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-gray-500">Mínim 8 caràcters</p>
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="mb-1 block text-sm font-medium text-gray-700">
            Nom de l'empresa
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              fieldErrors.companyName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Empresa SL"
          />
          {fieldErrors.companyName && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.companyName}</p>
          )}
        </div>

        <div className="mb-4 flex items-start gap-2">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-500"
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-600">
            Accepto els{" "}
            <a href="#" className="text-primary-700 hover:underline">
              Termes i Condicions
            </a>
          </label>
        </div>
        {fieldErrors.acceptTerms && (
          <p className="-mt-2 mb-4 text-sm text-red-600">{fieldErrors.acceptTerms}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-xl bg-primary-900 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Crear compte"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Ja tens compte?{" "}
        <Link to="/login" className="font-medium text-primary-700 hover:underline">
          Inicia sessió
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
