import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = {
  product: {
    title: "PRODUCT",
    links: [
      { label: "Features", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Playground", href: "/playground" },
      { label: "Integrations", href: "/product#integrations" },
      { label: "Security", href: "/product#security" },
    ],
  },
  company: {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  resources: {
    title: "RESOURCES",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Demos", href: "/demo" },
      { label: "Case Studies", href: "/about#cases" },
    ],
  },
  legal: {
    title: "LEGAL",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "SLA", href: "/legal/sla" },
    ],
  },
};

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/premsaio", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/premsaio", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@premsa.io", label: "Email" },
];

const Footer = () => {
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
            La intel·ligència regulatòria per empreses espanyoles
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
            © 2025 PREMSA.IO SL | Made with ❤️ in Barcelona
          </p>
          <div className="flex items-center gap-4">
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
