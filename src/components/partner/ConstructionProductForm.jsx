import { useState } from "react";
import { X, Upload, MapPin, FileText, HardHat, Loader2 } from "lucide-react";

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

const ConstructionProductForm = ({ initial, onSave, onClose, saving }) => {
  const [form, setForm] = useState({
    title:       initial?.title       || "",
    description: initial?.description || "",
    budget_min:  initial?.budget_min  || "",
    budget_max:  initial?.budget_max  || "",
    surface_area:initial?.surface_area|| "",
    city:        initial?.city        || "",
    location:    initial?.location    || "",
  });

  const [images, setImages]       = useState([]);
  const [planFiles, setPlanFiles] = useState([]);
  const [render3d, setRender3d]   = useState([]);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const addFiles  = (setter) => (e) => setter((p) => [...p, ...Array.from(e.target.files)]);
  const removeFile = (setter) => (i) => setter((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form, images, planFiles, render3d);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {initial ? "Modifier le projet" : "Ajouter un projet de construction"}
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
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Titre du projet *</label>
              <input required value={form.title} onChange={(e) => set("title", e.target.value)}
                placeholder="Ex : Résidence Les Palmiers — 24 appartements"
                className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description *</label>
              <textarea required rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Décrivez le projet de construction en détail..."
                className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* Budget & Surface */}
          <div className="px-6 py-5 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <HardHat size={14} /> Caractéristiques
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Budget minimum (XOF)</label>
                <input type="number" value={form.budget_min} onChange={(e) => set("budget_min", e.target.value)}
                  placeholder="Ex : 50 000 000" className={inputCls} min="0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Budget maximum (XOF)</label>
                <input type="number" value={form.budget_max} onChange={(e) => set("budget_max", e.target.value)}
                  placeholder="Ex : 150 000 000" className={inputCls} min="0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Surface (m²)</label>
                <input type="number" value={form.surface_area} onChange={(e) => set("surface_area", e.target.value)}
                  placeholder="Ex : 2500" className={inputCls} min="0" />
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
                  placeholder="Ex : Abidjan" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Localisation précise</label>
                <input value={form.location} onChange={(e) => set("location", e.target.value)}
                  placeholder="Ex : Cocody, Zone 4" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Visuels */}
          <div className="px-6 py-5 space-y-5">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <Upload size={14} /> Visuels du projet
            </h4>
            <div className="space-y-3">
              <UploadZone id="const-images" label="Images du projet *"
                hint="Photos du chantier, visuels d'avancement..."
                onChange={addFiles(setImages)} />
              <ImageGrid files={images} onRemove={removeFile(setImages)} label="Images" />
            </div>
            <div className="space-y-3">
              <UploadZone id="const-plans" label="Plans de construction"
                hint="Plans d'architecte, plans de masse..."
                accept="image/*,.pdf"
                onChange={addFiles(setPlanFiles)} />
              <ImageGrid files={planFiles} onRemove={removeFile(setPlanFiles)} label="Plans" />
            </div>
            <div className="space-y-3">
              <UploadZone id="const-3d" label="Représentations 3D"
                hint="Rendus architecturaux, visuels 3D..."
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

export default ConstructionProductForm;
