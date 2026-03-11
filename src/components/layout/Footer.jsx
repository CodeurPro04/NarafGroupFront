import {
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
    <footer className="bg-gray-900 pb-8 pt-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/images/logonaraf1.jpeg"
                  alt="NARAF Immobilier"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="mb-6 text-gray-400">
              Votre partenaire de confiance pour tous vos projets immobiliers :
              achat, vente, location, construction et investissement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/properties"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Recherche de biens
                </Link>
              </li>
              <li>
                <Link
                  to="/construction"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Projets de construction
                </Link>
              </li>
              <li>
                <Link
                  to="/investment"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Investissements
                </Link>
              </li>
              <li>
                <Link
                  to="/register?role=agent"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Devenir agent
                </Link>
              </li>
              <li>
                <Link
                  to="/register?role=proprietaire"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Publier une annonce
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">Nos services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Vente immobiliere</li>
              <li className="text-gray-400">Location saisonniere</li>
              <li className="text-gray-400">Gestion locative</li>
              <li className="text-gray-400">Construction sur mesure</li>
              <li className="text-gray-400">Conseil en investissement</li>
              <li className="text-gray-400">Estimation gratuite</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={20} className="mt-1 text-blue-400" />
                <div>
                  <p className="font-medium">Telephone</p>
                  <p className="text-gray-400">+225 XX XX XX XX XX</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={20} className="mt-1 text-blue-400" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400">contact@naraf-immobilier.fr</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 text-blue-400" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-400">
                    Grand-Bassam
                    <br />
                    Abidjan, Cote d'Ivoire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>© {currentYear} NARAF GROUPE SARL. Tous droits reserves.
          </p>
          <p className="mt-2 text-sm">
            <Link to="/legal" className="transition-colors hover:text-gray-400">
              Mentions legales
            </Link>
            {" • "}
            <Link to="/privacy" className="transition-colors hover:text-gray-400">
              Politique de confidentialite
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
