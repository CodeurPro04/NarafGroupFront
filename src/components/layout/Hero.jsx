import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../../services/propertyService";
import {
  Search,
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("vente");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([
    { value: "", label: "Type de bien" },
  ]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
      title: "Votre maison de reve vous attend",
      subtitle: "Decouvrez notre selection exclusive de proprietes d'exception",
      overlay: "from-black/70 via-black/50 to-transparent",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      title: "Investissez dans votre avenir",
      subtitle: "Des opportunites immobilieres rentables et securisees",
      overlay: "from-blue-900/70 via-blue-800/50 to-transparent",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      title: "Construisez votre patrimoine",
      subtitle: "Projets de construction modernes et innovants",
      overlay: "from-slate-900/70 via-slate-800/50 to-transparent",
    },
  ];

  const budgetRanges = [
    { value: "", label: "Acheter/Louer" },
    { value: "", label: "Louer" },
    { value: "", label: "Acheter" },
  ];

  useEffect(() => {
    let isMounted = true;

    const loadPropertyTypes = async () => {
      try {
        setLoadingTypes(true);
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
          setPropertyTypes([{ value: "", label: "Type de bien" }, ...options]);
        }
      } catch (error) {
        console.error("Erreur chargement types:", error);
      } finally {
        if (isMounted) setLoadingTypes(false);
      }
    };

    loadPropertyTypes();

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

  const handleSearch = () => {
    const params = new URLSearchParams();
    const transaction = searchType === "neuf" ? "vente" : searchType;
    if (transaction) params.set("transaction_type", transaction);
    if (location) params.set("search", location);
    if (propertyType) params.set("property_type_id", propertyType);
    if (budget) {
      if (budget.includes("-")) {
        const [minValue, maxValue] = budget.split("-");
        if (minValue) params.set("min_price", minValue);
        if (maxValue) params.set("max_price", maxValue);
      } else if (budget.endsWith("+")) {
        params.set("min_price", budget.replace("+", ""));
      }
    }
    navigate(`/properties?${params.toString()}`);
  };

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
                  <button
                    onClick={() => setSearchType("vente")}
                    className={`flex-1 py-3 px-6 font-semibold transition-all duration-200 ${
                      searchType === "vente"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Trouver un bien
                  </button>
                  <button
                    onClick={() => setSearchType("location")}
                    className={`flex-1 py-3 px-6 font-semibold transition-all duration-200 ${
                      searchType === "location"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Construction
                  </button>
                  <button
                    onClick={() => setSearchType("neuf")}
                    className={`flex-1 py-3 px-6 font-semibold transition-all duration-200 ${
                      searchType === "neuf"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Investissement
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative md:col-span-1">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Ville, commune ou quartier"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Home
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      disabled={loadingTypes}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <TrendingUp
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                    >
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white shadow-lg p-5">
            <div className="flex flex-col gap-3 mb-5">
              <button
                onClick={() => setSearchType("vente")}
                className={`w-full py-3 px-6 font-semibold transition-all duration-200 ${
                  searchType === "vente"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Acheter
              </button>
              <button
                onClick={() => setSearchType("location")}
                className={`w-full py-3 px-6 font-semibold transition-all duration-200 ${
                  searchType === "location"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Louer
              </button>
              <button
                onClick={() => setSearchType("neuf")}
                className={`w-full py-3 px-6 font-semibold transition-all duration-200 ${
                  searchType === "neuf"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Neuf
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Ville, commune ou quartier"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="relative">
                <Home
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  disabled={loadingTypes}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <TrendingUp
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
