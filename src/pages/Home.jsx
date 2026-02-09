import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/layout/Hero";
import { getApprovedPartners } from "../api/axios";
import { propertyService } from "../services/propertyService";
import {
  Building2,
  Shield,
  TrendingUp,
  Users,
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Heart,
  Phone,
  Mail,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const [partners, setPartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState("");

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const services = [
    {
      icon: <Building2 size={40} />,
      title: "Achat & Vente",
      description:
        "Accompagnement personnalisé dans toutes vos transactions immobilières",
      features: [
        "Estimation gratuite",
        "Visite virtuelle",
        "Accompagnement juridique",
      ],
    },
    {
      icon: <Shield size={40} />,
      title: "Gestion Locative",
      description:
        "Gestion complète et sécurisée de votre patrimoine immobilier",
      features: [
        "Sélection locataires",
        "Suivi des loyers",
        "Gestion des travaux",
      ],
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Investissement",
      description:
        "Opportunités d'investissement rentables avec garantie de performance",
      features: ["Rendement garanti", "Défiscalisation", "Conseil patrimonial"],
    },
    {
      icon: <Users size={40} />,
      title: "Conseil Expert",
      description: "Une équipe d'experts à votre écoute pour tous vos projets",
      features: ["Étude de marché", "Financement", "Accompagnement sur-mesure"],
    },
  ];

  const stats = [
    { number: "2,500+", label: "Biens vendus" },
    { number: "150+", label: "Projets livrés" },
    { number: "98%", label: "Satisfaction client" },
    { number: "25 ans", label: "D'expérience" },
  ];

  const whyChooseUs = [
    {
      icon: <Award size={24} />,
      title: "Expertise reconnue",
      text: "Plus de 25 ans d'expérience dans l'immobilier",
    },
    {
      icon: <Clock size={24} />,
      title: "Réactivité",
      text: "Réponse sous 24h à toutes vos demandes",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Transparence",
      text: "Des tarifs clairs et sans frais cachés",
    },
    {
      icon: <Shield size={24} />,
      title: "Sécurité",
      text: "Transactions 100% sécurisées et garanties",
    },
  ];

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setFeaturedLoading(true);
        setFeaturedError("");
        const response = await propertyService.getAll({
          sort_by: "views_count",
          sort_order: "desc",
          per_page: 3,
        });
        const payload = response?.data ?? response ?? {};
        const list = payload?.data?.data || payload?.data || [];
        const normalized = Array.isArray(list)
          ? list.map((property) => ({
              id: property.uuid || property.id,
              uuid: property.uuid || property.id,
              image: getPropertyImage(property),
              price: property.price
                ? Number(property.price).toLocaleString("fr-FR")
                : "N/A",
              title: property.title || "Sans titre",
              location: getPropertyLocation(property),
              beds: property.bedrooms || 0,
              baths: property.bathrooms || 0,
              area: property.surface_area || 0,
              tag: property.featured
                ? "En vedette"
                : property.transaction_type === "location"
                  ? "Location"
                  : "Vente",
              views: property.views_count || 0,
            }))
          : [];
        setFeaturedProperties(normalized.slice(0, 3));
      } catch (error) {
        console.error("Erreur chargement biens exception:", error);
        setFeaturedError("Impossible de charger les biens.");
      } finally {
        setFeaturedLoading(false);
      }
    };

    loadFeaturedProperties();
  }, []);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        setPartnersLoading(true);
        const response = await getApprovedPartners();
        const payload = response?.data?.data ?? response?.data ?? [];
        const list = payload.data || payload;
        setPartners(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Erreur chargement partenaires:", error);
      } finally {
        setPartnersLoading(false);
      }
    };

    loadPartners();
  }, []);

  const apiBase = "http://localhost:8000/api";
  const storageBase = apiBase.replace(/\/api\/?$/, "");
  const getLogoUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const cleaned = path.replace(/^public\//, "");
    return `${storageBase}/storage/${cleaned}`;
  };

  const getPropertyLocation = (property) => {
    const parts = [property.city, property.quartier, property.commune].filter(
      Boolean,
    );
    return parts.join(", ") || property.address || "Localisation non definie";
  };

  const getPropertyImage = (property) => {
    if (property.primary_image?.file_path) {
      return `${storageBase}/storage/${property.primary_image.file_path}`;
    }
    if (property.media?.[0]?.file_path) {
      return `${storageBase}/storage/${property.media[0].file_path}`;
    }
    return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", contactForm);
    // Logique d'envoi du formulaire QUE TU DEVRA FAIRE ICI
  };

  return (
    <div className="bg-white">
      <Hero />
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète de services pour concrétiser tous vos projets
              immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white p-8 hover:-500 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="text-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <CheckCircle
                        size={16}
                        className="text-green-500 mr-2 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Biens d'Exception
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez notre sélection de propriétés premium
              </p>
            </div>
            <Link
              to="/properties"
              className="hidden md:flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              <span>Voir tout</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          {featuredLoading && (
            <p className="text-sm text-gray-500 mb-6">
              Chargement des biens...
            </p>
          )}
          {featuredError && (
            <p className="text-sm text-red-600 mb-6">{featuredError}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.length === 0 &&
              !featuredLoading &&
              !featuredError && (
                <p className="text-sm text-gray-500">
                  Aucun bien a afficher pour le moment.
                </p>
              )}

            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <Link to={`/property/${property.uuid}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      {property.tag}
                    </div>
                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-colors">
                      <Heart size={20} className="text-gray-700" />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-gray-900">
                        {property.price} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 -100">
                      <div className="flex items-center space-x-1 text-gray-700">
                        <Bed size={18} />
                        <span className="text-sm font-medium">
                          {property.beds}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-700">
                        <Bath size={18} />
                        <span className="text-sm font-medium">
                          {property.baths}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-700">
                        <Maximize size={18} />
                        <span className="text-sm font-medium">
                          {property.area} m²
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link
              to="/properties"
              className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              <span>Voir tous les biens</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir NARAF ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'excellence à chaque étape de votre projet immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gradient-to-r from-blue-600 to-blue-700 p-12 text-white">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos partenaires
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des entreprises de confiance qui travaillent avec Naraf Group.
            </p>
          </div>

          {partnersLoading ? (
            <p className="text-center text-sm text-gray-500">
              Chargement des partenaires...
            </p>
          ) : partners.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              Aucun partenaire publie pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.uuid}
                  className="bg-white rounded-2xl -200 p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    {partner.logo_path ? (
                      <img
                        src={getLogoUrl(partner.logo_path)}
                        alt={partner.company_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-500">
                        Logo
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {partner.company_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {partner.company_type || "Entreprise"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {partner.city || "Localisation a definir"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à Concrétiser Votre Projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Notre équipe d'experts est à votre disposition pour vous accompagner
            dans toutes les étapes de votre projet immobilier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-10 py-4 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 shadow-lg">
              <Phone size={20} />
              <span>+225 XX XX XX XX XX</span>
            </button>
            <button className="bg-transparent text-white px-10 py-4 font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
              <Mail size={20} />
              <span>contact@naraf.ci</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
