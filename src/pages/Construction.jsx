import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
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
  ArrowRight,
  Search,
} from "lucide-react";
import api from "../api/axios";
import { isAuthenticated } from "../api/axios";
import EmptyState from "../components/ui/EmptyState";
import { SkeletonBlock, PropertyCardSkeleton } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";
import heroConstru1 from "../assets/heroconstru1.jpg";
import heroConstru2 from "../assets/heroconstru2.jpg";

const Construction = () => {
  const [constructionProjects, setConstructionProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [needTab, setNeedTab] = useState("terrain");
  const [localisationInput, setLocalisationInput] = useState("");
  const [cityInput, setCityInput] = useState("tous");
  const [surfaceMinInput, setSurfaceMinInput] = useState("");
  const [priceMaxInput, setPriceMaxInput] = useState("");
  const [projectTypeInput, setProjectTypeInput] = useState("tous");
  const [roomsInput, setRoomsInput] = useState("tous");
  const [sortOrder, setSortOrder] = useState("recent");
  const [spotlightContent, setSpotlightContent] = useState({
    title: "Ne ratez pas cette offre exceptionnelle",
    description:
      "Deux offres speciales en video pour vous aider a lancer votre projet au meilleur moment.",
    videos: [
      {
        url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
        title: "Offre speciale 1",
        description:
          "Decouvrez une premiere offre pour demarrer votre projet de construction.",
      },
      {
        url: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
        title: "Offre speciale 2",
        description:
          "Une deuxieme opportunite video pour comparer et passer a l action.",
      },
    ],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    mode: "terrain",
    localisation: "",
    city: "tous",
    surfaceMin: "",
    priceMax: "",
    projectType: "tous",
    rooms: "tous",
  });

  const defaultImage =
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80";
  const navigate = useNavigate();
  const pageLocation = useLocation();
  const getStorageUrl = (path) => toMediaUrl(path);

  const toEmbedVideoUrl = (rawUrl) => {
    if (!rawUrl) return null;
    try {
      const parsedUrl = new URL(rawUrl);

      if (parsedUrl.hostname.includes("youtube.com")) {
        const embedId =
          parsedUrl.searchParams.get("v") ||
          parsedUrl.pathname.split("/").filter(Boolean).pop();
        return embedId
          ? `https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`
          : null;
      }

      if (parsedUrl.hostname.includes("youtu.be")) {
        const embedId = parsedUrl.pathname.split("/").filter(Boolean).pop();
        return embedId
          ? `https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`
          : null;
      }

      if (parsedUrl.hostname.includes("vimeo.com")) {
        const embedId = parsedUrl.pathname.split("/").filter(Boolean).pop();
        return embedId ? `https://player.vimeo.com/video/${embedId}` : null;
      }

      if (rawUrl.includes("/embed/") || rawUrl.includes("player.vimeo.com")) {
        return rawUrl;
      }

      return rawUrl;
    } catch {
      return null;
    }
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
        getStorageUrl(project.cover_image) ||
        getStorageUrl(project.image_url) ||
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
      rooms:
        project.bedrooms ??
        project.rooms ??
        project.pieces ??
        project.number_of_rooms ??
        null,
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
        const spotlight = response?.data?.spotlight;
        const normalized = Array.isArray(list)
          ? list.map(normalizeProject)
          : [];
        if (isMounted) {
          setConstructionProjects(normalized);
          if (spotlight) {
            setSpotlightContent({
              title: spotlight.title || "Ne ratez pas cette offre exceptionnelle",
              description:
                spotlight.description ||
                "Deux offres speciales en video pour vous aider a lancer votre projet au meilleur moment.",
              videos:
                Array.isArray(spotlight.videos) && spotlight.videos.length
                  ? spotlight.videos.slice(0, 2)
                  : [
                      {
                        url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
                        title: "Offre speciale 1",
                        description:
                          "Decouvrez une premiere offre pour demarrer votre projet de construction.",
                      },
                      {
                        url: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
                        title: "Offre speciale 2",
                        description:
                          "Une deuxieme opportunite video pour comparer et passer a l action.",
                      },
                    ],
            });
          }
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
    const maxPrice = params.get("max_price") || "";

    setNeedTab(city !== "tous" ? "maison" : "terrain");
    setLocalisationInput(queryText);
    setCityInput(city);
    setSurfaceMinInput(minSurface || "");
    setPriceMaxInput(maxPrice);
    setProjectTypeInput(type);
    setRoomsInput("tous");

    setAppliedFilters({
      mode: city !== "tous" ? "maison" : "terrain",
      localisation: queryText,
      city,
      surfaceMin: minSurface || "",
      priceMax: maxPrice,
      projectType: type,
      rooms: "tous",
    });
  }, [pageLocation.search]);

  const projectsSource = constructionProjects;

  const advantages = [
    {
      icon: <Shield size={32} />,
      title: "Garantie décennale",
      description: "Une protection complète pendant 10 ans, pour construire en toute tranquillité.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "TVA réduite",
      description: "Des avantages fiscaux réservés au neuf pour optimiser ton budget.",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Normes Modernes",
      description: "Des constructions conformes aux standards actuels, durables et performantes.",
    },
    {
      icon: <Clock size={32} />,
      title: "Livraison Garantie",
      description: "Des délais respectés, contractualisés et suivis avec rigueur.",
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
      description: "Remise des clés et garanties constructeur",
    },
  ];

  const constructionTabs = [
    {
      title: "Nos maisons",
      subtitle: "Modeles et plans",
      to: "/house-models",
      icon: <Home size={28} />,
    },
    {
      title: "Votre projets",
      subtitle: "Construction sur mesure",
      to: "/construction",
      icon: <Hammer size={28} />,
    },
    {
      title: "Nos residences",
      subtitle: "Programmes immobiliers",
      to: "/properties",
      icon: <Award size={28} />,
    },
  ];

  const roomsOptions = [
    { value: "tous", label: "Nombre de pieces" },
    { value: "1", label: "1+ piece" },
    { value: "2", label: "2+ pieces" },
    { value: "3", label: "3+ pieces" },
    { value: "4", label: "4+ pieces" },
    { value: "5", label: "5+ pieces" },
  ];

  const applySearchFilters = () => {
    setAppliedFilters({
      mode: needTab,
      localisation: localisationInput.trim(),
      city: cityInput,
      surfaceMin: surfaceMinInput,
      priceMax: priceMaxInput,
      projectType: projectTypeInput,
      rooms: roomsInput,
    });
  };

  const filteredProjects = projectsSource
    .filter((project) => {
      const query = String(appliedFilters.localisation || "").toLowerCase();
      if (!query) return true;
      return (
        project.title.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        String(project.city || "")
          .toLowerCase()
          .includes(query) ||
        String(project.projectType || "")
          .toLowerCase()
          .includes(query)
      );
    })
    .filter((project) => {
      if (appliedFilters.mode !== "maison") return true;
      if (appliedFilters.city === "tous") return true;
      return (
        String(project.city || "").toLowerCase() ===
        String(appliedFilters.city).toLowerCase()
      );
    })
    .filter((project) => {
      if (appliedFilters.mode !== "terrain") return true;
      if (appliedFilters.projectType === "tous") return true;
      const projectType = String(project.projectType || "").toLowerCase();
      return projectType.includes(
        String(appliedFilters.projectType).toLowerCase(),
      );
    })
    .filter((project) => {
      if (!appliedFilters.surfaceMin) return true;
      const surface = Number(project.surfaceArea);
      if (Number.isNaN(surface)) return false;
      const minSurface = Number(appliedFilters.surfaceMin);
      if (Number.isNaN(minSurface)) return true;
      return surface >= minSurface;
    })
    .filter((project) => {
      if (!appliedFilters.priceMax) return true;
      const maxPrice = Number(appliedFilters.priceMax);
      if (Number.isNaN(maxPrice)) return true;
      const price = Number(project.priceFrom);
      if (Number.isNaN(price)) return false;
      return price <= maxPrice;
    })
    .filter((project) => {
      if (appliedFilters.mode === "terrain") return true;
      if (appliedFilters.rooms === "tous") return true;
      const rooms = Number(project.rooms);
      const minimumRooms = Number(appliedFilters.rooms);
      if (Number.isNaN(rooms) || Number.isNaN(minimumRooms)) return false;
      return rooms >= minimumRooms;
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

  const spotlightVideos = (spotlightContent.videos || [])
    .map((video) => ({
      ...video,
      embedUrl: toEmbedVideoUrl(video?.url),
    }))
    .filter((video) => video.embedUrl)
    .slice(0, 2);

  const handleClientSpace = () => {
    if (isAuthenticated()) {
      navigate("/profile");
      return;
    }
    navigate("/login", {
      state: {
        message: "Veuillez vous connecter pour acceder a votre espace client.",
        redirectTo: "/profile",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-[#ef3c42]">
        <div
          className="absolute inset-0 opacity-32"
          style={{
            backgroundImage: `url(${heroConstru1}), url(${heroConstru2})`,
            backgroundSize: "50% 100%, 50% 100%",
            backgroundPosition: "left center, right center",
            backgroundRepeat: "no-repeat, no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(195,27,34,0.82),rgba(239,60,66,0.76))]" />
        <div className="mx-auto grid min-h-[520px] max-w-7xl grid-cols-1 overflow-hidden px-4 sm:px-6 lg:min-h-[610px] lg:px-8">
          <div className="relative z-10 flex max-w-3xl items-center py-[6.75rem] lg:py-32">
            <div>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.35rem]">
                Construire sans stress
                <span className="block">meme depuis la diaspora</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white sm:text-base">
                Tu veux batir au pays, mais tu refuses les mauvaises surprises:
                ici, tout est clair, suivi et prouve. Tu avances en confiance, meme a distance.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:contact@africabuildinvest.com?subject=Demande%20de%20devis"
                  className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-[#b11d28] shadow-lg transition hover:bg-[#fff2f2]"
                >
                  <Mail size={18} />
                  <span>Demande de devis</span>
                </a>
                <button
                  onClick={handleClientSpace}
                  className="inline-flex items-center justify-center gap-2 border border-white bg-[#101418] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d232b]"
                >
                  <Play size={18} />
                  <span>Espace client</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto mt-6 max-w-7xl px-4 sm:mt-8 sm:px-6 lg:-mt-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">
          {constructionTabs.map((tab) => (
            <Link
              key={tab.title}
              to={tab.to}
              className="group border border-gray-100 bg-white/95 p-5 shadow-xl backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="text-red-600 mt-1">{tab.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold leading-tight text-slate-800 sm:text-2xl">
                    {tab.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-600 sm:text-base">
                    {tab.subtitle}
                    <ArrowRight
                      size={16}
                      className="text-red-600 transition-transform group-hover:translate-x-1"
                    />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Faites construire votre maison partous en afrique même au village
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              Notre IA vous aides a Choisir votre future maison sans stress.
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

          <div className="mb-10 border border-gray-100 bg-slate-50 p-4 shadow-sm sm:mb-12 sm:p-6 lg:p-7">
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-800">
                  De quoi avez-vous besoin ?
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { key: "terrain", label: "Terrain" },
                    { key: "maison-terrain", label: "Maison + terrain" },
                    { key: "maison", label: "Maison" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setNeedTab(tab.key)}
                      className={`border px-4 py-2.5 text-sm font-semibold transition-colors ${
                        needTab === tab.key
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-red-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                {(needTab === "terrain" || needTab === "maison-terrain") && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">
                      Localisation
                    </label>
                    <input
                      type="text"
                      value={localisationInput}
                      onChange={(event) =>
                        setLocalisationInput(event.target.value)
                      }
                      placeholder="Ville, commune, quartier..."
                      className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                )}

                {needTab === "maison" && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">
                      Ville
                    </label>
                    <select
                      value={cityInput}
                      onChange={(event) => setCityInput(event.target.value)}
                      className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      <option value="tous">Toutes les villes</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Superficie minimum
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={surfaceMinInput}
                    onChange={(event) => setSurfaceMinInput(event.target.value)}
                    placeholder="Ex: 120"
                    className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Prix maximum
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={priceMaxInput}
                    onChange={(event) => setPriceMaxInput(event.target.value)}
                    placeholder="Ex: 50000000"
                    className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {needTab === "terrain" && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">
                      Type de projet
                    </label>
                    <select
                      value={projectTypeInput}
                      onChange={(event) =>
                        setProjectTypeInput(event.target.value.toLowerCase())
                      }
                      className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      <option value="tous">Tous les types</option>
                      {constructionTypes.map((type) => (
                        <option key={type} value={type.toLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {(needTab === "maison-terrain" || needTab === "maison") && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">
                      Nombre de pieces
                    </label>
                    <select
                      value={roomsInput}
                      onChange={(event) => setRoomsInput(event.target.value)}
                      className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      {roomsOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Trier par
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="mt-2 w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  >
                    <option value="recent">Plus recents</option>
                    <option value="prix-asc">Prix croissant</option>
                    <option value="prix-desc">Prix decroissant</option>
                    <option value="nom">Nom (A-Z)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={applySearchFilters}
                  className="inline-flex items-center gap-2 bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <Search size={16} />
                  Rechercher
                </button>
              </div>
            </div>
          </div>

          <div className="mb-12 border border-gray-200 bg-white p-5 sm:p-7 lg:p-8">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_1.8fr] xl:items-start">
              <div className="max-w-xl">
                <h3 className="mb-4 text-3xl font-bold leading-tight text-slate-800">
                  Ici, ton projet passe avant tout.
                </h3>
                <p className="text-base leading-7 text-gray-600">
                  Parce que chaque famille a son histoire, on t’accompagne du
                  premier plan à la remise des clés. On s’engage sur la qualité,
                  les délais et la transparence. Chaque détail est pensé pour
                  que ton projet soit simple, clair et sans stress.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="border border-gray-200 bg-slate-50 p-5">
                  <div className="mb-3 text-red-600">
                    <Clock size={30} />
                  </div>
                  <h4 className="mb-2 text-2xl font-bold text-slate-800">
                    Delais
                  </h4>
                  <p className="text-sm leading-7 text-gray-600">
                    Avec AFRICA, tu sais où tu vas. Livraison garantie, délais
                    respectés, suivi carré. Pas de surprise, pas de retard caché.
                  </p>
                </div>

                <div className="border border-gray-200 bg-slate-50 p-5">
                  <div className="mb-3 text-red-600">
                    <TrendingUp size={30} />
                  </div>
                  <h4 className="mb-2 text-2xl font-bold text-slate-800">Prix</h4>
                  <p className="text-sm leading-7 text-gray-600">
                    Des maisons accessibles grâce à des partenaires fiables et une
                    vraie maîtrise des coûts. Tu payes le juste prix, pour une
                    qualité qui dure.
                  </p>
                </div>

                <div className="border border-gray-200 bg-slate-50 p-5">
                  <div className="mb-3 text-red-600">
                    <Award size={30} />
                  </div>
                  <h4 className="mb-2 text-2xl font-bold text-slate-800">
                    Qualite
                  </h4>
                  <p className="text-sm leading-7 text-gray-600">
                    Des projets conçus selon des standards exigeants. Matériaux
                    solides, équipements modernes, finitions propres. Un logement
                    pensé pour durer, pas pour impressionner deux minutes
                  </p>
                </div>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className="bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
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
                          <span className="font-semibold text-red-600">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2">
                          <div
                            className="bg-red-600 h-2 transition-all duration-500"
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
                            className="flex items-center bg-red-50 px-2 py-1 text-xs text-red-700"
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
                        <div className="text-2xl font-bold text-red-600">
                          {formatPrice(project.priceFrom)}
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/construction/${project.id}`)}
                        className="bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
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
            <EmptyState
              title="Aucun projet de construction disponible pour le moment."
              className="py-12"
            />
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 sm:mb-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                {spotlightContent.title}
              </h2>
              <p className="text-base text-gray-600 sm:text-lg">
                {spotlightContent.description}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {spotlightVideos.map((video, index) => (
                <article
                  key={`${video.url}-${index}`}
                  className="border border-gray-200 bg-white p-3"
                >
                  <div className="aspect-video bg-black">
                    <iframe
                      className="w-full h-full"
                      src={video.embedUrl}
                      title={video.title || `Offre speciale ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="px-1 pb-1 pt-4">
                    <h3 className="text-xl font-bold text-slate-900">
                      {video.title || `Offre speciale ${index + 1}`}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {video.description || "Description indisponible pour cette video."}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi construire avec AFRICA ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Des avantages exclusifs pour votre projet de construction
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {advantages.map((adv, index) => (
              <div
                key={index}
                className="group border border-gray-100 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white sm:h-16 sm:w-16">
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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Notre processus de construction
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Un accompagnement sur-mesure du debut a la fin de votre projet
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center bg-gradient-to-br from-red-600 to-red-700 text-2xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-3xl">
                    {step.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="absolute left-full top-10 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-red-600 to-transparent lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-900 py-16 text-white sm:py-20">
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
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              Pret a lancer votre projet ?
            </h2>
            <p className="mb-10 text-base leading-relaxed text-red-100 sm:text-xl">
              Nos experts vous accompagnent gratuitement dans l'elaboration de
              votre projet de construction. Demandez votre devis personnalise
              des aujourd'hui.
            </p>
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:+2250778252525"
                className="inline-flex items-center justify-center gap-3 bg-white px-8 py-3.5 font-semibold text-red-900 shadow-lg transition-colors hover:bg-red-50 sm:px-10 sm:py-4"
              >
                <Phone size={20} />
                <span>+225 07 78 25 25 25</span>
              </a>
              <a
                href="mailto:contact@africabuildinvest.com?subject=Demande%20de%20devis"
                className="inline-flex items-center justify-center gap-3 border-2 border-white bg-transparent px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 sm:px-10 sm:py-4"
              >
                <Mail size={20} />
                <span>Demander un devis</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Construction;
