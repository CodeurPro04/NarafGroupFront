import { useState } from "react";
import {
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Building2,
  BarChart3,
  Target,
  Award,
  ChevronRight,
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  Star,
  Filter,
  Search,
  Phone,
  Mail,
  Download,
  Eye,
  Heart,
  Zap,
  PieChart,
  TrendingUpIcon,
} from "lucide-react";

const Investment = () => {
  const [activeFilter, setActiveFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("roi_desc");
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const investmentProjects = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80",
      title: "Résidence Premium Cocody",
      location: "Cocody, Abidjan",
      type: "Immobilier locatif",
      roi: "8.5%",
      minInvestment: 50000,
      duration: "5 ans",
      risk: "AAA",
      totalValue: 2500000,
      funded: 75,
      investors: 42,
      features: [
        "Garanti locatif",
        "Gestion incluse",
        "TVA réduite",
        "Clé en main",
      ],
      popularity: "Très élevée",
      status: "En cours",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
      title: "Tour d'Affaires Plateau",
      location: "Plateau, Abidjan",
      type: "Bureaux",
      roi: "7.2%",
      minInvestment: 75000,
      duration: "7 ans",
      risk: "AA",
      totalValue: 4500000,
      funded: 60,
      investors: 38,
      features: [
        "Bail longue durée",
        "Prime location",
        "Indexation loyer",
        "Services premium",
      ],
      popularity: "Élevée",
      status: "En cours",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      title: "Complexe Résidentiel Riviera",
      location: "Riviera, Abidjan",
      type: "Résidentiel",
      roi: "6.8%",
      minInvestment: 35000,
      duration: "4 ans",
      risk: "AAA",
      totalValue: 1800000,
      funded: 92,
      investors: 65,
      features: [
        "Rendement garanti",
        "Promoteur certifié",
        "Livraison 2025",
        "Épargne défiscalisée",
      ],
      popularity: "Très élevée",
      status: "Bientôt complet",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      title: "Centre Commercial Zone 4",
      location: "Marcory, Abidjan",
      type: "Commercial",
      roi: "9.1%",
      minInvestment: 100000,
      duration: "10 ans",
      risk: "A",
      totalValue: 8000000,
      funded: 45,
      investors: 28,
      features: [
        "Anchors confirmés",
        "Revenus stables",
        "Gestion professionnelle",
        "Prime risque",
      ],
      popularity: "Moyenne",
      status: "Nouveau",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      title: "Villas de Prestige II-Plateaux",
      location: "2 Plateaux, Abidjan",
      type: "Luxe",
      roi: "5.9%",
      minInvestment: 150000,
      duration: "6 ans",
      risk: "AAA",
      totalValue: 3200000,
      funded: 88,
      investors: 24,
      features: [
        "Segment premium",
        "Clientèle internationale",
        "Services conciergerie",
        "Plus-value élevée",
      ],
      popularity: "Élevée",
      status: "En cours",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80",
      title: "Student Housing Université",
      location: "Cocody, Abidjan",
      type: "Étudiant",
      roi: "7.8%",
      minInvestment: 25000,
      duration: "8 ans",
      risk: "AA",
      totalValue: 1200000,
      funded: 70,
      investors: 55,
      features: [
        "Demande garantie",
        "Gestion simplifiée",
        "Résilience crise",
        "Croissance forte",
      ],
      popularity: "Très élevée",
      status: "Nouveau",
    },
  ];

  const investmentStats = [
    {
      label: "Rendement moyen",
      value: "7.2%",
      icon: <TrendingUp size={28} />,
      trend: "+0.4%",
      color: "emerald",
    },
    {
      label: "Investissements sécurisés",
      value: "100%",
      icon: <Shield size={28} />,
      trend: "Garanti",
      color: "blue",
    },
    {
      label: "Durée moyenne",
      value: "6.2 ans",
      icon: <Clock size={28} />,
      trend: "Stable",
      color: "purple",
    },
    {
      label: "Ticket minimum",
      value: "25k€",
      icon: <DollarSign size={28} />,
      trend: "Accessible",
      color: "amber",
    },
    {
      label: "Projets financés",
      value: "45+",
      icon: <Building2 size={28} />,
      trend: "En croissance",
      color: "indigo",
    },
    {
      label: "Investisseurs actifs",
      value: "1,200+",
      icon: <Users size={28} />,
      trend: "+15%",
      color: "rose",
    },
  ];

  const benefits = [
    {
      icon: <Shield size={32} />,
      title: "Sécurité maximale",
      description: "Audit rigoureux et garanties contractuelles",
      features: [
        "Due diligence complète",
        "Garanties bancaires",
        "Assurances projet",
      ],
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Rendement optimisé",
      description: "Performance supérieure grâce à notre expertise",
      features: [
        "Étude de marché approfondie",
        "Optimisation fiscale",
        "Gestion active",
      ],
    },
    {
      icon: <Target size={32} />,
      title: "Accompagnement",
      description: "Suivi personnalisé de votre investissement",
      features: ["Conseiller dédié", "Reporting trimestriel", "Support 7j/7"],
    },
    {
      icon: <Zap size={32} />,
      title: "Process simplifié",
      description: "Investissez en toute simplicité",
      features: [
        "Plateforme digitale",
        "Documentation claire",
        "Paiement sécurisé",
      ],
    },
  ];

  const successStories = [
    {
      name: "Pierre D.",
      investment: "75,000€",
      duration: "3 ans",
      roi: "42%",
      project: "Résidence Les Harmonies",
    },
    {
      name: "Sophie M.",
      investment: "120,000€",
      duration: "5 ans",
      roi: "68%",
      project: "Tour des Affaires",
    },
    {
      name: "Thomas R.",
      investment: "50,000€",
      duration: "2 ans",
      roi: "31%",
      project: "Student Residence",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "xof",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredProjects = investmentProjects
    .filter((project) => {
      if (
        activeFilter !== "tous" &&
        !project.type.toLowerCase().includes(activeFilter.toLowerCase())
      ) {
        return false;
      }
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.location.toLowerCase().includes(searchLower) ||
          project.type.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "roi_desc":
          return parseFloat(b.roi) - parseFloat(a.roi);
        case "roi_asc":
          return parseFloat(a.roi) - parseFloat(b.roi);
        case "min_invest":
          return a.minInvestment - b.minInvestment;
        case "popularity":
          return b.funded - a.funded;
        default:
          return 0;
      }
    });

  const toggleFavorite = (projectId) => {
    setFavorites((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const calculateAnnualReturn = (investment, roi) => {
    return formatPrice(investment * (parseFloat(roi) / 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      
        
          <div
            className="relative h-[600px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          
<div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <TrendingUp size={20} />
              <span className="font-semibold">Investissement Intelligent</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Faites Fructifier
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
                Votre Capital
              </span>
            </h1>

            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Investissez dans l'immobilier avec des rendements supérieurs et
              une sécurité maximale. Nos projets sont sélectionnés et audités
              pour votre réussite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-2xl group">
                <span>Découvrir les opportunités</span>
                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                <Phone size={20} />
                <span>Parler à un expert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}

        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {investmentStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-500`}
                    >
                      {stat.icon}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        stat.trend.includes("+")
                          ? "bg-emerald-100 text-emerald-700"
                          : stat.trend.includes("-")
                          ? "bg-rose-100 text-rose-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-24 lg:h-32"></div>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi investir avec
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                NARAF Capital ?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche unique combinant expertise immobilière et
              optimisation financière
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-purple-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <CheckCircle
                        size={14}
                        className="text-emerald-500 mr-2"
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

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Opportunités d'Investissement
              </h2>
              <p className="text-gray-600">
                {filteredProjects.length} projet
                {filteredProjects.length !== 1 ? "s" : ""} disponible
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-64 pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-3 focus:ring-purple-200 outline-none"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl pl-4 pr-10 py-3 focus:border-purple-500 focus:ring-3 focus:ring-purple-200 outline-none font-medium"
                >
                  <option value="roi_desc">Rendement décroissant</option>
                  <option value="roi_asc">Rendement croissant</option>
                  <option value="min_invest">Investissement minimum</option>
                  <option value="popularity">Popularité</option>
                </select>
                <Filter
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-4">
            {[
              "tous",
              "locatif",
              "bureaux",
              "commercial",
              "luxe",
              "étudiant",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isFavorite = favorites.includes(project.id);
              const annualReturn = calculateAnnualReturn(
                project.minInvestment,
                project.roi
              );

              return (
                <div
                  key={project.id}
                  className="group bg-white  shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                          project.status === "Bientôt complet"
                            ? "bg-gradient-to-r from-amber-500 to-amber-600"
                            : project.status === "Nouveau"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="px-3 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600">
                        {project.type}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button
                        onClick={() => toggleFavorite(project.id)}
                        className={`p-2.5 rounded-full backdrop-blur-sm transition-all ${
                          isFavorite
                            ? "bg-rose-500 text-white"
                            : "bg-white/90 text-gray-700 hover:bg-white"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>
                      <button className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-colors">
                        <Eye size={18} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-white mb-1">
                          <span>Financement</span>
                          <span className="font-bold">{project.funded}%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${project.funded}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                          {project.roi}
                        </div>
                        <div className="text-xs text-gray-600">Rendement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {formatPrice(project.minInvestment)}
                        </div>
                        <div className="text-xs text-gray-600">Ticket min</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {project.duration}
                        </div>
                        <div className="text-xs text-gray-600">Durée</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 text-xs"
                          >
                            <CheckCircle size={12} />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center p-3 bg-gray-50">
                        <div className="text-sm text-gray-600 mb-1">
                          Retour annuel estimé
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {annualReturn}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg">
                          Investir
                        </button>
                        <button className="px-4 py-3 bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 rounded-xl font-semibold transition-all">
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full mb-8">
                <div className="text-5xl">📈</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Aucun projet ne correspond à votre recherche
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Essayez de modifier vos critères ou contactez-nous pour des
                opportunités personnalisées
              </p>
              <button
                onClick={() => {
                  setActiveFilter("tous");
                  setSearchTerm("");
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Voir tous les projets
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les succès de nos investisseurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-600">
                      Investisseur depuis 3 ans
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                    <span className="text-sm text-gray-600">ROI Total</span>
                    <span className="text-lg font-bold text-emerald-700">
                      {story.roi}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-600 mb-1">
                        Investissement
                      </div>
                      <div className="font-bold text-gray-900">
                        {story.investment}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-600 mb-1">Durée</div>
                      <div className="font-bold text-gray-900">
                        {story.duration}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Projet :</p>
                  <p className="font-medium text-gray-900">{story.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre épargne ?
            </h2>
            <p className="text-xl text-purple-100 mb-10 leading-relaxed">
              Rejoignez plus de 1,200 investisseurs satisfaits et bénéficiez de
              notre expertise
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-purple-900 px-10 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-2xl">
                <Calendar size={22} />
                <span>Rencontrer un expert</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                <Download size={22} />
                <span>Brochure complète</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <CheckCircle className="text-emerald-300 mb-3" size={28} />
                <h3 className="text-lg font-bold text-white mb-2">
                  Audit gratuit
                </h3>
                <p className="text-purple-100 text-sm">
                  Analyse complète de votre profil
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <Shield className="text-blue-300 mb-3" size={28} />
                <h3 className="text-lg font-bold text-white mb-2">Sécurité</h3>
                <p className="text-purple-100 text-sm">
                  Garanties et assurances incluses
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <TrendingUpIcon className="text-amber-300 mb-3" size={28} />
                <h3 className="text-lg font-bold text-white mb-2">
                  Performance
                </h3>
                <p className="text-purple-100 text-sm">
                  Rendements supérieurs garantis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investment;
