import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, title, subtitle }) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">Aucun bien disponible pour le moment</div>
        <p className="text-gray-600">Revenez plus tard pour découvrir nos nouvelles offres</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* View All */}
      {properties.length > 6 && (
        <div className="text-center mt-12">
          <button className="btn-secondary px-8">
            Voir tous les biens
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;