import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle,
  Home,
  Clock,
  Building2,
} from "lucide-react";
import api, { getCurrentUser } from "../api/axios";
import Button from "../components/ui/Button";
import AccountCredentialsModal from "../components/ui/AccountCredentialsModal";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toMediaUrl } from "../utils/media";
import MediaSplitShowcase from "../components/ui/MediaSplitShowcase";
const ConstructionDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [planForm, setPlanForm] = useState({
    email: "",
    phone: "",
    sector: "",
    department: "",
    project_description: "",
    consent: false,
  });
  const [planNotice, setPlanNotice] = useState({ type: "", message: "" });
  const [isPlanSubmitting, setIsPlanSubmitting] = useState(false);
  const [createdAccount, setCreatedAccount] = useState(null);
  const [plansUnlocked, setPlansUnlocked] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const defaultImage =
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80";
  const getStorageUrl = (path) => toMediaUrl(path);
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    fetchProject();
    fetchRelated();
  }, [uuid]);
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;
    setPlanForm((prev) => ({
      ...prev,
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
    }));
  }, []);
  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get(`/construction-projects/${uuid}`);
      const payload = response?.data?.data ?? response?.data?.data?.data;
      if (!payload) {
        setError("Projet non trouve");
        return;
      }
      setProject(payload);
    } catch {
      setError("Erreur lors du chargement du projet.");
    } finally {
      setLoading(false);
    }
  };
  const fetchRelated = async () => {
    try {
      const response = await api.get("/construction-projects");
      const list = response?.data?.data || response?.data || [];
      const items = Array.isArray(list?.data) ? list.data : list;
      const filtered = Array.isArray(items)
        ? items.filter((item) => item.uuid !== uuid).slice(0, 3)
        : [];
      setRelatedProjects(filtered);
    } catch {
      setRelatedProjects([]);
    }
  };
  const getProjectImages = () => {
    if (!project) return [defaultImage];
    const images = Array.isArray(project.images_path)
      ? project.images_path
      : [];
    const resolved = images.map(getStorageUrl).filter(Boolean);
    if (project.cover_image) resolved.unshift(getStorageUrl(project.cover_image));
    if (resolved.length === 0) {
      resolved.push(defaultImage);
    }
    return resolved;
  };
  const nextImage = () => {
    const images = getProjectImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    const images = getProjectImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const formatPrice = (price) => {
    if (price === null || price === undefined || Number.isNaN(Number(price))) {
      return "N/A";
    }
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };
  const handleInputChange = (e) => {
    setPlanForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };
  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    setPlanNotice({ type: "", message: "" });
    setCreatedAccount(null);
    if (!planForm.consent) {
      setPlanNotice({
        type: "error",
        message: "Veuillez accepter la politique de confidentialité.",
      });
      return;
    }
    try {
      setIsPlanSubmitting(true);
      const message = `Demande de plan de construction\nSecteur: ${planForm.sector}\nDepartement: ${planForm.department}\nProjet: ${planForm.project_description}`;
      const user = getCurrentUser();
      const name = user
        ? [user.first_name, user.last_name].filter(Boolean).join(" ")
        : planForm.email.split("@")[0] || "Client";
      const response = await api.post("/client-requests", {
        request_type: "construction",
        construction_uuid: project?.uuid,
        name,
        email: planForm.email,
        phone: planForm.phone,
        message,
        sector: planForm.sector,
        department: planForm.department,
        project_description: planForm.project_description,
        consent: planForm.consent,
      });
      if (response.data.success) {
        const account = response.data.account;
        setPlanNotice({
          type: "success",
          message: account
            ? "Merci ! Vous pouvez consulter le plan. Votre compte visiteur a ete cree."
            : "Merci ! Vous pouvez consulter le plan.",
        });
        if (account?.default_password) {
          setCreatedAccount({
            email: account.email,
            defaultPassword: account.default_password,
          });
        }
        setPlansUnlocked(true);
      }
    } catch (err) {
      setPlanNotice({
        type: "error",
        message:
          err.response?.data?.message ||
          "Erreur lors de l'envoi du formulaire.",
      });
    } finally {
      setIsPlanSubmitting(false);
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
      </div>
    );
  }
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        {" "}
        <div className="text-center max-w-md">
          {" "}
          <div className="text-3xl font-semibold mb-4">Projet</div>{" "}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {" "}
            {error || "Projet non trouve"}{" "}
          </h2>{" "}
          <p className="text-gray-600 mb-6">
            {" "}
            Le projet que vous recherchez n'existe pas ou a ete supprime.{" "}
          </p>{" "}
          <Button
            onClick={() => navigate("/construction")}
            variant="primary"
            className="w-full md:w-auto"
          >
            {" "}
            Retour aux projets{" "}
          </Button>{" "}
        </div>{" "}
      </div>
    );
  }
  const images = getProjectImages();
  const plans = Array.isArray(project.plans_path) ? project.plans_path : [];
  const resolvedPlans = plans.map(getStorageUrl).filter(Boolean);
  const render3D = Array.isArray(project.render_3d_path) ? project.render_3d_path : [];
  const resolvedRender3D = render3D.map(getStorageUrl).filter(Boolean);
  const formattedDate = project.created_at
    ? format(new Date(project.created_at), "dd MMMM yyyy", { locale: fr })
    : "Non specifiee";
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
            className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg bg-green-600 text-white"
          >
            Projet publie
          </span>,
        ]}
        planImage={resolvedPlans[0] || null}
        render3DImage={resolvedRender3D[0] || null}
      />

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
                    {project.title || "Projet de construction"}{" "}
                  </h1>{" "}
                  <div className="flex items-center text-gray-600 mb-4">
                    {" "}
                    <MapPin size={20} className="mr-2 flex-shrink-0" />{" "}
                    <span className="truncate">
                      {" "}
                      {project.location ||
                        project.city ||
                        "Localisation non specifiee"}{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 border-y border-gray-200">
                    {" "}
                    <div className="text-center">
                      {" "}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {" "}
                        <Ruler className="text-green-600" size={24} />{" "}
                        <span className="text-2xl font-bold text-gray-900">
                          {" "}
                          {project.surface_area || 0}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="text-sm text-gray-600">
                        m2 Surface
                      </div>{" "}
                    </div>{" "}
                    <div className="text-center">
                      {" "}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {" "}
                        <Building2 className="text-green-600" size={24} />{" "}
                        <span className="text-2xl font-bold text-gray-900">
                          {" "}
                          {project.city || "Naraf"}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="text-sm text-gray-600">Ville</div>{" "}
                    </div>{" "}
                    <div className="text-center">
                      {" "}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {" "}
                        <CheckCircle
                          className="text-green-600"
                          size={24}
                        />{" "}
                        <span className="text-2xl font-bold text-gray-900">
                          {" "}
                          {formatPrice(project.budget_min)}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="text-sm text-gray-600">Budget</div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="md:text-right">
                  {" "}
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">
                    {" "}
                    {formatPrice(project.budget_min)}{" "}
                  </div>{" "}
                  <div className="text-gray-600">Budget minimum</div>{" "}
                  <div className="mt-4">
                    {" "}
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-green-100 text-green-800">
                      {" "}
                      <CheckCircle size={14} className="mr-1" /> Projet
                      disponible{" "}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bg-white shadow-xl p-6 border border-gray-100">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Description
              </h2>{" "}
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {" "}
                {project.description || "Aucune description disponible."}{" "}
              </p>{" "}
            </div>{" "}
            {resolvedPlans.length > 0 && (
              <div
                id="plans-section"
                className="bg-white shadow-xl p-6 border border-gray-100"
              >
                {" "}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <h2 className="text-2xl font-bold text-gray-900">
                      Plans de construction
                    </h2>{" "}
                    {!plansUnlocked && (
                      <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600">
                        {" "}
                        Acces reserve{" "}
                      </span>
                    )}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="grid grid-cols-1 gap-6">
                  {" "}
                  <div className="w-full">
                    {" "}
                    <div className="grid grid-cols-1 gap-4">
                      {" "}
                      {resolvedPlans.map((plan, index) => (
                        <button
                          type="button"
                          key={`${plan}-${index}`}
                          className="relative overflow-hidden border border-gray-200 text-left focus:outline-none focus:ring-2 focus:ring-green-500"
                          onClick={() => {
                            if (!plansUnlocked) {
                              setPlanNotice({
                                type: "error",
                                message:
                                  "Veuillez remplir le formulaire pour voir le plan de construction.",
                              });
                              scrollToSection("contact-section");
                              return;
                            }
                            setActivePlan(plan);
                          }}
                        >
                          {" "}
                          <img
                            src={plan}
                            alt={`Plan ${index + 1}`}
                            className={`w-full h-96 object-cover ${plansUnlocked ? "" : "blur-md scale-105"}`}
                          />{" "}
                          {!plansUnlocked && (
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-center justify-center px-6 text-center">
                              {" "}
                              <div className="text-white">
                                {" "}
                                <p className="text-lg font-semibold">
                                  Plan floute
                                </p>{" "}
                                <p className="text-sm text-white/80 mt-1">
                                  {" "}
                                  Cliquez pour remplir le formulaire.{" "}
                                </p>{" "}
                              </div>{" "}
                            </div>
                          )}{" "}
                        </button>
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            )}{" "}
            <div className="bg-white shadow-xl p-6 border border-gray-100">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations detaillees
              </h2>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {" "}
                <div className="space-y-4">
                  {" "}
                  <div className="flex items-center space-x-3">
                    {" "}
                    <Home className="text-gray-400" size={20} />{" "}
                    <div>
                      {" "}
                      <div className="text-sm text-gray-500">
                        Budget max
                      </div>{" "}
                      <div className="font-medium">
                        {formatPrice(project.budget_max)}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center space-x-3">
                    {" "}
                    <MapPin className="text-gray-400" size={20} />{" "}
                    <div>
                      {" "}
                      <div className="text-sm text-gray-500">Ville</div>{" "}
                      <div className="font-medium">
                        {project.city || "Non specifiee"}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center space-x-3">
                    {" "}
                    <Clock className="text-gray-400" size={20} />{" "}
                    <div>
                      {" "}
                      <div className="text-sm text-gray-500">
                        Publie le
                      </div>{" "}
                      <div className="font-medium">{formattedDate}</div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-y-4">
                  {" "}
                  <div className="flex items-center space-x-3">
                    {" "}
                    <Building2 className="text-gray-400" size={20} />{" "}
                    <div>
                      {" "}
                      <div className="text-sm text-gray-500">
                        Reference
                      </div>{" "}
                      <div className="font-medium">{project.uuid}</div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="lg:col-span-1 space-y-6">
            {" "}
            <div
              id="contact-section"
              className="bg-white shadow-xl p-6 border border-gray-100 sticky top-24"
            >
              {" "}
              <div className="flex items-center space-x-3 mb-6">
                {" "}
                <div className="bg-green-100 p-3">
                  {" "}
                  <Phone className="text-green-600" size={24} />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h3 className="text-xl font-bold text-gray-900">
                    Je souhaite etre recontacte
                  </h3>{" "}
                  <p className="text-gray-600 text-sm">
                    Nos equipes Naraf vous repondent rapidement.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              {planNotice.message && (
                <div
                  className={` px-4 py-3 text-sm border ${planNotice.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}
                >
                  {" "}
                  {planNotice.message}{" "}
                </div>
              )}{" "}
              <form onSubmit={handlePlanSubmit} className="space-y-4">
                {" "}
                <div>
                  {" "}
                  <label className="text-xs text-gray-600">Email*</label>{" "}
                  <input
                    type="email"
                    name="email"
                    value={planForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    disabled={isPlanSubmitting}
                    required
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-xs text-gray-600">
                    Telephone*
                  </label>{" "}
                  <input
                    type="tel"
                    name="phone"
                    value={planForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    disabled={isPlanSubmitting}
                    required
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-xs text-gray-600">
                    Secteur de votre projet*
                  </label>{" "}
                  <input
                    type="text"
                    name="sector"
                    value={planForm.sector}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    disabled={isPlanSubmitting}
                    required
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-xs text-gray-600">
                    Departement*
                  </label>{" "}
                  <select
                    name="department"
                    value={planForm.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    disabled={isPlanSubmitting}
                    required
                  >
                    {" "}
                    <option value="">—Veuillez choisir une option—</option>{" "}
                    <option value="Abidjan">Abidjan</option>{" "}
                    <option value="Bouake">Bouake</option>{" "}
                    <option value="San-Pedro">San-Pedro</option>{" "}
                    <option value="Yamoussoukro">Yamoussoukro</option>{" "}
                    <option value="Autre">Autre</option>{" "}
                  </select>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-xs text-gray-600">
                    Quel est votre projet ?
                  </label>{" "}
                  <textarea
                    name="project_description"
                    value={planForm.project_description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    disabled={isPlanSubmitting}
                    required
                  />{" "}
                </div>{" "}
                <label className="flex items-start gap-2 text-xs text-gray-600">
                  {" "}
                  <input
                    type="checkbox"
                    name="consent"
                    checked={planForm.consent}
                    onChange={handleInputChange}
                    className="mt-1"
                    disabled={isPlanSubmitting}
                  />{" "}
                  J’accepte que les informations saisies soient utilisées par
                  Naraf pour me recontacter par téléphone, e-mail ou SMS,
                  conformément à la politique de confidentialité du site.{" "}
                </label>{" "}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 font-semibold text-lg"
                  disabled={isPlanSubmitting}
                >
                  {" "}
                  <Mail size={20} className="mr-2 inline" />{" "}
                  {isPlanSubmitting ? "Envoi..." : "Envoyer ma demande"}{" "}
                </Button>{" "}
              </form>{" "}
              <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                {" "}
                <div className="flex items-center space-x-3">
                  {" "}
                  <div className="bg-gray-100 p-2">
                    {" "}
                    <Phone className="text-gray-600" size={18} />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <div className="text-sm text-gray-500">
                      Service client
                    </div>{" "}
                    <div className="font-medium">+225 XX XX XX XX XX</div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center space-x-3">
                  {" "}
                  <div className="bg-gray-100 p-2">
                    {" "}
                    <Mail className="text-gray-600" size={18} />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <div className="text-sm text-gray-500">Email</div>{" "}
                    <div className="font-medium">
                      contact@naraf-immo.ci
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {relatedProjects.length > 0 && (
          <div className="mt-12">
            {" "}
            <div className="flex items-center justify-between mb-6">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900">
                Autres projets
              </h2>{" "}
              <Button
                variant="outline"
                onClick={() => navigate("/construction")}
              >
                {" "}
                Voir tous les projets{" "}
              </Button>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {" "}
              {relatedProjects.map((item) => {
                const images = Array.isArray(item.images_path)
                  ? item.images_path
                  : [];
                const cover = images.length
                  ? getStorageUrl(images[0])
                  : defaultImage;
                return (
                  <div
                    key={item.uuid}
                    className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer"
                    onClick={() => navigate(`/construction/${item.uuid}`)}
                  >
                    {" "}
                    <div className="relative h-48">
                      {" "}
                      <img
                        src={cover}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />{" "}
                      <div className="absolute top-3 left-3">
                        {" "}
                        <span className="px-3 py-1 text-xs font-semibold bg-green-600 text-white">
                          {" "}
                          Projet{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="p-4">
                      {" "}
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                        {" "}
                        {item.title || "Projet de construction"}{" "}
                      </h3>{" "}
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        {" "}
                        <MapPin size={14} className="mr-1" />{" "}
                        <span className="truncate">
                          {item.city || item.location || "Localisation"}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex items-center justify-between">
                        {" "}
                        <div className="text-xl font-bold text-green-600">
                          {" "}
                          {formatPrice(item.budget_min)}{" "}
                        </div>{" "}
                        <div className="text-sm text-gray-500">
                          {" "}
                          {item.surface_area || 0} m2{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                );
              })}{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
      {activePlan && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          {" "}
          <div className="relative max-w-5xl w-full">
            {" "}
            <button
              type="button"
              className="absolute -top-10 right-0 text-white text-sm underline"
              onClick={() => setActivePlan(null)}
            >
              {" "}
              Fermer{" "}
            </button>{" "}
            <div className="bg-white overflow-hidden shadow-2xl">
              {" "}
              <img
                src={activePlan}
                alt="Plan de construction"
                className="w-full h-auto max-h-[80vh] object-contain"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      <AccountCredentialsModal
        account={createdAccount}
        onClose={() => setCreatedAccount(null)}
        onLogin={() => navigate("/login")}
        description="Conservez ce mot de passe temporaire pour retrouver votre demande de plan et acceder a votre espace visiteur."
      />
    </div>
  );
};
export default ConstructionDetails;
