// src/components/property/PropertyCard.jsx
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="property-card bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`badge ${property.type === 'vente' ? 'badge-sale' : 'badge-rent'}`}>
            {property.type === 'vente' ? 'À Vendre' : 'À Louer'}
          </span>
          {property.isNew && (
            <span className="badge badge-new">Nouveau</span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
            <div className="text-lg font-bold">{formatPrice(property.price)}</div>
            {property.type === 'location' && (
              <div className="text-xs opacity-80">/ mois</div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
          <div className="flex items-center space-x-2">
            <Bed size={18} className="text-gray-400" />
            <div>
              <div className="font-semibold">{property.bedrooms}</div>
              <div className="text-xs text-gray-500">Chambres</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Bath size={18} className="text-gray-400" />
            <div>
              <div className="font-semibold">{property.bathrooms}</div>
              <div className="text-xs text-gray-500">Salles de bain</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Square size={18} className="text-gray-400" />
            <div>
              <div className="font-semibold">{property.area}</div>
              <div className="text-xs text-gray-500">m²</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Publié {property.date}
          </div>
          <Link
            to={`/property/${property.id}`}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-1"
          >
            <span>Voir les détails</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;