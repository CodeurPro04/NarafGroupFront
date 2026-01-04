import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { properties } from '../data/properties';
import { Bed, Bath, Square, MapPin, Calendar, Phone, Mail, Share2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Bien non trouvé
          </h2>
          <p className="text-gray-600 mb-6">
            Le bien que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => window.history.back()}>
            Retour aux biens
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'xof',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const images = [
    property.image,
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <span className={`badge ${property.type === 'vente' ? 'badge-sale' : 'badge-rent'} mb-3`}>
                    {property.type === 'vente' ? 'À Vendre' : 'À Louer'}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={18} className="mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(property.price)}
                  </div>
                  {property.type === 'location' && (
                    <div className="text-gray-600">/ mois</div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Bed className="text-blue-600" size={24} />
                    <span className="text-2xl font-bold">{property.bedrooms}</span>
                  </div>
                  <div className="text-gray-600">Chambres</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Bath className="text-blue-600" size={24} />
                    <span className="text-2xl font-bold">{property.bathrooms}</span>
                  </div>
                  <div className="text-gray-600">Salles de bain</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Square className="text-blue-600" size={24} />
                    <span className="text-2xl font-bold">{property.area}</span>
                  </div>
                  <div className="text-gray-600">Surface (m²)</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Caractéristiques
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Informations supplémentaires
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Date de publication</div>
                    <div className="font-medium">{property.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-500">Référence</div>
                  <div className="font-medium">REF-{property.id.toString().padStart(4, '0')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Intéressé par ce bien ?
              </h3>
              
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="form-input"
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  className="form-input"
                />
                <textarea
                  placeholder="Votre message"
                  rows="4"
                  className="form-input"
                ></textarea>
              </div>

              <Button variant="primary" className="w-full mb-6">
                Envoyer la demande
              </Button>

              {/* Contact Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Téléphone</div>
                    <div className="font-medium">+33 1 23 45 67 89</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">contact@naraf-immobilier.fr</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Visit */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">
                Visitez ce bien
              </h3>
              <p className="mb-6 opacity-90">
                Planifiez une visite guidée avec notre expert
              </p>
              <Button variant="secondary" className="w-full">
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;