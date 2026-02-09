import { Filter, X } from "lucide-react";
import { useState } from "react";
const PropertyFilter = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    area: "",
    location: "",
  });
  const propertyTypes = [
    { value: "", label: "Tous les types" },
    { value: "appartement", label: "Appartement" },
    { value: "maison", label: "Maison" },
    { value: "villa", label: "Villa" },
    { value: "terrain", label: "Terrain" },
    { value: "bureau", label: "Bureau" },
  ];
  const priceRanges = [
    { value: "", label: "Tous les prix" },
    { value: "0-100000", label: "Jusqu'à 100 000€" },
    { value: "100000-300000", label: "100 000€ - 300 000€" },
    { value: "300000-500000", label: "300 000€ - 500 000€" },
    { value: "500000-1000000", label: "500 000€ - 1 000 000€" },
    { value: "1000000+", label: "Plus de 1 000 000€" },
  ];
  const bedroomOptions = [
    { value: "", label: "Tous" },
    { value: "1", label: "1 chambre" },
    { value: "2", label: "2 chambres" },
    { value: "3", label: "3 chambres" },
    { value: "4+", label: "4+ chambres" },
  ];
  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const handleReset = () => {
    const resetFilters = {
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      area: "",
      location: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  return (
    <div className="bg-white shadow-lg p-6 mb-8">
      {" "}
      <div className="flex items-center justify-between mb-6">
        {" "}
        <div className="flex items-center space-x-3">
          {" "}
          <Filter className="text-blue-600" size={24} />{" "}
          <h3 className="text-xl font-semibold text-gray-900">
            Filtres avancés
          </h3>{" "}
        </div>{" "}
        <div className="flex items-center space-x-4">
          {" "}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {" "}
            {isExpanded ? "Réduire" : "Étendre"}{" "}
          </button>{" "}
          <button
            onClick={handleReset}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
          >
            {" "}
            <X size={16} /> <span>Réinitialiser</span>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* Basic Filters */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {" "}
            Type de bien{" "}
          </label>{" "}
          <select
            value={filters.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="form-input"
          >
            {" "}
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {" "}
                {type.label}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {" "}
            Budget{" "}
          </label>{" "}
          <select
            value={filters.priceRange}
            onChange={(e) => handleChange("priceRange", e.target.value)}
            className="form-input"
          >
            {" "}
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {" "}
                {range.label}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {" "}
            Localisation{" "}
          </label>{" "}
          <input
            type="text"
            placeholder="Ville, quartier..."
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="form-input"
          />{" "}
        </div>{" "}
      </div>{" "}
      {/* Expanded Filters */}{" "}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-6">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Nombre de chambres{" "}
              </label>{" "}
              <select
                value={filters.bedrooms}
                onChange={(e) => handleChange("bedrooms", e.target.value)}
                className="form-input"
              >
                {" "}
                {bedroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {" "}
                    {option.label}{" "}
                  </option>
                ))}{" "}
              </select>{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Surface minimale (m²){" "}
              </label>{" "}
              <input
                type="number"
                placeholder="50"
                value={filters.area}
                onChange={(e) => handleChange("area", e.target.value)}
                className="form-input"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Prix minimum (€){" "}
              </label>{" "}
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleChange("minPrice", e.target.value)}
                className="form-input"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Prix maximum (€){" "}
              </label>{" "}
              <input
                type="number"
                placeholder="1000000"
                value={filters.maxPrice}
                onChange={(e) => handleChange("maxPrice", e.target.value)}
                className="form-input"
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* Additional Filters */}{" "}
          <div className="mt-6 pt-6 border-t border-gray-200">
            {" "}
            <h4 className="font-medium text-gray-900 mb-4">
              Caractéristiques supplémentaires
            </h4>{" "}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {" "}
              <label className="flex items-center space-x-3">
                {" "}
                <input type="checkbox" className="text-blue-600" />{" "}
                <span className="text-gray-700">Balcon</span>{" "}
              </label>{" "}
              <label className="flex items-center space-x-3">
                {" "}
                <input type="checkbox" className="text-blue-600" />{" "}
                <span className="text-gray-700">Terrasse</span>{" "}
              </label>{" "}
              <label className="flex items-center space-x-3">
                {" "}
                <input type="checkbox" className="text-blue-600" />{" "}
                <span className="text-gray-700">Jardin</span>{" "}
              </label>{" "}
              <label className="flex items-center space-x-3">
                {" "}
                <input type="checkbox" className="text-blue-600" />{" "}
                <span className="text-gray-700">Parking</span>{" "}
              </label>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {/* Active Filters */}{" "}
      {(filters.type || filters.location || filters.bedrooms) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          {" "}
          <div className="flex items-center space-x-2 mb-2">
            {" "}
            <span className="text-sm font-medium text-gray-700">
              Filtres actifs :
            </span>{" "}
          </div>{" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {filters.type && (
              <span className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800">
                {" "}
                {
                  propertyTypes.find((t) => t.value === filters.type)?.label
                }{" "}
                <button
                  onClick={() => handleChange("type", "")}
                  className="ml-2 hover:text-blue-600"
                >
                  {" "}
                  ×{" "}
                </button>{" "}
              </span>
            )}{" "}
            {filters.location && (
              <span className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-800">
                {" "}
                {filters.location}{" "}
                <button
                  onClick={() => handleChange("location", "")}
                  className="ml-2 hover:text-green-600"
                >
                  {" "}
                  ×{" "}
                </button>{" "}
              </span>
            )}{" "}
            {filters.bedrooms && (
              <span className="inline-flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-800">
                {" "}
                {filters.bedrooms} chambres{" "}
                <button
                  onClick={() => handleChange("bedrooms", "")}
                  className="ml-2 hover:text-purple-600"
                >
                  {" "}
                  ×{" "}
                </button>{" "}
              </span>
            )}{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default PropertyFilter;
