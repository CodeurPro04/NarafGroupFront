import { useEffect, useState, useMemo } from "react";
import { X, Upload, Building2, MapPin, FileText, CheckSquare, Loader2, Info } from "lucide-react";
import api from "../../api/axios";

const CURRENCIES = ["XOF", "XAF", "EUR", "USD", "MAD", "GNF", "NGN"];

/* ─── Visibilité des champs selon le slug du type ───────
   Chaque type définit exactement quels champs afficher
   et leurs labels adaptés.
──────────────────────────────────────────────────────── */
const TYPE_RULES = {
  terrain: {
    badge: "Terrain",
    badgeColor: "bg-amber-100 text-amber-700",
    hint: "Un terrain vide — superficie et localisation suffisent.",
    showFeatures: false,
    fields: [
      { key: "surface_area",   label: "Superficie (m²) *", required: true },
    ],
  },
  appartement: {
    badge: "Appartement",
    badgeColor: "bg-blue-100 text-blue-700",
    hint: null,
    showFeatures: true,
    fields: [
      { key: "surface_area",   label: "Surface habitable (m²) *", required: true },
      { key: "bedrooms",       label: "Chambres *", required: true },
      { key: "bathrooms",      label: "Salles de bain", required: false },
      { key: "parking_spaces", label: "Places de parking", required: false },
      { key: "floor_number",   label: "Étage", required: false },
      { key: "total_floors",   label: "Nb d'étages total", required: false },
      { key: "year_built",     label: "Année de construction", required: false },
    ],
  },
  studio: {
    badge: "Studio",
    badgeColor: "bg-blue-100 text-blue-700",
    hint: "Studio — une seule pièce principale, pas de chambre séparée.",
    showFeatures: true,
    fields: [
      { key: "surface_area",   label: "Surface (m²) *", required: true },
      { key: "bathrooms",      label: "Salle de bain", required: false },
      { key: "parking_spaces", label: "Parking", required: false },
      { key: "floor_number",   label: "Étage", required: false },
      { key: "total_floors",   label: "Étages total", required: false },
      { key: "year_built",     label: "Année de construction", required: false },
    ],
  },
  villa: {
    badge: "Villa",
    badgeColor: "bg-emerald-100 text-emerald-700",
    hint: null,
    showFeatures: true,
    fields: [
      { key: "surface_area",   label: "Surface habitable (m²) *", required: true },
      { key: "land_area",      label: "Surface du terrain (m²)", required: false },
      { key: "bedrooms",       label: "Chambres *", required: true },
      { key: "bathrooms",      label: "Salles de bain", required: false },
      { key: "parking_spaces", label: "Parking / Garage", required: false },
      { key: "year_built",     label: "Année de construction", required: false },
    ],
  },
  duplex: {
    badge: "Duplex",
    badgeColor: "bg-emerald-100 text-emerald-700",
    hint: null,
    showFeatures: true,
    fields: [
      { key: "surface_area",   label: "Surface totale (m²) *", required: true },
      { key: "bedrooms",       label: "Chambres *", required: true },
      { key: "bathrooms",      label: "Salles de bain", required: false },
      { key: "parking_spaces", label: "Parking", required: false },
      { key: "floor_number",   label: "Étage de départ", required: false },
      { key: "total_floors",   label: "Nombre de niveaux", required: false },
      { key: "year_built",     label: "Année de construction", required: false },
    ],
  },
  bureau: {
    badge: "Bureau",
    badgeColor: "bg-slate-100 text-slate-700",
    hint: "Local professionnel — sans chambres ni cuisine.",
    showFeatures: true,
    fields: [
      { key: "surface_area",   label: "Surface (m²) *", required: true },
      { key: "parking_spaces", label: "Places de parking", required: false },
      { key: "floor_number",   label: "Étage", required: false },
      { key: "total_floors",   label: "Étages total", required: false },
      { key: "year_built",     label: "Année de construction", required: false },
    ],
  },
  commerce: {
    badge: "Commerce",
    badgeColor: "bg-orange-100 text-orange-700",
    hint: "Local commercial, boutique ou espace de vente.",
    showFeatures: true,
    fields: [
      { key: "surface_area",   label: "Surface (m²) *", required: true },
      { key: "parking_spaces", label: "Parking", required: false },
      { key: "floor_number",   label: "Étage", required: false },
      { key: "total_floors",   label: "Étages total", required: false },
      { key: "year_built",     label: "Année de construction", required: false },
    ],
  },
  entrepot: {
    badge: "Entrepôt",
    badgeColor: "bg-slate-100 text-slate-700",
    hint: "Entrepôt ou hangar — sans chambres ni salles de bain.",
    showFeatures: false,
    fields: [
      { key: "surface_area",   label: "Surface au sol (m²) *", required: true },
      { key: "land_area",      label: "Surface de la parcelle (m²)", required: false },
      { key: "parking_spaces", label: "Parkings / Quais", required: false },
      { key: "year_built",     label: "Année de construction", required: false },
    ],
  },
};

const DEFAULT_RULES = {
  badge: null,
  badgeColor: "",
  hint: null,
  showFeatures: true,
  fields: [
    { key: "surface_area",   label: "Surface (m²)", required: false },
    { key: "land_area",      label: "Terrain (m²)", required: false },
    { key: "bedrooms",       label: "Chambres", required: false },
    { key: "bathrooms",      label: "Salles de bain", required: false },
    { key: "parking_spaces", label: "Parking", required: false },
    { key: "floor_number",   label: "Étage", required: false },
    { key: "total_floors",   label: "Étages total", required: false },
    { key: "year_built",     label: "Année construction", required: false },
  ],
};

/* Chaque clé possible dans les caractéristiques */
const ALL_CHAR_KEYS = ["surface_area","land_area","bedrooms","bathrooms","parking_spaces","floor_number","total_floors","year_built"];

/* ─── Helpers UI ──────────────────────────────────────── */
const ImageGrid = ({ files, onRemove, label }) => {
  if (!files.length) return null;
  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-2">{label} ({files.length})</p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {files.map((file, i) => (
          <div key={`${file.name}-${i}`} className="relative">
            <img src={URL.createObjectURL(file)} alt="" className="w-full h-20 object-cover rounded-lg border border-slate-200" />
            <button type="button" onClick={() => onRemove(i)}
              className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center">
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const UploadZone = ({ id, label, hint, onChange }) => (
  <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center">
    <Upload size={24} className="mx-auto text-slate-300 mb-2" />
    <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
    {hint && <p className="text-xs text-slate-400 mb-3">{hint}</p>}
    <input type="file" id={id} multiple accept="image/*" onChange={onChange} className="hidden" />
    <label htmlFor={id}
      className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
      <Upload size={12} /> Sélectionner
    </label>
  </div>
);

const inputCls = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100";

/* ─── Formulaire principal ───────────────────────────── */
const ImmobilierProductForm = ({ initial, onSave, onClose, saving }) => {
  const [types, setTypes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loadingLookups, setLoadingLookups] = useState(true);

  const [form, setForm] = useState({
    title:            initial?.type_data?.title        || initial?.title        || "",
    description:      initial?.type_data?.description  || initial?.description  || "",
    property_type_id: initial?.type_data?.property_type_id || "",
    transaction_type: initial?.type_data?.transaction_type || "vente",
    price:            initial?.price  || initial?.type_data?.price    || "",
    currency:         initial?.currency || initial?.type_data?.currency || "XOF",
    negotiable:       initial?.type_data?.negotiable   || false,
    surface_area:     initial?.type_data?.surface_area || "",
    land_area:        initial?.type_data?.land_area    || "",
    bedrooms:         initial?.type_data?.bedrooms     || "",
    bathrooms:        initial?.type_data?.bathrooms    || "",
    parking_spaces:   initial?.type_data?.parking_spaces || "",
    floor_number:     initial?.type_data?.floor_number || "",
    total_floors:     initial?.type_data?.total_floors || "",
    year_built:       initial?.type_data?.year_built   || "",
    address:          initial?.type_data?.address      || "",
    city:             initial?.type_data?.city         || "",
    commune:          initial?.type_data?.commune      || "",
    quartier:         initial?.type_data?.quartier     || "",
    feature_ids:      initial?.type_data?.feature_ids  || [],
  });

  const [images, setImages]         = useState([]);
  const [planImages, setPlanImages] = useState([]);
  const [render3dImages, setRender3dImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [typesRes, featuresRes] = await Promise.all([
          api.get("/property-types"),
          api.get("/property-features"),
        ]);
        const tData = typesRes?.data?.data ?? typesRes?.data ?? [];
        const fData = featuresRes?.data?.data ?? featuresRes?.data ?? [];
        setTypes(Array.isArray(tData) ? tData : tData?.data || []);
        setFeatures(Array.isArray(fData) ? fData : fData?.data || []);
      } catch { /* silent */ }
      finally { setLoadingLookups(false); }
    };
    load();
  }, []);

  /* Règles actives selon le type sélectionné */
  const activeRules = useMemo(() => {
    const selected = types.find((t) => String(t.id) === String(form.property_type_id));
    if (!selected) return DEFAULT_RULES;
    const slug = (selected.slug || selected.name || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "") // retire accents
      .replace(/\s+/g, "");
    return TYPE_RULES[slug] || DEFAULT_RULES;
  }, [form.property_type_id, types]);

  /* Quand le type change → reset les champs qui ne sont plus visibles */
  const handleTypeChange = (e) => {
    const newTypeId = e.target.value;
    const selected = types.find((t) => String(t.id) === String(newTypeId));
    const slug = (selected?.slug || selected?.name || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "");
    const rules = TYPE_RULES[slug] || DEFAULT_RULES;
    const visibleKeys = rules.fields.map((f) => f.key);

    const resetFields = {};
    ALL_CHAR_KEYS.forEach((key) => {
      if (!visibleKeys.includes(key)) resetFields[key] = "";
    });
    if (!rules.showFeatures) resetFields.feature_ids = [];

    setForm((prev) => ({ ...prev, property_type_id: newTypeId, ...resetFields }));
  };

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const toggleFeature = (id) =>
    setForm((p) => ({
      ...p,
      feature_ids: p.feature_ids.includes(id)
        ? p.feature_ids.filter((x) => x !== id)
        : [...p.feature_ids, id],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(
      { title: form.title, description: form.description, price: form.price, currency: form.currency, type_data: { ...form } },
      images, planImages, render3dImages
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {initial ? "Modifier le bien" : "Ajouter un bien immobilier"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Visible après validation par notre équipe</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="divide-y divide-slate-100">

          {/* ── Informations générales ───────────────────── */}
          <div className="px-6 py-5 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <FileText size={14} /> Informations générales
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Titre — pleine largeur */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Titre *</label>
                <input required value={form.title} onChange={(e) => set("title", e.target.value)}
                  placeholder="Ex : Villa 4 chambres à Cocody, Abidjan" className={inputCls} />
              </div>

              {/* Type de bien */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Type de bien *</label>
                {loadingLookups ? (
                  <div className="h-11 bg-slate-100 animate-pulse rounded-lg" />
                ) : (
                  <select required value={form.property_type_id} onChange={handleTypeChange} className={inputCls}>
                    <option value="">-- Sélectionner --</option>
                    {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                )}
                {/* Badge du type détecté */}
                {activeRules.badge && (
                  <span className={`inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${activeRules.badgeColor}`}>
                    {activeRules.badge}
                  </span>
                )}
              </div>

              {/* Transaction */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Transaction *</label>
                <select required value={form.transaction_type} onChange={(e) => set("transaction_type", e.target.value)} className={inputCls}>
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                </select>
              </div>

              {/* Prix — pleine largeur */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Prix *</label>
                <div className="flex gap-3">
                  <input required type="number" value={form.price} onChange={(e) => set("price", e.target.value)}
                    placeholder="Ex : 25 000 000"
                    className="flex-1 min-w-0 border border-slate-200 rounded-lg px-4 py-3 text-base font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <select value={form.currency} onChange={(e) => set("currency", e.target.value)}
                    className="w-28 border border-slate-200 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500 bg-white">
                    {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-500 mt-2 cursor-pointer">
                  <input type="checkbox" checked={form.negotiable} onChange={(e) => set("negotiable", e.target.checked)} className="rounded" />
                  Prix négociable
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description *</label>
              <textarea required rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Décrivez le bien en détail..." className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* ── Caractéristiques — DYNAMIQUES selon le type ─ */}
          {form.property_type_id && (
            <div className="px-6 py-5 space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Building2 size={14} /> Caractéristiques
              </h4>

              {/* Alerte contextuelle */}
              {activeRules.hint && (
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-700">
                  <Info size={14} className="flex-shrink-0 mt-0.5" />
                  {activeRules.hint}
                </div>
              )}

              {activeRules.fields.length === 0 ? (
                <p className="text-sm text-slate-400 italic">Aucune caractéristique spécifique pour ce type.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeRules.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs text-slate-500 mb-1">{field.label}</label>
                      <input
                        type="number"
                        required={field.required}
                        value={form[field.key]}
                        onChange={(e) => set(field.key, e.target.value)}
                        min="0"
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Localisation ─────────────────────────────── */}
          <div className="px-6 py-5 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <MapPin size={14} /> Localisation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Adresse *", key: "address", required: true, placeholder: "N° et nom de rue" },
                { label: "Ville *",   key: "city",    required: true, placeholder: "Ex : Abidjan" },
                { label: "Commune",   key: "commune", required: false, placeholder: "Ex : Cocody" },
                { label: "Quartier",  key: "quartier",required: false, placeholder: "Ex : Riviera 3" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{f.label}</label>
                  <input required={f.required} value={form[f.key]} onChange={(e) => set(f.key, e.target.value)}
                    placeholder={f.placeholder} className={inputCls} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Équipements — masqué pour terrain / entrepôt ─ */}
          {activeRules.showFeatures && features.length > 0 && (
            <div className="px-6 py-5 space-y-4">
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <CheckSquare size={14} /> Équipements & caractéristiques
              </h4>
              {loadingLookups ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[0,1,2,3,4,5,6,7].map((i) => <div key={i} className="h-7 bg-slate-100 animate-pulse rounded" />)}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {features.map((feat) => (
                    <label key={feat.id} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" checked={form.feature_ids.includes(feat.id)}
                        onChange={() => toggleFeature(feat.id)} className="rounded border-slate-300" />
                      {feat.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Visuels ───────────────────────────────────── */}
          <div className="px-6 py-5 space-y-5">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <Upload size={14} /> Visuels
            </h4>
            <div className="space-y-3">
              <UploadZone id="immo-images" label="Photos du bien *" hint="Façade, intérieur, vue générale..."
                onChange={(e) => setImages((p) => [...p, ...Array.from(e.target.files)])} />
              <ImageGrid files={images} onRemove={(i) => setImages((p) => p.filter((_, idx) => idx !== i))} label="Photos" />
            </div>
            <div className="space-y-3">
              <UploadZone id="immo-plans" label="Plans" hint="Plans de masse, plans de niveau..."
                onChange={(e) => setPlanImages((p) => [...p, ...Array.from(e.target.files)])} />
              <ImageGrid files={planImages} onRemove={(i) => setPlanImages((p) => p.filter((_, idx) => idx !== i))} label="Plans" />
            </div>
            <div className="space-y-3">
              <UploadZone id="immo-3d" label="Rendus 3D" hint="Visualisations et rendus architecturaux"
                onChange={(e) => setRender3dImages((p) => [...p, ...Array.from(e.target.files)])} />
              <ImageGrid files={render3dImages} onRemove={(i) => setRender3dImages((p) => p.filter((_, idx) => idx !== i))} label="Rendus 3D" />
            </div>
          </div>

          {/* ── Actions ───────────────────────────────────── */}
          <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {saving ? <><Loader2 size={15} className="animate-spin" /> Envoi...</> : "Soumettre pour validation"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ImmobilierProductForm;
