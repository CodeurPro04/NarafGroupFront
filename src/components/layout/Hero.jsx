import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../../services/propertyService";
import api from "../../api/axios";
import {
  Search,
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Maximize,
} from "lucide-react";

const propertyTransactionOptions = [
  { value: "", label: "Acheter ou louer" },
  { value: "vente", label: "Acheter" },
  { value: "location", label: "Louer" },
];

const constructionSurfaceOptions = [
  { value: "", label: "Surface" },
  { value: "0-100", label: "0 - 100 m2" },
  { value: "100-200", label: "100 - 200 m2" },
  { value: "200-400", label: "200 - 400 m2" },
  { value: "400+", label: "400 m2 et plus" },
];

const investmentBudgetOptions = [
  { value: "", label: "Budget" },
  { value: "0-5000000", label: "0 - 5M XOF" },
  { value: "5000000-20000000", label: "5M - 20M XOF" },
  { value: "20000000-50000000", label: "20M - 50M XOF" },
  { value: "50000000+", label: "50M+ XOF" },
];

const basePropertyTypeOption = { value: "", label: "Type de bien" };
const baseInvestmentTypeOption = {
  value: "",
  label: "Type d'investissement",
};

const sections = [
  { key: "properties", label: "Trouver un bien" },
  { key: "construction", label: "Construire" },
  { key: "investment", label: "Investir" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("properties");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [locationText, setLocationText] = useState("");

  const [propertyType, setPropertyType] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const [constructionType, setConstructionType] = useState("");
  const [constructionSurface, setConstructionSurface] = useState("");

  const [investmentType, setInvestmentType] = useState("");
  const [investmentBudget, setInvestmentBudget] = useState("");

  const [propertyTypes, setPropertyTypes] = useState([basePropertyTypeOption]);
  const [investmentTypes, setInvestmentTypes] = useState([
    baseInvestmentTypeOption,
  ]);
  const [loadingPropertyTypes, setLoadingPropertyTypes] = useState(false);
  const [loadingInvestmentTypes, setLoadingInvestmentTypes] = useState(false);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
      title: "Une plateforme immobilière inclusive et digitale pour l'Afrique",
      subtitle: "AFRICA Build Investment réunit en un seul endroit tout ce dont vous avez besoin pour faire fructifier votre capital avec sécurité, transparence et performance.",
      overlay: "from-black/70 via-black/50 to-transparent",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      title: "Trouvez votre bien immobilier  en un clic",
      subtitle: "Villas, appartements, terrains sécurisés, programmes neufs. Chaque projet est vérifié, documenté et prêt pour toi.",
      overlay: "from-blue-900/70 via-blue-800/50 to-transparent",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      title: "Réalisez vos projets de construction partout en Afrique",
      subtitle: "Nous pensons et construisons votre future maison avec vous et sélectionnons avec soin les matériaux utilisés.",
      overlay: "from-slate-900/70 via-slate-800/50 to-transparent",
    },
    {
      image:
        "/images/carou.jpeg",
      title: "la plateforme N°1 pour l’investissement immobilier  en Afrique",
      subtitle: "Trouver les meilleurs placements pour son épargne pour mieux investir et développer son patrimoine.",
      overlay: "from-slate-900/70 via-slate-800/50 to-transparent",
    },
  ];

  useEffect(() => {
    let isMounted = true;

    const loadPropertyTypes = async () => {
      try {
        setLoadingPropertyTypes(true);
        const response = await propertyService.getPropertyTypes();
        const payload = response?.data ?? response ?? [];
        const list = payload?.data || payload;
        const options = Array.isArray(list)
          ? list.map((type) => ({
              value: String(type.id),
              label: type.name || "Type",
            }))
          : [];

        if (isMounted) {
          setPropertyTypes([basePropertyTypeOption, ...options]);
        }
      } catch (error) {
        console.error("Erreur chargement types:", error);
      } finally {
        if (isMounted) setLoadingPropertyTypes(false);
      }
    };

    const loadInvestmentTypes = async () => {
      try {
        setLoadingInvestmentTypes(true);
        const response = await api.get("/investments");
        const list = response?.data?.data?.data || response?.data?.data || [];
        const uniqueTypes = Array.from(
          new Set(
            (Array.isArray(list) ? list : [])
              .map((item) => item?.project_type)
              .filter((type) => type && String(type).trim()),
          ),
        );

        const options = uniqueTypes.map((type) => {
          const normalized = String(type).trim().toLowerCase();
          return {
            value: normalized,
            label: String(type).trim(),
          };
        });

        if (isMounted) {
          setInvestmentTypes([baseInvestmentTypeOption, ...options]);
        }
      } catch (error) {
        console.error("Erreur chargement types investissement:", error);
      } finally {
        if (isMounted) setLoadingInvestmentTypes(false);
      }
    };

    loadPropertyTypes();
    loadInvestmentTypes();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const applyRangeParams = (params, value, minKey, maxKey) => {
    if (!value) return;

    if (value.includes("-")) {
      const [minValue, maxValue] = value.split("-");
      if (minValue) params.set(minKey, minValue);
      if (maxValue) params.set(maxKey, maxValue);
      return;
    }

    if (value.endsWith("+")) {
      params.set(minKey, value.replace("+", ""));
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (locationText.trim()) {
      params.set("search", locationText.trim());
    }

    if (activeSection === "properties") {
      if (propertyType) params.set("property_type_id", propertyType);
      if (transactionType) params.set("transaction_type", transactionType);

      const query = params.toString();
      navigate(query ? `/properties?${query}` : "/properties");
      return;
    }

    if (activeSection === "construction") {
      if (constructionType) {
        const selectedType = propertyTypes.find(
          (type) => String(type.value) === String(constructionType),
        );
        if (selectedType?.label) {
          params.set("property_type", selectedType.label.toLowerCase());
        }
      }

      applyRangeParams(
        params,
        constructionSurface,
        "min_surface",
        "max_surface",
      );

      const query = params.toString();
      navigate(query ? `/construction?${query}` : "/construction");
      return;
    }

    if (investmentType) params.set("investment_type", investmentType);
    applyRangeParams(params, investmentBudget, "min_budget", "max_budget");

    const query = params.toString();
    navigate(query ? `/investment?${query}` : "/investment");
  };

  const secondaryField =
    activeSection === "investment"
      ? {
          value: investmentType,
          onChange: setInvestmentType,
          options: investmentTypes,
          loading: loadingInvestmentTypes,
          icon: TrendingUp,
        }
      : {
          value: activeSection === "properties" ? propertyType : constructionType,
          onChange:
            activeSection === "properties" ? setPropertyType : setConstructionType,
          options: propertyTypes,
          loading: loadingPropertyTypes,
          icon: Home,
        };

  const tertiaryField =
    activeSection === "properties"
      ? {
          value: transactionType,
          onChange: setTransactionType,
          options: propertyTransactionOptions,
          icon: TrendingUp,
        }
      : activeSection === "construction"
        ? {
            value: constructionSurface,
            onChange: setConstructionSurface,
            options: constructionSurfaceOptions,
            icon: Maximize,
          }
        : {
            value: investmentBudget,
            onChange: setInvestmentBudget,
            options: investmentBudgetOptions,
            icon: TrendingUp,
          };

  const SecondaryIcon = secondaryField.icon;
  const TertiaryIcon = tertiaryField.icon;

  const renderSearchForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative md:col-span-1">
        <MapPin
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Ville, commune ou quartier"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="relative">
        <SecondaryIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
        <select
          value={secondaryField.value}
          onChange={(e) => secondaryField.onChange(e.target.value)}
          disabled={secondaryField.loading}
          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
        >
          {secondaryField.options.map((option) => (
            <option key={option.value || option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <TertiaryIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
        <select
          value={tertiaryField.value}
          onChange={(e) => tertiaryField.onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
        >
          {tertiaryField.options.map((option) => (
            <option key={option.value || option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
      >
        <Search size={20} />
        <span>Rechercher</span>
      </button>
    </div>
  );

  return (
    <>
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            <div className="max-w-5xl mx-auto hidden md:block">
              <div className="bg-white shadow-2xl p-6">
                <div className="flex gap-3 mb-6">
                  {sections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`flex-1 py-3 px-6 font-semibold transition-all duration-200 ${
                        activeSection === section.key
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>

                {renderSearchForm()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white shadow-lg p-5">
            <div className="flex flex-col gap-3 mb-5">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full py-3 px-6 font-semibold transition-all duration-200 ${
                    activeSection === section.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {renderSearchForm()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
