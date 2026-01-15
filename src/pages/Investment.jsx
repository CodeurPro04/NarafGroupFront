import { useEffect, useState } from "react";
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
import api from "../api/axios";

const Investment = () => {
  const [activeFilter, setActiveFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("roi_desc");
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [investmentProjects, setInvestmentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showInvest, setShowInvest] = useState(false);
  const [investData, setInvestData] = useState({ amount: "", message: "" });
  const [investError, setInvestError] = useState("");
  const [investSuccess, setInvestSuccess] = useState("");
  const defaultImage =
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80";
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const storageBase = apiBase.replace(/\/api\/?$/, "");
  const getStorageUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const cleaned = path.replace(/^public\//, "");
    return `${storageBase}/storage/${cleaned}`;
  };

  const formatDuration = (months) => {
    if (!months) return "N/A";
    if (months < 12) return `${months} mois`;
    const years = (months / 12).toFixed(1);
    return `${years} ans`;
  };

  const normalizeProject = (project) => {
    const images = Array.isArray(project.images_path) ? project.images_path : [];
    const durationMonths = Number(project.duration_months || 0);
    const expectedReturn = Number(project.expected_return || 0);
    const minInvestment = Number(project.min_investment || 0);
    const location = project.location || project.city || "";
    const totalInvestment = Number(project.total_investment || 0);
    const currentFunding = Number(project.current_funding || 0);
    let fundedPercentage = null;
    if (project.funded_percentage !== null && project.funded_percentage !== undefined) {
      fundedPercentage = Number(project.funded_percentage);
    } else if (project.funded !== null && project.funded !== undefined) {
      fundedPercentage = Number(project.funded);
    } else if (totalInvestment > 0) {
      fundedPercentage = Math.round((currentFunding / totalInvestment) * 100);
    }
    const normalizedFunded =
      typeof fundedPercentage === "number"
        ? Math.max(0, Math.min(100, fundedPercentage))
        : null;

    return {
      id: project.uuid || project.id,
      image:
        (images.length ? getStorageUrl(images[0]) : "") ||
        project.cover_image ||
        project.image_url ||
        defaultImage,
      gallery: images.map(getStorageUrl),
      title: project.title || "Projet d'investissement",
      location,
      type: project.project_type || "immobilier",
      roi: `${expectedReturn || 0}%`,
      minInvestment,
      duration: formatDuration(durationMonths),
      durationMonths,
      risk: project.risk_level || "A",
      totalValue: totalInvestment || 0,
      funded: normalizedFunded,
      totalInvestment,
      currentFunding,
      isFullyFunded: normalizedFunded !== null && normalizedFunded >= 100 || project.status === "closed" || project.status === "completed",
      investors: project.investors_count ?? null,
      features: Array.isArray(project.features) ? project.features : [],
      popularity: project.popularity || "",
      status: project.status || "open",
      description: project.description || "",
      raw: project,
    };
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const response = await api.get("/investments");
        const list = response?.data?.data?.data || response?.data?.data || [];
        const normalized = Array.isArray(list)
          ? list.map(normalizeProject)
          : [];
        if (isMounted) {
          setInvestmentProjects(normalized);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError("Impossible de charger les projets.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const projectsSource = investmentProjects;

  const investmentStats = [
    {
      label: "Rendement moyen",
      value: `${(
        projectsSource.reduce(
          (sum, project) => sum + (parseFloat(project.roi) || 0),
          0
        ) / (projectsSource.length || 1)
      ).toFixed(1)}%`,
      icon: <TrendingUp size={28} />,
      trend: projectsSource.length ? "Actif" : "N/A",
      color: "emerald",
    },
    {
      label: "Investissements securises",
      value: "100%",
      icon: <Shield size={28} />,
      trend: "Garanti",
      color: "blue",
    },
    {
      label: "Duree moyenne",
      value: `${(
        projectsSource.reduce(
          (sum, project) => sum + (project.durationMonths || 0),
          0
        ) /
        (projectsSource.length || 1) /
        12
      ).toFixed(1)} ans`,
      icon: <Clock size={28} />,
      trend: "Stable",
      color: "purple",
    },
    {
      label: "Projets en ligne",
      value: `${projectsSource.length}`,
      icon: <Building2 size={28} />,
      trend: "En cours",
      color: "indigo",
    },
  ];

  const benefits = [
    {
      icon: <Shield size={32} />,
      title: "Securite maximale",
      description: "Audit rigoureux et garanties contractuelles",
      features: [
        "Due diligence complete",
        "Garanties bancaires",
        "Assurances projet",
      ],
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Rendement optimise",
      description: "Performance superieure grace a notre expertise",
      features: [
        "Etude de marche approfondie",
        "Optimisation fiscale",
        "Gestion active",
      ],
    },
    {
      icon: <Target size={32} />,
      title: "Accompagnement",
      description: "Suivi personnalise de votre investissement",
      features: ["Conseiller dedie", "Reporting trimestriel", "Support 7j/7"],
    },
    {
      icon: <Zap size={32} />,
      title: "Process simplifie",
      description: "Investissez en toute simplicite",
      features: [
        "Plateforme digitale",
        "Documentation claire",
        "Paiement securise",
      ],
    },
  ];

  const formatPrice = (price) => {
    if (price === null || price === undefined || Number.isNaN(Number(price))) {
      return "N/A";
    }
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "xof",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredProjects = projectsSource
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
    const investmentValue = Number(investment || 0);
    const roiValue = parseFloat(roi) || 0;
    return formatPrice(investmentValue * (roiValue / 100));
  };

  const openDetails = (project) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  const openInvest = (project) => {
    setSelectedProject(project);
    setInvestData({ amount: "", message: "" });
    setInvestError("");
    setInvestSuccess("");
    setShowInvest(true);
  };

  const handleInvestSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject?.id) return;
    setInvestError("");
    setInvestSuccess("");
    try {
      await api.post(`/investisseur/investments/${selectedProject.id}/propose`, {
        amount: Number(investData.amount),
        message: investData.message || null,
      });
      setInvestSuccess("Votre proposition a ete envoyee.");
      setInvestData({ amount: "", message: "" });
    } catch (error) {
      setInvestError(
        error.response?.data?.message ||
          "Impossible d'envoyer la proposition."
      );
    }
  };

  const filterOptions = [
    "tous",
    ...Array.from(
      new Set(
        investmentProjects
          .map((project) => project.type)
          .filter(Boolean)
          .map((type) => type.toLowerCase())
      )
    ),
  ];

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
              Investissez dans l'immobilier avec des rendements superieurs et
              une securite maximale. Nos projets sont selectionnes et audites
              pour votre reussite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-2xl group">
                <span>Decouvrir les opportunites</span>
                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                <Phone size={20} />
                <span>Parler a un expert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}

        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              Une approche unique combinant expertise immobiliere et
              optimisation financiere
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
                Opportunites d'Investissement
              </h2>
              <p className="text-gray-600">
                {filteredProjects.length} projet
                {filteredProjects.length !== 1 ? "s" : ""} disponible
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
              {isLoading && (
                <p className="text-sm text-gray-500 mt-2">Chargement...</p>
              )}
              {loadError && (
                <p className="text-sm text-red-600 mt-2">{loadError}</p>
              )}
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
                  <option value="roi_desc">Rendement decroissant</option>
                  <option value="roi_asc">Rendement croissant</option>
                  <option value="min_invest">Investissement minimum</option>
                  <option value="popularity">Popularite</option>
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
            {filterOptions.map((filter) => (
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

                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                          project.status === "Bientot complet"
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
                      {project.isFullyFunded && (
                        <span className="px-3 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-gray-600 to-gray-800">
                          Collecte terminee
                        </span>
                      )}
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
                      <button
                        onClick={() => openDetails(project)}
                        className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-colors"
                      >
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
                        <div className="text-xs text-gray-600">Duree</div>
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
                          Retour annuel estime
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {annualReturn}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => openInvest(project)}
                          disabled={project.isFullyFunded}
                          className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                            project.isFullyFunded
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:shadow-lg"
                          }`}
                        >
                          {project.isFullyFunded ? "Complet" : "Investir"}
                        </button>
                        <button
                          onClick={() => openDetails(project)}
                          className="px-4 py-3 bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 rounded-xl font-semibold transition-all"
                        >
                          Details
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
                <div className="text-5xl">:-)</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Aucun projet ne correspond a votre recherche
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Essayez de modifier vos criteres ou contactez-nous pour des
                opportunites personnalisees
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

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pret a transformer votre epargne ?
            </h2>
            <p className="text-xl text-purple-100 mb-10 leading-relaxed">
              Rejoignez plus de 1,200 investisseurs satisfaits et beneficiez de
              notre expertise
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-purple-900 px-10 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-2xl">
                <Calendar size={22} />
                <span>Rencontrer un expert</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                <Download size={22} />
                <span>Brochure complete</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {showDetails && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Details du projet</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Fermer
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-72 object-cover"
                    />
                  </div>
                  {selectedProject.gallery.length > 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.gallery.slice(0, 6).map((img) => (
                        <img
                          key={img}
                          src={img}
                          alt={selectedProject.title}
                          className="h-24 w-full object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gray-50 space-y-2">
                    <p className="text-sm text-gray-500">Rendement</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {selectedProject.roi}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 space-y-2">
                    <p className="text-sm text-gray-500">Ticket minimum</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(selectedProject.minInvestment)}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 space-y-2">
                    <p className="text-sm text-gray-500">Duree</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {selectedProject.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDetails(false);
                      openInvest(selectedProject);
                    }}
                    disabled={selectedProject.isFullyFunded}
                    className={`w-full px-4 py-3 rounded-xl font-semibold ${
                      selectedProject.isFullyFunded
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    }`}
                  >
                    {selectedProject.isFullyFunded
                      ? "Collecte terminee"
                      : "Investir sur ce projet"}
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProject.description || "Aucune description."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showInvest && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl">
            <form onSubmit={handleInvestSubmit} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Investir</p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInvest(false)}
                  className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Fermer
                </button>
              </div>
              {investError && (
                <div className="text-sm text-red-600">{investError}</div>
              )}
              {investSuccess && (
                <div className="text-sm text-emerald-600">{investSuccess}</div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Montant a investir
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={investData.amount}
                  onChange={(e) =>
                    setInvestData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  rows="3"
                  value={investData.message}
                  onChange={(e) =>
                    setInvestData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>
              <button
                type="submit"
                disabled={selectedProject.isFullyFunded}
                className={`w-full px-4 py-3 rounded-xl font-semibold ${
                  selectedProject.isFullyFunded
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                }`}
              >
                {selectedProject.isFullyFunded
                  ? "Collecte terminee"
                  : "Envoyer la proposition"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investment;
