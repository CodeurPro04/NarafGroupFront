import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Building,
  Users,
  MapPin,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Home,
  Hammer,
  Phone,
  Mail,
  Award,
  Play,
} from "lucide-react";
import api from "../api/axios";
import { SkeletonBlock, PropertyCardSkeleton } from "../components/ui/Skeleton";

const Construction = () => {
  const [constructionProjects, setConstructionProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("tous");
  const [typeFilter, setTypeFilter] = useState("tous");
  const [surfaceFilter, setSurfaceFilter] = useState("tous");
  const [sortOrder, setSortOrder] = useState("recent");

  const defaultImage =
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80";
  const navigate = useNavigate();
  const pageLocation = useLocation();
  const apiBase =
    import.meta.env.VITE_API_URL || "https://api.kovatech.digital/api";
  const storageBase = apiBase.replace(/\/api\/?$/, "");

  const getStorageUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const cleaned = path.replace(/^public\//, "");
    return `${storageBase}/storage/${cleaned}`;
  };

  const normalizeProject = (project) => {
    const location = project.location || project.city || "";
    const images = Array.isArray(project.images_path)
      ? project.images_path
      : [];
    return {
      id: project.uuid || project.id,
      image:
        (images.length ? getStorageUrl(images[0]) : "") ||
        project.cover_image ||
        project.image_url ||
        defaultImage,
      title: project.title || "Projet de construction",
      location,
      progress: project.progress_percent || null,
      priceFrom: project.budget_min || null,
      projectType:
        project.project_type ||
        project.type ||
        project.property_type?.name ||
        "",
      surfaceArea:
        project.surface_area ??
        project.surface ??
        project.total_surface ??
        null,
      features: Array.isArray(project.features) ? project.features : [],
      city: project.city || "",
      createdAt: project.created_at || null,
    };
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const response = await api.get("/construction-projects");
        const list = response?.data?.data || response?.data || [];
        const normalized = Array.isArray(list)
          ? list.map(normalizeProject)
          : [];
        if (isMounted) {
          setConstructionProjects(normalized);
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

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const queryText = params.get("search") || "";
    const city = params.get("city") || "tous";
    const type = (params.get("property_type") || "tous").toLowerCase();
    const minSurface = params.get("min_surface");
    const maxSurface = params.get("max_surface");

    let nextSurface = "tous";
    if (minSurface && maxSurface) {
      nextSurface = `${minSurface}-${maxSurface}`;
    } else if (minSurface && !maxSurface) {
      nextSurface = `${minSurface}+`;
    }

    setSearchQuery(queryText);
    setCityFilter(city);
    setTypeFilter(type);
    setSurfaceFilter(nextSurface);
  }, [pageLocation.search]);

  const projectsSource = constructionProjects;

  const advantages = [
    {
      icon: <Shield size={32} />,
      title: "Garantie Decennale",
      description: "Protection complete pendant 10 ans",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "TVA Reduite",
      description: "Avantages fiscaux a l'achat dans le neuf",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Normes Modernes",
      description: "Construction aux dernieres normes",
    },
    {
      icon: <Clock size={32} />,
      title: "Livraison Garantie",
      description: "Respect des delais contractuels",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Consultation",
      description: "Echangez avec nos experts pour definir vos besoins",
    },
    {
      number: "02",
      title: "Conception",
      description: "Plans et devis personnalises selon votre projet",
    },
    {
      number: "03",
      title: "Construction",
      description: "Suivi en temps reel de l'avancement des travaux",
    },
    {
      number: "04",
      title: "Livraison",
      description: "Remise des cles et garanties constructeur",
    },
  ];

  const stats = [
    { icon: <Building size={40} />, value: "150+", label: "Projets realises" },
    { icon: <Users size={40} />, value: "2,500+", label: "Clients satisfaits" },
    { icon: <Award size={40} />, value: "25 ans", label: "D'experience" },
    { icon: <Home size={40} />, value: "98%", label: "Taux de satisfaction" },
  ];

  const filteredProjects = projectsSource
    .filter((project) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return (
        project.title.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        String(project.projectType || "")
          .toLowerCase()
          .includes(query)
      );
    })
    .filter((project) => {
      if (cityFilter === "tous") return true;
      return project.city === cityFilter;
    })
    .filter((project) => {
      if (typeFilter === "tous") return true;
      const projectType = String(project.projectType || "").toLowerCase();
      return projectType.includes(typeFilter);
    })
    .filter((project) => {
      if (surfaceFilter === "tous") return true;
      const surface = Number(project.surfaceArea);
      if (Number.isNaN(surface)) return false;

      if (surfaceFilter.includes("-")) {
        const [minSurface, maxSurface] = surfaceFilter
          .split("-")
          .map((value) => Number(value));
        if (Number.isNaN(minSurface) || Number.isNaN(maxSurface)) return true;
        return surface >= minSurface && surface <= maxSurface;
      }

      if (surfaceFilter.endsWith("+")) {
        const minSurface = Number(surfaceFilter.replace("+", ""));
        if (Number.isNaN(minSurface)) return true;
        return surface >= minSurface;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "prix-asc")
        return (a.priceFrom || 0) - (b.priceFrom || 0);
      if (sortOrder === "prix-desc")
        return (b.priceFrom || 0) - (a.priceFrom || 0);
      if (sortOrder === "nom") return a.title.localeCompare(b.title);
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });

  const cities = Array.from(
    new Set(
      projectsSource
        .map((project) => project.city)
        .filter((city) => city && city.trim()),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const constructionTypes = Array.from(
    new Set(
      projectsSource
        .map((project) => String(project.projectType || "").trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const formatPrice = (price) => {
    if (price === null || price === undefined || Number.isNaN(Number(price))) {
      return "N/A";
    }
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative min-h-[560px] lg:min-h-[620px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/90 via-green-900/85 to-emerald-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 text-white mb-6">
              <Hammer size={20} />
              <span className="font-semibold">Construction & Renovation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Construisez votre futur avec nous
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-emerald-100 mb-8 leading-relaxed">
              Des projets immobiliers innovants concus pour durer. Profitez de
              nos garanties constructeur et d'un accompagnement complet de A a
              Z.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-green-900 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-green-50 transition-colors shadow-lg">
                <Phone size={20} />
                <span>Demander un devis</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-white/10 transition-colors">
                <Play size={20} />
                <span>Voir nos realisations</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 lg:-mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl p-5 sm:p-6 text-center border border-gray-100"
            >
              <div className="text-green-600 mb-3 flex justify-center">
                {stat.icon}
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
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nos projets de construction
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Decouvrez nos realisations en cours et terminees
            </p>
            {isLoading && (
              <div className="mt-3">
                <SkeletonBlock className="h-4 w-32" />
              </div>
            )}
            {loadError && (
              <p className="text-sm text-red-600 mt-3">{loadError}</p>
            )}
          </div>

          <div className="bg-white shadow-md p-4 sm:p-6 mb-10 sm:mb-12 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Recherche
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Projet, ville, localisation..."
                  className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Ville
                </label>
                <select
                  value={cityFilter}
                  onChange={(event) => setCityFilter(event.target.value)}
                  className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                >
                  <option value="tous">Toutes les villes</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Type de bien
                </label>
                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value.toLowerCase())
                  }
                  className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                >
                  <option value="tous">Tous les types</option>
                  {constructionTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Surface
                </label>
                <select
                  value={surfaceFilter}
                  onChange={(event) => setSurfaceFilter(event.target.value)}
                  className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                >
                  <option value="tous">Toutes les surfaces</option>
                  <option value="0-100">0 - 100 m2</option>
                  <option value="100-200">100 - 200 m2</option>
                  <option value="200-400">200 - 400 m2</option>
                  <option value="400+">400 m2 et plus</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Trier par
                </label>
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                >
                  <option value="recent">Plus recents</option>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix decroissant</option>
                  <option value="nom">Nom (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 3 }).map((_, idx) => (
                <PropertyCardSkeleton key={`construction-skeleton-${idx}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        Disponible
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <MapPin size={14} className="mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    {project.progress != null && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Avancement</span>
                          <span className="font-semibold text-green-600">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2">
                          <div
                            className="bg-green-600 h-2 transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2 mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1"
                          >
                            <CheckCircle size={12} className="mr-1" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          A partir de
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(project.priceFrom)}
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/construction/${project.id}`)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && !isLoading && (
            <div className="text-center py-12 text-gray-600">
              Aucun projet de construction disponible pour le moment.
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi construire avec NARAF ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Des avantages exclusifs pour votre projet de construction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {advantages.map((adv, index) => (
              <div
                key={index}
                className="group text-center p-6 sm:p-7 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {adv.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {adv.title}
                </h3>
                <p className="text-gray-600">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Notre processus de construction
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Un accompagnement sur-mesure du debut a la fin de votre projet
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-green-700 text-white text-2xl sm:text-3xl font-bold mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-600 to-transparent -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Pret a lancer votre projet ?
            </h2>
            <p className="text-base sm:text-xl text-green-100 mb-10 leading-relaxed">
              Nos experts vous accompagnent gratuitement dans l'elaboration de
              votre projet de construction. Demandez votre devis personnalise
              des aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-green-900 px-8 sm:px-10 py-3.5 sm:py-4 font-semibold hover:bg-green-50 transition-colors shadow-lg">
                <Phone size={20} />
                <span>+225 XX XX XX XX XX</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3.5 sm:py-4 font-semibold hover:bg-white/10 transition-colors">
                <Mail size={20} />
                <span>Demander un devis</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <CheckCircle className="text-green-300 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Devis</h3>
                <p className="text-green-100 text-sm">
                  Estimation detaillee sans engagement
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <CheckCircle className="text-green-300 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Conseil Expert</h3>
                <p className="text-green-100 text-sm">
                  Accompagnement personnalise 7j/7
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <CheckCircle className="text-green-300 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Garanties Incluses</h3>
                <p className="text-green-100 text-sm">
                  Protection decennale et conformite
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Construction;
