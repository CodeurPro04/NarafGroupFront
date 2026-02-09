import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  applyPartnership,
  updatePartnership,
  getMyPartnership,
  getCurrentUser,
  isAuthenticated,
} from "../api/axios";
import { SkeletonBlock } from "../components/ui/Skeleton";
const Partnership = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [application, setApplication] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const user = getCurrentUser();
  const authenticated = isAuthenticated();
  const isCompany =
    user?.role === "entreprise" || user?.role_name === "entreprise";
  const [formData, setFormData] = useState({
    company_name: "",
    company_type: "",
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
          setFormData({
            company_name: payload.company_name || "",
            company_type: payload.company_type || "",
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
  const parseList = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
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
    setSaving(true);
    const payload = new FormData();
    payload.append("company_name", formData.company_name);
    payload.append("company_type", formData.company_type);
    if (formData.registration_number)
      payload.append("registration_number", formData.registration_number);
    if (formData.tax_number) payload.append("tax_number", formData.tax_number);
    if (formData.address) payload.append("address", formData.address);
    if (formData.city) payload.append("city", formData.city);
    if (formData.phone) payload.append("phone", formData.phone);
    if (formData.email) payload.append("email", formData.email);
    if (formData.website) payload.append("website", formData.website);
    if (formData.description)
      payload.append("description", formData.description);
    parseList(formData.services).forEach((item) =>
      payload.append("services[]", item),
    );
    parseList(formData.certifications).forEach((item) =>
      payload.append("certifications[]", item),
    );
    if (logoFile) {
      payload.append("logo", logoFile);
    }
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
      const message = err.response?.data?.message || "Une erreur est survenue.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <section className="pt-28 pb-16 bg-gray-50 min-h-screen">
        {" "}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {" "}
          <div className="bg-white shadow-md p-6 md:p-10">
            {" "}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {" "}
              <div className="space-y-3">
                {" "}
                <SkeletonBlock className="h-8 w-56" />{" "}
                <SkeletonBlock className="h-4 w-80" />{" "}
              </div>{" "}
              <SkeletonBlock className="h-6 w-28" />{" "}
            </div>{" "}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={`partner-skeleton-${idx}`} className="space-y-3">
                  {" "}
                  <SkeletonBlock className="h-4 w-40" />{" "}
                  <SkeletonBlock className="h-11 w-full" />{" "}
                </div>
              ))}{" "}
              <div className="md:col-span-2 space-y-3">
                {" "}
                <SkeletonBlock className="h-4 w-44" />{" "}
                <SkeletonBlock className="h-28 w-full" />{" "}
              </div>{" "}
              <div className="md:col-span-2 space-y-3">
                {" "}
                <SkeletonBlock className="h-4 w-44" />{" "}
                <SkeletonBlock className="h-28 w-full" />{" "}
              </div>{" "}
              <div className="md:col-span-2 flex justify-end">
                {" "}
                <SkeletonBlock className="h-11 w-40" />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    );
  }
  const getStatusLabel = (status) => {
    if (status === "approved") return "Approuve";
    if (status === "rejected") return "Rejete";
    if (status === "pending") return "En attente";
    if (status === "suspended") return "Suspendu";
    return "Non soumis";
  };
  return (
    <section className="pt-28 pb-16 bg-gray-50 min-h-screen">
      {" "}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="bg-white shadow-md p-6 md:p-10">
          {" "}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {" "}
            <div>
              {" "}
              <h1 className="text-3xl font-semibold text-gray-900">
                Devenir partenaire
              </h1>{" "}
              <p className="text-sm text-gray-500 mt-2">
                {" "}
                Partagez vos informations pour construire un partenariat durable
                avec Naraf.{" "}
              </p>{" "}
            </div>{" "}
            {application?.status && (
              <span className="inline-flex px-3 py-1 text-xs bg-blue-50 text-blue-600">
                {" "}
                {getStatusLabel(application.status)}{" "}
              </span>
            )}{" "}
          </div>{" "}
          {!authenticated && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 text-sm text-blue-700">
              {" "}
              Vous devez etre connecte pour soumettre une demande.{" "}
              <div className="mt-3 flex flex-wrap gap-3">
                {" "}
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-blue-600 text-white text-sm"
                >
                  {" "}
                  Se connecter{" "}
                </button>{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm"
                >
                  {" "}
                  Creer un compte{" "}
                </button>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {authenticated && !isCompany && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 text-sm text-amber-700">
              {" "}
              Votre compte doit etre de type entreprise pour deposer une
              candidature.{" "}
            </div>
          )}{" "}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-sm text-red-600">
              {" "}
              {error}{" "}
            </div>
          )}{" "}
          {success && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 text-sm text-emerald-600">
              {" "}
              {success}{" "}
            </div>
          )}{" "}
          <form
            onSubmit={handleSubmit}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {" "}
            <div className="md:col-span-2">
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Nom de l'entreprise
              </label>{" "}
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Type d'entreprise
              </label>{" "}
              <input
                type="text"
                name="company_type"
                value={formData.company_type}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
                placeholder="Immobilier, construction, architecture..."
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Numero d'enregistrement
              </label>{" "}
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Numero fiscal
              </label>{" "}
              <input
                type="text"
                name="tax_number"
                value={formData.tax_number}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Ville
              </label>{" "}
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div className="md:col-span-2">
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Adresse
              </label>{" "}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Telephone
              </label>{" "}
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>{" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Site web
              </label>{" "}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>{" "}
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setLogoFile(event.target.files?.[0] || null)
                }
                className="mt-2 w-full text-sm"
              />{" "}
            </div>{" "}
            <div className="md:col-span-2">
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Services proposes (un par ligne)
              </label>{" "}
              <textarea
                name="services"
                value={formData.services}
                onChange={handleChange}
                rows={3}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div className="md:col-span-2">
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Certifications (un par ligne)
              </label>{" "}
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                rows={3}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div className="md:col-span-2">
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>{" "}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full border border-gray-200 px-4 py-3 text-sm"
              />{" "}
            </div>{" "}
            <div className="md:col-span-2 flex justify-end">
              {" "}
              <button
                type="submit"
                disabled={saving || loading}
                className="px-6 py-3 bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-60"
              >
                {" "}
                {saving
                  ? "Envoi en cours..."
                  : application
                    ? "Mettre a jour"
                    : "Envoyer la demande"}{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default Partnership;
