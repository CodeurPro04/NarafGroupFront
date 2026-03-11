import PropertyCard from "./PropertyCard";
import EmptyState from "../ui/EmptyState";

const PropertyList = ({ properties, title, subtitle }) => {
  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        title="Aucun bien disponible pour le moment."
        className="py-12"
      />
    );
  }

  return (
    <div className="py-12">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mx-auto max-w-2xl text-gray-600">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties.length > 6 && (
        <div className="mt-12 text-center">
          <button className="btn-secondary px-8">Voir tous les biens</button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
