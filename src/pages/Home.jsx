import { useState } from "react";
import Hero from '../components/layout/Hero';
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
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const featuredProperties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      price: "450,000",
      title: "Villa Moderne avec Piscine",
      location: "Cocody, Abidjan",
      beds: 4,
      baths: 3,
      area: 250,
      tag: "Coup de cœur",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      price: "180,000",
      title: "Appartement Standing",
      location: "Plateau, Abidjan",
      beds: 3,
      baths: 2,
      area: 120,
      tag: "Nouveauté",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      price: "320,000",
      title: "Maison Contemporaine",
      location: "Riviera, Abidjan",
      beds: 5,
      baths: 4,
      area: 300,
      tag: "Exclusif",
    },
  ];

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
                className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer"
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
            <button className="hidden md:flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              <span>Voir tout</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
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

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <button className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              <span>Voir tous les biens</span>
              <ArrowRight size={20} />
            </button>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à Concrétiser Votre Projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Notre équipe d'experts est à votre disposition pour vous accompagner dans toutes les étapes de votre projet immobilier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 shadow-lg">
              <Phone size={20} />
              <span>+225 XX XX XX XX XX</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
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
