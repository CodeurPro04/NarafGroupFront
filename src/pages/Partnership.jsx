import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
 applyPartnership,
 getCurrentUser,
 getMyPartnership,
 isAuthenticated,
 updatePartnership,
} from "../api/axios";
import { SkeletonBlock } from "../components/ui/Skeleton";
import {
 ArrowRight,
 BadgeCheck,
 Building2,
 Globe2,
 Hammer,
 Landmark,
 Mail,
 MapPin,
 Phone,
 ShieldCheck,
 Upload,
} from "lucide-react";

const partnerTypes = {
 immobilier: {
  key: "immobilier",
  title: "Partenaire immobilier",
  backendValue: "Partenaire immobilier",
  shortTitle: "Immobilier",
  helper:
   "Pour les agences, promoteurs, commercialisateurs, operateurs et experts de transaction.",
  servicesLabel: "Biens, programmes ou services proposes",
  servicesPlaceholder:
   "Transactions residentielles\nCommercialisation de programmes neufs\nRecherche fonciere\nGestion locative",
  certificationsLabel: "References, agrements ou zones couvertes",
  certificationsPlaceholder:
   "Carte professionnelle\nZones d'intervention\nPromotions deja commercialisees",
  descriptionLabel: "Presentation de votre activite immobiliere",
  descriptionPlaceholder:
   "Decrivez votre positionnement, vos typologies de biens, votre couverture geographique et la valeur ajoutee de votre equipe.",
  icon: Building2,
 },
 constructeur: {
  key: "constructeur",
  title: "Partenaire constructeur",
  backendValue: "Partenaire constructeur",
  shortTitle: "Constructeur",
  helper:
   "Pour les entreprises de construction, maitres d'oeuvre, BET, artisans et equipes chantier.",
  servicesLabel: "Corps de metier, expertises ou prestations proposees",
  servicesPlaceholder:
   "Construction gros oeuvre\nSecond oeuvre\nMaitrise d'oeuvre\nBureau d'etudes techniques",
  certificationsLabel: "Certifications, references chantier ou zones d'intervention",
  certificationsPlaceholder:
   "Certifications qualite\nProjets livres\nMateriel et capacites chantier",
  descriptionLabel: "Presentation de votre activite construction",
  descriptionPlaceholder:
   "Presentez vos specialites, vos equipes, vos references chantier, vos capacites de mobilisation et votre approche qualite/ESG.",
  icon: Hammer,
 },
 financier: {
  key: "financier",
  title: "Partenaire financier",
  backendValue: "Partenaire financier",
  shortTitle: "Financier",
  helper:
   "Pour les banques, fintechs, fonds, family offices et partenaires de structuration.",
  servicesLabel: "Produits, solutions ou instruments financiers proposes",
  servicesPlaceholder:
   "Dette senior\nMezzanine\nSPV\nGaranties et risk-sharing",
  certificationsLabel: "Agrements, tickets ou secteurs cibles",
  certificationsPlaceholder:
   "Agrement regulatoire\nTickets cibles\nSecteurs finances\nGeographies couvertes",
  descriptionLabel: "Presentation de votre activite financiere",
  descriptionPlaceholder:
   "Expliquez vos solutions de financement, vos criteres d'intervention, vos tickets, vos geographies et votre approche de gouvernance.",
  icon: Landmark,
 },
};

const detectPartnerType = (value) => {
 const normalized = (value || "").toLowerCase();
 if (normalized.includes("construct")) return "constructeur";
 if (
  normalized.includes("finan") ||
  normalized.includes("bank") ||
  normalized.includes("banq") ||
  normalized.includes("fonds") ||
  normalized.includes("invest")
 ) {
  return "financier";
 }
 if (normalized.includes("immob")) return "immobilier";
 return "";
};

const parseList = (value) =>
 value
  .split("\n")
  .map((item) => item.trim())
  .filter(Boolean);

const EmptyFormState = () => ({
 company_name: "",
 registration_number: "",
 tax_number: "",
 address: "",
 city: "",
 phone: "",
 email: "",
 website: "",
 description: "",
 services: "",
 certifications: "",
});

const Field = ({ label, children, hint }) => (
 <label className="block">
  <span className="text-sm font-medium text-slate-700">{label}</span>
  {children}
  {hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
 </label>
);

const inputClassName =
 "mt-2 w-full border border-[#d7dde8] bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-[#0f62c9] focus:ring-4 focus:ring-[#0f62c9]/10";

const Partnership = () => {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const [application, setApplication] = useState(null);
 const [selectedType, setSelectedType] = useState("");
 const [logoFile, setLogoFile] = useState(null);
 const [formData, setFormData] = useState(EmptyFormState);

 const user = getCurrentUser();
 const authenticated = isAuthenticated();
 const isCompany =
  user?.role === "entreprise" || user?.role_name === "entreprise";

 useEffect(() => {
  const loadApplication = async () => {
   if (!authenticated) {
    setLoading(false);
    return;
   }
   try {
    const response = await getMyPartnership();
    const payload = response?.data?.data ?? response?.data ?? null;
    if (payload) {
     setApplication(payload);
     setSelectedType(detectPartnerType(payload.company_type) || "immobilier");
     setFormData({
      company_name: payload.company_name || "",
      registration_number: payload.registration_number || "",
      tax_number: payload.tax_number || "",
      address: payload.address || "",
      city: payload.city || "",
      phone: payload.phone || "",
      email: payload.email || "",
      website: payload.website || "",
      description: payload.description || "",
      services: Array.isArray(payload.services)
       ? payload.services.join("\n")
       : "",
      certifications: Array.isArray(payload.certifications)
       ? payload.certifications.join("\n")
       : "",
     });
    }
   } catch (err) {
    console.error("Erreur chargement partenariat:", err);
   } finally {
    setLoading(false);
   }
  };

  loadApplication();
 }, [authenticated]);

 const currentType = useMemo(
  () => partnerTypes[selectedType] || null,
  [selectedType],
 );
 const CurrentTypeIcon = currentType?.icon;

 const statusLabel = useMemo(() => {
  if (application?.status === "approved") return "Approuve";
  if (application?.status === "rejected") return "Rejete";
  if (application?.status === "pending") return "En attente";
  if (application?.status === "suspended") return "Suspendu";
  return "Non soumis";
 }, [application?.status]);

 const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
 };

 const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");
  setSuccess("");

  if (!authenticated) {
   setError("Veuillez vous connecter pour soumettre votre demande.");
   return;
  }

  if (!isCompany) {
   setError(
    "Votre compte doit etre de type entreprise pour soumettre une demande.",
   );
   return;
  }

  if (!currentType) {
   setError("Choisissez d'abord un type de partenaire.");
   return;
  }

  setSaving(true);

  const payload = new FormData();
  payload.append("company_name", formData.company_name);
  payload.append("company_type", currentType.backendValue);
  if (formData.registration_number) {
   payload.append("registration_number", formData.registration_number);
  }
  if (formData.tax_number) payload.append("tax_number", formData.tax_number);
  if (formData.address) payload.append("address", formData.address);
  if (formData.city) payload.append("city", formData.city);
  if (formData.phone) payload.append("phone", formData.phone);
  if (formData.email) payload.append("email", formData.email);
  if (formData.website) payload.append("website", formData.website);
  if (formData.description) payload.append("description", formData.description);
  parseList(formData.services).forEach((item) => payload.append("services[]", item));
  parseList(formData.certifications).forEach((item) =>
   payload.append("certifications[]", item),
  );
  if (logoFile) payload.append("logo", logoFile);

  try {
   if (application?.uuid) {
    const response = await updatePartnership(payload);
    const data = response?.data?.data ?? response?.data ?? null;
    setApplication(data || application);
    setSuccess("Demande mise a jour avec succes.");
   } else {
    const response = await applyPartnership(payload);
    const data = response?.data?.data ?? response?.data ?? null;
    setApplication(data || null);
    setSuccess("Demande envoyee avec succes.");
   }
  } catch (err) {
   console.error("Erreur soumission partenariat:", err);
   setError(err.response?.data?.message || "Une erreur est survenue.");
  } finally {
   setSaving(false);
  }
 };

 if (loading) {
  return (
   <section className="min-h-screen bg-[#f5f7fb] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl space-y-8">
     <div className="space-y-4 text-center">
      <SkeletonBlock className="mx-auto h-6 w-32 " />
      <SkeletonBlock className="mx-auto h-10 w-96" />
      <SkeletonBlock className="mx-auto h-5 w-[32rem]" />
     </div>
     <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, idx) => (
       <SkeletonBlock key={idx} className="h-44 w-full " />
      ))}
     </div>
     <div className=" bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
      <div className="grid gap-5 md:grid-cols-2">
       {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="space-y-3">
         <SkeletonBlock className="h-4 w-36" />
         <SkeletonBlock className="h-12 w-full " />
        </div>
       ))}
       <div className="md:col-span-2 space-y-3">
        <SkeletonBlock className="h-4 w-52" />
        <SkeletonBlock className="h-32 w-full " />
       </div>
      </div>
     </div>
    </div>
   </section>
  );
 }

 return (
  <div className="min-h-screen bg-[#f5f7fb] pt-24 text-slate-950">
   <section className="px-4 pb-10 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl text-center">
     <div className="inline-flex items-center border border-[#d8dfeb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
      Etape 1 sur 2
     </div>
     <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-[3.2rem]">
      Choisissez votre type de partenaire.
     </h1>
     <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
      Selectionnez le profil qui correspond a votre activite pour afficher un formulaire adapte a votre candidature ABI.
     </p>

     <div className="mt-10 grid gap-4 md:grid-cols-3">
      {Object.values(partnerTypes).map((type) => {
       const Icon = type.icon;
       const isActive = selectedType === type.key;
       return (
        <button
         key={type.key}
         type="button"
         onClick={() => setSelectedType(type.key)}
         className={` border bg-white px-6 py-7 text-left transition-all duration-200 ${
          isActive
           ? "border-[#0f62c9] shadow-[0_20px_48px_rgba(15,98,201,0.16)] ring-2 ring-[#0f62c9]/12"
           : "border-[#d8dfeb] hover:border-[#bfc8d8] hover:shadow-[0_18px_36px_rgba(15,23,42,0.05)]"
         }`}
        >
         <div className="flex items-center justify-between">
          <div className={`flex h-12 w-12 items-center justify-center ${
           isActive ? "bg-[#0f62c9] text-white" : "bg-[#edf4ff] text-[#0f62c9]"
          }`}>
           <Icon size={20} />
          </div>
          {isActive ? (
           <span className=" bg-[#eef5ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f62c9]">
            Selectionne
           </span>
          ) : null}
         </div>
         <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          {type.shortTitle}
         </h2>
         <p className="mt-3 text-sm leading-7 text-slate-600">{type.helper}</p>
        </button>
       );
      })}
     </div>
    </div>
   </section>

   <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
    <div className="mx-auto max-w-4xl">
     <div className="mb-6 text-center">
      <div className="inline-flex items-center border border-[#d8dfeb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
       Etape 2 sur 2
      </div>
      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2.6rem]">
       {currentType
        ? `Renseignez votre candidature ${currentType.shortTitle.toLowerCase()}.`
        : "Renseignez votre candidature partenaire."}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
       {currentType
        ? `Le formulaire est configure pour un partenaire ${currentType.shortTitle.toLowerCase()} tout en restant compatible avec l'API actuelle.`
        : "Selectionnez d'abord un type de partenaire pour continuer."}
      </p>
     </div>

     {!authenticated ? (
      <div className="mb-6 border border-[#d4e3ff] bg-[#f7fbff] px-6 py-5 text-center text-sm text-[#0f62c9]">
       Vous devez etre connecte pour soumettre une candidature.
       <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
         type="button"
         onClick={() => navigate("/login")}
         className=" bg-[#0f62c9] px-5 py-2.5 font-semibold text-white"
        >
         Se connecter
        </button>
        <button
         type="button"
         onClick={() => navigate("/register?role=entreprise")}
         className=" border border-[#b9d1ff] bg-white px-5 py-2.5 font-semibold text-[#0f62c9]"
        >
         Creer un compte entreprise
        </button>
       </div>
      </div>
     ) : null}

     {authenticated && !isCompany ? (
      <div className="mb-6 border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-700">
       Votre compte doit etre de type entreprise pour deposer une candidature partenaire.
      </div>
     ) : null}

     {error ? (
      <div className="mb-6 border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-600">
       {error}
      </div>
     ) : null}

     {success ? (
      <div className="mb-6 border border-emerald-200 bg-emerald-50 px-6 py-5 text-sm text-emerald-600">
       {success}
      </div>
     ) : null}

     {!currentType ? (
      <div className=" border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center text-sm leading-7 text-slate-500">
       Choisissez votre types de partnaire pour afficher le formulaire.
      </div>
     ) : (
      <form onSubmit={handleSubmit} className=" border border-[#d8dfeb] bg-white px-6 py-7 shadow-[0_20px_55px_rgba(15,23,42,0.05)] sm:px-8 sm:py-8">
       <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-[#f8fbff] px-5 py-4">
        <div className="flex items-center gap-3">
         <div className="flex h-11 w-11 items-center justify-center bg-[#0f62c9] text-white">
          {CurrentTypeIcon ? <CurrentTypeIcon size={18} /> : null}
         </div>
         <div>
          <p className="text-sm font-semibold text-slate-950">{currentType.title}</p>
          <p className="text-xs text-slate-500">Statut actuel : {statusLabel}</p>
         </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
         <BadgeCheck size={14} />
         {currentType.backendValue}
        </div>
       </div>

       <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
         <Field label="Nom de l'entreprise">
          <input
           type="text"
           name="company_name"
           value={formData.company_name}
           onChange={handleChange}
           className={inputClassName}
           required
          />
         </Field>
        </div>

        <Field label="Numero d'enregistrement">
         <input
          type="text"
          name="registration_number"
          value={formData.registration_number}
          onChange={handleChange}
          className={inputClassName}
         />
        </Field>

        <Field label="Numero fiscal">
         <input
          type="text"
          name="tax_number"
          value={formData.tax_number}
          onChange={handleChange}
          className={inputClassName}
         />
        </Field>

        <Field label="Ville ou hub principal">
         <div className="relative">
          <MapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
           type="text"
           name="city"
           value={formData.city}
           onChange={handleChange}
           className={`${inputClassName} pl-11`}
          />
         </div>
        </Field>

        <Field label="Telephone">
         <div className="relative">
          <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
           type="text"
           name="phone"
           value={formData.phone}
           onChange={handleChange}
           className={`${inputClassName} pl-11`}
          />
         </div>
        </Field>

        <Field label="Email professionnel">
         <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
           type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           className={`${inputClassName} pl-11`}
          />
         </div>
        </Field>

        <Field label="Site web ou page de presentation">
         <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className={inputClassName}
         />
        </Field>

        <div className="md:col-span-2">
         <Field label="Adresse">
          <input
           type="text"
           name="address"
           value={formData.address}
           onChange={handleChange}
           className={inputClassName}
          />
         </Field>
        </div>

        <div className="md:col-span-2">
         <Field label={currentType.servicesLabel} hint="Un element par ligne.">
          <textarea
           name="services"
           value={formData.services}
           onChange={handleChange}
           rows={4}
           placeholder={currentType.servicesPlaceholder}
           className={`${inputClassName} min-h-[138px] resize-y`}
          />
         </Field>
        </div>

        <div className="md:col-span-2">
         <Field label={currentType.certificationsLabel} hint="Un element par ligne.">
          <textarea
           name="certifications"
           value={formData.certifications}
           onChange={handleChange}
           rows={4}
           placeholder={currentType.certificationsPlaceholder}
           className={`${inputClassName} min-h-[138px] resize-y`}
          />
         </Field>
        </div>

        <div className="md:col-span-2">
         <Field label={currentType.descriptionLabel}>
          <textarea
           name="description"
           value={formData.description}
           onChange={handleChange}
           rows={6}
           placeholder={currentType.descriptionPlaceholder}
           className={`${inputClassName} min-h-[170px] resize-y`}
          />
         </Field>
        </div>

        <div className="md:col-span-2">
         <Field
          label="Logo ou visuel de votre structure"
          hint={
           logoFile
            ? `Fichier selectionne : ${logoFile.name}`
            : "Format image recommande. Ce champ reste optionnel."
          }
         >
          <label className="mt-2 flex cursor-pointer items-center justify-between border border-dashed border-[#cdd5e2] bg-[#fafbfd] px-5 py-4 transition hover:border-[#0f62c9] hover:bg-[#f6faff]">
           <div>
            <p className="text-sm font-medium text-slate-700">Ajouter un logo</p>
            <p className="mt-1 text-xs text-slate-500">PNG, JPG ou WebP</p>
           </div>
           <div className="flex h-10 w-10 items-center justify-center bg-white text-[#0f62c9] shadow-sm">
            <Upload size={18} />
           </div>
           <input
            type="file"
            accept="image/*"
            onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
            className="hidden"
           />
          </label>
         </Field>
        </div>
       </div>

       <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#e4e8ef] pt-6 sm:flex-row">
        <p className="text-center text-xs leading-6 text-slate-500 sm:text-left">
         ABI transmet votre candidature avec le type <span className="font-semibold text-slate-700">{currentType.backendValue}</span>.
        </p>
        <button
         type="submit"
         disabled={saving || loading || !authenticated || !isCompany}
         className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4fa5] disabled:cursor-not-allowed disabled:opacity-60"
        >
         {saving ? "Envoi en cours..." : application ? "Mettre a jour la demande" : "Envoyer la demande"}
         <ArrowRight size={16} />
        </button>
       </div>
      </form>
     )}
    </div>
   </section>
  </div>
 );
};

export default Partnership;
