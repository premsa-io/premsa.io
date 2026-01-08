import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-heading text-xl font-extrabold text-primary-900">
            PREMSA.IO
          </Link>
          <Link
            to="/pricing"
            className="hidden text-gray-600 transition-colors hover:text-gray-900 md:block"
          >
            Pricing
          </Link>
        </div>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="font-semibold text-primary-900 transition-colors hover:text-primary-700"
          >
            Iniciar sessió
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-primary-900 px-5 py-2 font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Prova gratuïta
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" aria-label="Obrir menú">
          <Menu className="h-6 w-6 text-primary-900" />
        </button>
      </div>
    </header>
  );
};

export default Header;
