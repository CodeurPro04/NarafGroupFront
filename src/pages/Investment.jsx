import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  FileText,
  Home,
  Hammer,
  ChevronDown,
  Mail,
  Briefcase,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import api from "../api/axios";
import EmptyState from "../components/ui/EmptyState";
import { SkeletonBlock, PropertyCardSkeleton } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";

const Investment = () => {
  const [activeFilter, setActiveFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("roi_desc");
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("tous");
  const [investmentProjects, setInvestmentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeHeroTab, setActiveHeroTab] = useState("nos-offres");
  const [openOfferIndex, setOpenOfferIndex] = useState(0);
  const navigate = useNavigate();
  const pageLocation = useLocation();

  const defaultImage =
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80";
  const getStorageUrl = (path) => toMediaUrl(path);

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
        getStorageUrl(project.cover_image) ||
        getStorageUrl(project.image_url) ||
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

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const queryText = params.get("search") || "";
    const type = (params.get("investment_type") || "tous").toLowerCase();
    const minBudget = params.get("min_budget");
    const maxBudget = params.get("max_budget");

    let nextBudget = "tous";
    if (minBudget && maxBudget) {
      nextBudget = `${minBudget}-${maxBudget}`;
    } else if (minBudget && !maxBudget) {
      nextBudget = `${minBudget}+`;
    }

    setSearchTerm(queryText);
    setActiveFilter(type);
    setBudgetFilter(nextBudget);
  }, [pageLocation.search]);

  const projectsSource = investmentProjects;
  const heroTabs = [
    {
      key: "nos-offres",
      title: "Nos offres",
      icon: <Building2 size={22} />,
    },
    {
      key: "je-veux",
      title: "Je veux",
      icon: <Target size={22} />,
    },
    {
      key: "les-meilleurs",
      title: "Les meilleurs",
      icon: <TrendingUp size={22} />,
    },
    {
      key: "ou-investir",
      title: "Ou investir",
      icon: <MapPin size={22} />,
    },
  ];

  const heroTabStyles = {
    "nos-offres": {
      hover: "hover:bg-slate-200 hover:border-slate-400 hover:text-slate-900",
      icon: "text-slate-700",
      accent: "bg-slate-400",
      active: "bg-slate-800 border-slate-800 text-white shadow-md",
      activeIcon: "text-white",
      activeAccent: "bg-white/80",
    },
    "je-veux": {
      hover: "hover:bg-emerald-100 hover:border-emerald-300 hover:text-emerald-700",
      icon: "text-emerald-600",
      accent: "bg-emerald-400",
      active: "bg-emerald-600 border-emerald-600 text-white shadow-md",
      activeIcon: "text-white",
      activeAccent: "bg-white/80",
    },
    "les-meilleurs": {
      hover: "hover:bg-violet-100 hover:border-violet-300 hover:text-violet-700",
      icon: "text-violet-600",
      accent: "bg-violet-400",
      active: "bg-violet-600 border-violet-600 text-white shadow-md",
      activeIcon: "text-white",
      activeAccent: "bg-white/80",
    },
    "ou-investir": {
      hover: "hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700",
      icon: "text-blue-600",
      accent: "bg-cyan-400",
      active: "bg-blue-600 border-blue-600 text-white shadow-md",
      activeIcon: "text-white",
      activeAccent: "bg-white/80",
    },
  };

  const offerFamilies = [
    {
      title: "Co-investissements",
      details:
        "participation directe aux projets preselectionnes en syndication avec ABI et des co-investisseurs institutionnels.",
    },
    {
      title: "Fonds sectoriels",
      details:
        "acces a des fonds thematiques sur le logement abordable, l'energie renouvelable, l'eau et assainissement et les infrastructures urbaines.",
    },
    {
      title: "SPV / Vehicules dedies",
      details:
        "creation de societes ad hoc pour structurer un projet unique et isoler les risques.",
    },
    {
      title: "Equity direct",
      details:
        "prises de participation au capital pour accompagner la croissance d'operateurs et de promoteurs locaux.",
    },
    {
      title: "Dette amortissable et prets relais",
      details:
        "financements senior pour la construction, le levier de fonds propres et la stabilisation post-achevement.",
    },
    {
      title: "Dette mezzanine et quasi-equity",
      details:
        "solutions hybrides pour combler le gap entre equity et dette senior.",
    },
    {
      title: "Blended finance et subventions catalytiques",
      details:
        "combinaisons de capitaux concessionnels et commerciaux pour rendre viables les projets a fort impact.",
    },
    {
      title: "Garanties et risk-sharing",
      details:
        "instruments de couverture pour reduire le risque investisseur, avec garanties partielles de credit et assurances political risk.",
    },
    {
      title: "Project bonds et titrisation",
      details:
        "structuration de dettes long terme et acces aux marches de capitaux pour des projets matures.",
    },
    {
      title: "Fonds d'impact / ESG-linked",
      details:
        "placements mesurant et remunerant la performance environnementale et sociale.",
    },
    {
      title: "Mandats de gestion et fonds dedies",
      details:
        "gestion discretionnaire d'un portefeuille d'actifs infrastructurels pour investisseurs institutionnels.",
    },
    {
      title: "Services d'accompagnement",
      details:
        "due diligence financiere, etudes de faisabilite, structuration juridique, conformite KYC/AML et suivi ESG.",
    },
  ];

  const offerHighlights = [
    {
      icon: <Layers3 size={18} />,
      title: "Modalites flexibles",
      text: "Tickets adaptables selon l'offre pour investisseurs particuliers, family offices, fonds et institutions, avec gouvernance claire et reporting periodique.",
    },
  ];


  const OfferAccordion = ({ title, details, isOpen, onToggle }) => (
    <div className="border-b border-slate-300/90">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-[#0f62c9]"
      >
        <span className="text-[1.2rem] font-medium tracking-[-0.02em] text-slate-950 sm:text-[1.35rem]">
          {title}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`origin-top pb-5 text-base leading-7 text-slate-600 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpen ? "translate-y-0 scale-y-100" : "-translate-y-2 scale-y-95"
            }`}
          >
            <p>{details}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const benefits = [
    {
      icon: <Shield size={32} />,
      title: "Sécurité maximale",
      description: "Une sélection rigoureuse pour protéger ton investissement.",
      features: [
        "Due diligence",
        "Garanties bancaires",
        "Assurances projet",
      ],
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Rendement optimisé",
      description: "Des performances maîtrisées, basées sur des analyses réelles.",
      features: [
        "Études de marché",
        "Optimisation fiscale",
        "Gestion active",
      ],
    },
    {
      icon: <Target size={32} />,
      title: "Accompagnement",
      description: "Un suivi humain, clair et constant.",
      features: ["Conseiller dédié", "Reporting régulier", "Support 7j/7"],
    },
    {
      icon: <Zap size={32} />,
      title: "Process simplifié",
      description: "Investir devient simple, même depuis l’étranger.",
      features: [
        "Plateforme digitale",
        "Documentation claire",
        "Paiement sécurisé",
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
    .filter((project) => {
      if (budgetFilter === "tous") return true;

      const budget = Number(project.minInvestment);
      if (Number.isNaN(budget)) return false;

      if (budgetFilter.includes("-")) {
        const [minBudget, maxBudget] = budgetFilter
          .split("-")
          .map((value) => Number(value));
        if (Number.isNaN(minBudget) || Number.isNaN(maxBudget)) return true;
        return budget >= minBudget && budget <= maxBudget;
      }

      if (budgetFilter.endsWith("+")) {
        const minBudget = Number(budgetFilter.replace("+", ""));
        if (Number.isNaN(minBudget)) return true;
        return budget >= minBudget;
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
              
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Investir en Afrique, intelligemment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100"></span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed">
              On sélectionne uniquement des programmes solides, portés par des
              promoteurs sérieux. Tu sais où tu mets ton argent, comment il
              travaille, et ce que tu gagnes.
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

      <div className="relative mx-auto mt-6 max-w-7xl px-4 sm:mt-10 sm:px-6 lg:-mt-10 lg:px-8">
        <div className="border border-gray-200 bg-[#f2f2f2] p-1.5 shadow-2xl sm:p-2">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-4">
            {heroTabs.map((tab) => {
              const tabStyle =
                heroTabStyles[tab.key] || heroTabStyles["nos-offres"];
              const isActive = activeHeroTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveHeroTab(tab.key)}
                  className={`rounded-lg border px-3 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? tabStyle.active
                      : `bg-[#f6f6f6] border-gray-200 text-slate-800 ${tabStyle.hover} hover:shadow-sm`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isActive ? tabStyle.activeIcon : tabStyle.icon}>
                      {tab.icon}
                    </span>
                  </div>
                  <span
                    className={`mb-1.5 mt-1.5 block h-1 w-10 ${
                      isActive ? tabStyle.activeAccent : tabStyle.accent
                    }`}
                  />
                  <p
                    className={`text-[1.2rem] leading-tight ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    {tab.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="bg-[#f4f3ef] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-stretch">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#1a4f9c]">
                Nos offres
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-slate-950 leading-[0.98]">
                Nos offres d'investissement.
              </h2>
              <p className="mt-6 max-w-[680px] text-lg leading-8 text-slate-600">
                ABI structure plusieurs formats d'entree pour adapter l'investissement au type de projet, au niveau de risque et au profil de l'investisseur.
              </p>
              <div className="mt-10">
                {offerFamilies.map((offer, index) => (
                  <OfferAccordion
                    key={offer.title}
                    title={offer.title}
                    details={offer.details}
                    isOpen={openOfferIndex === index}
                    onToggle={() =>
                      setOpenOfferIndex((currentIndex) =>
                        currentIndex === index ? -1 : index
                      )
                    }
                  />
                ))}
              </div>
              <button
                type="button"
                className="mt-8 inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
              >
                <Mail size={16} />
                Recevoir la brochure detaillee
              </button>
            </div>

            <div className="self-stretch overflow-hidden bg-[#ddd5ca] shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&q=80"
                alt="Offres d'investissement ABI"
                className="w-full h-full min-h-[320px] object-cover object-center sm:min-h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[760px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#1a4f9c]">
              Modalites
            </p>
            <h3 className="mt-3 text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-slate-950 leading-tight">
              Un cadre d'offre plus flexible et plus lisible.
            </h3>
          </div>
          <div className="mt-8 max-w-[760px] mx-auto">
            {offerHighlights.map((item) => (
              <div key={item.title} className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-6 shadow-[0_14px_28px_rgba(15,23,42,0.04)] text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f7fd] text-[#0f62c9]">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 pl-4 pr-10 py-3 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none font-medium w-full sm:w-auto"
                >
                  <option value="tous">Tous les budgets</option>
                  <option value="0-5000000">0 - 5M XOF</option>
                  <option value="5000000-20000000">5M - 20M XOF</option>
                  <option value="20000000-50000000">20M - 50M XOF</option>
                  <option value="50000000+">50M+ XOF</option>
                </select>
                <Filter
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
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
                      <p className="text-sm text-gray-600 leading-relaxed mb-5">
                        {getExcerpt(project.description)}
                      </p>
                      <div className="space-y-4">
                        <div className="text-center p-3 bg-gray-50">
                          <div className="text-sm text-gray-600 mb-1">
                            Rendement annuel estime
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {project.roi}
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
            <EmptyState
              title="Aucun projet ne correspond a votre recherche."
              className="py-20"
              action={
                <button
                  onClick={() => {
                    setActiveFilter("tous");
                    setSearchTerm("");
                  }}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg"
                >
                  Voir tous les projets
                </button>
              }
            />
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 items-center bg-white border border-gray-200 p-5 sm:p-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Investir dans la renovation
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                Profite d’opportunités à fort potentiel, avec un accompagnement
                sérieux du début à la fin. On analyse, on exécute, on suit, on
                optimise. Tu avances en confiance, même à distance.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-slate-700">
                  <h3 className="font-bold">Ticket d'entree flexible</h3>
                  <p>Pour investir selon ton budget, sans pression.</p>
                </div>
                <div className="border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-slate-700">
                <h3 className="font-bold">Strategie de sortie claire</h3>
                  Tu sais comment tu entres, tu sais comment tu sors.
                </div>
                <div className="border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-slate-700">
                  <h3 className="font-bold">Suivi des travaux en continu</h3>
                  <p>Preuves, photos, vidéos : rien n’avance sans toi.</p>
                </div>
                <div className="border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-slate-700">
                  <h3 className="font-bold">Optimisation rendement/risque</h3>
                  <p>On cherche le meilleur équilibre, pas les promesses faciles.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1400&q=80"
                alt="Investir dans la renovation"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi investir avec
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                AFRICA Build Investment ?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche rigoureuse, transparente et pensée pour protéger ton argent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group text-center p-6 sm:p-7 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">{benefit.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <ul className="space-y-2 group text-center p-6 sm:p-7">
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
              Prêt à donner plus de valeur à votre épargne ?
            </h2>
            <p className="text-base sm:text-xl text-blue-100 mb-10 leading-relaxed">
              Accédez à des opportunités sélectionnées et à un accompagnement premium tout au long de votre investissement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-8 sm:px-10 py-3.5 sm:py-4 font-bold hover:bg-blue-50 transition-all shadow-2xl">
                <Phone size={22} />
                <span>Parler a un expert</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-8 sm:px-10 py-3.5 sm:py-4 font-bold hover:bg-blue-50 transition-all shadow-2xl">
                <FileText size={22} />
                <span>Découvrir les opportunités</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investment;
