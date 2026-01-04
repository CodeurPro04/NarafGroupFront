import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/images/logonaraf.png"
                  alt="NARAF Immobilier"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour tous vos projets immobiliers :
              achat, vente, location, construction et investissement.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/properties"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Recherche de biens
                </Link>
              </li>
              <li>
                <Link
                  to="/construction"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Projets de construction
                </Link>
              </li>
              <li>
                <Link
                  to="/investment"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Investissements
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Devenir agent
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Publier une annonce
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Nos services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Vente immobilière</li>
              <li className="text-gray-400">Location saisonnière</li>
              <li className="text-gray-400">Gestion locative</li>
              <li className="text-gray-400">Construction sur mesure</li>
              <li className="text-gray-400">Conseil en investissement</li>
              <li className="text-gray-400">Estimation gratuite</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={20} className="text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-gray-400">+225 01 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400">contact@naraf-immobilier.fr</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-400">
                    Marcory
                    <br />
                    Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {currentYear} NARAF GROUPE SARL. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Mentions légales
            </a>
            {" • "}
            <a href="#" className="hover:text-gray-400 transition-colors">
              Politique de confidentialité
            </a>
            {" • "}
            <a href="#" className="hover:text-gray-400 transition-colors">
              CGU
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
