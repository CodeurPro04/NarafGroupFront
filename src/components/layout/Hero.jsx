import { useState, useEffect } from 'react';
import { Search, MapPin, Home, ChevronLeft, ChevronRight, Building2, TrendingUp } from 'lucide-react';

const Hero = () => {
  const [searchType, setSearchType] = useState('vente');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      title: 'Votre maison de rêve vous attend',
      subtitle: 'Découvrez notre sélection exclusive de propriétés d\'exception',
      overlay: 'from-black/70 via-black/50 to-transparent'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
      title: 'Investissez dans votre avenir',
      subtitle: 'Des opportunités immobilières rentables et sécurisées',
      overlay: 'from-blue-900/70 via-blue-800/50 to-transparent'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
      title: 'Construisez votre patrimoine',
      subtitle: 'Projets de construction modernes et innovants',
      overlay: 'from-slate-900/70 via-slate-800/50 to-transparent'
    }
  ];

  const propertyTypes = [
    { value: '', label: 'Type de bien' },
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'villa', label: 'Villa' },
    { value: 'terrain', label: 'Terrain' },
    { value: 'bureau', label: 'Bureau' },
    { value: 'commercial', label: 'Local commercial' },
  ];

  const budgetRanges = [
    { value: '', label: 'Budget' },
    { value: '0-100000', label: 'Jusqu\'à 100 000' },
    { value: '100000-300000', label: '100 000 - 300 000' },
    { value: '300000-500000', label: '300 000 - 500 000' },
    { value: '500000-1000000', label: '500 000 - 1 000 000' },
    { value: '100000', label: 'Plus de 1  million' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators 
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div> */}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              {/* Search Type Tabs */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setSearchType('vente')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    searchType === 'vente'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Acheter
                </button>
                <button
                  onClick={() => setSearchType('location')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    searchType === 'location'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Louer
                </button>
                <button
                  onClick={() => setSearchType('neuf')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    searchType === 'neuf'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Neuf
                </button>
              </div>

              {/* Search Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Ville ou localisation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                  >
                    {budgetRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <Search size={20} />
                  <span>Rechercher</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats 
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">2,500+</div>
              <div className="text-white/80 text-sm">Biens disponibles</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">150+</div>
              <div className="text-white/80 text-sm">Projets en cours</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">98%</div>
              <div className="text-white/80 text-sm">Clients satisfaits</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">25+</div>
              <div className="text-white/80 text-sm">Ans d'expérience</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;