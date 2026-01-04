
import { useState, useEffect } from 'react';
import { 
  MapPin, Bed, Bath, Maximize, Heart, Search, 
  Phone, Mail, Building2, Home, Star, Eye, Check,
  ChevronRight, Calendar, Award, TrendingUp, Shield,
  CheckCircle, Clock, X, SlidersHorizontal, Filter,
  ArrowUpDown, Grid, List, DollarSign
} from 'lucide-react';

const Properties = () => {
  const [activeTab, setActiveTab] = useState('tous');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    areaMin: '',
    areaMax: '',
    features: []
  });

  const allProperties = [
    {
      id: 1,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
      price: 450000,
      pricePerSqm: 1800,
      title: 'Villa Moderne avec Piscine',
      location: 'Cocody, Abidjan',
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      type: 'villa',
      tag: 'Nouveauté',
      rating: 4.8,
      views: 1245,
      features: ['Piscine', 'Jardin', 'Garage', 'Domotique', 'Climatisation', 'Sécurité'],
      status: 'available',
      year: 2024
    },
    {
      id: 2,
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
      price: 180000,
      pricePerSqm: 1500,
      title: 'Appartement Standing Vue Mer',
      location: 'Plateau, Abidjan',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: 'appartement',
      tag: 'Coup de cœur',
      rating: 4.6,
      views: 892,
      features: ['Vue mer', 'Terrasse', 'Ascenseur', 'Piscine commune', 'Gym', 'Parking'],
      status: 'available',
      year: 2023
    },
    {
      id: 3,
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'],
      price: 320000,
      pricePerSqm: 1067,
      title: 'Maison Contemporaine',
      location: 'Riviera, Abidjan',
      bedrooms: 5,
      bathrooms: 4,
      area: 300,
      type: 'maison',
      tag: 'Exclusif',
      rating: 4.9,
      views: 1567,
      features: ['Neuf', 'Jardin', 'Cuisine équipée', 'Buanderie', 'Alarme', 'Terrasse'],
      status: 'available',
      year: 2024
    },
    {
      id: 4,
      images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'],
      price: 280000,
      pricePerSqm: 1400,
      title: 'Duplex Lumineux',
      location: 'Marcory, Abidjan',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      type: 'appartement',
      rating: 4.5,
      views: 734,
      features: ['Terrasse', 'Cave', 'Parking', 'Balcon', 'Ascenseur'],
      status: 'available',
      year: 2022
    },
    {
      id: 5,
      images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80'],
      price: 550000,
      pricePerSqm: 1375,
      title: 'Villa de Luxe',
      location: 'Cocody, Abidjan',
      bedrooms: 6,
      bathrooms: 5,
      area: 400,
      type: 'villa',
      tag: 'Premium',
      rating: 5.0,
      views: 2103,
      features: ['Domaine privé', 'Piscine', 'Tennis', 'Spa', 'Domotique', 'Jardin'],
      status: 'available',
      year: 2024
    },
    {
      id: 6,
      images: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80'],
      price: 150000,
      pricePerSqm: 3333,
      title: 'Studio Moderne Centre-Ville',
      location: 'Plateau, Abidjan',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      type: 'appartement',
      tag: 'Bon plan',
      rating: 4.3,
      views: 456,
      features: ['Meublé', 'Climatisation', 'Internet', 'Centre-ville', 'Parking'],
      status: 'available',
      year: 2023
    }
  ];

  const [properties, setProperties] = useState(allProperties);

  const stats = [
    { icon: <Building2 size={40} />, value: '2,500+', label: 'Biens disponibles' },
    { icon: <Home size={40} />, value: '98%', label: 'Clients satisfaits' },
    { icon: <Award size={40} />, value: '25 ans', label: "D'expérience" },
    { icon: <TrendingUp size={40} />, value: '150+', label: 'Ventes/mois' }
  ];

  const advantages = [
    {
      icon: <Shield size={32} />,
      title: 'Transaction Sécurisée',
      description: 'Garantie et protection à chaque étape',
      features: ['Due diligence complète', 'Garanties bancaires', 'Contrats vérifiés']
    },
    {
      icon: <Clock size={32} />,
      title: 'Visite 24/7',
      description: 'Réservation en ligne disponible',
      features: ['Visite virtuelle 360°', 'Planning flexible', 'Confirmation immédiate']
    },
    {
      icon: <Award size={32} />,
      title: 'Expertise Certifiée',
      description: 'Agents professionnels vérifiés',
      features: ['Conseillers certifiés', 'Formation continue', 'Réseau étendu']
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Accompagnement',
      description: 'Suivi personnalisé de A à Z',
      features: ['Conseiller dédié', 'Aide financement', 'Support 7j/7']
    }
  ];

  const propertyFeatures = [
    'Piscine', 'Jardin', 'Garage', 'Terrasse', 'Balcon', 'Climatisation',
    'Ascenseur', 'Sécurité', 'Domotique', 'Meublé', 'Vue mer', 'Neuf'
  ];

  useEffect(() => {
    let filtered = [...allProperties];
    
    if (activeTab !== 'tous') {
      filtered = filtered.filter(p => p.type === activeTab);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.location.toLowerCase().includes(search)
      );
    }

    if (filters.type) filtered = filtered.filter(p => p.type === filters.type);
    if (filters.priceMin) filtered = filtered.filter(p => p.price >= parseInt(filters.priceMin));
    if (filters.priceMax) filtered = filtered.filter(p => p.price <= parseInt(filters.priceMax));
    if (filters.bedrooms) filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    if (filters.bathrooms) filtered = filtered.filter(p => p.bathrooms >= parseInt(filters.bathrooms));
    if (filters.areaMin) filtered = filtered.filter(p => p.area >= parseInt(filters.areaMin));
    if (filters.areaMax) filtered = filtered.filter(p => p.area <= parseInt(filters.areaMax));
    if (filters.features.length > 0) {
      filtered = filtered.filter(p => 
        filters.features.every(feature => p.features.includes(feature))
      );
    }

    // Tri
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'area_desc':
        filtered.sort((a, b) => b.area - a.area);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
    }
    
    setProperties(filtered);
  }, [activeTab, filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (feature) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      type: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      areaMin: '',
      areaMax: '',
      features: []
    });
    setActiveTab('tous');
    setSortBy('recommended');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'xof',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px]" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Building2 size={20} />
              <span className="font-semibold">Immobilier</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Trouvez Votre Bien Idéal
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Découvrez notre sélection exclusive de {allProperties.length} propriétés premium avec accompagnement personnalisé.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center space-x-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                <Search size={20} />
                <span>Rechercher un bien</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                <Phone size={20} />
                <span>Nous contacter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats Cards */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-2xl p-6 text-center hover:shadow-3xl transition-all hover:-translate-y-1 duration-300">
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-32"></div>

      {/* Search & Filter Bar - Sticky */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par ville, quartier ou type de bien..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              <SlidersHorizontal size={20} />
              <span>Filtres avancés</span>
              {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v).length > 1 && (
                <span className="bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                  {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v).length - 1}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border-2 border-gray-200 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              >
                <option value="recommended">Recommandé</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="area_desc">Surface</option>
                <option value="popular">Plus populaire</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filtres avancés</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de bien</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="">Tous les types</option>
                    <option value="appartement">Appartement</option>
                    <option value="maison">Maison</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                {/* Prix Min */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix minimum (€)</label>
                  <input
                    type="number"
                    placeholder="100 000"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Prix Max */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix maximum (€)</label>
                  <input
                    type="number"
                    placeholder="500 000"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Surface Min */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface min (m²)</label>
                  <input
                    type="number"
                    placeholder="50"
                    value={filters.areaMin}
                    onChange={(e) => handleFilterChange('areaMin', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Chambres */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Chambres</label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, '5+'].map(num => (
                    <button
                      key={num}
                      onClick={() => handleFilterChange('bedrooms', num === '5+' ? '5' : num.toString())}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                        filters.bedrooms === (num === '5+' ? '5' : num.toString())
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salles de bain */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Salles de bain</label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, '4+'].map(num => (
                    <button
                      key={num}
                      onClick={() => handleFilterChange('bathrooms', num === '4+' ? '4' : num.toString())}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                        filters.bathrooms === (num === '4+' ? '4' : num.toString())
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caractéristiques */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Caractéristiques</label>
                <div className="flex flex-wrap gap-2">
                  {propertyFeatures.map(feature => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        filters.features.includes(feature)
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-300">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 text-gray-700 bg-white hover:bg-gray-100 rounded-lg font-medium transition-colors border-2 border-gray-200"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir NARAF ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience immobilière complète et sécurisée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">{adv.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{adv.title}</h3>
                <p className="text-gray-600 mb-4">{adv.description}</p>
                <ul className="space-y-2">
                  {adv.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle size={14} className="text-emerald-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Biens Immobiliers
            </h2>
            <p className="text-xl text-gray-600">
              {properties.length} {properties.length === 1 ? 'bien disponible' : 'biens disponibles'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-2 mb-12">
            {['tous', 'villa', 'appartement', 'maison'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab === 'tous' ? 'Tous les biens' : tab.charAt(0).toUpperCase() + tab.slice(1) + 's'}
              </button>
            ))}
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {property.tag && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {property.tag}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all ${
                      favorites.includes(property.id)
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart size={18} fill={favorites.includes(property.id) ? "currentColor" : "none"} />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{property.title}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {property.location}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-900">{property.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="text-center">
                      <Bed className="text-blue-600 mx-auto mb-2" size={20} />
                      <div className="text-xs text-gray-500 mb-1">Chambres</div>
                      <div className="text-sm font-semibold text-gray-900">{property.bedrooms}</div>
                    </div>
                    <div className="text-center">
                      <Bath className="text-blue-600 mx-auto mb-2" size={20} />
                      <div className="text-xs text-gray-500 mb-1">Bains</div>
                      <div className="text-sm font-semibold text-gray-900">{property.bathrooms}</div>
                    </div>
                    <div className="text-center">
                      <Maximize className="text-blue-600 mx-auto mb-2" size={20} />
                      <div className="text-xs text-gray-500 mb-1">Surface</div>
                      <div className="text-sm font-semibold text-gray-900">{property.area} m²</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {property.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          <CheckCircle size={12} className="mr-1" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Prix</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Aucun bien trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                onClick={() => {
                  setActiveTab('tous');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à Trouver Votre Futur Chez Vous ?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Notre équipe d'experts vous accompagne dans toutes les étapes de votre projet immobilier.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="flex items-center justify-center space-x-2 bg-white text-blue-900 px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                <Phone size={20} />
                <span>+225 XX XX XX XX XX</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                <Mail size={20} />
                <span>Prendre rendez-vous</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="text-blue-300 mb-3 mx-auto" size={32} />
                <h3 className="text-lg font-bold mb-2">Visite Gratuite</h3>
                <p className="text-blue-100 text-sm">Organisez votre visite en ligne</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="text-blue-300 mb-3 mx-auto" size={32} />
                <h3 className="text-lg font-bold mb-2">Conseil Expert</h3>
                <p className="text-blue-100 text-sm">Accompagnement personnalisé</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="text-blue-300 mb-3 mx-auto" size={32} />
                <h3 className="text-lg font-bold mb-2">Financement</h3>
                <p className="text-blue-100 text-sm">Solutions adaptées à votre budget</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;