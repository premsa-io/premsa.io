import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    product: {
      title: t("footer.product"),
      links: [
        { label: t("footer.features"), href: "/product" },
        { label: t("footer.pricing"), href: "/pricing" },
        { label: t("footer.playground"), href: "/playground" },
        { label: t("footer.integrations"), href: "/product#integrations" },
        { label: t("footer.security"), href: "/product#security" },
      ],
    },
    company: {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/about" },
        { label: t("footer.contact"), href: "/contact" },
        { label: t("footer.careers"), href: "/about#careers" },
      ],
    },
    resources: {
      title: t("footer.resources"),
      links: [
        { label: t("footer.blog"), href: "/blog" },
        { label: t("footer.demos"), href: "/demo" },
        { label: t("footer.caseStudies"), href: "/about#cases" },
      ],
    },
    legal: {
      title: t("footer.legal"),
      links: [
        { label: t("footer.terms"), href: "/legal/terms" },
        { label: t("footer.privacy"), href: "/legal/privacy" },
        { label: t("footer.cookies"), href: "/legal/cookies" },
        { label: t("footer.dpa"), href: "/legal/dpa" },
        { label: t("footer.sla"), href: "/legal/sla" },
      ],
    },
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/premsaio", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/premsaio", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@premsa.io", label: "Email" },
  ];

  return (
    <footer className="bg-gray-900 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Logo & Tagline */}
        <div className="mb-12">
          <Link
            to="/"
            className="font-heading text-2xl font-extrabold text-white transition-opacity duration-200 hover:opacity-80"
          >
            PREMSA.IO
          </Link>
          <p className="mt-2 font-body text-base text-gray-400">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Links Grid */}
        <div className="mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-8 border-t border-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-sm text-gray-400">
            © 2025 PREMSA.IO SL | {t("footer.madeWith")}
          </p>
          <div className="flex items-center gap-4">
            <LanguageSelector variant="ghost" />
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-400 transition-colors duration-200 hover:text-white"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
