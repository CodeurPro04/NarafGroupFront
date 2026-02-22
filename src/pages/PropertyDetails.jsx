import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Share2, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Building2,
  Car,
  Layers,
  CheckCircle,
  Star,
  Eye,
  Clock,
  Home,
  DollarSign,
  Navigation,
  Maximize,
  Users,
  Shield,
  Award,
  Check
} from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const PropertyDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactNotice, setContactNotice] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchPropertyDetails();
    fetchRelatedProperties();
  }, [uuid]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/properties/${uuid}`);
      
      if (response.data.success) {
        setProperty(response.data.data);
      } else {
        setError('Propriété non trouvée');
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setError('Erreur lors du chargement de la propriété');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProperties = async () => {
    try {
      const response = await api.get('/properties', {
        params: { per_page: 4 }
      });
      
      if (response.data.success) {
        const propertiesData = response.data.data.data || response.data.data || [];
        setRelatedProperties(propertiesData.filter(p => p.uuid !== uuid).slice(0, 3));
      }
    } catch (error) {
      console.error('Erreur propriétés similaires:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactNotice({ type: '', message: '' });
    if (!property?.id && !property?.uuid) return;

    try {
      setIsSubmittingContact(true);
      const response = await api.post('/client-requests', {
        request_type: 'immobilier',
        property_id: property.id || null,
        property_uuid: property.uuid,
        name: contactForm.name,
        email: contactForm.email || null,
        phone: contactForm.phone || null,
        message: contactForm.message
      });
      
      if (response.data.success) {
        setContactNotice({
          type: 'success',
          message: 'Votre demande a ete envoyee avec succes.',
        });
        setContactForm((prev) => ({ ...prev, message: '' }));
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
      setContactNotice({
        type: 'error',
        message: error.response?.data?.message || "Erreur lors de l'envoi du message.",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    // TODO: Implémenter l'API des favoris
  };

  const formatPrice = (price) => {
    if (!price) return "Prix non spécifié";
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyImages = () => {
    if (!property) return [];
    
    const images = [];
    
    // Image principale
    if (property.primary_image?.file_path) {
      images.push(`http://localhost:8000/storage/${property.primary_image.file_path}`);
    }
    
    // Autres images
    if (property.media && property.media.length > 0) {
      property.media.forEach(media => {
        if (media.file_path) {
          images.push(`http://localhost:8000/storage/${media.file_path}`);
        }
      });
    }
    
    // Image par défaut si aucune image
    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80');
    }
    
    return images;
  };

  const nextImage = () => {
    const images = getPropertyImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getPropertyImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: property?.description?.substring(0, 100),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la propriété...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Bien non trouvé'}
          </h2>
          <p className="text-gray-600 mb-6">
            Le bien que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button 
            onClick={() => navigate('/properties')}
            variant="primary"
            className="w-full md:w-auto"
          >
            Retour aux biens
          </Button>
        </div>
      </div>
    );
  }

  const images = getPropertyImages();
  const formattedDate = property.created_at 
    ? format(new Date(property.created_at), 'dd MMMM yyyy', { locale: fr })
    : 'Non spécifiée';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
            <Home size={64} className="text-gray-300" />
          </div>
        )}
        
        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
              aria-label="Image précédente"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
              aria-label="Image suivante"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button
            onClick={toggleFavorite}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
          <button 
            onClick={shareProperty}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
            aria-label="Partager"
          >
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
            property.status === 'approved' 
              ? 'bg-green-500 text-white' 
              : property.status === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {property.status === 'approved' ? 'Disponible' : 
             property.status === 'pending' ? 'En attente' : 
             property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>

        {/* Transaction Type Badge */}
        <div className="absolute top-4 left-28 md:left-32">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
            property.transaction_type === 'vente'
              ? 'bg-blue-600 text-white'
              : 'bg-purple-600 text-white'
          }`}>
            {property.transaction_type === 'vente' ? 'À Vendre' : 'À Louer'}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={20} className="mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {property.address && `${property.address}, `}
                      {property.quartier && `${property.quartier}, `}
                      {property.commune && `${property.commune}, `}
                      {property.city}
                    </span>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200">
                    <div className="text-center group">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Bed className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                        <span className="text-2xl font-bold text-gray-900">
                          {property.bedrooms || 0}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">Chambres</div>
                    </div>
                    <div className="text-center group">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Bath className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                        <span className="text-2xl font-bold text-gray-900">
                          {property.bathrooms || 0}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">Salles de bain</div>
                    </div>
                    <div className="text-center group">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Maximize className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                        <span className="text-2xl font-bold text-gray-900">
                          {property.surface_area || 0}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">m² Surface</div>
                    </div>
                    <div className="text-center group">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Car className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                        <span className="text-2xl font-bold text-gray-900">
                          {property.parking_spaces || 0}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">Parkings</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:text-right">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                    {formatPrice(property.price)}
                  </div>
                  {property.transaction_type === 'location' && (
                    <div className="text-gray-600">/ mois</div>
                  )}
                  {property.price && property.surface_area && (
                    <div className="text-sm text-gray-500 mt-2">
                      ≈ {Math.round(property.price / property.surface_area).toLocaleString()} XOF/m²
                    </div>
                  )}
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle size={14} className="mr-1" />
                      {property.negotiable ? 'Prix négociable' : 'Prix ferme'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Description
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye size={16} />
                  <span>{property.views_count || 0} vues</span>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description || "Aucune description disponible."}
                </p>
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Caractéristiques
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <CheckCircle size={18} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations détaillées
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building2 className="text-gray-400" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Type de bien</div>
                      <div className="font-medium">{property.property_type?.name || 'Non spécifié'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Layers className="text-gray-400" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Étage</div>
                      <div className="font-medium">
                        {property.floor_number ? `Étage ${property.floor_number}` : 'Rez-de-chaussée'}
                        {property.total_floors && ` sur ${property.total_floors}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Année de construction</div>
                      <div className="font-medium">{property.year_built || 'Non spécifiée'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="text-gray-400" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Devise</div>
                      <div className="font-medium">{property.currency || 'XOF'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-gray-400" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Publié le</div>
                      <div className="font-medium">{formattedDate}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Property ID */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">Référence du bien</div>
                <div className="font-mono font-bold text-lg text-gray-900">{property.uuid}</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Intéressé par ce bien ?
                  </h3>
                  <p className="text-gray-600 text-sm">Contactez-nous rapidement</p>
                </div>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {contactNotice.message && (
                  <div
                    className={`rounded-lg px-4 py-3 text-sm ${
                      contactNotice.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {contactNotice.message}
                  </div>
                )}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder="Votre email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    placeholder="Votre téléphone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Votre message..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full py-3 font-semibold text-lg"
                  disabled={isSubmittingContact}
                >
                  <Mail size={20} className="mr-2 inline" />
                  {isSubmittingContact ? 'Envoi en cours...' : 'Envoyer la demande'}
                </Button>
              </form>

              {/* Contact Info */}
              <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Phone className="text-gray-600" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Service client</div>
                    <div className="font-medium">+225 XX XX XX XX XX</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Mail className="text-gray-600" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">contact@naraf-immo.ci</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Visit 
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Visitez ce bien</h3>
                  <p className="opacity-90 text-sm">Visite guidée avec expert</p>
                </div>
              </div>
              <p className="mb-6 opacity-90">
                Réservez une visite en personne ou virtuelle avec l'un de nos agents spécialisés.
              </p>
              <Button 
                variant="secondary" 
                className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                Prendre rendez-vous
              </Button>
            </div> */}

            {/* Agent Info 
            {property.agent && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Agent responsable
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {property.agent.name || 'Agent NARAF'}
                    </div>
                    <div className="text-gray-600 text-sm">Agent immobilier certifié</div>
                    <div className="flex items-center mt-2">
                      <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">4.8/5</span>
                    </div>
                  </div>
                </div>
              </div>
            )} */}

            {/* Security Badge 
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield size={24} />
                <h3 className="text-lg font-bold">Transaction sécurisée</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check size={14} className="mr-2" />
                  Garantie légale complète
                </li>
                <li className="flex items-center">
                  <Check size={14} className="mr-2" />
                  Vérification des documents
                </li>
                <li className="flex items-center">
                  <Check size={14} className="mr-2" />
                  Accompagnement personnalisé
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Propriétés similaires
              </h2>
              <Button 
                variant="outline"
                onClick={() => navigate('/properties')}
              >
                Voir tous les biens
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProp) => (
                <div 
                  key={relatedProp.uuid}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/property/${relatedProp.uuid}`)}
                >
                  <div className="relative h-48">
                    <img
                      src={relatedProp.primary_image?.file_path 
                        ? `http://localhost:8000/storage/${relatedProp.primary_image.file_path}`
                        : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'
                      }
                      alt={relatedProp.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        relatedProp.transaction_type === 'vente'
                          ? 'bg-blue-600 text-white'
                          : 'bg-purple-600 text-white'
                      }`}>
                        {relatedProp.transaction_type === 'vente' ? 'À Vendre' : 'À Louer'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                      {relatedProp.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin size={14} className="mr-1" />
                      <span className="truncate">{relatedProp.city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-blue-600">
                        {formatPrice(relatedProp.price)}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Bed size={14} />
                        <span>{relatedProp.bedrooms || 0}</span>
                        <Bath size={14} />
                        <span>{relatedProp.bathrooms || 0}</span>
                        <Maximize size={14} />
                        <span>{relatedProp.surface_area || 0}m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;


