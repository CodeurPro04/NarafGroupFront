import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Edit2, 
  Save, 
  X, 
  Home, 
  Briefcase, 
  Shield,
  Building,
  TrendingUp
} from "lucide-react";

const ProfilePage = () => {
  // Simuler récupération user depuis localStorage
  const [user, setUser] = useState(null);

  // États pour formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
    company: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Icônes selon le rôle
  const roleIcons = {
    "Client": <User className="w-5 h-5" />,
    "Propriétaire": <Home className="w-5 h-5" />,
    "Agent immobilier": <Briefcase className="w-5 h-5" />,
    "Investisseur": <TrendingUp className="w-5 h-5" />,
    "Entreprise de partenariat": <Building className="w-5 h-5" />,
    "Administrateur": <Shield className="w-5 h-5" />,
    "Gestionnaire": <Briefcase className="w-5 h-5" />
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      id: 1,
      first_name: "Jean",
      last_name: "Dupont",
      email: "jean.dupont@email.com",
      phone: "+33 6 12 34 56 78",
      bio: "Propriétaire investisseur dans l'immobilier résidentiel depuis 10 ans.",
      role: "Propriétaire",
      role_name: "Propriétaire",
      address: "123 Avenue des Champs-Élysées, 75008 Paris",
      company: "Immobilière Dupont & Cie",
      member_since: "2023-01-15",
      stats: {
        properties_listed: 12,
        active_listings: 3,
        total_messages: 47
      }
    };

    setUser(storedUser);
    setFormData({
      firstName: storedUser.first_name || "",
      lastName: storedUser.last_name || "",
      email: storedUser.email || "",
      phone: storedUser.phone || "",
      bio: storedUser.bio || "",
      address: storedUser.address || "",
      company: storedUser.company || ""
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      address: formData.address,
      company: formData.company
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
    
    setSuccessMsg("Modifications enregistrées avec succès");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-2">Gérez vos informations personnelles et vos préférences</p>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMsg}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
                      {`${user.first_name?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`.toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{`${user.first_name} ${user.last_name}`}</h2>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                          {roleIcons[user.role_name || user.role]}
                          <span className="ml-2">{user.role_name || user.role}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{user.phone}</span>
                  </div>
                  {user.company && (
                    <div className="flex items-center text-gray-600">
                      <Building className="w-5 h-5 mr-3 text-blue-500" />
                      <span>{user.company}</span>
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-start text-gray-600">
                      <Home className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                      <span className="text-sm">{user.address}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    À propos
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {user.bio || "Aucune description fournie."}
                  </p>
                </div>

                {/* Stats */}
                {(user.role === "Propriétaire" || user.role === "Agent immobilier") && user.stats && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                      Activité
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.stats.properties_listed || 0}</div>
                        <div className="text-xs text-gray-500 mt-1">Biens publiés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.stats.active_listings || 0}</div>
                        <div className="text-xs text-gray-500 mt-1">Annonces actives</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.stats.total_messages || 0}</div>
                        <div className="text-xs text-gray-500 mt-1">Messages</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Member Since */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Membre depuis le {user.member_since ? new Date(user.member_since).toLocaleDateString('fr-FR') : '---'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informations personnelles
                  </h3>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Modifier
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <button
                        type="submit"
                        form="profile-form"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setFormData({
                            firstName: user.first_name || "",
                            lastName: user.last_name || "",
                            email: user.email || "",
                            phone: user.phone || "",
                            bio: user.bio || "",
                            address: user.address || "",
                            company: user.company || ""
                          });
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <form id="profile-form" onSubmit={handleSave} className="p-6">
                <div className="space-y-6">
                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        disabled={!editMode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          editMode 
                            ? "border-gray-300 bg-white" 
                            : "border-gray-200 bg-gray-50 text-gray-500"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        disabled={!editMode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          editMode 
                            ? "border-gray-300 bg-white" 
                            : "border-gray-200 bg-gray-50 text-gray-500"
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={!editMode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          editMode 
                            ? "border-gray-300 bg-white" 
                            : "border-gray-200 bg-gray-50 text-gray-500"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        disabled={!editMode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          editMode 
                            ? "border-gray-300 bg-white" 
                            : "border-gray-200 bg-gray-50 text-gray-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Entreprise */}
                  {(user.role === "Agent immobilier" || user.role === "Entreprise de partenariat") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Société / Agence
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        disabled={!editMode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          editMode 
                            ? "border-gray-300 bg-white" 
                            : "border-gray-200 bg-gray-50 text-gray-500"
                        }`}
                      />
                    </div>
                  )}

                  {/* Adresse */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                        editMode 
                          ? "border-gray-300 bg-white" 
                          : "border-gray-200 bg-gray-50 text-gray-500"
                      }`}
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description personnelle / Biographie
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      disabled={!editMode}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
                        editMode 
                          ? "border-gray-300 bg-white" 
                          : "border-gray-200 bg-gray-50 text-gray-500"
                      }`}
                      placeholder="Décrivez-vous, vos expériences, spécialités immobilières..."
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Additional Info for Professionals */}
            {(user.role === "Agent immobilier" || user.role === "Propriétaire") && (
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Pour les professionnels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition text-left">
                    <div className="text-blue-600 font-semibold mb-1">Mes Annonces</div>
                    <div className="text-sm text-gray-600">Consulter et gérer vos publications</div>
                  </button>
                  <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition text-left">
                    <div className="text-blue-600 font-semibold mb-1">Messages</div>
                    <div className="text-sm text-gray-600">Voir vos conversations</div>
                  </button>
                  <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition text-left">
                    <div className="text-blue-600 font-semibold mb-1">Statistiques</div>
                    <div className="text-sm text-gray-600">Analyser votre activité</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;