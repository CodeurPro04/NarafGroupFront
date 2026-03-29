import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Building2, Package, ShieldCheck } from "lucide-react";
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
  const heroDescription = partner?.profile_description || partner?.description || "Aucune description détaillée disponible.";
  const coverImage = [
  partner?.cover_image_url,
  partner?.cover_image_path,
  partner?.logo_url,
  partner?.logo_path,
  partner?.logo?.file_path].

  map(toMediaUrl).
  find(Boolean);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef2f7_38%,#ffffff_100%)]">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 pt-24 text-white">
        <div className="absolute inset-0">
          {coverImage ?
          <img
            src={coverImage}
            alt={partner?.company_name || "Partenaire"}
            className="h-full w-full object-cover" /> :


          <div className="flex h-full w-full items-center justify-center bg-slate-900">
              <Building2 className="h-16 w-16 text-white/30" />
            </div>
          }
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.78)_0%,rgba(15,23,42,0.84)_48%,rgba(15,23,42,0.92)_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          {loading ?
          <div className="mt-6 space-y-3">
              <SkeletonBlock className="h-10 w-80" />
              <SkeletonBlock className="h-5 w-[28rem]" />
            </div> :

          <div className="mt-4 max-w-4xl">
              <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
                {partner?.company_name || "Partenaire"}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/82 sm:text-lg">
                {partner?.company_type || "Entreprise partenaire"}
              </p>
            </div>
          }
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {error && <p className="text-red-600">{error}</p>}

          {!error && loading &&
          <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-6 lg:grid-cols-[1.15fr_1fr]">
                <SkeletonBlock className="h-[320px] w-full sm:h-[460px]" />
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
          }

          {!error && !loading && partner &&
          <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative overflow-hidden bg-slate-100">
                  {coverImage ?
                <img
                  src={coverImage}
                  alt={partner.company_name}
                  className="h-[320px] w-full object-cover sm:h-[460px]" /> :


                <div className="flex h-[320px] w-full items-center justify-center bg-slate-100 sm:h-[460px]">
                      <Building2 className="h-10 w-10 text-slate-400" />
                    </div>
                }
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center bg-slate-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Profil partenaire
                    </div>
                    <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
                      {heroTitle}
                    </h2>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {partner?.company_type || "Entreprise partenaire"}
                    </p>
                    <p className="mt-6 whitespace-pre-line text-base leading-7 text-slate-600 sm:text-lg">
                      {heroDescription}
                    </p>
                  </div>

                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.05)] sm:p-7">
                  <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <ShieldCheck size={22} className="text-blue-600" />
                    Services proposes
                  </h3>
                  {serviceOffers.length === 0 ?
                <p className="mt-4 text-slate-600">Aucun service détaillé pour le moment.</p> :

                <div className="mt-5 grid gap-3 text-slate-700">
                      {serviceOffers.map((service, index) =>
                  <div
                    key={`${service}-${index}`}
                    className="bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition-colors hover:bg-slate-100">

                          {service}
                        </div>
                  )}
                    </div>
                }
                </div>

                <div className="bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.05)] sm:p-7">
                  <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <Package size={22} className="text-blue-600" />
                    Produits
                  </h3>
                  {productShowcase.length === 0 ?
                <p className="mt-4 text-slate-600">Aucun produit détaillé pour le moment.</p> :

                <div className="mt-5 grid gap-4">
                      {productShowcase.map((product, index) =>
                  <div
                    key={`${product.title}-${index}`}
                    className="bg-slate-50 px-4 py-4 transition-colors hover:bg-slate-100">

                          <p className="text-base font-semibold leading-7 text-slate-900">
                            {product.title || `Produit ${index + 1}`}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            {product.description || "Description indisponible."}
                          </p>
                        </div>
                  )}
                    </div>
                }
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>);

};

export default PartnerDetails;