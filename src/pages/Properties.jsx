import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Heart,
  Search,
  Phone,
  Plus,
  Mail,
  Building2,
  Home,
  Star,
  Shield,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api, { getCurrentUser, isAuthenticated } from "../api/axios";
import EmptyState from "../components/ui/EmptyState";
import { toMediaUrl } from "../utils/media";
import PropertiesHero from "../components/layout/PropertiesHero";

const Properties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tous");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const [pendingTypeId, setPendingTypeId] = useState("");
  const [hasSyncedFilters, setHasSyncedFilters] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementSubmitting, setAnnouncementSubmitting] = useState(false);
  const [announcementError, setAnnouncementError] = useState("");
  const [announcementSuccess, setAnnouncementSuccess] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    type: "",
    transactionType: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    areaMin: "",
    areaMax: "",
    features: [],
  });

  const stats = [
    {
      icon: <Building2 size={40} />,
      value: `${totalProperties}+`,
      label: "Biens disponibles",
    },
    { icon: <Home size={40} />, value: "98%", label: "Clients satisfaits" },
    { icon: <Award size={40} />, value: "25 ans", label: "D'expérience" },
    { icon: <TrendingUp size={40} />, value: "150+", label: "Ventes/mois" },
  ];

  const advantages = [
    {
      icon: <Shield size={32} />,
      title: "Transaction Sécurisée",
      description: "Ton argent protégé, ton projet sécurisé.",
      features: [
        "Due diligence complète",
        "Garanties bancaires",
        "Contrats vérifiés",
      ],
    },
    {
      icon: <Clock size={32} />,
      title: "Visite 24/7",
      description: "Visite quand tu veux, où que tu sois.",
      features: [
        "Visite virtuelle 360°",
        "Planning flexible",
        "Confirmation immédiate",
      ],
    },
    {
      icon: <Award size={32} />,
      title: "Expertise Certifiée",
      description: "Des pros fiables, pas des improvisés.",
      features: [
        "Conseillers certifiés",
        "Formation continue",
        "Réseau étendu",
      ],
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Accompagnement",
      description: "On t’accompagne du premier clic aux clés.",
      features: ["Conseiller dédié", "Aide financement", "Support 7j/7"],
    },
  ];

  const testimonials = [
    {
      quote:
        "\"Mon compte principal. Creation facile, interfaces simples et efficaces. Je n'ai pas besoin de plus.\"",
      author: "Merci Sogexa.",
      meta: "Ludovic, Rennes",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    },
    {
      quote:
        "\"Une equipe reactive, des conseils concrets et un parcours vraiment limpide du debut a la signature.\"",
      author: "Experience validee.",
      meta: "Aminata, Abidjan",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    },
    {
      quote:
        "\"J'ai trouve un bien adapte a mon budget sans perdre de temps. L'accompagnement a fait la difference.\"",
      author: "Service fiable.",
      meta: "Cedric, Yamoussoukro",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    },
  ];

  const previousTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  // Fonction pour récupérer les types de propriétés avec fallback
  const fetchPropertyTypes = async () => {
    try {
      const response = await api.get("/property-types");
      if (response.data.success) {
        setPropertyTypes(response.data.data);
      } else {
        // Si l'API ne fonctionne pas, créer des types à partir de la table properties
        fetchPropertyTypesFromProperties();
      }
    } catch (error) {
      console.error("Erreur types:", error);
      fetchPropertyTypesFromProperties();
    }
  };

  // Fallback: Récupérer les types depuis les propriétés existantes
  const fetchPropertyTypesFromProperties = async () => {
    try {
      const response = await api.get("/properties");
      if (response.data.success) {
        const propertiesData =
          response.data.data.data || response.data.data || [];
        const typesSet = new Set();

        propertiesData.forEach((property) => {
          if (property.property_type) {
            typesSet.add(
              JSON.stringify({
                id: property.property_type.id,
                name: property.property_type.name,
                slug: property.property_type.slug,
              }),
            );
          }
        });

        const types = Array.from(typesSet).map((str) => JSON.parse(str));
        setPropertyTypes(types);
      }
    } catch (error) {
      console.error("Impossible de récupérer les types:", error);
    }
  };

  // Fonction pour récupérer les caractéristiques avec fallback
  const fetchPropertyFeatures = async () => {
    try {
      const response = await api.get("/property-features");
      if (response.data.success) {
        setPropertyFeatures(response.data.data.map((f) => f.name));
      } else {
        fetchPropertyFeaturesFromProperties();
      }
    } catch (error) {
      console.error("Erreur caractéristiques:", error);
      fetchPropertyFeaturesFromProperties();
    }
  };

  // Fallback: Récupérer les caractéristiques depuis les propriétés
  const fetchPropertyFeaturesFromProperties = async () => {
    try {
      const response = await api.get("/properties");
      if (response.data.success) {
        const propertiesData =
          response.data.data.data || response.data.data || [];
        const featuresSet = new Set();

        propertiesData.forEach((property) => {
          if (property.features && Array.isArray(property.features)) {
            property.features.forEach((feature) => {
              if (feature.name) featuresSet.add(feature.name);
            });
          }
        });

        setPropertyFeatures(Array.from(featuresSet));
      }
    } catch (error) {
      console.error("Impossible de récupérer les caractéristiques:", error);
    }
  };

  // Fonction pour récupérer les propriétés
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = {
        search: filters.search || undefined,
        city: filters.city || undefined,
        property_type_id: filters.type || undefined,
        transaction_type: filters.transactionType || undefined,
        min_price: filters.priceMin || undefined,
        max_price: filters.priceMax || undefined,
        bedrooms: filters.bedrooms || undefined,
        min_surface: filters.areaMin || undefined,
        sort_by: getSortField(),
        sort_order: getSortOrder(),
      };

      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key],
      );

      const response = await api.get("/properties", { params });

      if (response.data.success) {
        const propertiesData =
          response.data.data.data || response.data.data || [];
        const formattedProperties = propertiesData.map((property) => ({
          id: property.uuid,
          uuid: property.uuid,
          images: getPropertyImages(property),
          price: parseFloat(property.price) || 0,
          pricePerSqm: calculatePricePerSqm(property),
          title: property.title || "Sans titre",
          location: getPropertyLocation(property),
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          area: property.surface_area || 0,
          type: getPropertyType(property),
          tag: getPropertyTag(property),
          rating: 4.5,
          views: property.views_count || 0,
          features: getPropertyFeatures(property),
          status: property.status || "pending",
          year: property.year_built || new Date().getFullYear(),
          transaction_type: property.transaction_type || "vente",
          property_type_id: property.property_type_id,
        }));

        setProperties(formattedProperties);
        setTotalProperties(formattedProperties.length);
      }
    } catch (error) {
      console.error("Erreur propriétés:", error);
      setProperties([]);
      setTotalProperties(0);
    } finally {
      setLoading(false);
    }
  };

  // Fonctions utilitaires
  const getPropertyImages = (property) => {
    if (property.primary_image?.file_path) {
      return [toMediaUrl(property.primary_image.file_path)];
    }
    if (property.media?.[0]?.file_path) {
      return [toMediaUrl(property.media[0].file_path)];
    }
    return [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    ];
  };

  const calculatePricePerSqm = (property) => {
    if (property.price && property.surface_area) {
      return Math.round(property.price / property.surface_area);
    }
    return 0;
  };

  const getPropertyLocation = (property) => {
    const parts = [property.city, property.quartier, property.commune].filter(
      Boolean,
    );
    return parts.join(", ") || "Localisation non spécifiée";
  };

  const getPropertyType = (property) => {
    if (property.property_type?.slug) return property.property_type.slug;
    if (property.property_type?.name)
      return property.property_type.name.toLowerCase();
    return "appartement";
  };

  const getPropertyTag = (property) => {
    if (property.status === "approved") {
      return property.featured ? "En vedette" : "Disponible";
    }
    if (property.status === "pending") return "En attente";
    return "";
  };

  const getPropertyFeatures = (property) => {
    if (property.features && Array.isArray(property.features)) {
      return property.features.map((f) => f.name);
    }
    return [];
  };

  const getSortField = () => {
    switch (sortBy) {
      case "price_asc":
      case "price_desc":
        return "price";
      case "area_desc":
        return "surface_area";
      default:
        return "created_at";
    }
  };

  const getSortOrder = () => {
    switch (sortBy) {
      case "price_asc":
        return "asc";
      case "price_desc":
      case "area_desc":
        return "desc";
      default:
        return "desc";
    }
  };

  const syncFiltersFromQuery = () => {
    if (!location.search) {
      setHasSyncedFilters(true);
    }
    const params = new URLSearchParams(location.search);
    const cityValue = params.get("city") || "";
    const searchValue = params.get("search") || cityValue || "";
    const typeId = params.get("property_type_id") || "";
    const transactionType = params.get("transaction_type") || "";
    const priceMin = params.get("min_price") || "";
    const priceMax = params.get("max_price") || "";
    const bedrooms = params.get("bedrooms") || "";
    const areaMin = params.get("min_surface") || "";
    const areaMax = params.get("max_surface") || "";

    setFilters((prev) => ({
      ...prev,
      search: searchValue,
      city: cityValue,
      type: typeId,
      transactionType,
      priceMin,
      priceMax,
      bedrooms,
      areaMin,
      areaMax,
    }));

    if (typeId) {
      setPendingTypeId(typeId);
    } else {
      setActiveTab("tous");
    }

    setHasSyncedFilters(true);
  };

  useEffect(() => {
    syncFiltersFromQuery();
  }, [location.search]);

  useEffect(() => {
    if (!pendingTypeId || propertyTypes.length === 0) return;
    const match = propertyTypes.find(
      (t) => String(t.id) === String(pendingTypeId),
    );
    if (match?.slug) {
      setActiveTab(match.slug);
    } else {
      setActiveTab("tous");
    }
    setPendingTypeId("");
  }, [pendingTypeId, propertyTypes]);

  // Charger les données
  useEffect(() => {
    fetchPropertyTypes();
    fetchPropertyFeatures();
  }, []);

  useEffect(() => {
    if (!hasSyncedFilters) return;
    fetchProperties();
  }, [filters, sortBy, hasSyncedFilters]);

  useEffect(() => {
    if (activeTab === "tous") {
      if (pendingTypeId) return;
      if (filters.type) return;
      setFilters((prev) => ({ ...prev, type: "" }));
    } else {
      const propertyType = propertyTypes.find((t) => t.slug === activeTab);
      if (propertyType) {
        setFilters((prev) => ({ ...prev, type: propertyType.id }));
      }
    }
  }, [activeTab, propertyTypes, pendingTypeId, filters.type]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "search" ? { city: "" } : {}),
    }));
  };

  const toggleFeature = (feature) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      city: "",
      type: "",
      transactionType: "",
      priceMin: "",
      priceMax: "",
      bedrooms: "",
      bathrooms: "",
      areaMin: "",
      areaMax: "",
      features: [],
    });
    setActiveTab("tous");
    setSortBy("recommended");
  };

  const currentUser = getCurrentUser();
  const normalizedRole = currentUser?.role || currentUser?.role_name;
  const isOwnerAuthenticated =
    isAuthenticated() && normalizedRole === "proprietaire";

  const handleAnnouncementClick = () => {
    if (!isOwnerAuthenticated) {
      navigate("/register?role=proprietaire");
      return;
    }
    setAnnouncementError("");
    setAnnouncementSuccess("");
    setShowAnnouncementModal(true);
  };

  const submitAnnouncementRequest = async (event) => {
    event.preventDefault();
    if (!announcementText.trim()) {
      setAnnouncementError("Veuillez decrire votre bien.");
      return;
    }

    try {
      setAnnouncementSubmitting(true);
      setAnnouncementError("");
      setAnnouncementSuccess("");

      await api.post("/proprietaire/property-requests", {
        description: announcementText.trim(),
      });

      setAnnouncementSuccess("Demande envoyee avec succes.");
      setAnnouncementText("");
      setTimeout(() => {
        setShowAnnouncementModal(false);
        setAnnouncementSuccess("");
      }, 900);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erreur lors de l'envoi de la demande.";
      setAnnouncementError(message);
    } finally {
      setAnnouncementSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    if (!price || price === 0) return "Prix non spécifié";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredProperties = properties.filter((property) => {
    if (filters.features.length > 0 && property.features) {
      return filters.features.every((feature) =>
        property.features.includes(feature),
      );
    }
    return true;
  });

  const getTabs = () => {
    const baseTabs = ["tous"];
    const typeTabs = propertyTypes.map((type) => type.slug);
    return [...baseTabs, ...typeTabs];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PropertiesHero
        onPrimaryAction={() => {
          const searchBar = document.querySelector('input[type="text"]');
          if (searchBar) searchBar.focus();
        }}
        onSecondaryAction={handleAnnouncementClick}
      />
      {/*
      <div
        className="relative min-h-[560px] lg:min-h-[620px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/85 to-blue-900/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 text-white mb-6">
              <Building2 size={20} />
              <span className="font-semibold">Immobilier</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Des biens fiables, pas des promesses
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-2 leading-relaxed">
              Tu veux investir au pays ou en Afrique francophone, mais tu veux
              du sérieux
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed">
              Ici, chaque bien est vérifié, documenté et prêt pour toi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const searchBar =
                    document.querySelector('input[type="text"]');
                  if (searchBar) searchBar.focus();
                }}
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Search size={20} />
                <span>Rechercher un bien</span>
              </button>
              <button
                onClick={handleAnnouncementClick}
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-white/10 transition-colors"
              >
                <Plus size={20} />
                <span>Faire une annonce</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      */}
      {/*
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 lg:-mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl p-5 sm:p-6 text-center border border-gray-100"
            >
              <div className="text-blue-600 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Properties Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="mt-8 sm:mt-10 bg-white border border-gray-200 shadow-md p-4 sm:p-6">
              <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Rechercher par ville, quartier ou type de bien..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg"
                  >
                    <SlidersHorizontal size={20} />
                    <span>Filtres avances</span>
                    {Object.values(filters).filter((v) =>
                      Array.isArray(v) ? v.length > 0 : v,
                    ).length > 1 && (
                      <span className="bg-white text-blue-600 text-xs px-2 py-0.5 font-bold">
                        {Object.values(filters).filter((v) =>
                          Array.isArray(v) ? v.length > 0 : v,
                        ).length - 1}
                      </span>
                    )}
                  </button>
                  <div className="relative w-full sm:w-56">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium w-full"
                    >
                      <option value="recommended">Recommande</option>
                      <option value="price_asc">Prix croissant</option>
                      <option value="price_desc">Prix decroissant</option>
                      <option value="area_desc">Surface</option>
                    </select>
                    <ArrowUpDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                  <div className="flex items-center bg-gray-100 p-1 w-full sm:w-auto">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:bg-gray-200"}`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:bg-gray-200"}`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {showFilters && (
                <div className="mt-5 p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold text-gray-900">
                      Filtres avances
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-200 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de bien
                      </label>
                      <select
                        value={filters.type}
                        onChange={(e) =>
                          handleFilterChange("type", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="">Tous les types</option>
                        {propertyTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction
                      </label>
                      <select
                        value={filters.transactionType}
                        onChange={(e) =>
                          handleFilterChange("transactionType", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="">Toutes</option>
                        <option value="vente">Vente</option>
                        <option value="location">Location</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix minimum (XOF)
                      </label>
                      <input
                        type="number"
                        placeholder="100 000"
                        value={filters.priceMin}
                        onChange={(e) =>
                          handleFilterChange("priceMin", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix maximum (XOF)
                      </label>
                      <input
                        type="number"
                        placeholder="500 000"
                        value={filters.priceMax}
                        onChange={(e) =>
                          handleFilterChange("priceMax", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Surface min (m2)
                      </label>
                      <input
                        type="number"
                        placeholder="50"
                        value={filters.areaMin}
                        onChange={(e) =>
                          handleFilterChange("areaMin", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Chambres
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, "5+"].map((num) => (
                        <button
                          key={num}
                          onClick={() =>
                            handleFilterChange(
                              "bedrooms",
                              num === "5+" ? "5" : num.toString(),
                            )
                          }
                          className={`px-4 py-2.5 font-medium transition-all ${filters.bedrooms === (num === "5+" ? "5" : num.toString()) ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Caracteristiques
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {propertyFeatures.map((feature) => (
                        <button
                          key={feature}
                          onClick={() => toggleFeature(feature)}
                          className={`px-3 py-1.5 text-sm font-medium transition-all ${filters.features.includes(feature) ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
                        >
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-3 mt-8 pt-6 border-t border-gray-300">
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2.5 text-gray-700 bg-white hover:bg-gray-100 font-medium transition-colors border-2 border-gray-200"
                    >
                      Reinitialiser
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg"
                    >
                      Appliquer les filtres
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 sm:mt-12">
              <section className="mx-auto mb-10 max-w-5xl bg-[#d9e8f4] px-4 py-5 sm:px-6 sm:py-6">
                <div className="space-y-4">
                  <h2 className="max-w-4xl text-2xl font-bold leading-tight text-slate-950 sm:text-[2.05rem]">
                    Plus de 650 000 particuliers et professionnels ont deja
                    choisi ABI pour leur acquisition de bien immobilier.
                  </h2>

                  <div className="mx-auto grid max-w-[720px] grid-cols-1 overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:grid-cols-[150px_1fr]">
                    <div className="h-[140px] bg-slate-200 sm:h-[150px]">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].meta}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex min-h-[140px] flex-col justify-between px-5 py-4 sm:min-h-[150px] sm:px-8">
                      <div>
                        <p className="max-w-md text-[15px] leading-6 text-slate-700 sm:text-base">
                          {testimonials[activeTestimonial].quote}
                        </p>
                        <p className="mt-3 text-sm font-semibold text-slate-900">
                          {testimonials[activeTestimonial].author}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {testimonials[activeTestimonial].meta}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={previousTestimonial}
                          aria-label="Temoignage precedent"
                          className="text-sky-600 transition hover:text-sky-800"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center gap-1.5">
                          {testimonials.map((_, index) => (
                            <button
                              key={`testimonial-dot-${index}`}
                              type="button"
                              aria-label={`Temoignage ${index + 1}`}
                              onClick={() => setActiveTestimonial(index)}
                              className={`h-1.5 rounded-full transition-all ${
                                index === activeTestimonial
                                  ? "w-4 bg-sky-600"
                                  : "w-1.5 bg-sky-200 hover:bg-sky-400"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={nextTestimonial}
                          aria-label="Temoignage suivant"
                          className="text-sky-600 transition hover:text-sky-800"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Trouvez le bien qui vous ressemble
              </h2>
              {/* nombre de propriete 
              <p className="text-xl text-gray-600">
                {loading
                  ? "Chargement..."
                  : `${filteredProperties.length} ${
                      filteredProperties.length === 1
                        ? "bien disponible"
                        : "biens disponibles"
                    }`}
              </p> */}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2">
            {getTabs().map((tab) => {
              const propertyType = propertyTypes.find((t) => t.slug === tab);
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${activeTab === tab ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
                >
                  {tab === "tous"
                    ? "Tous les biens"
                    : propertyType?.name ||
                      tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des propriétés...</p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="group bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        {property.tag && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-blue-500 text-white px-3 py-1 text-sm font-semibold">
                              {property.tag}
                            </span>
                          </div>
                        )}

                        <button
                          onClick={() => toggleFavorite(property.id)}
                          className={`absolute top-4 right-4 p-2.5 backdrop-blur-sm transition-all ${favorites.includes(property.id) ? "bg-rose-500 text-white" : "bg-white/90 text-gray-700 hover:bg-white"}`}
                        >
                          <Heart
                            size={18}
                            fill={
                              favorites.includes(property.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">
                            {property.title}
                          </h3>
                          <div className="flex items-center text-white/90 text-sm">
                            <MapPin size={14} className="mr-1 flex-shrink-0" />
                            <span className="truncate">
                              {property.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-1">
                            <Star
                              size={16}
                              className="fill-amber-400 text-amber-400"
                            />
                            <span className="font-semibold text-gray-900">
                              {property.rating}
                            </span>
                          </div>
                          <span className="text-sm font-medium px-2 py-1 bg-gray-100 text-gray-700">
                            {property.transaction_type === "vente"
                              ? "À vendre"
                              : "À louer"}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                          <div className="text-center">
                            <Bed
                              className="text-blue-600 mx-auto mb-2"
                              size={20}
                            />
                            <div className="text-xs text-gray-500 mb-1">
                              Chambres
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {property.bedrooms}
                            </div>
                          </div>
                          <div className="text-center">
                            <Bath
                              className="text-blue-600 mx-auto mb-2"
                              size={20}
                            />
                            <div className="text-xs text-gray-500 mb-1">
                              Bains
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {property.bathrooms}
                            </div>
                          </div>
                          <div className="text-center">
                            <Maximize
                              className="text-blue-600 mx-auto mb-2"
                              size={20}
                            />
                            <div className="text-xs text-gray-500 mb-1">
                              Surface
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {property.area} m²
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex flex-wrap gap-2">
                            {property.features
                              ?.slice(0, 3)
                              .map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1"
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
                              Prix
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                              {formatPrice(property.price)}
                            </div>
                          </div>
                          <Link
                            to={`/property/${property.id}`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                          >
                            Voir détails
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Vue liste
                <div className="space-y-6">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative h-64 md:h-auto">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80";
                            }}
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {property.title}
                              </h3>
                              <div className="flex items-center text-gray-600 mb-3">
                                <MapPin size={16} className="mr-2" />
                                {property.location}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600 mb-2">
                                {formatPrice(property.price)}
                              </div>
                              <span className="text-sm font-medium px-2 py-1 bg-gray-100 text-gray-700">
                                {property.transaction_type === "vente"
                                  ? "À vendre"
                                  : "À louer"}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center">
                              <Bed className="text-blue-600 mr-2" size={18} />
                              <span className="text-gray-700">
                                {property.bedrooms} chambres
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Bath className="text-blue-600 mr-2" size={18} />
                              <span className="text-gray-700">
                                {property.bathrooms} bains
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Maximize
                                className="text-blue-600 mr-2"
                                size={18}
                              />
                              <span className="text-gray-700">
                                {property.area} m²
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Star className="text-amber-400 mr-2" size={18} />
                              <span className="text-gray-700">
                                {property.rating}/5
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {property.features
                              ?.slice(0, 5)
                              .map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1"
                                >
                                  {feature}
                                </span>
                              ))}
                          </div>

                          <div className="flex justify-between items-center">
                            <Link
                              to={`/property/${property.id}`}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                            >
                              Voir détails
                            </Link>
                            <button
                              onClick={() => toggleFavorite(property.id)}
                              className={`p-2 ${favorites.includes(property.id) ? "text-rose-500" : "text-gray-400 hover:text-rose-500"}`}
                            >
                              <Heart
                                size={20}
                                fill={
                                  favorites.includes(property.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredProperties.length === 0 && !loading && (
                <div className="text-center py-20">
                  {/*<div className="text-6xl mb-4">🏠</div>*/}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Aucun bien trouvé
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {properties.length === 0
                      ? "Aucune propriété n'est actuellement disponible."
                      : "Essayez de modifier vos critères de recherche"}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Notre promesse
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Construire avec toi, pour toi, et toujours dans les règles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {advantages.map((adv, index) => (
              <div
                key={index}
                className="group bg-white p-8 shadow-lg hover:shadow-2xl 
                 transition-all duration-500 hover:-translate-y-2 
                 border border-gray-100 text-center"
              >
                <div
                  className="flex justify-center mb-6 
                      group-hover:scale-110 transition-transform"
                >
                  <div
                    className="flex items-center justify-center 
                        w-16 h-16 
                        bg-gradient-to-br from-blue-50 to-blue-100"
                  >
                    <div className="text-blue-600">{adv.icon}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {adv.title}
                </h3>

                <p className="text-gray-600 mb-4">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à trouver ton bien ?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Tu cherches un projet sérieux, rentable et sécurisé.
          </p>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            On t’accompagne du choix jusqu’à la remise des clés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-10 py-4 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 shadow-lg">
              <Home size={20} />
              <span>Trouver mon bien</span>
            </button>
            <button className="bg-white text-blue-900 px-10 py-4 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>Parler à un conseiller</span>
            </button>
          </div>
        </div>
      </section>

      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-[1px] flex items-center justify-center px-4">
          <div className="w-full max-w-2xl bg-white shadow-2xl border border-slate-200">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Faire une annonce
              </h3>
              <button
                type="button"
                onClick={() => setShowAnnouncementModal(false)}
                className="p-2 text-slate-500 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={submitAnnouncementRequest}
              className="p-5 sm:p-6 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Decrivez votre bien
                </label>
                <textarea
                  value={announcementText}
                  onChange={(event) => setAnnouncementText(event.target.value)}
                  rows={6}
                  className="mt-2 w-full border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="J'aimerais ajouter une maison de 4 pieces situee a..."
                  required
                />
              </div>

              {announcementError && (
                <div className="text-sm px-3 py-2 bg-red-50 border border-red-200 text-red-700">
                  {announcementError}
                </div>
              )}
              {announcementSuccess && (
                <div className="text-sm px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700">
                  {announcementSuccess}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={announcementSubmitting}
                  className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {announcementSubmitting ? "Envoi..." : "Envoyer la demande"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
