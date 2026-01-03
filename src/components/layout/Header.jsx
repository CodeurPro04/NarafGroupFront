// src/components/layout/Header.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  User,
  Menu,
  X,
  Building2,
  Briefcase,
  Hammer,
} from "lucide-react";
import Button from "../ui/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", label: "Accueil", icon: <Home size={20} /> },
    {
      path: "/properties",
      label: "Biens immobiliers",
      icon: <Search size={20} />,
    },
    {
      path: "/construction",
      label: "Construction",
      icon: <Hammer size={20} />,
    },
    {
      path: "/investment",
      label: "Investissement",
      icon: <Briefcase size={20} />,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/logonaraf.png"
              alt="NARAF Immobilier"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  location.pathname === link.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Connexion
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 shadow-sm"
            >
              S'inscrire
            </button>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="pt-4 px-4 space-y-2 border-t border-gray-100 mt-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 border border-gray-300 rounded-md hover:border-blue-600 transition-colors"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
