import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import api from "../../api/axios";
import { toMediaUrl } from "../../utils/media";
import { SkeletonBlock } from "../ui/Skeleton";
import { useToast } from "../ui/Toast";
import ImmobilierProductForm   from "./ImmobilierProductForm";
import ConstructionProductForm from "./ConstructionProductForm";
import InvestmentProductForm   from "./InvestmentProductForm";

/* ─── Résolution du type de partenaire ──────────────────
   Retourne "immobilier" | "constructeur" | "investisseur" | null
──────────────────────────────────────────────────────── */
const resolvePartnerKind = (partnerType) => {
  const t = (partnerType || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (t.includes("jurid") || t.includes("notair") || t.includes("avocat") || t.includes("huissier")) return "juridique";
  if (t.includes("immobilier")) return "immobilier";
  if (t.includes("constructeur") || t.includes("construction")) return "constructeur";
  if (t.includes("investiss")) return "investisseur";
  if (t.includes("financier") || t.includes("finance")) return "financier";
  return null;
};

/* ─── Config par kind ─────────────────────────────────── */
const KIND_CONFIG = {
  immobilier:   { label: "Bien immobilier",           listEndpoint: "/partnership/products",     createEndpoint: "/partnership/products",     updatePrefix: "/partnership/products/",    deletePrefix: "/partnership/products/" },
  constructeur: { label: "Projet de construction",    listEndpoint: "/partnership/construction",  createEndpoint: "/partnership/construction",  updatePrefix: "/partnership/construction/", deletePrefix: "/partnership/construction/" },
  investisseur: { label: "Opportunité d'investissement", listEndpoint: "/partnership/investments", createEndpoint: "/partnership/investments",  updatePrefix: "/partnership/investments/",  deletePrefix: "/partnership/investments/" },
  financier:    { label: "Produit financier",          listEndpoint: "/partnership/products",     createEndpoint: "/partnership/products",     updatePrefix: "/partnership/products/",    deletePrefix: "/partnership/products/" },
};

/* ─── Badge statut ───────────────────────────────────── */
const STATUS_CONFIG = {
  pending:     { label: "En attente",  icon: Clock,         cls: "bg-amber-50 text-amber-700 border-amber-200" },
  submitted:   { label: "En attente",  icon: Clock,         cls: "bg-amber-50 text-amber-700 border-amber-200" },
  approved:    { label: "Approuvé",    icon: CheckCircle,   cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected:    { label: "Rejeté",      icon: XCircle,       cls: "bg-red-50 text-red-700 border-red-200" },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.cls}`}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

/* ─── Normalise un projet selon son kind ─────────────── */
const normalizeItem = (item, kind) => {
  if (kind === "constructeur") {
    const imgs = Array.isArray(item.images_path) ? item.images_path.map(toMediaUrl).filter(Boolean) : [];
    return {
      uuid:   item.uuid,
      title:  item.title,
      status: item.status === "submitted" ? "pending" : item.status,
      rejection_reason: item.rejection_reason,
      firstImage: imgs[0] || null,
      price:  item.budget_min ? `${Number(item.budget_min).toLocaleString("fr-FR")} XOF` : null,
      subtitle: [item.city, item.location].filter(Boolean).join(" · ") || null,
      raw: item,
    };
  }
  if (kind === "investisseur") {
    const imgs = Array.isArray(item.images_path) ? item.images_path.map(toMediaUrl).filter(Boolean) : [];
    return {
      uuid:   item.uuid,
      title:  item.title,
      status: item.approval_status || "pending",
      rejection_reason: item.rejection_reason,
      firstImage: imgs[0] || null,
      price: item.total_investment ? `${Number(item.total_investment).toLocaleString("fr-FR")} XOF` : null,
      subtitle: item.expected_return ? `${item.expected_return}% rendement attendu` : null,
      raw: item,
    };
  }
  // immobilier / financier → PartnerProduct
  const firstImage = (item.images || [])[0];
  return {
    uuid:   item.uuid,
    title:  item.title,
    status: item.status,
    rejection_reason: item.rejection_reason,
    firstImage: firstImage ? (toMediaUrl(firstImage) || firstImage) : null,
    price: item.price ? `${Number(item.price).toLocaleString("fr-FR")} ${item.currency || "XOF"}` : null,
    subtitle: null,
    raw: item,
  };
};

/* ─── Composant principal ────────────────────────────── */
const PartnerProductsManager = ({ partnerType }) => {
  const toast   = useToast();
  const kind    = resolvePartnerKind(partnerType);
  const config  = KIND_CONFIG[kind] || KIND_CONFIG.immobilier;
  const isLegalPartner = kind === "juridique";

  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [saving, setSaving]     = useState(false);

  const load = async ({ silent = false } = {}) => {
    if (isLegalPartner) {
      setLoading(false);
      return;
    }
    try {
      if (!silent) setLoading(true);
      const res = await api.get(config.listEndpoint);
      const raw = res?.data?.data ?? res?.data ?? [];
      const list = Array.isArray(raw) ? raw : raw?.data ?? [];
      setItems(list.map((item) => normalizeItem(item, kind)));
    } catch {
      setItems([]);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => { load(); }, [kind]);

  if (isLegalPartner) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Mes publications</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Les partenaires juridiques n'ont pas de publications de biens ou de projets.
          </p>
        </div>
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">Aucune publication a gerer pour ce type de partenariat.</p>
          <p className="text-slate-400 text-xs mt-1">Vos coordonnees et votre profil restent visibles sur votre page partenaire.</p>
        </div>
      </div>
    );
  }

  /* ── Soumission selon le kind ── */
  const handleSave = async (formData, images = [], planFiles = [], render3dFiles = [], documents = []) => {
    setSaving(true);
    try {
      const fd = new FormData();

      if (kind === "constructeur") {
        fd.append("title",        formData.title);
        fd.append("description",  formData.description);
        if (formData.budget_min)   fd.append("budget_min",   formData.budget_min);
        if (formData.budget_max)   fd.append("budget_max",   formData.budget_max);
        if (formData.surface_area) fd.append("surface_area", formData.surface_area);
        if (formData.city)         fd.append("city",         formData.city);
        if (formData.location)     fd.append("location",     formData.location);
        images.forEach((f)     => fd.append("images[]",    f));
        planFiles.forEach((f)  => fd.append("plans[]",     f));
        render3dFiles.forEach((f) => fd.append("render_3d[]", f));

      } else if (kind === "investisseur") {
        fd.append("title",        formData.title);
        fd.append("description",  formData.description);
        fd.append("project_type", formData.project_type);
        if (formData.city)              fd.append("city",             formData.city);
        if (formData.location)          fd.append("location",         formData.location);
        if (formData.total_investment)  fd.append("total_investment", formData.total_investment);
        if (formData.min_investment)    fd.append("min_investment",   formData.min_investment);
        if (formData.expected_return)   fd.append("expected_return",  formData.expected_return);
        if (formData.duration_months)   fd.append("duration_months",  formData.duration_months);
        if (formData.status)            fd.append("status",           formData.status);
        if (formData.start_date)        fd.append("start_date",       formData.start_date);
        if (formData.end_date)          fd.append("end_date",         formData.end_date);
        documents.forEach((f)     => fd.append("documents[]",  f));
        images.forEach((f)        => fd.append("images[]",     f));
        planFiles.forEach((f)     => fd.append("plans[]",      f));
        render3dFiles.forEach((f) => fd.append("render_3d[]",  f));

      } else {
        // immobilier / financier → PartnerProduct
        fd.append("title",       formData.title);
        if (formData.description) fd.append("description", formData.description);
        if (formData.price)       fd.append("price",       formData.price);
        fd.append("currency",    formData.currency || "XOF");
        fd.append("type_data",   JSON.stringify(formData.type_data || {}));
        images.forEach((f)        => fd.append("images[]",          f));
        planFiles.forEach((f)     => fd.append("plan_images[]",     f));
        render3dFiles.forEach((f) => fd.append("render_3d_images[]",f));
      }

      const headers = { "Content-Type": "multipart/form-data" };

      if (editing) {
        if (kind === "constructeur" || kind === "investisseur") {
          await api.post(`${config.updatePrefix}${editing.uuid}?_method=PUT`, fd, { headers });
        } else {
          await api.post(`${config.updatePrefix}${editing.uuid}?_method=PUT`, fd, { headers });
        }
        toast.success("Mis à jour — repassera en validation.");
      } else {
        await api.post(config.createEndpoint, fd, { headers });
        toast.success("Soumis avec succès. En attente de validation.");
      }

      setShowForm(false);
      setEditing(null);
      await load({ silent: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (uuid) => {
    if (!window.confirm("Supprimer cet élément ?")) return;
    try {
      await api.delete(`${config.deletePrefix}${uuid}`);
      setItems((p) => p.filter((x) => x.uuid !== uuid));
      toast.success("Élément supprimé.");
    } catch {
      toast.error("Impossible de supprimer.");
    }
  };

  const openEdit = (item) => {
    setEditing(item.raw);
    setShowForm(true);
  };

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  /* ── Sélection du formulaire selon le kind ── */
  const renderForm = () => {
    const props = {
      initial: editing,
      onSave:  handleSave,
      onClose: () => { setShowForm(false); setEditing(null); },
      saving,
    };
    if (kind === "constructeur") return <ConstructionProductForm {...props} />;
    if (kind === "investisseur") return <InvestmentProductForm   {...props} />;
    return <ImmobilierProductForm {...props} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Mes publications</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Ajoutez vos {config.label.toLowerCase()}s — visibles après validation par notre équipe.
          </p>
        </div>
        <button type="button" onClick={openCreate}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors rounded-lg">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Alerte validation */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
        <Clock size={15} className="flex-shrink-0 mt-0.5" />
        <span>Chaque publication passe en <strong>attente de validation</strong> avant d'apparaître sur le site.</span>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="space-y-3">
          {[0,1,2].map((i) => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">Aucune publication pour le moment.</p>
          <p className="text-slate-400 text-xs mt-1">Cliquez sur "Ajouter" pour commencer.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.uuid} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
              {/* Miniature */}
              <div className="w-16 h-16 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                {item.firstImage ? (
                  <img src={item.firstImage} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">Photo</div>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{item.title}</p>
                {item.price    && <p className="text-xs text-slate-500 mt-0.5">{item.price}</p>}
                {item.subtitle && <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>}
                {item.status === "rejected" && item.rejection_reason && (
                  <p className="text-xs text-red-600 mt-1">Motif : {item.rejection_reason}</p>
                )}
              </div>

              {/* Status + actions */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <StatusBadge status={item.status} />
                <button type="button" onClick={() => openEdit(item)}
                  className="text-slate-400 hover:text-blue-600 transition-colors" title="Modifier">
                  <Pencil size={16} />
                </button>
                <button type="button" onClick={() => handleDelete(item.uuid)}
                  className="text-slate-400 hover:text-red-600 transition-colors" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulaire modal */}
      {showForm && renderForm()}
    </div>
  );
};

export default PartnerProductsManager;
