import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  MapPin,
  CheckCircle,
  ExternalLink,
  Building2,
  TrendingUp,
  Home,
  Plus,
  ArrowLeft,
  Check,
  CheckCheck,
  Loader2 } from
"lucide-react";
import { visitorService } from "../services/visitorService";
import { SkeletonBlock } from "../components/ui/Skeleton";
import PartnerProductsManager from "../components/partner/PartnerProductsManager";
import InvestorDashboard from "../components/investor/InvestorDashboard";
import { toMediaUrl } from "../utils/media";
import { useToast } from "../components/ui/Toast";
const emptyList = [];
const AGENT_TYPE_LABELS = {
  constructeur: "Agent Construction",
  immobilier: "Agent Immobilier",
  investissement: "Agent Investissement"
};
const AGENT_TYPE_COLORS = {
  constructeur: "bg-amber-100 text-amber-700",
  immobilier: "bg-blue-100 text-blue-700",
  investissement: "bg-emerald-100 text-emerald-700"
};
const AgentTypeBadge = ({ agentType, className = "" }) => {
  if (!agentType || !AGENT_TYPE_LABELS[agentType]) return null;
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${AGENT_TYPE_COLORS[agentType]} ${className}`}>

      {AGENT_TYPE_LABELS[agentType]}
    </span>);

};
const ROLE_LABELS = {
  admin: "Administrateur",
  administrateur: "Administrateur",
  gestionnaire: "Gestionnaire"
};
// Libelle affiche sous une bulle de message : nom + role (administrateur,
// gestionnaire, ou specialite de l'agent) pour que l'utilisateur sache
// toujours precisement qui lui repond.
const getSenderLabel = (senderUser) => {
  if (!senderUser) return "Agent";
  const name = senderUser.full_name || "Agent";
  const roleSlug = senderUser.role?.slug;
  if (ROLE_LABELS[roleSlug]) return `${name} · ${ROLE_LABELS[roleSlug]}`;
  if (roleSlug === "agent") {
    const typeLabel = AGENT_TYPE_LABELS[senderUser.agent_type];
    return typeLabel ? `${name} · ${typeLabel}` : `${name} · Agent`;
  }
  return name;
};
const getInitials = (name) => {
  if (!name) return "?";
  return name.
  trim().
  split(/\s+/).
  slice(0, 2).
  map((part) => part[0]?.toUpperCase() || "").
  join("");
};
const formatMessageTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return time;
  return `${date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })} ${time}`;
};
const parseNumber = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};
const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profil");
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    interests: []
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });
  const [messages, setMessages] = useState(emptyList);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [threadMessages, setThreadMessages] = useState(emptyList);
  const [threadLoading, setThreadLoading] = useState(false);
  const [chatDraft, setChatDraft] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [messageableAgents, setMessageableAgents] = useState(emptyList);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [newChatAgent, setNewChatAgent] = useState(null);
  const [newChatDraft, setNewChatDraft] = useState("");
  const [startingChat, setStartingChat] = useState(false);
  const chatContainerRef = useRef(null);
  const prevThreadLengthRef = useRef(0);
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
    additional_requirements: ""
  });
  const [constructionForm, setConstructionForm] = useState({
    title: "",
    description: "",
    budget_min: "",
    budget_max: "",
    surface_area: "",
    location: "",
    city: ""
  });
  const [propertyRequestText, setPropertyRequestText] = useState("");
  const [loading, setLoading] = useState({
    profile: true,
    messages: false,
    search: false,
    construction: false,
    property: false,
    action: false
  });
  const toast = useToast();
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
  const conversations = useMemo(() => {
    const myId = profile?.id;
    if (!myId || !Array.isArray(messages) || messages.length === 0) return emptyList;

    const groups = new Map();
    messages.forEach((message) => {
      const key = message.parent_message_id || message.id;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(message);
    });

    const list = [];
    groups.forEach((groupMessages) => {
      const root = groupMessages.find((item) => !item.parent_message_id) || groupMessages[0];
      const sorted = [...groupMessages].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      const last = sorted[sorted.length - 1];
      const otherParty = last.sender_id === myId ? last.recipient : last.sender;
      const unread = groupMessages.some(
        (item) => item.recipient_id === myId && !item.is_read
      );
      list.push({
        uuid: root.uuid,
        otherParty: otherParty || { full_name: "Utilisateur" },
        lastMessage: last,
        unread
      });
    });

    return list.sort(
      (a, b) => new Date(b.lastMessage.created_at) - new Date(a.lastMessage.created_at)
    );
  }, [messages, profile?.id]);
  const tabs = useMemo(() => {
    const baseTabs = [
    { id: "profil", label: "Profil", icon: <User size={18} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> }];


    if (isVisitor) {
      baseTabs.push({
        id: "recherche",
        label: "Demandes",
        icon: <Search size={18} />
      });
      baseTabs.push({
        id: "investisseur",
        label: "Investissements",
        icon: <TrendingUp size={18} />
      });
    }

    if (isOwner) {
      baseTabs.push({
        id: "proprietes",
        label: "Demande propriété",
        icon: <FileText size={18} />
      });
    }

    if (isPartner) {
      baseTabs.push({
        id: "produits",
        label: "Mes produits",
        icon: <Building2 size={18} />
      });
    }

    baseTabs.push({
      id: "securite",
      label: "Securite",
      icon: <Key size={18} />
    });

    return baseTabs;
  }, [isOwner, isVisitor, isPartner]);
  useEffect(() => {
    const initialTab = location.state?.initialTab;
    if (!initialTab) return;

    const tabExists = tabs.some((tab) => tab.id === initialTab);
    if (tabExists) {
      setActiveTab(initialTab);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate, tabs]);

  const showNotice = (type, message) => {
    const notify = toast[type] || toast.info;
    notify(message);
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
          interests: Array.isArray(user.interests) ? user.interests : []
        });
      }
    } catch (error) {
      showNotice("error", "Impossible de charger le profil.");
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };
  const loadMessages = async ({ silent = false } = {}) => {
    if (!role) return;
    if (!silent) setLoading((prev) => ({ ...prev, messages: true }));
    try {
      const response = await visitorService.getMessagesByRole(role);
      setMessages(visitorService.extractList(response));
    } catch (error) {
      if (!silent) showNotice("error", "Impossible de charger les messages.");
    } finally {
      if (!silent) setLoading((prev) => ({ ...prev, messages: false }));
    }
  };
  const openConversation = async (conversation) => {
    setSelectedConversation(conversation);
    setThreadMessages(emptyList);
    setThreadLoading(true);
    try {
      const response = await visitorService.getThreadByRole(role, conversation.uuid);
      setThreadMessages(visitorService.extractThread(response));
      loadMessages({ silent: true });
    } catch (error) {
      showNotice("error", "Impossible de charger la conversation.");
    } finally {
      setThreadLoading(false);
    }
  };
  const refreshThread = async (uuid, { silentList = true } = {}) => {
    try {
      const response = await visitorService.getThreadByRole(role, uuid);
      setThreadMessages(visitorService.extractThread(response));
      if (!silentList) loadMessages({ silent: true });
    } catch (error) {
      // Rafraichissement silencieux : on ignore les echecs ponctuels.
    }
  };
  const sendChatMessage = async () => {
    const text = chatDraft.trim();
    if (!text || !selectedConversation || sendingChat) return;
    setSendingChat(true);
    try {
      await visitorService.replyMessageByRole(role, selectedConversation.uuid, {
        message: text
      });
      setChatDraft("");
      await refreshThread(selectedConversation.uuid);
      loadMessages({ silent: true });
    } catch (error) {
      showNotice("error", "Erreur lors de l'envoi du message.");
    } finally {
      setSendingChat(false);
    }
  };
  const handleChatKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendChatMessage();
    }
  };
  const openNewChatPanel = async () => {
    setShowNewChat(true);
    setNewChatAgent(null);
    setNewChatDraft("");
    setAgentsLoading(true);
    try {
      const response = await visitorService.listMessageableAgents();
      setMessageableAgents(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger la liste des agents.");
    } finally {
      setAgentsLoading(false);
    }
  };
  const startNewConversation = async () => {
    const text = newChatDraft.trim();
    if (!newChatAgent || !text || startingChat) return;
    setStartingChat(true);
    try {
      const response = await visitorService.startConversationByRole(role, {
        recipient_id: newChatAgent.id,
        message: text
      });
      const created = response?.data?.data;
      setShowNewChat(false);
      showNotice("success", "Conversation demarree.");
      await loadMessages({ silent: true });
      if (created?.uuid) {
        openConversation({
          uuid: created.uuid,
          otherParty: {
            id: newChatAgent.id,
            full_name: newChatAgent.full_name,
            avatar: newChatAgent.avatar
          }
        });
      }
    } catch (error) {
      showNotice("error", "Erreur lors de l'envoi du message.");
    } finally {
      setStartingChat(false);
    }
  };
  const loadSearchRequests = async ({ silent = false } = {}) => {
    if (!silent) setLoading((prev) => ({ ...prev, search: true }));
    try {
      const response = await visitorService.getSearchRequests();
      setSearchRequests(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger les demandes.");
    } finally {
      if (!silent) setLoading((prev) => ({ ...prev, search: false }));
    }
  };
  const loadConstructionRequests = async ({ silent = false } = {}) => {
    if (!silent) setLoading((prev) => ({ ...prev, construction: true }));
    try {
      const response = await visitorService.getConstructionRequests();
      setConstructionRequests(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger les projets.");
    } finally {
      if (!silent) setLoading((prev) => ({ ...prev, construction: false }));
    }
  };
  const loadPropertyRequests = async ({ silent = false } = {}) => {
    if (!silent) setLoading((prev) => ({ ...prev, property: true }));
    try {
      const response = await visitorService.getPropertyRequests();
      setPropertyRequests(visitorService.extractList(response));
    } catch (error) {
      showNotice("error", "Impossible de charger les demandes.");
    } finally {
      if (!silent) setLoading((prev) => ({ ...prev, property: false }));
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
    isOwner)
    {
      loadPropertyRequests();
    }
  }, [activeTab, isAuthenticated, isOwner, loading.profile, role]);
  useEffect(() => {
    if (activeTab !== "messages" || !isAuthenticated) return;
    const interval = setInterval(() => loadMessages({ silent: true }), 8000);
    return () => clearInterval(interval);
  }, [activeTab, isAuthenticated, role]);
  useEffect(() => {
    if (activeTab !== "messages" || !selectedConversation) return;
    const interval = setInterval(() => {
      refreshThread(selectedConversation.uuid);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab, selectedConversation, role]);
  useEffect(() => {
    prevThreadLengthRef.current = 0;
  }, [selectedConversation?.uuid]);
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const hasNewMessage = threadMessages.length > prevThreadLengthRef.current;
    prevThreadLengthRef.current = threadMessages.length;
    if (hasNewMessage) {
      container.scrollTop = container.scrollHeight;
    }
  }, [threadMessages]);
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };
  const toggleInterest = (interestValue) => {
    setProfileForm((prev) => {
      const current = Array.isArray(prev.interests) ? prev.interests : [];
      const selected = current.includes(interestValue);
      return {
        ...prev,
        interests: selected
          ? current.filter((value) => value !== interestValue)
          : [...current, interestValue]
      };
    });
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
    if (isVisitor && (!Array.isArray(profileForm.interests) || profileForm.interests.length === 0)) {
      showNotice("warning", "Veuillez sélectionner au moins un centre d'intérêt.");
      return;
    }
    setLoading((prev) => ({ ...prev, action: true }));
    try {
      const response = await visitorService.updateProfile(profileForm);
      const user = response?.data?.data?.user;
      if (user) {
        setProfile((prev) => ({ ...prev, ...user }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...(profile || {}), ...user })
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
        new_password_confirmation: ""
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
      property_type_id: searchForm.property_type_id ?
      Number(searchForm.property_type_id) :
      null,
      budget_min: parseNumber(searchForm.budget_min),
      budget_max: parseNumber(searchForm.budget_max),
      location_preferences: searchForm.location_preferences ?
      searchForm.location_preferences.
      split(",").
      map((item) => item.trim()).
      filter(Boolean) :
      [],
      bedrooms_min: parseNumber(searchForm.bedrooms_min),
      surface_min: parseNumber(searchForm.surface_min),
      additional_requirements: searchForm.additional_requirements || null
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
        additional_requirements: ""
      });
      loadSearchRequests({ silent: true });
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
      city: constructionForm.city || null
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
        city: ""
      });
      loadConstructionRequests({ silent: true });
    } catch (error) {
      showNotice("error", "Erreur lors de la demande.");
    } finally {
      setLoading((prev) => ({ ...prev, action: false }));
    }
  };
  const submitPropertyRequest = async (event) => {
    event.preventDefault();
    if (!propertyRequestText.trim()) {
      showNotice("warning", "Veuillez saisir votre demande.");
      return;
    }
    setLoading((prev) => ({ ...prev, action: true }));
    try {
      await visitorService.createPropertyRequest({
        description: propertyRequestText.trim()
      });
      showNotice("success", "Demande envoyee.");
      setPropertyRequestText("");
      loadPropertyRequests({ silent: true });
    } catch (error) {
      showNotice("error", "Erreur lors de la demande.");
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
            Accès sécurisé
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
            className="px-6 sm:px-8 py-3.5 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">

            Se connecter
          </button>
        </div>
      </div>);

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
                  backgroundSize: "40px 40px"
                }} />

            </div>
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200 font-semibold mb-2">
                    Mon espace client
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    Profil & activités
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
                  {profile?.partner_type &&
                  <div className="bg-white/10 border border-white/20 p-4 backdrop-blur">
                      <div className="text-xs text-blue-100">Type de partenaire</div>
                      <div className="text-lg font-semibold">
                        {profile.partner_type}
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveTab("messages")}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-5 py-3 font-semibold hover:bg-blue-50 transition">

                  <MessageSquare size={18} />
                  Messages
                </button>
                {isVisitor &&
                <button
                  onClick={() => setActiveTab("recherche")}
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/40 text-white px-5 py-3 font-semibold hover:bg-white/10 transition">

                    <Search size={18} />
                    Demandes
                  </button>
                }
                {(isAgent || isAdmin) && profile?.is_active &&
                <a
                  href="https://back-office.africabuildinvest.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-3 font-semibold hover:bg-emerald-600 transition">

                    <ExternalLink size={18} />
                    Espace administrateur
                  </a>
                }
                {isAgent && !profile?.is_active &&
                <div className="inline-flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-5 py-3 font-medium">
                    <ExternalLink size={18} />
                    Espace administrateur disponible après activation
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {" "}
          <div className="lg:col-span-1 space-y-4">
            {" "}
            <div className="bg-white border border-gray-200 shadow-lg p-6">
              {" "}
              {loading.profile ?
              <div className="space-y-3">
                  {" "}
                  <SkeletonBlock className="h-16 w-16" />{" "}
                  <SkeletonBlock className="h-4 w-36" />{" "}
                  <SkeletonBlock className="h-3 w-24" />{" "}
                  <SkeletonBlock className="h-3 w-44" />{" "}
                  <SkeletonBlock className="h-3 w-32" />{" "}
                </div> :

              <>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
                      {(profile?.first_name?.charAt(0) || "V") + (
                    profile?.last_name?.charAt(0) || "")}
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
                    {profile?.partner_type &&
                  <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-blue-500" />
                        <span>{profile.partner_type}</span>
                      </div>
                  }
                  </div>
                </>
              }{" "}
            </div>{" "}
            
            <div className="bg-white border border-gray-200 shadow-lg p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">
                Navigation
              </div>
              <div className="space-y-2">
                {" "}
                {tabs.map((tab) =>
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition border ${activeTab === tab.id ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"}`}>

                    {" "}
                    {tab.icon} {tab.label}{" "}
                  </button>
                )}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="lg:col-span-3 space-y-6">
            {" "}
            {activeTab === "profil" &&
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
                className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                    placeholder="Votre prénom"
                    required />
                  {" "}
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
                    placeholder="Votre nom"
                    required />
                  {" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>{" "}
                    <input
                    value={profile?.email || ""}
                    disabled
                    placeholder="Adresse email"
                    className="mt-2 w-full border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500" />
                  {" "}
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
                    placeholder="Ex: +225 07 00 00 00 00"
                    className="mt-2 w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  {" "}
                  </div>{" "}
                  {isVisitor && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Centres d&apos;intérêt
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Sélectionnez au moins un domaine pour personnaliser votre expérience.
                      </p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { value: "immobilier", label: "Immobilier", icon: Home },
                          { value: "construction", label: "Construction", icon: Hammer },
                          { value: "investissement", label: "Investissement", icon: TrendingUp }
                        ].map((interest) => {
                          const selected = Array.isArray(profileForm.interests) && profileForm.interests.includes(interest.value);
                          const InterestIcon = interest.icon;
                          return (
                            <button
                              key={interest.value}
                              type="button"
                              onClick={() => toggleInterest(interest.value)}
                              className={`p-4 border-2 text-left transition ${
                                selected
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                      selected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    <InterestIcon size={16} />
                                  </span>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {interest.label}
                                  </div>
                                </div>
                                {selected && <CheckCircle size={18} className="text-blue-600" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {Array.isArray(profileForm.interests) && profileForm.interests.length === 0 && (
                        <p className="text-sm text-amber-700 mt-2">
                          Choisissez au moins un centre d&apos;intérêt avant d&apos;enregistrer.
                        </p>
                      )}
                    </div>
                  )}{" "}
                  <div className="md:col-span-2 flex justify-end">
                    {" "}
                    <button
                    type="submit"
                    disabled={loading.action}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60">

                      {" "}
                      {loading.action ? "Mise a jour..." : "Enregistrer"}{" "}
                    </button>{" "}
                  </div>{" "}
                </form>{" "}
              </div>
            }{" "}
            {activeTab === "messages" &&
            <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Messages</h3>
                  </div>
                  <button
                  type="button"
                  onClick={openNewChatPanel}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">

                    <Plus size={16} /> <span className="hidden sm:inline">Nouvelle conversation</span>
                  </button>
                </div>
                <div className="flex h-[560px] max-h-[75vh]">
                  <div
                  className={`w-full sm:w-80 shrink-0 border-r border-gray-200 overflow-y-auto ${
                  selectedConversation ? "hidden sm:block" : "block"}`
                  }>

                    {loading.messages ?
                  <div className="p-4 space-y-4">
                        {Array.from({ length: 4 }).map((_, idx) =>
                    <div key={`conv-skeleton-${idx}`} className="flex items-center gap-3">
                            <SkeletonBlock className="h-10 w-10 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <SkeletonBlock className="h-3 w-2/3" />
                              <SkeletonBlock className="h-3 w-full" />
                            </div>
                          </div>
                    )}
                      </div> :
                  conversations.length === 0 ?
                  <div className="text-center py-12 px-4 text-gray-500 text-sm">
                        Aucune conversation pour le moment. Cliquez sur "Nouvelle conversation" pour écrire à un agent.
                      </div> :

                  conversations.map((conversation) =>
                  <button
                    key={conversation.uuid}
                    type="button"
                    onClick={() => openConversation(conversation)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition ${
                    selectedConversation?.uuid === conversation.uuid ? "bg-blue-50" : ""}`
                    }>

                        {conversation.otherParty?.avatar ?
                    <img
                      src={toMediaUrl(conversation.otherParty.avatar)}
                      alt={conversation.otherParty.full_name}
                      className="h-10 w-10 rounded-full object-cover shrink-0" /> :


                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                            {getInitials(conversation.otherParty?.full_name)}
                          </div>
                    }
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-sm truncate min-w-0 ${conversation.unread ? "font-bold text-gray-900" : "font-semibold text-gray-900"}`}>
                              {conversation.otherParty?.full_name || "Agent"}
                            </p>
                            <span className="text-[11px] text-gray-400 shrink-0">
                              {formatMessageTime(conversation.lastMessage.created_at)}
                            </span>
                          </div>
                          <AgentTypeBadge agentType={conversation.otherParty?.agent_type} className="mt-0.5" />
                          <p className={`text-xs truncate ${conversation.unread ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                            {conversation.lastMessage.message}
                          </p>
                        </div>
                        {conversation.unread &&
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shrink-0" />
                    }
                      </button>
                  )}
                  </div>
                  <div className={`flex-1 flex-col ${selectedConversation ? "flex" : "hidden sm:flex"}`}>
                    {!selectedConversation ?
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-sm px-6 text-center">
                        Sélectionnez une conversation ou démarrez-en une nouvelle pour écrire à un agent.
                      </div> :

                  <>
                        <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
                          <button
                        type="button"
                        onClick={() => setSelectedConversation(null)}
                        className="sm:hidden text-gray-500 hover:text-gray-700">

                            <ArrowLeft size={18} />
                          </button>
                          {selectedConversation.otherParty?.avatar ?
                      <img
                        src={toMediaUrl(selectedConversation.otherParty.avatar)}
                        alt={selectedConversation.otherParty.full_name}
                        className="h-9 w-9 rounded-full object-cover" /> :


                      <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                              {getInitials(selectedConversation.otherParty?.full_name)}
                            </div>
                      }
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {selectedConversation.otherParty?.full_name || "Agent"}
                            </p>
                            <AgentTypeBadge agentType={selectedConversation.otherParty?.agent_type} className="mt-0.5" />
                          </div>
                        </div>
                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-gray-50">
                          {threadLoading ?
                      <div className="space-y-3">
                              <SkeletonBlock className="h-10 w-2/3" />
                              <SkeletonBlock className="h-10 w-1/2 ml-auto" />
                              <SkeletonBlock className="h-10 w-3/5" />
                            </div> :

                      threadMessages.map((message) => {
                            const isOwn = message.sender_id === profile?.id;
                            const senderName = isOwn ?
                            "Vous" :
                            getSenderLabel(message.sender || selectedConversation.otherParty);
                            return (
                              <div key={message.uuid} className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                                <div
                                className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm rounded-2xl ${
                                isOwn ?
                                "bg-blue-600 text-white rounded-br-sm" :
                                "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"}`
                                }>

                                  <p className="whitespace-pre-line">{message.message}</p>
                                  <span
                                  className={`mt-1 flex items-center gap-1 text-[10px] ${
                                  isOwn ? "text-blue-100 justify-end" : "text-gray-400"}`
                                  }>

                                    {formatMessageTime(message.created_at)}
                                    {isOwn &&
                                    (message.is_read ?
                                    <CheckCheck size={13} /> :

                                    <Check size={13} />)
                                    }
                                  </span>
                                </div>
                                <span className="mt-1 px-1 text-[11px] text-gray-400">{senderName}</span>
                              </div>);

                          })
                      }
                        </div>
                        <div className="border-t border-gray-200 p-3 flex items-end gap-2">
                          <textarea
                        rows={1}
                        value={chatDraft}
                        onChange={(event) => setChatDraft(event.target.value)}
                        onKeyDown={handleChatKeyDown}
                        placeholder="Écrire un message..."
                        className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

                          <button
                        type="button"
                        onClick={sendChatMessage}
                        disabled={!chatDraft.trim() || sendingChat}
                        className="h-10 w-10 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed">

                            {sendingChat ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                          </button>
                        </div>
                      </>
                  }
                  </div>
                </div>
              </div>
            }{" "}
            {showNewChat &&
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div className="bg-white w-full max-w-md shadow-xl">
                  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h4 className="text-lg font-semibold text-gray-900">Nouvelle conversation</h4>
                    <button
                    type="button"
                    onClick={() => setShowNewChat(false)}
                    className="text-gray-400 hover:text-gray-600">

                      ✕
                    </button>
                  </div>
                  <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Choisir un agent</label>
                      {agentsLoading ?
                    <div className="mt-2 space-y-2">
                          <SkeletonBlock className="h-10 w-full" />
                          <SkeletonBlock className="h-10 w-full" />
                        </div> :
                    messageableAgents.length === 0 ?
                    <p className="mt-2 text-sm text-gray-500">Aucun agent disponible pour le moment.</p> :

                    <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                          {messageableAgents.map((agent) =>
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => setNewChatAgent(agent)}
                        className={`w-full flex items-center gap-3 border px-3 py-2 text-left transition ${
                        newChatAgent?.id === agent.id ?
                        "border-blue-500 bg-blue-50" :
                        "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`
                        }>

                              {agent.avatar ?
                        <img
                          src={toMediaUrl(agent.avatar)}
                          alt={agent.full_name}
                          className="h-9 w-9 rounded-full object-cover shrink-0" /> :


                        <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                                  {getInitials(agent.full_name)}
                                </div>
                        }
                              <span className="min-w-0">
                                <span className="block text-sm font-medium text-gray-900 truncate">{agent.full_name}</span>
                                <AgentTypeBadge agentType={agent.agent_type} className="mt-0.5" />
                              </span>
                            </button>
                      )}
                        </div>
                    }
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Votre message</label>
                      <textarea
                      rows={4}
                      value={newChatDraft}
                      onChange={(event) => setNewChatDraft(event.target.value)}
                      placeholder="Bonjour, j'aimerais avoir des informations sur..."
                      className="mt-2 w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    </div>
                  </div>
                  <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-4">
                    <button
                    type="button"
                    onClick={() => setShowNewChat(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300">

                      Annuler
                    </button>
                    <button
                    type="button"
                    onClick={startNewConversation}
                    disabled={!newChatAgent || !newChatDraft.trim() || startingChat}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed">

                      {startingChat ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            }{" "}
            {activeTab === "investisseur" && isVisitor &&
            <div className="bg-white border border-gray-200 shadow-lg p-6">
                <InvestorDashboard />
              </div>
            }{" "}
            {activeTab === "recherche" &&
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                      className="mt-2 w-full border border-gray-300 px-4 py-3">

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
                      className="mt-2 w-full border border-gray-300 px-4 py-3">

                        {" "}
                        <option value="">Tous</option>{" "}
                        {propertyTypes.map((type) =>
                      <option key={type.id} value={type.id}>
                            {" "}
                            {type.name}{" "}
                          </option>
                      )}{" "}
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
                      placeholder="Ex: 50 000 000"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Ex: 150 000 000"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Ex: 3"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Ex: 120"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Abidjan, Cocody, Plateau" />
                    {" "}
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
                      placeholder="Précisez vos besoins spécifiques (piscine, garage, proximité écoles...)"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
                    </div>{" "}
                    <div className="md:col-span-2 flex justify-end">
                      {" "}
                      <button
                      type="submit"
                      disabled={loading.action}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60">

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
                  {loading.search ?
                <div className="space-y-3">
                      {" "}
                      {Array.from({ length: 3 }).map((_, idx) =>
                  <div
                    key={`search-skeleton-${idx}`}
                    className="border border-gray-200 p-4 space-y-3">

                          {" "}
                          <SkeletonBlock className="h-4 w-32" />{" "}
                          <SkeletonBlock className="h-3 w-40" />{" "}
                          <SkeletonBlock className="h-3 w-28" />{" "}
                        </div>
                  )}{" "}
                    </div> :
                searchRequests.length === 0 ?
                <div className="text-center py-10 text-gray-500">
                      Aucune demande.
                    </div> :

                <div className="space-y-3">
                      {" "}
                      {searchRequests.map((request) =>
                  <div
                    key={request.uuid || request.id}
                    className="border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">

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
                  )}{" "}
                    </div>
                }{" "}
                </div>{" "}
              </div>
            }{" "}
            {activeTab === "construction" &&
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                      placeholder="Ex: Villa moderne 4 pièces"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Décrivez votre projet de construction..."
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Ex: 20 000 000"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Ex: 80 000 000"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Ex: 200"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Ex: Abidjan"
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
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
                      placeholder="Quartier, adresse précise..."
                      className="mt-2 w-full border border-gray-300 px-4 py-3" />
                    {" "}
                    </div>{" "}
                    <div className="md:col-span-2 flex justify-end">
                      {" "}
                      <button
                      type="submit"
                      disabled={loading.action}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60">

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
                  {loading.construction ?
                <div className="space-y-3">
                      {" "}
                      {Array.from({ length: 3 }).map((_, idx) =>
                  <div
                    key={`construction-skeleton-${idx}`}
                    className="border border-gray-200 p-4 space-y-3">

                          {" "}
                          <SkeletonBlock className="h-4 w-40" />{" "}
                          <SkeletonBlock className="h-3 w-32" />{" "}
                          <SkeletonBlock className="h-3 w-28" />{" "}
                        </div>
                  )}{" "}
                    </div> :
                constructionRequests.length === 0 ?
                <div className="text-center py-10 text-gray-500">
                      Aucun projet.
                    </div> :

                <div className="space-y-3">
                      {" "}
                      {constructionRequests.map((project) =>
                  <div
                    key={project.uuid || project.id}
                    className="border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">

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
                  )}{" "}
                    </div>
                }{" "}
                </div>{" "}
              </div>
            }{" "}
            {activeTab === "proprietes" &&
            <div className="space-y-6">
                {" "}
                <div className="bg-white border border-gray-200 shadow-lg p-6">
                  {" "}
                  <div className="flex items-center gap-3 mb-6">
                    {" "}
                    <FileText className="text-blue-600" />{" "}
                    <h3 className="text-xl font-semibold text-gray-900">
                      Demande de propriété
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
                      placeholder="J'aimerais ajouter une maison de 4 pieces située a..."
                      required />
                    {" "}
                    </div>{" "}
                    <div className="flex justify-end">
                      {" "}
                      <button
                      type="submit"
                      disabled={loading.action}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60">

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
                  {loading.property ?
                <div className="text-center py-10 text-gray-500">
                      Chargement...
                    </div> :
                propertyRequests.length === 0 ?
                <div className="text-center py-10 text-gray-500">
                      Aucune demande.
                    </div> :

                <div className="space-y-3">
                      {" "}
                      {propertyRequests.map((request) =>
                  <div
                    key={request.uuid || request.id}
                    className="border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                          {" "}
                          <div>
                            {" "}
                            <div className="text-sm font-semibold text-gray-900">
                              Demande de propriété
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
                  )}{" "}
                    </div>
                }{" "}
                </div>{" "}
              </div>
            }{" "}
            {activeTab === "produits" && isPartner &&
            <div className="bg-white border border-gray-200 shadow-lg p-6">
                <PartnerProductsManager partnerType={profile?.partner_type} />
              </div>
            }

            {activeTab === "securite" &&
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
                    placeholder="••••••••"
                    required />
                  {" "}
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
                    placeholder="••••••••"
                    required />
                  {" "}
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
                    placeholder="••••••••"
                    required />
                  {" "}
                  </div>{" "}
                  <button
                  type="submit"
                  disabled={loading.action}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60">

                    {" "}
                    Mettre a jour{" "}
                  </button>{" "}
                </form>{" "}
              </div>
            }{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>);

};
export default ProfilePage;
