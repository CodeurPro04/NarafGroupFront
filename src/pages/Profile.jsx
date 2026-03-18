import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Search,
  Hammer,
  FileText,
  Key,
  Send,
  AlertCircle,
  MapPin,
  CheckCircle,
  ExternalLink,
  Building2,
} from "lucide-react";
import { visitorService } from "../services/visitorService";
import { SkeletonBlock } from "../components/ui/Skeleton";
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
  const [propertyRequests, setPropertyRequests] = useState(emptyList);
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
  const [propertyRequestText, setPropertyRequestText] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [loading, setLoading] = useState({
    profile: true,
    messages: false,
    search: false,
    construction: false,
    property: false,
    action: false,
  });
  const [notice, setNotice] = useState({ type: "", message: "" });
  const isAuthenticated = useMemo(() => {
    const token = localStorage.getItem("auth_token");
    return Boolean(token);
  }, []);
  const role = profile?.role;
  const isOwner = role === "proprietaire";
  const isVisitor = role === "visiteur" || !role;
  const isPartner = role === "entreprise" || role === "partenaire";
  const isManager = role === "gestionnaire";
  const isAgent = role === "agent";
  const isAdmin = role === "admin" || role === "administrateur";
  const tabs = useMemo(() => {
    const baseTabs = [
      { id: "profil", label: "Profil", icon: <User size={18} /> },
      { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
    ];

    if (isVisitor) {
      baseTabs.push({
        id: "recherche",
        label: "Demandes",
        icon: <Search size={18} />,
      });
    }

    if (isOwner) {
      baseTabs.push({
        id: "proprietes",
        label: "Demande propriete",
        icon: <FileText size={18} />,
      });
    }

    baseTabs.push({
      id: "securite",
      label: "Securite",
      icon: <Key size={18} />,
    });

    return baseTabs;
  }, [isOwner, isVisitor]);
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
    if (!role) return;
    setLoading((prev) => ({ ...prev, messages: true }));
    try {
      const response = await visitorService.getMessagesByRole(role);
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
  const loadPropertyRequests = async () => {
    setLoading((prev) => ({ ...prev, property: true }));
    try {
      const response = await visitorService.getPropertyRequests();
      setPropertyRequests(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger les demandes.");
    } finally {
      setLoading((prev) => ({ ...prev, property: false }));
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
    if (!isAuthenticated || loading.profile) return;
    if (activeTab === "messages" && messages.length === 0) {
      loadMessages();
    }
    if (activeTab === "recherche" && searchRequests.length === 0) {
      loadSearchRequests();
    }
    if (activeTab === "construction" && constructionRequests.length === 0) {
      loadConstructionRequests();
    }
    if (
      activeTab === "proprietes" &&
      propertyRequests.length === 0 &&
      isOwner
    ) {
      loadPropertyRequests();
    }
  }, [activeTab, isAuthenticated, isOwner, loading.profile, role]);
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
        localStorage.setItem(
          "user",
          JSON.stringify({ ...(profile || {}), ...user }),
        );
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
  const submitPropertyRequest = async (event) => {
    event.preventDefault();
    if (!propertyRequestText.trim()) {
      showNotice("error", "Veuillez saisir votre demande.");
      return;
    }
    setLoading((prev) => ({ ...prev, action: true }));
    try {
      await visitorService.createPropertyRequest({
        description: propertyRequestText.trim(),
      });
      showNotice("success", "Demande envoyee.");
      setPropertyRequestText("");
      loadPropertyRequests();
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
      await visitorService.replyMessageByRole(role, messageUuid, {
        message: replyText,
      });
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
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 shadow-lg border border-gray-200 text-center">
          <div className="mx-auto w-14 h-14 bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
            <User />
          </div>
          <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-3">
            Acces securise
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Espace client NARAF
          </h1>
          <p className="text-gray-600 mb-6">
            Connecte-toi pour voir tes messages, suivre tes demandes et gerer
            ton profil.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 sm:px-8 py-3.5 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
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
        <div className="mb-8">
          <div className="relative overflow-hidden border border-gray-200 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-white shadow-lg">
            <div className="absolute inset-0 opacity-15">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 2px, transparent 2px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200 font-semibold mb-2">
                    Mon espace client
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    Profil & activites
                  </h1>
                  <p className="text-blue-100 mt-2 max-w-2xl">
                    Suis tes demandes, consulte tes messages et mets a jour ton
                    profil.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-white/10 border border-white/20 p-4 backdrop-blur">
                    <div className="text-xs text-blue-100">Statut</div>
                    <div className="text-lg font-semibold">
                      {profile?.is_active ? "Actif" : "En attente"}
                    </div>
                  </div>
                  <div className="bg-white/10 border border-white/20 p-4 backdrop-blur">
                    <div className="text-xs text-blue-100">Role</div>
                    <div className="text-lg font-semibold">
                      {profile?.role_name || "Visiteur"}
                    </div>
                  </div>
                  {profile?.partner_type && (
                    <div className="bg-white/10 border border-white/20 p-4 backdrop-blur">
                      <div className="text-xs text-blue-100">Type de partenaire</div>
                      <div className="text-lg font-semibold">
                        {profile.partner_type}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveTab("messages")}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-5 py-3 font-semibold hover:bg-blue-50 transition"
                >
                  <MessageSquare size={18} />
                  Messages
                </button>
                {isVisitor && (
                  <button
                    onClick={() => setActiveTab("recherche")}
                    className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/40 text-white px-5 py-3 font-semibold hover:bg-white/10 transition"
                  >
                    <Search size={18} />
                    Demandes
                  </button>
                )}
                {(isAgent || isAdmin) && profile?.is_active && (
                  <a
                    href="https://backoffice.africabuildinvest.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-3 font-semibold hover:bg-emerald-600 transition"
                  >
                    <ExternalLink size={18} />
                    Espace administrateur
                  </a>
                )}
                {isAgent && !profile?.is_active && (
                  <div className="inline-flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-5 py-3 font-medium">
                    <ExternalLink size={18} />
                    Espace administrateur disponible apres activation
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {notice.message && (
          <div
            className={`mb-6 border px-4 py-3 flex items-center gap-3 ${notice.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}
          >
            {" "}
            {notice.type === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}{" "}
            <span className="text-sm font-medium">{notice.message}</span>{" "}
          </div>
        )}{" "}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {" "}
          <div className="lg:col-span-1 space-y-4">
            {" "}
            <div className="bg-white border border-gray-200 shadow-lg p-6">
              {" "}
              {loading.profile ? (
                <div className="space-y-3">
                  {" "}
                  <SkeletonBlock className="h-16 w-16" />{" "}
                  <SkeletonBlock className="h-4 w-36" />{" "}
                  <SkeletonBlock className="h-3 w-24" />{" "}
                  <SkeletonBlock className="h-3 w-44" />{" "}
                  <SkeletonBlock className="h-3 w-32" />{" "}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
                      {(profile?.first_name?.charAt(0) || "V") +
                        (profile?.last_name?.charAt(0) || "")}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {profile?.first_name} {profile?.last_name}
                      </h2>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2 text-sm text-gray-600">
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
                    {profile?.partner_type && (
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-blue-500" />
                        <span>{profile.partner_type}</span>
                      </div>
                    )}
                  </div>
                </>
              )}{" "}
            </div>{" "}
            
            <div className="bg-white border border-gray-200 shadow-lg p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">
                Navigation
              </div>
              <div className="space-y-2">
                {" "}
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition border ${activeTab === tab.id ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"}`}
                  >
                    {" "}
                    {tab.icon} {tab.label}{" "}
                  </button>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="lg:col-span-3 space-y-6">
            {" "}
            {activeTab === "profil" && (
              <div className="bg-white border border-gray-200 shadow-lg p-6">
                {" "}
                <div className="flex items-center gap-3 mb-6">
                  {" "}
                  <User className="text-blue-600" />{" "}
                  <h3 className="text-xl font-semibold text-gray-900">
                    Informations personnelles
                  </h3>{" "}
                </div>{" "}
                <form
                  onSubmit={updateProfile}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      Prenom
                    </label>{" "}
                    <input
                      name="first_name"
                      value={profileForm.first_name}
                      onChange={handleProfileChange}
                      className="mt-2 w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      Nom
                    </label>{" "}
                    <input
                      name="last_name"
                      value={profileForm.last_name}
                      onChange={handleProfileChange}
                      className="mt-2 w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>{" "}
                    <input
                      value={profile?.email || ""}
                      disabled
                      className="mt-2 w-full border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      Telephone
                    </label>{" "}
                    <input
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="mt-2 w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />{" "}
                  </div>{" "}
                  <div className="md:col-span-2 flex justify-end">
                    {" "}
                    <button
                      type="submit"
                      disabled={loading.action}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                    >
                      {" "}
                      {loading.action ? "Mise a jour..." : "Enregistrer"}{" "}
                    </button>{" "}
                  </div>{" "}
                </form>{" "}
              </div>
            )}{" "}
            {activeTab === "messages" && (
              <div className="bg-white border border-gray-200 shadow-lg p-6">
                {" "}
                <div className="flex items-center gap-3 mb-6">
                  {" "}
                  <MessageSquare className="text-blue-600" />{" "}
                  <h3 className="text-xl font-semibold text-gray-900">
                    Messages
                  </h3>{" "}
                </div>{" "}
                {loading.messages ? (
                  <div className="space-y-4">
                    {" "}
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={`message-skeleton-${idx}`}
                        className="border border-gray-200 p-4 space-y-3"
                      >
                        {" "}
                        <SkeletonBlock className="h-4 w-32" />{" "}
                        <SkeletonBlock className="h-3 w-48" />{" "}
                        <SkeletonBlock className="h-20 w-full" />{" "}
                        <SkeletonBlock className="h-9 w-full" />{" "}
                      </div>
                    ))}{" "}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {" "}
                    Aucun message pour le moment.{" "}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {" "}
                    {messages.map((message) => (
                      <div
                        key={message.uuid}
                        className="border border-gray-200 p-4 space-y-3"
                      >
                        {" "}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          {" "}
                          <div>
                            {" "}
                            <p className="text-sm font-semibold text-gray-900">
                              {" "}
                              {message.subject || "Sans objet"}{" "}
                            </p>{" "}
                            <p className="text-xs text-gray-500">
                              {" "}
                              {message.sender?.full_name ||
                                "Service NARAF"}{" "}
                            </p>{" "}
                          </div>{" "}
                          <span className="text-xs text-gray-400">
                            {" "}
                            {message.created_at
                              ? new Date(
                                  message.created_at,
                                ).toLocaleDateString()
                              : ""}{" "}
                          </span>{" "}
                        </div>{" "}
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {" "}
                          {message.message}{" "}
                        </p>{" "}
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          {" "}
                          <input
                            value={replyDrafts[message.uuid] || ""}
                            onChange={(event) =>
                              setReplyDrafts((prev) => ({
                                ...prev,
                                [message.uuid]: event.target.value,
                              }))
                            }
                            className="flex-1 border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Ecrire une reponse..."
                          />{" "}
                          <button
                            onClick={() => submitReply(message.uuid)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm hover:bg-blue-700"
                          >
                            {" "}
                            <Send size={16} /> Repondre{" "}
                          </button>{" "}
                        </div>{" "}
                      </div>
                    ))}{" "}
                  </div>
                )}{" "}
              </div>
            )}{" "}
            {activeTab === "recherche" && (
              <div className="space-y-6">
                {" "}
                <div className="bg-white border border-gray-200 shadow-lg p-6">
                  {" "}
                  <div className="flex items-center gap-3 mb-6">
                    {" "}
                    <Search className="text-blue-600" />{" "}
                    <h3 className="text-xl font-semibold text-gray-900">
                      Nouvelle demande
                    </h3>{" "}
                  </div>{" "}
                  <form
                    onSubmit={submitSearchRequest}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Type de transaction
                      </label>{" "}
                      <select
                        name="transaction_type"
                        value={searchForm.transaction_type}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      >
                        {" "}
                        <option value="vente">Vente</option>{" "}
                        <option value="location">Location</option>{" "}
                      </select>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Type de bien
                      </label>{" "}
                      <select
                        name="property_type_id"
                        value={searchForm.property_type_id}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      >
                        {" "}
                        <option value="">Tous</option>{" "}
                        {propertyTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {" "}
                            {type.name}{" "}
                          </option>
                        ))}{" "}
                      </select>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Budget min
                      </label>{" "}
                      <input
                        name="budget_min"
                        value={searchForm.budget_min}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Budget max
                      </label>{" "}
                      <input
                        name="budget_max"
                        value={searchForm.budget_max}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Chambres min
                      </label>{" "}
                      <input
                        name="bedrooms_min"
                        value={searchForm.bedrooms_min}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Surface min
                      </label>{" "}
                      <input
                        name="surface_min"
                        value={searchForm.surface_min}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div className="md:col-span-2">
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        {" "}
                        Villes souhaitees (separees par des virgules){" "}
                      </label>{" "}
                      <input
                        name="location_preferences"
                        value={searchForm.location_preferences}
                        onChange={handleSearchFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                        placeholder="Abidjan, Cocody, Plateau"
                      />{" "}
                    </div>{" "}
                    <div className="md:col-span-2">
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        {" "}
                        Besoins supplementaires{" "}
                      </label>{" "}
                      <textarea
                        name="additional_requirements"
                        value={searchForm.additional_requirements}
                        onChange={handleSearchFormChange}
                        rows={3}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div className="md:col-span-2 flex justify-end">
                      {" "}
                      <button
                        type="submit"
                        disabled={loading.action}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                      >
                        {" "}
                        Envoyer la demande{" "}
                      </button>{" "}
                    </div>{" "}
                  </form>{" "}
                </div>{" "}
                <div className="bg-white border border-gray-200 shadow-lg p-6">
                  {" "}
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Historique des demandes
                  </h3>{" "}
                  {loading.search ? (
                    <div className="space-y-3">
                      {" "}
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                          key={`search-skeleton-${idx}`}
                          className="border border-gray-200 p-4 space-y-3"
                        >
                          {" "}
                          <SkeletonBlock className="h-4 w-32" />{" "}
                          <SkeletonBlock className="h-3 w-40" />{" "}
                          <SkeletonBlock className="h-3 w-28" />{" "}
                        </div>
                      ))}{" "}
                    </div>
                  ) : searchRequests.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      Aucune demande.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {" "}
                      {searchRequests.map((request) => (
                        <div
                          key={request.uuid || request.id}
                          className="border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                        >
                          {" "}
                          <div>
                            {" "}
                            <div className="text-sm font-semibold text-gray-900">
                              {" "}
                              {request.transaction_type || "Demande"}{" "}
                            </div>{" "}
                            <div className="text-xs text-gray-500">
                              {" "}
                              {request.property_type?.name || "Tous types"}{" "}
                            </div>{" "}
                          </div>{" "}
                          <div className="text-xs text-gray-500">
                            {" "}
                            Statut: {request.status || "pending"}{" "}
                          </div>{" "}
                        </div>
                      ))}{" "}
                    </div>
                  )}{" "}
                </div>{" "}
              </div>
            )}{" "}
            {activeTab === "construction" && (
              <div className="space-y-6">
                {" "}
                <div className="bg-white border border-gray-200 shadow-lg p-6">
                  {" "}
                  <div className="flex items-center gap-3 mb-6">
                    {" "}
                    <Hammer className="text-blue-600" />{" "}
                    <h3 className="text-xl font-semibold text-gray-900">
                      Demande de construction
                    </h3>{" "}
                  </div>{" "}
                  <form
                    onSubmit={submitConstructionRequest}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {" "}
                    <div className="md:col-span-2">
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Titre
                      </label>{" "}
                      <input
                        name="title"
                        value={constructionForm.title}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div className="md:col-span-2">
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Description
                      </label>{" "}
                      <textarea
                        name="description"
                        value={constructionForm.description}
                        onChange={handleConstructionFormChange}
                        rows={4}
                        required
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Budget min
                      </label>{" "}
                      <input
                        name="budget_min"
                        value={constructionForm.budget_min}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Budget max
                      </label>{" "}
                      <input
                        name="budget_max"
                        value={constructionForm.budget_max}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Surface
                      </label>{" "}
                      <input
                        name="surface_area"
                        value={constructionForm.surface_area}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Ville
                      </label>{" "}
                      <input
                        name="city"
                        value={constructionForm.city}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div className="md:col-span-2">
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        Localisation
                      </label>{" "}
                      <input
                        name="location"
                        value={constructionForm.location}
                        onChange={handleConstructionFormChange}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                      />{" "}
                    </div>{" "}
                    <div className="md:col-span-2 flex justify-end">
                      {" "}
                      <button
                        type="submit"
                        disabled={loading.action}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                      >
                        {" "}
                        Envoyer la demande{" "}
                      </button>{" "}
                    </div>{" "}
                  </form>{" "}
                </div>{" "}
                <div className="bg-white border border-gray-200 shadow-lg p-6">
                  {" "}
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Mes projets
                  </h3>{" "}
                  {loading.construction ? (
                    <div className="space-y-3">
                      {" "}
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                          key={`construction-skeleton-${idx}`}
                          className="border border-gray-200 p-4 space-y-3"
                        >
                          {" "}
                          <SkeletonBlock className="h-4 w-40" />{" "}
                          <SkeletonBlock className="h-3 w-32" />{" "}
                          <SkeletonBlock className="h-3 w-28" />{" "}
                        </div>
                      ))}{" "}
                    </div>
                  ) : constructionRequests.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      Aucun projet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {" "}
                      {constructionRequests.map((project) => (
                        <div
                          key={project.uuid || project.id}
                          className="border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                        >
                          {" "}
                          <div>
                            {" "}
                            <div className="text-sm font-semibold text-gray-900">
                              {" "}
                              {project.title || "Demande de construction"}{" "}
                            </div>{" "}
                            <div className="text-xs text-gray-500">
                              {" "}
                              {project.city || "Ville non renseignee"}{" "}
                            </div>{" "}
                          </div>{" "}
                          <div className="text-xs text-gray-500">
                            {" "}
                            Statut: {project.status || "submitted"}{" "}
                          </div>{" "}
                        </div>
                      ))}{" "}
                    </div>
                  )}{" "}
                </div>{" "}
              </div>
            )}{" "}
            {activeTab === "proprietes" && (
              <div className="space-y-6">
                {" "}
                <div className="bg-white border border-gray-200 shadow-lg p-6">
                  {" "}
                  <div className="flex items-center gap-3 mb-6">
                    {" "}
                    <FileText className="text-blue-600" />{" "}
                    <h3 className="text-xl font-semibold text-gray-900">
                      Demande de propriete
                    </h3>{" "}
                  </div>{" "}
                  <form onSubmit={submitPropertyRequest} className="space-y-4">
                    {" "}
                    <div>
                      {" "}
                      <label className="text-sm font-medium text-gray-700">
                        {" "}
                        Decrivez votre bien{" "}
                      </label>{" "}
                      <textarea
                        value={propertyRequestText}
                        onChange={(event) =>
                          setPropertyRequestText(event.target.value)
                        }
                        rows={5}
                        className="mt-2 w-full border border-gray-300 px-4 py-3"
                        placeholder="J'aimerais ajouter une maison de 4 pieces situee a..."
                        required
                      />{" "}
                    </div>{" "}
                    <div className="flex justify-end">
                      {" "}
                      <button
                        type="submit"
                        disabled={loading.action}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                      >
                        {" "}
                        Envoyer la demande{" "}
                      </button>{" "}
                    </div>{" "}
                  </form>{" "}
                </div>{" "}
                <div className="bg-white border border-gray-200 shadow-lg p-6">
                  {" "}
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Historique des demandes
                  </h3>{" "}
                  {loading.property ? (
                    <div className="text-center py-10 text-gray-500">
                      Chargement...
                    </div>
                  ) : propertyRequests.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      Aucune demande.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {" "}
                      {propertyRequests.map((request) => (
                        <div
                          key={request.uuid || request.id}
                          className="border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                        >
                          {" "}
                          <div>
                            {" "}
                            <div className="text-sm font-semibold text-gray-900">
                              Demande de propriete
                            </div>{" "}
                            <div className="text-xs text-gray-500">
                              {" "}
                              {request.description?.slice(0, 120)}{" "}
                            </div>{" "}
                          </div>{" "}
                          <div className="text-xs text-gray-500">
                            {" "}
                            Statut: {request.status || "pending"}{" "}
                          </div>{" "}
                        </div>
                      ))}{" "}
                    </div>
                  )}{" "}
                </div>{" "}
              </div>
            )}{" "}
            {activeTab === "securite" && (
              <div className="bg-white border border-gray-200 shadow-lg p-6">
                {" "}
                <div className="flex items-center gap-3 mb-6">
                  {" "}
                  <Key className="text-blue-600" />{" "}
                  <h3 className="text-xl font-semibold text-gray-900">
                    Changer le mot de passe
                  </h3>{" "}
                </div>{" "}
                <form onSubmit={updatePassword} className="space-y-4 max-w-lg">
                  {" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      Mot de passe actuel
                    </label>{" "}
                    <input
                      type="password"
                      name="current_password"
                      value={passwordForm.current_password}
                      onChange={handlePasswordChange}
                      className="mt-2 w-full border border-gray-300 px-4 py-3"
                      required
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      Nouveau mot de passe
                    </label>{" "}
                    <input
                      type="password"
                      name="new_password"
                      value={passwordForm.new_password}
                      onChange={handlePasswordChange}
                      className="mt-2 w-full border border-gray-300 px-4 py-3"
                      required
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      {" "}
                      Confirmer le nouveau mot de passe{" "}
                    </label>{" "}
                    <input
                      type="password"
                      name="new_password_confirmation"
                      value={passwordForm.new_password_confirmation}
                      onChange={handlePasswordChange}
                      className="mt-2 w-full border border-gray-300 px-4 py-3"
                      required
                    />{" "}
                  </div>{" "}
                  <button
                    type="submit"
                    disabled={loading.action}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                  >
                    {" "}
                    Mettre a jour{" "}
                  </button>{" "}
                </form>{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ProfilePage;
