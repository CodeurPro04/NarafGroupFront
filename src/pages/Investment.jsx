import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Shield,
  Clock,
  Building2,
  BarChart3,
  Target,
  Award,
  ChevronRight,
  MapPin,
  CheckCircle,
  Filter,
  Search,
  Phone,
  Eye,
  Heart,
  Zap,
} from "lucide-react";
import api from "../api/axios";
import { SkeletonBlock, PropertyCardSkeleton } from "../components/ui/Skeleton";

const Investment = () => {
  const [activeFilter, setActiveFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("roi_desc");
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [investmentProjects, setInvestmentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const navigate = useNavigate();

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
    const images = Array.isArray(project.images_path)
      ? project.images_path
      : [];
    const durationMonths = Number(project.duration_months || 0);
    const expectedReturn = Number(project.expected_return || 0);
    const minInvestment = Number(project.min_investment || 0);
    const location = project.location || project.city || "";
    const totalInvestment = Number(project.total_investment || 0);
    const currentFunding = Number(project.current_funding || 0);

    let fundedPercentage = null;
    if (
      project.funded_percentage !== null &&
      project.funded_percentage !== undefined
    ) {
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
      surfaceArea: project.surface_area ?? null,
      postalCode: project.postal_code || "",
      risk: project.risk_level || "A",
      totalValue: totalInvestment || 0,
      funded: normalizedFunded,
      totalInvestment,
      currentFunding,
      isFullyFunded:
        (normalizedFunded !== null && normalizedFunded >= 100) ||
        project.status === "closed" ||
        project.status === "completed",
      investors: project.investors_count ?? null,
      features: Array.isArray(project.features) ? project.features : [],
      popularity: project.popularity || "",
      status: project.status || "open",
      description: project.description || "",
      reference: project.reference_code || project.uuid || project.id || "",
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
  const averageRoi =
    projectsSource.reduce(
      (sum, project) => sum + (parseFloat(project.roi) || 0),
      0,
    ) / (projectsSource.length || 1);
  const averageDuration =
    projectsSource.reduce(
      (sum, project) => sum + (project.durationMonths || 0),
      0,
    ) /
    (projectsSource.length || 1) /
    12;

  const investmentStats = [
    {
      label: "Rendement moyen",
      value: `${averageRoi.toFixed(1)}%`,
      icon: <TrendingUp size={28} />,
      trend: projectsSource.length ? "Actif" : "N/A",
    },
    {
      label: "Investissements securises",
      value: "100%",
      icon: <Shield size={28} />,
      trend: "Garanti",
    },
    {
      label: "Duree moyenne",
      value: `${averageDuration.toFixed(1)} ans`,
      icon: <Clock size={28} />,
      trend: "Stable",
    },
    {
      label: "Projets en ligne",
      value: `${projectsSource.length}`,
      icon: <Building2 size={28} />,
      trend: "Ouvert",
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
          return (b.funded || 0) - (a.funded || 0);
        default:
          return 0;
      }
    });

  const toggleFavorite = (projectId) => {
    setFavorites((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId],
    );
  };

  const calculateAnnualReturn = (investment, roi) => {
    const investmentValue = Number(investment || 0);
    const roiValue = parseFloat(roi) || 0;
    return formatPrice(investmentValue * (roiValue / 100));
  };

  const getExcerpt = (text, maxLength = 140) => {
    if (!text) return "Description indisponible pour le moment.";
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trim()}...`;
  };

  const filterOptions = [
    "tous",
    ...Array.from(
      new Set(
        investmentProjects
          .map((project) => project.type)
          .filter(Boolean)
          .map((type) => type.toLowerCase()),
      ),
    ),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative min-h-[560px] lg:min-h-[620px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-blue-950/85 to-blue-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-4 py-2 text-white mb-6">
              <TrendingUp size={20} />
              <span className="font-semibold">Investissement intelligent</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Faites fructifier
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
                votre capital
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed">
              Des projets immobiliers selectionnes, des rendements clairs, et un
              accompagnement d'experts pour chaque investissement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-6 sm:px-8 py-3.5 sm:py-4 font-bold hover:bg-blue-50 transition-all shadow-2xl group">
                <span>Decouvrir les opportunites</span>
                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 font-bold hover:bg-white/10 transition-all">
                <Phone size={20} />
                <span>Parler a un expert</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 lg:-mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {investmentStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl p-5 sm:p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-blue-50 text-blue-600">{stat.icon}</div>
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700">
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Opportunites d'investissement
              </h2>
              <p className="text-gray-600">
                {filteredProjects.length} projet
                {filteredProjects.length !== 1 ? "s" : ""} disponible
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
              {isLoading && (
                <div className="mt-2">
                  <SkeletonBlock className="h-4 w-32" />
                </div>
              )}
              {loadError && (
                <p className="text-sm text-red-600 mt-2">{loadError}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full xl:w-auto">
              <div className="relative flex-1 xl:flex-none">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full xl:w-72 pl-12 pr-4 py-3 bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 pl-4 pr-10 py-3 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none font-medium w-full sm:w-auto"
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

          <div className="flex overflow-x-auto gap-2 mb-8 pb-4">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 sm:px-5 py-2.5 font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <PropertyCardSkeleton key={`investment-skeleton-${idx}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => {
                const isFavorite = favorites.includes(project.id);
                const annualReturn = calculateAnnualReturn(
                  project.minInvestment,
                  project.roi,
                );
                const fundedValue =
                  typeof project.funded === "number" ? project.funded : null;

                return (
                  <div
                    key={project.id}
                    className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        <span className="px-3 py-1.5 text-xs sm:text-sm font-bold text-white bg-blue-600">
                          {project.type}
                        </span>
                        {project.isFullyFunded && (
                          <span className="px-3 py-1.5 text-xs sm:text-sm font-bold text-white bg-slate-700">
                            Complet
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button
                          onClick={() => toggleFavorite(project.id)}
                          className={`p-2.5 backdrop-blur-sm transition-all ${
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
                          onClick={() => navigate(`/investment/${project.id}`)}
                          className="p-2.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                      {fundedValue !== null && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="mb-2">
                            <div className="flex justify-between text-xs text-white mb-1">
                              <span>Financement</span>
                              <span className="font-bold">{fundedValue}%</span>
                            </div>
                            <div className="w-full bg-white/30 h-2">
                              <div
                                className="bg-emerald-400 h-2 transition-all duration-1000"
                                style={{ width: `${fundedValue}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                        <span>Surface: {project.surfaceArea || "N/A"} m2</span>
                        <span>CP: {project.postalCode || "N/A"}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-600">
                        <div className="flex items-center justify-between border border-gray-100 px-3 py-2">
                          <span>ROI cible</span>
                          <span className="font-semibold text-gray-900">
                            {project.roi}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 px-3 py-2">
                          <span>Ticket min</span>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(project.minInvestment)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 px-3 py-2">
                          <span>Duree</span>
                          <span className="font-semibold text-gray-900">
                            {project.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 px-3 py-2">
                          <span>Ref</span>
                          <span className="font-semibold text-gray-900">
                            {project.reference
                              ? String(project.reference)
                                  .slice(0, 12)
                                  .toUpperCase()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5">
                        {getExcerpt(project.description)}
                      </p>
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs"
                            >
                              <CheckCircle size={12} /> {feature}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            onClick={() =>
                              navigate(`/investment/${project.id}`)
                            }
                            disabled={project.isFullyFunded}
                            className={`px-4 py-3 font-semibold transition-all ${
                              project.isFullyFunded
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            {project.isFullyFunded ? "Complet" : "Investir"}
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/investment/${project.id}`)
                            }
                            className="px-4 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 font-semibold transition-all"
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
          )}

          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-blue-50 mb-8">
                <div className="text-4xl sm:text-5xl">:-)</div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
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
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg"
              >
                Voir tous les projets
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi investir avec
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                NARAF Capital ?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche qui combine expertise immobiliere, transparence et
              performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">{benefit.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
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

      <section className="py-16 sm:py-20 bg-gradient-to-r from-slate-950 via-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Pret a transformer votre epargne ?
            </h2>
            <p className="text-base sm:text-xl text-blue-100 mb-10 leading-relaxed">
              Rejoignez nos investisseurs et beneficiez d'un accompagnement
              premium tout au long du projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-8 sm:px-10 py-3.5 sm:py-4 font-bold hover:bg-blue-50 transition-all shadow-2xl">
                <Award size={22} />
                <span>Rencontrer un expert</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3.5 sm:py-4 font-bold hover:bg-white/10 transition-all">
                <Phone size={22} />
                <span>Recevoir la brochure</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investment;
