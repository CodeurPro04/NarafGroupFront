import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, Globe, Mail, MapPin, Phone, Package, ShieldCheck } from "lucide-react";
import { getPartnerById } from "../api/axios";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";

const PartnerDetails = () => {
  const { uuid } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPartner = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPartnerById(uuid);
        const payload = response?.data?.data ?? response?.data ?? null;
        const data = payload?.data || payload;

        if (isMounted) {
          setPartner(data || null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Partenaire introuvable ou indisponible.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPartner();

    return () => {
      isMounted = false;
    };
  }, [uuid]);

  const serviceOffers = useMemo(() => {
    if (Array.isArray(partner?.service_offers) && partner.service_offers.length > 0) {
      return partner.service_offers;
    }
    return Array.isArray(partner?.services) ? partner.services : [];
  }, [partner]);

  const productShowcase = useMemo(() => {
    if (Array.isArray(partner?.product_showcase)) {
      return partner.product_showcase.filter((item) => item?.title || item?.description);
    }
    return [];
  }, [partner]);

  const heroTitle = partner?.profile_title || `A propos de ${partner?.company_name || "ce partenaire"}`;
  const heroDescription = partner?.profile_description || partner?.description || "Aucune description detaillee disponible.";
  const coverImage = [
    partner?.cover_image_url,
    partner?.cover_image_path,
    partner?.logo_url,
    partner?.logo_path,
    partner?.logo?.file_path,
  ]
    .map(toMediaUrl)
    .find(Boolean);

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="pt-24 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="mt-5 space-y-3">
              <SkeletonBlock className="h-10 w-80" />
              <SkeletonBlock className="h-5 w-[28rem]" />
            </div>
          ) : (
            <div className="mt-4">
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">{partner?.company_name || "Partenaire"}</h1>
              <p className="mt-3 text-slate-600 text-lg">{partner?.company_type || "Entreprise partenaire"}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && <p className="text-red-600">{error}</p>}

          {!error && loading && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8">
                <SkeletonBlock className="h-[320px] sm:h-[460px] w-full" />
                <div className="space-y-4">
                  <SkeletonBlock className="h-10 w-4/5" />
                  <SkeletonBlock className="h-6 w-full" />
                  <SkeletonBlock className="h-6 w-11/12" />
                  <SkeletonBlock className="h-6 w-3/4" />
                  <SkeletonBlock className="h-12 w-60 mt-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SkeletonBlock className="h-52 w-full" />
                <SkeletonBlock className="h-52 w-full" />
                <SkeletonBlock className="h-52 w-full" />
              </div>
            </div>
          )}

          {!error && !loading && partner && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8">
                <div>
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={partner.company_name}
                      className="w-full h-[320px] sm:h-[460px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[320px] sm:h-[460px] bg-slate-100 flex items-center justify-center">
                      <Building2 className="h-10 w-10 text-slate-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{heroTitle}</h2>
                  <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">{heroDescription}</p>

                  {/*<div className="space-y-2 text-sm text-slate-600">
                    <p className="inline-flex items-center gap-2">
                      <MapPin size={16} className="text-blue-600" />{' '}
                      {[partner.address, partner.city].filter(Boolean).join(", ") || "Adresse non renseignee"}
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Phone size={16} className="text-blue-600" />{' '}
                      {partner.phone || "Telephone non renseigne"}
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Mail size={16} className="text-blue-600" />
                      {partner.email || "Email non renseigne"}
                    </p>
                    site web 
                    <p className="inline-flex items-center gap-2">
                      <Globe size={16} className="text-blue-600" />
                      {partner.website || "Site web non renseigne"}
                    </p> 
                  </div> */}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck size={22} className="text-blue-600" />
                    Services proposes
                  </h3>
                  {serviceOffers.length === 0 ? (
                    <p className="mt-4 text-slate-600">Aucun service detaille pour le moment.</p>
                  ) : (
                    <ul className="mt-4 space-y-3 text-slate-700">
                      {serviceOffers.map((service, index) => (
                        <li key={`${service}-${index}`} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 bg-blue-600 rounded-full" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-white border border-slate-200 p-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Package size={22} className="text-blue-600" />
                    Produits
                  </h3>
                  {productShowcase.length === 0 ? (
                    <p className="mt-4 text-slate-600">Aucun produit detaille pour le moment.</p>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {productShowcase.map((product, index) => (
                        <div key={`${product.title}-${index}`} className="p-4 bg-slate-50 border border-slate-200">
                          <p className="font-semibold text-slate-900">{product.title || `Produit ${index + 1}`}</p>
                          <p className="mt-2 text-sm text-slate-600">{product.description || "Description indisponible."}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PartnerDetails;
