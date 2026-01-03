// src/data/properties.js
export const properties = [
  {
    id: 1,
    title: "Appartement moderne avec vue panoramique",
    location: "16e arrondissement, Paris",
    price: 1250000,
    type: "vente",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "il y a 2 jours",
    isNew: true,
    description: "Magnifique appartement entièrement rénové avec vue exceptionnelle sur Paris. Lumineux, calme et proche de tous les commerces.",
    features: ["Vue panoramique", "Balcon", "Cuisine équipée", "Parking", "Ascenseur"]
  },
  {
    id: 2,
    title: "Villa contemporaine avec piscine",
    location: "Saint-Cloud, Île-de-France",
    price: 2850000,
    type: "vente",
    bedrooms: 5,
    bathrooms: 4,
    area: 220,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "il y a 1 semaine",
    isNew: false,
    description: "Superbe villa contemporaine avec piscine chauffée et jardin arboré. Prestige et standing dans un quartier résidentiel calme.",
    features: ["Piscine", "Jardin 1000m²", "Double garage", "Buanderie", "Alarme"]
  },
  {
    id: 3,
    title: "Duplex lumineux proche Tour Eiffel",
    location: "7e arrondissement, Paris",
    price: 3500,
    type: "location",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "il y a 3 jours",
    isNew: true,
    description: "Duplex exceptionnel entièrement meublé à deux pas de la Tour Eiffel. Idéal pour cadre supérieur ou famille.",
    features: ["Meublé", "Terrasse", "Cave", "Interphone", "Fibre optique"]
  },
  {
    id: 4,
    title: "Loft industriel dans Marais",
    location: "Marais, Paris",
    price: 1950000,
    type: "vente",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "il y a 5 jours",
    isNew: true,
    description: "Authentique loft industriel avec hauteur sous plafond exceptionnelle. Caractère et modernité dans le cœur historique.",
    features: ["Hauteur sous plafond 4m", "Cuisine ouverte", "Double exposition", "Cheminée", "Sécurisé"]
  },
  {
    id: 5,
    title: "Appartement familial avec terrasse",
    location: "Neuilly-sur-Seine",
    price: 2700,
    type: "location",
    bedrooms: 4,
    bathrooms: 2,
    area: 110,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "il y a 2 semaines",
    isNew: false,
    description: "Grand appartement familial avec grande terrasse et jardin. Quartier calme proche des écoles et commerces.",
    features: ["Grande terrasse", "Cave", "Parking", "Proche écoles", "Calme"]
  },
  {
    id: 6,
    title: "Penthouse avec rooftop",
    location: "La Défense, Courbevoie",
    price: 4500000,
    type: "vente",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "il y a 1 mois",
    isNew: false,
    description: "Exceptionnel penthouse avec rooftop privatif offrant une vue à 360° sur Paris. Luxe et exclusivité.",
    features: ["Rooftop", "Jacuzzi", "Ascenseur privatif", "Domotique", "Conciergerie"]
  }
];

export const constructionProjects = [
  {
    id: 1,
    title: "Résidence Les Jardins du Parc",
    location: "Versailles",
    type: "résidentiel",
    units: 24,
    completion: "2025",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Smart Office Tower",
    location: "La Défense",
    type: "bureaux",
    units: 15,
    completion: "2026",
    image: "https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export const investmentProjects = [
  {
    id: 1,
    title: "Fonds Immobilier Résidentiel",
    type: "SCPI",
    roi: "4.5%",
    duration: "7 ans",
    minInvestment: 10000
  },
  {
    id: 2,
    title: "Parking d'affaires",
    type: "Direct",
    roi: "7.2%",
    duration: "5 ans",
    minInvestment: 50000
  }
];