import { useState } from 'react';
import { Calendar, Building, Users, MapPin, CheckCircle, TrendingUp, Shield, Clock, Home, Ruler, Hammer, Phone, Mail, Award, ArrowRight, Play } from 'lucide-react';

import {Link} from 'react-router-dom'
const Construction = () => {
  const [activeTab, setActiveTab] = useState('en-cours');

  const constructionProjects = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      title: 'Résidence Les Jardins',
      location: 'Cocody, Abidjan',
      type: 'Résidentiel',
      units: 45,
      completion: 'Q4 2024',
      progress: 75,
      priceFrom: 180000,
      features: ['Piscine', 'Parking', 'Sécurité 24/7', 'Espace vert'],
      status: 'en-cours'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      title: 'Tour Horizon',
      location: 'Plateau, Abidjan',
      type: 'Mixte',
      units: 120,
      completion: 'Q2 2025',
      progress: 45,
      priceFrom: 220000,
      features: ['Centre commercial', 'Bureaux', 'Résidentiel', 'Fitness'],
      status: 'en-cours'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      title: 'Villas Prestige',
      location: 'Riviera, Abidjan',
      type: 'Villa',
      units: 15,
      completion: 'Q1 2025',
      progress: 60,
      priceFrom: 450000,
      features: ['Piscine privée', 'Jardin', 'Garage double', 'Domotique'],
      status: 'en-cours'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      title: 'Eden Towers',
      location: 'Marcory, Abidjan',
      type: 'Résidentiel',
      units: 80,
      completion: 'Livré',
      progress: 100,
      priceFrom: 165000,
      features: ['Vue panoramique', 'Ascenseur', 'Terrasse', 'Parking'],
      status: 'termine'
    }
  ];

  const advantages = [
    {
      icon: <Shield size={32} />,
      title: 'Garantie Décennale',
      description: 'Protection complète pendant 10 ans'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'TVA Réduite',
      description: 'Avantages fiscaux à l\'achat dans le neuf'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Normes Modernes',
      description: 'Construction aux dernières normes'
    },
    {
      icon: <Clock size={32} />,
      title: 'Livraison Garantie',
      description: 'Respect des délais contractuels'
    }
  ];

  const process = [
    {
      number: '01',
      title: 'Consultation',
      description: 'Échangez avec nos experts pour définir vos besoins'
    },
    {
      number: '02',
      title: 'Conception',
      description: 'Plans et devis personnalisés selon votre projet'
    },
    {
      number: '03',
      title: 'Construction',
      description: 'Suivi en temps réel de l\'avancement des travaux'
    },
    {
      number: '04',
      title: 'Livraison',
      description: 'Remise des clés et garanties constructeur'
    }
  ];

  const stats = [
    { icon: <Building size={40} />, value: '150+', label: 'Projets réalisés' },
    { icon: <Users size={40} />, value: '2,500+', label: 'Clients satisfaits' },
    { icon: <Award size={40} />, value: '25 ans', label: 'D\'expérience' },
    { icon: <Home size={40} />, value: '98%', label: 'Taux de satisfaction' }
  ];

  const filteredProjects = activeTab === 'tous' 
    ? constructionProjects 
    : constructionProjects.filter(p => p.status === activeTab);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section avec Video/Image Background */}
      <div className="relative h-[600px] " style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
       }}>
        <div className=" absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center ">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Hammer size={20} />
              <span className="font-semibold">Construction & Rénovation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Construisez Votre Futur Avec Nous
            </h1>
            
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Des projets immobiliers innovants conçus pour durer. Profitez de nos garanties constructeur et d'un accompagnement complet de A à Z.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 ">
              <button className="flex items-center justify-center space-x-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg">
                <Phone size={20} />
                <span>Demander un devis</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                <Play size={20} />
                <span>Voir nos réalisations</span>
              </button>
            </div>
          </div>
        </div>
 </div>
        {/* Floating Stats Cards */}
        <div className="  relative sm:mb-7  lg:-mt-[64px]  z-20 md:-mt-[64px] ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-2xl p-6 text-center">
                  <div className="text-green-600 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
     

      {/* Spacing after floating cards */}
      <div className=" h-32"></div>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Construire avec NARAF ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des avantages exclusifs pour votre projet de construction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => (
              <div key={index} className="group text-center p-6 rounded-xl hover:bg-green-50 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{adv.title}</h3>
                <p className="text-gray-600">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Projets de Construction
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos réalisations en cours et terminées
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-2 mb-12">
            <button
              onClick={() => setActiveTab('tous')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'tous'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tous les projets
            </button>
            <button
              onClick={() => setActiveTab('en-cours')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'en-cours'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setActiveTab('termine')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'termine'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Terminés
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-white  shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
               
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.status === 'en-cours' ? 'En construction' : 'Livré'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {project.location}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Progress Bar */}
                  {project.status === 'en-cours' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Avancement</span>
                        <span className="font-semibold text-green-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="text-center">
                      <Building className="text-green-600 mx-auto mb-2" size={20} />
                      <div className="text-xs text-gray-500 mb-1">Type</div>
                      <div className="text-sm font-semibold text-gray-900">{project.type}</div>
                    </div>
                    <div className="text-center">
                      <Users className="text-green-600 mx-auto mb-2" size={20} />
                      <div className="text-xs text-gray-500 mb-1">Unités</div>
                      <div className="text-sm font-semibold text-gray-900">{project.units}</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="text-green-600 mx-auto mb-2" size={20} />
                      <div className="text-xs text-gray-500 mb-1">Livraison</div>
                      <div className="text-sm font-semibold text-gray-900">{project.completion}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <span key={idx} className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                          <CheckCircle size={12} className="mr-1" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">À partir de</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(project.priceFrom)}
                      </div>
                    </div>
                     <Link to="/property/:id"  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Processus de Construction
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un accompagnement sur-mesure du début à la fin de votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full text-3xl font-bold mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-600 to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à Lancer Votre Projet ?
            </h2>
            <p className="text-xl text-green-100 mb-10 leading-relaxed">
              Nos experts vous accompagnent gratuitement dans l'élaboration de votre projet de construction. Demandez votre devis personnalisé dès aujourd'hui.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="flex items-center justify-center space-x-2 bg-white text-green-900 px-10 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg">
                <Phone size={20} />
                <span>+225 XX XX XX XX XX</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                <Mail size={20} />
                <span>Demander un devis</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="text-green-300 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Devis</h3>
                <p className="text-green-100 text-sm">Estimation détaillée sans engagement</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="text-green-300 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Conseil Expert</h3>
                <p className="text-green-100 text-sm">Accompagnement personnalisé 7j/7</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="text-green-300 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Garanties Incluses</h3>
                <p className="text-green-100 text-sm">Protection décennale et conformité</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Construction;