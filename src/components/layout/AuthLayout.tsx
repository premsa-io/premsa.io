import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-10 shadow-lg">
        <Link to="/" className="block text-center font-heading text-2xl font-extrabold text-primary-900">
          PREMSA.IO
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
