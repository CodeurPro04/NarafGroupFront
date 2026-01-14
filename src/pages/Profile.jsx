import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Search,
  Hammer,
  Key,
  Send,
  Loader2,
  AlertCircle,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { visitorService } from "../services/visitorService";

const emptyList = [];

const parseNumber = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profil");
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [messages, setMessages] = useState(emptyList);
  const [searchRequests, setSearchRequests] = useState(emptyList);
  const [constructionRequests, setConstructionRequests] = useState(emptyList);
  const [propertyTypes, setPropertyTypes] = useState(emptyList);
  const [searchForm, setSearchForm] = useState({
    transaction_type: "vente",
    property_type_id: "",
    budget_min: "",
    budget_max: "",
    location_preferences: "",
    bedrooms_min: "",
    surface_min: "",
    additional_requirements: "",
  });
  const [constructionForm, setConstructionForm] = useState({
    title: "",
    description: "",
    budget_min: "",
    budget_max: "",
    surface_area: "",
    location: "",
    city: "",
  });
  const [replyDrafts, setReplyDrafts] = useState({});
  const [loading, setLoading] = useState({
    profile: true,
    messages: false,
    search: false,
    construction: false,
    action: false,
  });
  const [notice, setNotice] = useState({ type: "", message: "" });

  const isAuthenticated = useMemo(() => {
    const token = localStorage.getItem("auth_token");
    return Boolean(token);
  }, []);

  const tabs = [
    { id: "profil", label: "Profil", icon: <User size={18} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
    { id: "recherche", label: "Demandes", icon: <Search size={18} /> },
    { id: "construction", label: "Construction", icon: <Hammer size={18} /> },
    { id: "securite", label: "Securite", icon: <Key size={18} /> },
  ];

  const showNotice = (type, message) => {
    setNotice({ type, message });
    setTimeout(() => setNotice({ type: "", message: "" }), 4000);
  };

  const loadProfile = async () => {
    setLoading((prev) => ({ ...prev, profile: true }));
    try {
      const response = await visitorService.getProfile();
      const user = response?.data?.data?.user;
      setProfile(user || null);
      if (user) {
        setProfileForm({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          phone: user.phone || "",
        });
      }
    } catch (error) {
      showNotice("error", "Impossible de charger le profil.");
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  const loadMessages = async () => {
    setLoading((prev) => ({ ...prev, messages: true }));
    try {
      const response = await visitorService.getMessages();
      setMessages(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger les messages.");
    } finally {
      setLoading((prev) => ({ ...prev, messages: false }));
    }
  };

  const loadSearchRequests = async () => {
    setLoading((prev) => ({ ...prev, search: true }));
    try {
      const response = await visitorService.getSearchRequests();
      setSearchRequests(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger les demandes.");
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };

  const loadConstructionRequests = async () => {
    setLoading((prev) => ({ ...prev, construction: true }));
    try {
      const response = await visitorService.getConstructionRequests();
      setConstructionRequests(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger les projets.");
    } finally {
      setLoading((prev) => ({ ...prev, construction: false }));
    }
  };

  const loadPropertyTypes = async () => {
    try {
      const response = await visitorService.getPropertyTypes();
      const list = response?.data?.data || response?.data || [];
      setPropertyTypes(Array.isArray(list) ? list : emptyList);
    } catch (error) {
      setPropertyTypes(emptyList);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    loadProfile();
    loadPropertyTypes();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === "messages" && messages.length === 0) {
      loadMessages();
    }
    if (activeTab === "recherche" && searchRequests.length === 0) {
      loadSearchRequests();
    }
    if (activeTab === "construction" && constructionRequests.length === 0) {
      loadConstructionRequests();
    }
  }, [activeTab, isAuthenticated]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchFormChange = (event) => {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConstructionFormChange = (event) => {
    const { name, value } = event.target;
    setConstructionForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    setLoading((prev) => ({ ...prev, action: true }));
    try {
      const response = await visitorService.updateProfile(profileForm);
      const user = response?.data?.data?.user;
      if (user) {
        setProfile((prev) => ({ ...prev, ...user }));
        localStorage.setItem("user", JSON.stringify({ ...(profile || {}), ...user }));
      }
      showNotice("success", "Profil mis a jour.");
    } catch (error) {
      showNotice("error", "Mise a jour impossible.");
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    setLoading((prev) => ({ ...prev, action: true }));
    try {
      await visitorService.changePassword(passwordForm);
      showNotice("success", "Mot de passe modifie.");
      setPasswordForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      showNotice("error", "Erreur lors du changement de mot de passe.");
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const submitSearchRequest = async (event) => {
    event.preventDefault();
    setLoading((prev) => ({ ...prev, action: true }));
    const payload = {
      transaction_type: searchForm.transaction_type,
      property_type_id: searchForm.property_type_id
        ? Number(searchForm.property_type_id)
        : null,
      budget_min: parseNumber(searchForm.budget_min),
      budget_max: parseNumber(searchForm.budget_max),
      location_preferences: searchForm.location_preferences
        ? searchForm.location_preferences
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      bedrooms_min: parseNumber(searchForm.bedrooms_min),
      surface_min: parseNumber(searchForm.surface_min),
      additional_requirements: searchForm.additional_requirements || null,
    };

    try {
      await visitorService.createSearchRequest(payload);
      showNotice("success", "Demande envoyee.");
      setSearchForm({
        transaction_type: "vente",
        property_type_id: "",
        budget_min: "",
        budget_max: "",
        location_preferences: "",
        bedrooms_min: "",
        surface_min: "",
        additional_requirements: "",
      });
      loadSearchRequests();
    } catch (error) {
      showNotice("error", "Erreur lors de la demande.");
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const submitConstructionRequest = async (event) => {
    event.preventDefault();
    setLoading((prev) => ({ ...prev, action: true }));
    const payload = {
      title: constructionForm.title || null,
      description: constructionForm.description,
      budget_min: parseNumber(constructionForm.budget_min),
      budget_max: parseNumber(constructionForm.budget_max),
      surface_area: parseNumber(constructionForm.surface_area),
      location: constructionForm.location || null,
      city: constructionForm.city || null,
    };

    try {
      await visitorService.createConstructionRequest(payload);
      showNotice("success", "Demande envoyee.");
      setConstructionForm({
        title: "",
        description: "",
        budget_min: "",
        budget_max: "",
        surface_area: "",
        location: "",
        city: "",
      });
      loadConstructionRequests();
    } catch (error) {
      showNotice("error", "Erreur lors de la demande.");
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const submitReply = async (messageUuid) => {
    const replyText = replyDrafts[messageUuid];
    if (!replyText) return;

    setLoading((prev) => ({ ...prev, action: true }));
    try {
      await visitorService.replyMessage(messageUuid, { message: replyText });
      setReplyDrafts((prev) => ({ ...prev, [messageUuid]: "" }));
      showNotice("success", "Reponse envoyee.");
      loadMessages();
    } catch (error) {
      showNotice("error", "Erreur lors de la reponse.");
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
            <User />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Espace visiteur</h1>
          <p className="text-gray-600 mb-6">
            Connecte-toi pour voir tes messages et gerer tes demandes.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Mon espace visiteur</h1>
          <p className="text-gray-600">
            Suis tes demandes, consulte tes messages et mets a jour ton profil.
          </p>
        </div>

        {notice.message && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 flex items-center gap-3 ${
              notice.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {notice.type === "error" ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            <span className="text-sm font-medium">{notice.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              {loading.profile ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="animate-spin text-blue-600" />
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold mb-4">
                    {(profile?.first_name?.charAt(0) || "V") +
                      (profile?.last_name?.charAt(0) || "")}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {profile?.first_name} {profile?.last_name}
                  </h2>
                  <p className="text-sm text-gray-500">{profile?.role_name || "Visiteur"}</p>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-500" />
                      <span className="truncate">{profile?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-blue-500" />
                      <span>{profile?.phone || "Non renseigne"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-500" />
                      <span>Profil en ligne</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="text-gray-500">Messages</div>
                  <div className="text-xl font-semibold text-blue-600">{messages.length}</div>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <div className="text-gray-500">Demandes</div>
                  <div className="text-xl font-semibold text-amber-600">{searchRequests.length}</div>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <div className="text-gray-500">Construction</div>
                  <div className="text-xl font-semibold text-emerald-600">
                    {constructionRequests.length}
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-gray-500">Statut</div>
                  <div className="text-sm font-semibold text-slate-700">Actif</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {activeTab === "profil" && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Informations personnelles</h3>
                </div>
                <form onSubmit={updateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Prenom</label>
                    <input
                      name="first_name"
                      value={profileForm.first_name}
                      onChange={handleProfileChange}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom</label>
                    <input
                      name="last_name"
                      value={profileForm.last_name}
                      onChange={handleProfileChange}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      value={profile?.email || ""}
                      disabled
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Telephone</label>
                    <input
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading.action}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                    >
                      {loading.action ? "Mise a jour..." : "Enregistrer"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Messages</h3>
                </div>
                {loading.messages ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="animate-spin text-blue-600" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    Aucun message pour le moment.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.uuid}
                        className="border border-gray-200 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {message.subject || "Sans objet"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {message.sender?.full_name || "Service NARAF"}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {message.created_at
                              ? new Date(message.created_at).toLocaleDateString()
                              : ""}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {message.message}
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <input
                            value={replyDrafts[message.uuid] || ""}
                            onChange={(event) =>
                              setReplyDrafts((prev) => ({
                                ...prev,
                                [message.uuid]: event.target.value,
                              }))
                            }
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Ecrire une reponse..."
                          />
                          <button
                            onClick={() => submitReply(message.uuid)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                          >
                            <Send size={16} />
                            Repondre
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "recherche" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Nouvelle demande</h3>
                  </div>
                  <form onSubmit={submitSearchRequest} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Type de transaction</label>
                      <select
                        name="transaction_type"
                        value={searchForm.transaction_type}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      >
                        <option value="vente">Vente</option>
                        <option value="location">Location</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Type de bien</label>
                      <select
                        name="property_type_id"
                        value={searchForm.property_type_id}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      >
                        <option value="">Tous</option>
                        {propertyTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget min</label>
                      <input
                        name="budget_min"
                        value={searchForm.budget_min}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget max</label>
                      <input
                        name="budget_max"
                        value={searchForm.budget_max}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Chambres min</label>
                      <input
                        name="bedrooms_min"
                        value={searchForm.bedrooms_min}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Surface min</label>
                      <input
                        name="surface_min"
                        value={searchForm.surface_min}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Villes souhaitees (separees par des virgules)
                      </label>
                      <input
                        name="location_preferences"
                        value={searchForm.location_preferences}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                        placeholder="Abidjan, Cocody, Plateau"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Besoins supplementaires
                      </label>
                      <textarea
                        name="additional_requirements"
                        value={searchForm.additional_requirements}
                        onChange={handleSearchFormChange}
                        rows={3}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading.action}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                      >
                        Envoyer la demande
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des demandes</h3>
                  {loading.search ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="animate-spin text-blue-600" />
                    </div>
                  ) : searchRequests.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">Aucune demande.</div>
                  ) : (
                    <div className="space-y-3">
                      {searchRequests.map((request) => (
                        <div
                          key={request.uuid || request.id}
                          className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                        >
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {request.transaction_type || "Demande"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {request.property_type?.name || "Tous types"}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Statut: {request.status || "pending"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "construction" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Hammer className="text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Demande de construction</h3>
                  </div>
                  <form
                    onSubmit={submitConstructionRequest}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Titre</label>
                      <input
                        name="title"
                        value={constructionForm.title}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={constructionForm.description}
                        onChange={handleConstructionFormChange}
                        rows={4}
                        required
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget min</label>
                      <input
                        name="budget_min"
                        value={constructionForm.budget_min}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget max</label>
                      <input
                        name="budget_max"
                        value={constructionForm.budget_max}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Surface</label>
                      <input
                        name="surface_area"
                        value={constructionForm.surface_area}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Ville</label>
                      <input
                        name="city"
                        value={constructionForm.city}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Localisation</label>
                      <input
                        name="location"
                        value={constructionForm.location}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading.action}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                      >
                        Envoyer la demande
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes projets</h3>
                  {loading.construction ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="animate-spin text-blue-600" />
                    </div>
                  ) : constructionRequests.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">Aucun projet.</div>
                  ) : (
                    <div className="space-y-3">
                      {constructionRequests.map((project) => (
                        <div
                          key={project.uuid || project.id}
                          className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                        >
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {project.title || "Demande de construction"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {project.city || "Ville non renseignee"}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Statut: {project.status || "submitted"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "securite" && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Key className="text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Changer le mot de passe</h3>
                </div>
                <form onSubmit={updatePassword} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="current_password"
                      value={passwordForm.current_password}
                      onChange={handlePasswordChange}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="new_password"
                      value={passwordForm.new_password}
                      onChange={handlePasswordChange}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      name="new_password_confirmation"
                      value={passwordForm.new_password_confirmation}
                      onChange={handlePasswordChange}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading.action}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                  >
                    Mettre a jour
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
