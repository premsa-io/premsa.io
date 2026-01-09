import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSelector } from "@/components/LanguageSelector";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: t("nav.product"), href: "/product" },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  const resourcesLinks = [
    { label: t("nav.sectorDemos"), href: "/demo" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.caseStudies"), href: "/about#cases" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-[12px]"
          : "border-b border-gray-200 bg-white"
      }`}
    >
      <div className="mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-2xl font-extrabold text-primary-900 transition-opacity duration-200 hover:opacity-80"
        >
          PREMSA.IO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-body text-base font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "border-b-2 border-primary-900 text-primary-900"
                  : "text-gray-700 hover:text-primary-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 font-body text-base font-medium text-gray-700 transition-colors duration-200 hover:text-primary-900">
              {t("nav.resources")}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 bg-white">
              {resourcesLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    to={link.href}
                    className="cursor-pointer font-body text-sm text-gray-700 hover:text-primary-900"
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/about"
            className={`font-body text-base font-medium transition-colors duration-200 ${
              isActive("/about")
                ? "border-b-2 border-primary-900 text-primary-900"
                : "text-gray-700 hover:text-primary-900"
            }`}
          >
            {t("nav.about")}
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSelector />
          <Button
            asChild
            variant="outline"
            className="border-primary-900 px-5 py-2 font-semibold text-primary-900 transition-colors duration-200 hover:bg-primary-900 hover:text-white"
          >
            <Link to="/playground">{t("nav.tryPlayground")}</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Link to="/login">{t("nav.login")}</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6 text-primary-900" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-white p-6">
            <nav className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex h-12 items-center font-body text-lg font-medium ${
                    isActive(link.href)
                      ? "text-primary-900"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Resources section in mobile */}
              <div className="border-t border-gray-100 pt-4">
                <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {t("nav.resources")}
                </span>
                {resourcesLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-12 items-center font-body text-lg font-medium text-gray-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex h-12 items-center font-body text-lg font-medium ${
                  isActive("/about")
                    ? "text-primary-900"
                    : "text-gray-700"
                }`}
              >
                {t("nav.about")}
              </Link>

              {/* Language selector in mobile */}
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
                <LanguageSelector showLabel />
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-6">
                <Button
                  asChild
                  variant="outline"
                  className="h-12 w-full border-primary-900 font-semibold text-primary-900 hover:bg-primary-900 hover:text-white"
                >
                  <Link to="/playground" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.tryPlayground")}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-12 w-full text-gray-700 hover:bg-gray-100"
                >
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.login")}
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
