import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Heart,
  Calculator,
  Landmark,
  MapPin,
  PieChart,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  Shield,
  Wallet,
  Ruler } from
"lucide-react";
import api, { getCurrentUser } from "../api/axios";
import Button from "../components/ui/Button";
import AccountCredentialsModal from "../components/ui/AccountCredentialsModal";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";
import MediaSplitShowcase from "../components/ui/MediaSplitShowcase";
import AddressMap from "../components/ui/AddressMap";
const InvestmentDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [investData, setInvestData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: ""
  });
  const [simAmount, setSimAmount] = useState("");
  const [investError, setInvestError] = useState("");
  const [investSuccess, setInvestSuccess] = useState("");
  const [createdAccount, setCreatedAccount] = useState(null);
  const defaultImage =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80";
  const getStorageUrl = (path) => toMediaUrl(path);
  useEffect(() => {
    fetchProject();
    fetchRelated();
  }, [uuid]);
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;
    setInvestData((prev) => ({
      ...prev,
      name:
      prev.name || [user.first_name, user.last_name].filter(Boolean).join(""),
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || ""
    }));
  }, []);
  const normalizeProject = (raw) => {
    if (!raw) return null;
    const images = Array.isArray(raw.images_path) ? raw.images_path : [];
    const documents = Array.isArray(raw.documents_path) ?
    raw.documents_path :
    [];
    const plans = Array.isArray(raw.plans_path) ? raw.plans_path : [];
    const render3D = Array.isArray(raw.render_3d_path) ? raw.render_3d_path : [];
    const totalInvestment = Number(raw.total_investment || 0);
    const currentFunding = Number(raw.current_funding || 0);
    const partner =
    raw.creator?.approved_financial_partnership ||
    raw.approved_financial_partnership ||
    null;
    let funded = null;
    if (raw.funded_percentage !== null && raw.funded_percentage !== undefined) {
      funded = Number(raw.funded_percentage);
    } else if (totalInvestment > 0) {
      funded = Math.round(currentFunding / totalInvestment * 100);
    }
    return {
      id: raw.uuid || raw.id,
      title: raw.title || "Projet d'investissement",
      description: raw.description || "",
      location: raw.location || raw.city || "",
      type: raw.project_type || "immobilier",
      status: raw.status || "open",
      roi: Number(raw.expected_return || 0),
      minInvestment: Number(raw.min_investment || 0),
      totalInvestment,
      surfaceArea: raw.surface_area ?? null,
      postalCode: raw.postal_code || "",
      referenceCode: raw.reference_code || raw.uuid || raw.id || "",
      currentFunding,
      funded:
      funded !== null && funded !== undefined ?
      Math.max(0, Math.min(100, funded)) :
      null,
      durationMonths: Number(raw.duration_months || 0),
      startDate: raw.start_date || null,
      endDate: raw.end_date || null,
      images,
      documents,
      plans,
      render3D,
      financialPartner: partner ?
      {
        name: partner.company_name || partner.name || "Partenaire financier",
        type: partner.company_type || "Partenaire financier",
        logo: partner.logo_url || partner.logo_path || partner.logo?.file_path || "",
        uuid: partner.uuid || null
      } :
      null,
      createdAt: raw.created_at || null,
      raw
    };
  };
  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get(`/investments/${uuid}`);
      const payload = response?.data?.data || response?.data?.data?.data;
      const normalized = normalizeProject(payload);
      if (!normalized) {
        setError("Projet non trouve");
        return;
      }
      setProject(normalized);
    } catch {
      setError("Erreur lors du chargement du projet.");
    } finally {
      setLoading(false);
    }
  };
  const fetchRelated = async () => {
    try {
      const response = await api.get("/investments", { params: { per_page: 60 } });
      const list = response?.data?.data?.data || response?.data?.data || [];
      const filtered = Array.isArray(list) ?
      list.filter((item) => item.uuid !== uuid).slice(0, 3) :
      [];
      const normalized = filtered.map(normalizeProject).filter(Boolean);
      setRelatedProjects(normalized);
    } catch {
      setRelatedProjects([]);
    }
  };
  const images = useMemo(() => {
    if (!project) return [defaultImage];
    const resolved = project.images.map(getStorageUrl).filter(Boolean);
    if (project.raw?.cover_image) {
      resolved.unshift(getStorageUrl(project.raw.cover_image));
    }
    if (resolved.length === 0) resolved.push(defaultImage);
    return resolved;
  }, [project]);
  const planVisuals = useMemo(() => (project?.plans || []).map(getStorageUrl).filter(Boolean), [project]);
  const render3DVisuals = useMemo(() => (project?.render3D || []).map(getStorageUrl).filter(Boolean), [project]);
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const formatPrice = (price) => {
    if (price === null || price === undefined || Number.isNaN(Number(price))) {
      return "N/A";
    }
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0
    }).format(price);
  };
  const formatDuration = (months) => {
    if (!months) return "N/A";
    if (months < 12) return `${months} mois`;
    const years = (months / 12).toFixed(1);
    return `${years} ans`;
  };
  const formatDate = (value) => {
    if (!value) return "Non specifiee";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Non specifiee";
    return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(
      date
    );
  };
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  const handleInvestSubmit = async (e) => {
    e.preventDefault();
    if (!project?.id) return;
    setInvestError("");
    setInvestSuccess("");
    setCreatedAccount(null);
    try {
      const amount = Number(investData.amount || 0);
      const header = `Demande investissement: ${project.title}`;
      const amountLine = amount > 0 ? `Montant souhaite: ${amount}` : null;
      const combinedMessage = [header, amountLine, investData.message || null].
      filter(Boolean).
      join("\n");
      const response = await api.post("/client-requests", {
        request_type: "investissement",
        investment_uuid: project.id,
        name: investData.name,
        email: investData.email,
        phone: investData.phone || null,
        message: combinedMessage
      });
      const account = response.data.account;
      setInvestSuccess(
        account ?
        "Votre demande a été envoyee. Votre compte visiteur a été créé." :
        "Votre demande a été envoyee."
      );
      if (account?.default_password) {
        setCreatedAccount({
          email: account.email,
          defaultPassword: account.default_password
        });
      }
      const user = getCurrentUser();
      setInvestData({
        name: user ?
        [user.first_name, user.last_name].filter(Boolean).join(" ") :
        "",
        email: user?.email || "",
        phone: user?.phone || "",
        amount: "",
        message: ""
      });
    } catch (err) {
      setInvestError(
        err.response?.data?.message || "Impossible d'envoyer la demande."
      );
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {" "}
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
          {" "}
          <SkeletonBlock className="h-72 w-full" />{" "}
          <SkeletonBlock className="h-8 w-2/3" />{" "}
          <SkeletonBlock className="h-4 w-1/3" />{" "}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {" "}
            <SkeletonBlock className="h-12 w-full" />{" "}
            <SkeletonBlock className="h-12 w-full" />{" "}
            <SkeletonBlock className="h-12 w-full" />{" "}
            <SkeletonBlock className="h-12 w-full" />{" "}
          </div>{" "}
          <SkeletonBlock className="h-4 w-full" />{" "}
          <SkeletonBlock className="h-4 w-5/6" />{" "}
          <SkeletonBlock className="h-4 w-2/3" />{" "}
        </div>{" "}
      </div>);

  }
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        {" "}
        <div className="text-center max-w-md">
          {" "}
          <div className="text-3xl font-semibold mb-4">Investissement</div>{" "}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {" "}
            {error || "Projet non trouve"}{" "}
          </h2>{" "}
          <p className="text-gray-600 mb-6">
            {" "}
            Le projet que vous recherchez n'existe pas ou a été supprimé.{" "}
          </p>{" "}
          <Button
            onClick={() => navigate("/investment")}
            variant="primary"
            className="w-full md:w-auto">

            {" "}
            Retour aux investissements{" "}
          </Button>{" "}
        </div>{" "}
      </div>);

  }
  const remainingInvestment = Math.max(
    0,
    Number(project.totalInvestment || 0) - Number(project.currentFunding || 0)
  );
  const fundedValue = typeof project.funded === "number" ? project.funded : 0;
  const simulatorAmount = Math.max(
    0,
    Number(simAmount || project.minInvestment || 0)
  );
  const annualGain = simulatorAmount * Number(project.roi || 0) / 100;
  const totalProjectedGain =
  annualGain * Math.max(1, Number(project.durationMonths || 12)) / 12;
  const projectedTotal = simulatorAmount + totalProjectedGain;
  const partnerLogo = toMediaUrl(project.financialPartner?.logo);
  const projectMapAddress = [
    project.location,
    project.postalCode,
  ].filter(Boolean).join(", ");
  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      <MediaSplitShowcase
        title={project.title}
        images={images}
        currentIndex={currentImageIndex}
        onPrev={prevImage}
        onNext={nextImage}
        onSelect={setCurrentImageIndex}
        leftBadges={[
        <span
          key="status"
          className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg bg-blue-500 text-white uppercase tracking-wide">

            Disponible
          </span>,
        <span
          key="type"
          className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg bg-white/90 text-gray-700">

            {project.type}
          </span>]
        }
        rightActions={[
        <button
          key="favorite"
          onClick={toggleFavorite}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
          aria-label="Ajouter aux favoris">

            <Heart
            size={20}
            className={isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"} />

          </button>]
        }
        planImage={planVisuals[0] || null}
        render3DImage={render3DVisuals[0] || null} />


      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {" "}
          <div className="lg:col-span-2 space-y-6">
            {" "}
            <div className="bg-white shadow-xl p-6 border border-gray-100">
              {" "}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {" "}
                <div className="flex-1">
                  {" "}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {" "}
                    {project.title}{" "}
                  </h1>{" "}
                  <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-gray-700">
                    {" "}
                    <div className="flex min-w-0 items-start gap-3">
                    <MapPin size={20} className="mt-0.5 flex-shrink-0 text-blue-600" />{" "}
                    <span className="min-w-0 whitespace-normal break-words text-sm leading-6">
                      {" "}
                      {project.location || "Localisation non specifiee"}{" "}
                    </span>{" "}
                    </div>
                  </div>{" "}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200">
                    {" "}
                    <div className="text-center">
                      {" "}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {" "}
                        <TrendingUp
                          className="text-blue-600"
                          size={24} />
                        {" "}
                        <span className="text-2xl font-bold text-gray-900">
                          {" "}
                          {project.roi || 0}%{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="text-sm text-gray-600">
                        Rendement cible
                      </div>{" "}
                    </div>{" "}
                    <div className="text-center">
                      {" "}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {" "}
                        <PieChart className="text-blue-600" size={24} />{" "}
                        <span className="text-2xl font-bold text-gray-900">
                          {" "}
                          {project.funded ?? 0}%{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="text-sm text-gray-600">Finance</div>{" "}
                    </div>{" "}
                    <div className="text-center">
                      {" "}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {" "}
                        <Clock className="text-blue-600" size={24} />{" "}
                        <span className="text-2xl font-bold text-gray-900">
                          {" "}
                          {formatDuration(project.durationMonths)}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="text-sm text-gray-600">Horizon</div>{" "}
                    </div>{" "}
                    <div className="text-center">
                      {" "}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {" "}
                        <Building2 className="text-blue-600" size={24} />{" "}
                        <span className="text-2xl font-bold text-gray-900">
                          {" "}
                          {project.type}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="text-sm text-gray-600">
                        Type d'actif
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {" "}
                    <div className="border border-gray-100 bg-gray-50 p-4">
                      {" "}
                      <p className="text-xs text-gray-500 mb-1">
                        Investissement total
                      </p>{" "}
                      <p className="text-lg font-semibold text-gray-900">
                        {" "}
                        {formatPrice(project.totalInvestment)}{" "}
                      </p>{" "}
                      <p className="text-xs text-gray-500 mt-2">
                        {" "}
                        Montant restant: {formatPrice(remainingInvestment)}{" "}
                      </p>{" "}
                    </div>{" "}
                    <div className="border border-gray-100 bg-gray-50 p-4">
                      {" "}
                      <p className="text-xs text-gray-500 mb-1">
                        Ticket minimum
                      </p>{" "}
                      <p className="text-lg font-semibold text-gray-900">
                        {" "}
                        {formatPrice(project.minInvestment)}{" "}
                      </p>{" "}
                      <p className="text-xs text-gray-500 mt-2">
                        {" "}
                        Mise a jour: {formatDate(project.createdAt)}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="md:text-right">
                  {" "}
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                    {" "}
                    {formatPrice(project.minInvestment)}{" "}
                  </div>{" "}
                  <div className="text-gray-600">Ticket minimum</div>{" "}
                  <div className="mt-4">
                    {" "}
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800">
                      {" "}
                      <CheckCircle size={14} className="mr-1" /> Investissement
                      ouvert{" "}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bg-white shadow-xl p-6 border border-gray-100">
              {" "}
              <div className="flex items-center justify-between mb-6">
                {" "}
                <h2 className="text-2xl font-bold text-gray-900">
                  Résumé du projet
                </h2>{" "}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {" "}
                  <Eye size={16} /> <span>Analyse Naraf</span>{" "}
                </div>{" "}
              </div>{" "}
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {" "}
                {project.description || "Aucune description disponible."}{" "}
              </p>{" "}
            </div>{" "}
            <AddressMap address={projectMapAddress} title={project.title} />
            <div className="overflow-hidden bg-white shadow-xl border border-gray-100">
              <div className="border-b border-gray-100 bg-blue-700 p-6 text-white">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-200">
                      Financement du projet
                    </p>
                    <h2 className="text-2xl font-bold">
                      Suivi de collecte transparent
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    {partnerLogo ?
                    <img
                      src={partnerLogo}
                      alt={project.financialPartner?.name}
                      className="h-11 w-11 rounded-xl bg-white object-contain p-1.5" /> :
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                        <Landmark size={22} />
                      </div>
                    }
                    <div>
                      <p className="text-xs text-white/60">Partenaire financier</p>
                      <p className="text-sm font-bold leading-5">
                        {project.financialPartner?.name || "Africa Build Investment"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="mb-2 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Progression
                      </p>
                      <p className="text-3xl font-bold text-gray-950">
                        {fundedValue}%
                      </p>
                    </div>
                    <p className="text-right text-sm text-gray-500">
                      Objectif : <span className="font-bold text-gray-900">{formatPrice(project.totalInvestment)}</span>
                    </p>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-600 shadow-[0_8px_22px_rgba(37,99,235,0.25)] transition-all duration-700"
                      style={{ width: `${fundedValue}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Déjà financé</p>
                    <p className="mt-2 text-xl font-bold text-gray-950">
                      {formatPrice(project.currentFunding)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Reste à financer</p>
                    <p className="mt-2 text-xl font-bold text-gray-950">
                      {formatPrice(remainingInvestment)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm text-blue-700">Ticket minimum</p>
                    <p className="mt-2 text-xl font-bold text-blue-950">
                      {formatPrice(project.minInvestment)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
                    <TrendingUp className="text-blue-600" size={22} />
                    <div>
                      <p className="text-xs text-gray-500">Rendement cible</p>
                      <p className="font-bold text-gray-950">{project.roi || 0}% / an</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
                    <Clock className="text-blue-600" size={22} />
                    <div>
                      <p className="text-xs text-gray-500">Horizon</p>
                      <p className="font-bold text-gray-950">{formatDuration(project.durationMonths)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
                    <Shield className="text-blue-600" size={22} />
                    <div>
                      <p className="text-xs text-gray-500">Niveau de sécurité</p>
                      <p className="font-bold text-gray-950">A</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="bg-white shadow-xl p-6 border border-gray-100">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations clees
              </h2>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {" "}
                <div className="space-y-4">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <Building2 className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">Type d'actif</p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {project.type}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <CheckCircle className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">Reference</p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {" "}
                        {project.referenceCode}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-start gap-3">
                    {" "}
                    <MapPin className="mt-0.5 shrink-0 text-blue-600" size={20} />{" "}
                    <div className="min-w-0">
                      {" "}
                      <p className="text-xs text-gray-500">Localisation</p>{" "}
                      <p className="whitespace-normal break-words text-sm font-semibold leading-5 text-gray-900">
                        {" "}
                        {project.location || "Non specifiee"}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <Ruler className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">Surface</p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {" "}
                        {project.surfaceArea ?
                        `${project.surfaceArea} m2` :
                        "Non specifiee"}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <Clock className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">Demarrage</p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {" "}
                        {formatDate(project.startDate)}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-y-4">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <PieChart className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">
                        Taux de financement
                      </p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {" "}
                        {project.funded ?? 0}%{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <MapPin className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">Code postal</p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {" "}
                        {project.postalCode || "Non specifie"}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <Users className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">
                        Investisseurs
                      </p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {" "}
                        {project.raw?.investors_count ?? "Non specifie"}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <Clock className="text-blue-600" size={20} />{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-gray-500">Echeance</p>{" "}
                      <p className="text-sm font-semibold text-gray-900">
                        {" "}
                        {formatDate(project.endDate)}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {project.documents.length > 0 &&
            <div className="bg-white shadow-xl p-6 border border-gray-100">
                {" "}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Documents
                </h2>{" "}
                <div className="space-y-3">
                  {" "}
                  {project.documents.map((doc) =>
                <a
                  key={doc}
                  href={getStorageUrl(doc)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border border-gray-200 px-4 py-3 hover:border-blue-300 transition-colors">

                      {" "}
                      <span className="text-sm text-gray-700 truncate">
                        {doc.split("/").pop()}
                      </span>{" "}
                      <Download size={18} className="text-blue-600" />{" "}
                    </a>
                )}{" "}
                </div>{" "}
              </div>
            }{" "}
          </div>{" "}
          <div className="lg:col-span-1 space-y-6">
            {" "}
            <div className="overflow-hidden bg-white shadow-xl border border-gray-100">
              <div className="bg-blue-700 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/15 p-3">
                    <Calculator size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                      Simulation ROI
                    </p>
                    <h3 className="text-xl font-bold">Projetez votre rendement</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-5 p-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Montant simulé
                  </label>
                  <div className="relative">
                    <Wallet
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                    <input
                      type="number"
                      min={project.minInvestment || 0}
                      value={simAmount}
                      onChange={(e) => setSimAmount(e.target.value)}
                      placeholder={String(project.minInvestment || 0)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 font-semibold text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Ticket minimum conseillé : {formatPrice(project.minInvestment)}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                      Gain annuel estimé
                    </p>
                    <p className="mt-2 text-2xl font-bold text-blue-950">
                      {formatPrice(annualGain)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                      Gain projeté sur {formatDuration(project.durationMonths)}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-blue-950">
                      {formatPrice(totalProjectedGain)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-blue-700 p-4 text-white">
                  <p className="text-xs text-blue-100">Capital + rendement estimé</p>
                  <p className="mt-1 text-2xl font-bold">
                    {formatPrice(projectedTotal)}
                  </p>
                </div>
                <p className="text-xs leading-5 text-gray-500">
                  Simulation indicative basée sur le rendement cible. Le rendement réel dépendra de la performance effective du projet.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-xl p-6 border border-gray-100 sticky top-24">
              {" "}
              <div className="flex items-center space-x-3 mb-6">
                {" "}
                <div className="bg-blue-100 p-3">
                  {" "}
                  <Users className="text-blue-600" size={24} />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h3 className="text-xl font-bold text-gray-900">
                    Investir maintenant
                  </h3>{" "}
                  <p className="text-gray-600 text-sm">
                    Soumettez votre proposition.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              {investError &&
              <div className="px-4 py-3 text-sm border border-red-200 bg-red-50 text-red-700">
                  {" "}
                  {investError}{" "}
                </div>
              }{" "}
              {investSuccess &&
              <div className="px-4 py-3 text-sm border border-blue-200 bg-blue-50 text-blue-700">
                  {" "}
                  {investSuccess}{" "}
                </div>
              }{" "}
              <form onSubmit={handleInvestSubmit} className="space-y-4">
                {" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>{" "}
                  <input
                    type="text"
                    required
                    value={investData.name}
                    onChange={(e) =>
                    setInvestData((prev) => ({
                      ...prev,
                      name: e.target.value
                    }))
                    }
                    className="w-full border border-gray-200 px-4 py-3" />
                  {" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>{" "}
                  <input
                    type="email"
                    required
                    value={investData.email}
                    onChange={(e) =>
                    setInvestData((prev) => ({
                      ...prev,
                      email: e.target.value
                    }))
                    }
                    className="w-full border border-gray-200 px-4 py-3" />
                  {" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium mb-2">
                    Telephone
                  </label>{" "}
                  <input
                    type="tel"
                    value={investData.phone}
                    onChange={(e) =>
                    setInvestData((prev) => ({
                      ...prev,
                      phone: e.target.value
                    }))
                    }
                    className="w-full border border-gray-200 px-4 py-3" />
                  {" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium mb-2">
                    {" "}
                    Montant a investir{" "}
                  </label>{" "}
                  <input
                    type="number"
                    min="1"
                    required
                    value={investData.amount}
                    onChange={(e) =>
                    setInvestData((prev) => ({
                      ...prev,
                      amount: e.target.value
                    }))
                    }
                    className="w-full border border-gray-200 px-4 py-3" />
                  {" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>{" "}
                  <textarea
                    rows="3"
                    value={investData.message}
                    onChange={(e) =>
                    setInvestData((prev) => ({
                      ...prev,
                      message: e.target.value
                    }))
                    }
                    className="w-full border border-gray-200 px-4 py-3" />
                  {" "}
                </div>{" "}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 font-semibold text-lg">

                  {" "}
                  Investir{" "}
                </Button>{" "}
              </form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {relatedProjects.length > 0 &&
        <div className="mt-12">
            {" "}
            <div className="flex items-center justify-between mb-6">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900">
                Autres projets
              </h2>{" "}
              <Button
              variant="primary"
              onClick={() => navigate("/investment")}
              className="shadow-none">

                {" "}
                Voir tous les projets{" "}
              </Button>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {" "}
              {relatedProjects.map((item) => {
              const image =
              item.images.length > 0 ?
              getStorageUrl(item.images[0]) :
              defaultImage;
              const itemPartnerLogo = toMediaUrl(item.financialPartner?.logo);
              return (
                <div
                  key={item.id}
                  className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/investment/${item.id}`)}>

                    {" "}
                    <div className="relative h-48">
                      {" "}
                      <img
                      src={image}
                      alt={item.title}
                      className="w-full h-full object-cover" />
                    {" "}
                      <div className="absolute top-3 left-3">
                        {" "}
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white">
                          {" "}
                          Investissement{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="p-4">
                      {" "}
                      <div className="mb-3 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                        {itemPartnerLogo ?
                        <img
                          src={itemPartnerLogo}
                          alt={item.financialPartner?.name}
                          className="h-8 w-8 shrink-0 rounded-lg bg-white object-contain p-1" /> :
                        <Landmark size={16} className="shrink-0 text-blue-600" />
                        }
                        <span className="truncate text-xs font-semibold text-gray-700">
                          {item.financialPartner?.name || "Africa Build Investment"}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                        {item.title}
                      </h3>{" "}
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        {" "}
                        <MapPin size={14} className="mr-1" />{" "}
                        <span className="truncate">
                          {item.location || "Localisation"}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex items-center justify-between">
                        {" "}
                        <div className="text-xl font-bold text-blue-600">
                          {" "}
                          {formatPrice(item.minInvestment)}{" "}
                        </div>{" "}
                        <div className="text-sm text-gray-500">
                          {item.durationMonths} mois
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>);

            })}{" "}
            </div>{" "}
          </div>
        }{" "}
      </div>{" "}
      <AccountCredentialsModal
        account={createdAccount}
        onClose={() => setCreatedAccount(null)}
        onLogin={() => navigate("/login")}
        description="Conservez ce mot de passe temporaire pour suivre votre demande d'investissement et vous reconnecter à votre espace visiteur." />

    </div>);

};
export default InvestmentDetails;
