import { useState } from "react";
import { X, Upload, MapPin, FileText, TrendingUp, Loader2 } from "lucide-react";

const inputCls =
  "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100";

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

const DocGrid = ({ files, onRemove }) => {
  if (!files.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file, i) => (
        <div key={i} className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700">
          <FileText size={12} className="text-blue-500" />
          <span className="max-w-[120px] truncate">{file.name}</span>
          <button type="button" onClick={() => onRemove(i)} className="text-slate-400 hover:text-red-500">
            <X size={10} />
          </button>
        </div>
      ))}
    </div>
  );
};

const UploadZone = ({ id, label, hint, accept = "image/*", onChange }) => (
  <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center">
    <Upload size={22} className="mx-auto text-slate-300 mb-2" />
    <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
    {hint && <p className="text-xs text-slate-400 mb-3">{hint}</p>}
    <input type="file" id={id} multiple accept={accept} onChange={onChange} className="hidden" />
    <label htmlFor={id}
      className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
      <Upload size={12} /> Sélectionner
    </label>
  </div>
);

const InvestmentProductForm = ({ initial, onSave, onClose, saving }) => {
  const [form, setForm] = useState({
    title:            initial?.title            || "",
    description:      initial?.description      || "",
    project_type:     initial?.project_type     || "immobilier",
    city:             initial?.city             || "",
    location:         initial?.location         || "",
    total_investment: initial?.total_investment || "",
    min_investment:   initial?.min_investment   || "",
    expected_return:  initial?.expected_return  || "",
    duration_months:  initial?.duration_months  || "",
    status:           initial?.status           || "open",
    start_date:       initial?.start_date       || "",
    end_date:         initial?.end_date         || "",
  });

  const [images, setImages]     = useState([]);
  const [planFiles, setPlanFiles] = useState([]);
  const [render3d, setRender3d] = useState([]);
  const [documents, setDocuments] = useState([]);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const addFiles   = (setter) => (e) => setter((p) => [...p, ...Array.from(e.target.files)]);
  const removeFile = (setter) => (i) => setter((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form, images, planFiles, render3d, documents);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {initial ? "Modifier l'opportunité" : "Ajouter une opportunité d'investissement"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Visible après validation par notre équipe</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="divide-y divide-slate-100">

          {/* Informations générales */}
          <div className="px-6 py-5 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <FileText size={14} /> Informations générales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Titre du projet *</label>
                <input required value={form.title} onChange={(e) => set("title", e.target.value)}
                  placeholder="Ex : Résidence Prestige — Investissement locatif Dakar"
                  className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Type de projet *</label>
                <select required value={form.project_type} onChange={(e) => set("project_type", e.target.value)} className={inputCls}>
                  <option value="immobilier">Immobilier résidentiel</option>
                  <option value="construction">Construction</option>
                  <option value="renovation">Rénovation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Statut</label>
                <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
                  <option value="open">Ouvert aux investisseurs</option>
                  <option value="in_progress">En cours</option>
                  <option value="closed">Fermé</option>
                  <option value="completed">Terminé</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description *</label>
                <textarea required rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                  placeholder="Décrivez l'opportunité d'investissement, le marché visé, les garanties..."
                  className={`${inputCls} resize-none`} />
              </div>
            </div>
          </div>

          {/* Données financières */}
          <div className="px-6 py-5 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <TrendingUp size={14} /> Données financières
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Investissement total (XOF) *</label>
                <input required type="number" value={form.total_investment} onChange={(e) => set("total_investment", e.target.value)}
                  placeholder="Ex : 500 000 000" className={inputCls} min="0" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Ticket minimum (XOF)</label>
                <input type="number" value={form.min_investment} onChange={(e) => set("min_investment", e.target.value)}
                  placeholder="Ex : 5 000 000" className={inputCls} min="0" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Rendement attendu (%)</label>
                <input type="number" step="0.1" value={form.expected_return} onChange={(e) => set("expected_return", e.target.value)}
                  placeholder="Ex : 8.5" className={inputCls} min="0" max="100" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Durée (mois)</label>
                <input type="number" value={form.duration_months} onChange={(e) => set("duration_months", e.target.value)}
                  placeholder="Ex : 24" className={inputCls} min="1" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date de début</label>
                <input type="date" value={form.start_date} onChange={(e) => set("start_date", e.target.value)} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date de clôture</label>
                <input type="date" value={form.end_date} onChange={(e) => set("end_date", e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>

          {/* Localisation */}
          <div className="px-6 py-5 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <MapPin size={14} /> Localisation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Ville *</label>
                <input required value={form.city} onChange={(e) => set("city", e.target.value)}
                  placeholder="Ex : Dakar" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Localisation précise</label>
                <input value={form.location} onChange={(e) => set("location", e.target.value)}
                  placeholder="Ex : Almadies, Point E" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Documents & Visuels */}
          <div className="px-6 py-5 space-y-5">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <Upload size={14} /> Documents & Visuels
            </h4>
            <div className="space-y-3">
              <UploadZone id="inv-docs" label="Documents (prospectus, études)"
                hint="PDF, Excel, PowerPoint..."
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={addFiles(setDocuments)} />
              <DocGrid files={documents} onRemove={removeFile(setDocuments)} />
            </div>
            <div className="space-y-3">
              <UploadZone id="inv-images" label="Images du projet *"
                hint="Visuels, photos du site, rendus..."
                onChange={addFiles(setImages)} />
              <ImageGrid files={images} onRemove={removeFile(setImages)} label="Images" />
            </div>
            <div className="space-y-3">
              <UploadZone id="inv-plans" label="Plans"
                hint="Plans architecturaux, plans de masse..."
                accept="image/*,.pdf"
                onChange={addFiles(setPlanFiles)} />
              <ImageGrid files={planFiles} onRemove={removeFile(setPlanFiles)} label="Plans" />
            </div>
            <div className="space-y-3">
              <UploadZone id="inv-3d" label="Rendus 3D"
                hint="Visualisations et projections..."
                accept="image/*,.pdf"
                onChange={addFiles(setRender3d)} />
              <ImageGrid files={render3d} onRemove={removeFile(setRender3d)} label="Rendus 3D" />
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2 transition-colors">
              {saving ? <><Loader2 size={15} className="animate-spin" /> Envoi...</> : "Soumettre pour validation"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default InvestmentProductForm;
