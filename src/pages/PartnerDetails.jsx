import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, Package, ShieldCheck, Banknote, HardHat, Home, MapPin, Maximize2, BedDouble, Percent, Calendar, Camera, FileText, Box, ChevronLeft, ChevronRight, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { getPartnerById } from "../api/axios";
import api from "../api/axios";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";

/* ─── Détecte le kind du partenaire ─────────────────── */
const resolveKind = (companyType) => {
  const t = (companyType || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (t.includes("jurid") || t.includes("notair") || t.includes("avocat") || t.includes("huissier")) return "juridique";
  if (t.includes("constructeur") || t.includes("construction")) return "constructeur";
  if (t.includes("investiss")) return "investisseur";
  if (t.includes("financier"))  return "financier";
  return "immobilier";
};

/* ─── Catégorisation PartnerProduct par sous-dossier ── */
const categorizePartnerImages = (images = []) => ({
  photosList:  images.filter(url => !url.includes("/plans/") && !url.includes("/render3d/")),
  plansList:   images.filter(url => url.includes("/plans/")),
  rendersList: images.filter(url => url.includes("/render3d/")),
});

const IMG_CATEGORIES = [
  { key: "photos",  label: "Photos",    icon: Camera },
  { key: "plans",   label: "Plans",     icon: FileText },
  { key: "renders", label: "Rendus 3D", icon: Box },
];

const compactAddress = (...parts) => parts.filter(Boolean).join(", ");

const AddressBlock = ({ address, city, commune, quartier, tone = "blue" }) => {
  const label = address || compactAddress(quartier, commune, city);
  if (!label) return null;

  const toneClasses = {
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2">
      <div className="flex min-w-0 items-start gap-2">
        <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${toneClasses[tone] || toneClasses.blue}`}>
          <MapPin size={13} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Adresse
          </p>
          <p className="whitespace-normal break-words text-xs font-medium leading-5 text-slate-700">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── Galerie — accepte des listes pré-catégorisées ─── */
const ImageGallery = ({ photosList = [], plansList = [], rendersList = [], title }) => {
  const nonEmpty = IMG_CATEGORIES
    .map(cat => ({
      ...cat,
      list: cat.key === "photos" ? photosList : cat.key === "plans" ? plansList : rendersList,
    }))
    .filter(cat => cat.list.length > 0);

  const [activeCat, setActiveCat] = useState(() => nonEmpty[0]?.key || "photos");
  const [imgIndex, setImgIndex]   = useState(0);

  const showTabs   = nonEmpty.length > 1;
  const activeList = nonEmpty.find(c => c.key === activeCat)?.list || nonEmpty[0]?.list || [];
  const current    = activeList[imgIndex] || null;

  const switchCat = (key) => { setActiveCat(key); setImgIndex(0); };
  const prev = () => setImgIndex(i => (i - 1 + activeList.length) % activeList.length);
  const next = () => setImgIndex(i => (i + 1) % activeList.length);

  if (nonEmpty.length === 0) {
    return (
      <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
        <Package size={32} className="text-slate-300" />
      </div>
    );
  }

  return (
    <div>
      {/* Image principale */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-100">
        {current ? (
          <img src={current} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={32} className="text-slate-300" />
          </div>
        )}

        {/* Flèches si plusieurs images dans la catégorie */}
        {activeList.length > 1 && (
          <>
            <button type="button" onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button type="button" onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
              <ChevronRight size={14} />
            </button>
            {/* Compteur */}
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {imgIndex + 1}/{activeList.length}
            </span>
          </>
        )}

        {/* Onglets catégories — seulement si plusieurs catégories */}
        {showTabs && (
          <div className="absolute bottom-2 left-2 flex gap-1.5">
            {nonEmpty.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.key} type="button" onClick={() => switchCat(cat.key)}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full transition-all shadow
                    ${activeCat === cat.key
                      ? "bg-white text-slate-900"
                      : "bg-black/40 text-white hover:bg-black/60"
                    }`}>
                  <Icon size={10} /> {cat.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Miniatures si plusieurs images dans la catégorie active */}
      {activeList.length > 1 && (
        <div className="flex gap-1.5 px-3 pt-2 overflow-x-auto">
          {activeList.map((img, i) => (
            <button key={i} type="button" onClick={() => setImgIndex(i)}
              className={`flex-shrink-0 w-12 h-9 rounded overflow-hidden border-2 transition-all
                ${i === imgIndex ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Carte produit — gère 3 kinds ───────────────────── */
const ProductCard = ({ product }) => {
  const kind = product.kind; // "construction" | "investment" | undefined (PartnerProduct)
  const td   = product.type_data || {};

  /* ── Listes d'images selon le kind ── */
  const { photosList, plansList, rendersList } = useMemo(() => {
    if (kind === "construction") {
      return { photosList: product.images || [], plansList: product.plans || [], rendersList: product.render_3d || [] };
    }
    if (kind === "investment") {
      return { photosList: product.images || [], plansList: product.plans || [], rendersList: product.render_3d || [] };
    }
    // PartnerProduct — catégorise par sous-dossier d'URL
    return categorizePartnerImages(product.images || []);
  }, [product, kind]);

  /* ── Badge ── */
  const badge = useMemo(() => {
    if (kind === "construction") return <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full"><HardHat size={11}/>Construction</span>;
    if (kind === "investment")   return <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full"><TrendingUp size={11}/>{product.project_type || "Investissement"}</span>;
    if (td.financing_type)       return <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full"><Banknote size={11}/>{td.financing_type}</span>;
    return <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full"><Home size={11}/>{td.transaction_type || "Immobilier"}</span>;
  }, [kind, td, product]);

  /* ── Prix affiché ── */
  const priceStr = useMemo(() => {
    if (kind === "construction" && product.budget_min) {
      const min = Number(product.budget_min).toLocaleString("fr-FR");
      const max = product.budget_max ? ` – ${Number(product.budget_max).toLocaleString("fr-FR")}` : "";
      return `${min}${max} XOF`;
    }
    if (kind === "investment" && product.total_investment)
      return `${Number(product.total_investment).toLocaleString("fr-FR")} XOF`;
    if (product.price)
      return `${Number(product.price).toLocaleString("fr-FR")} ${product.currency || "XOF"}`;
    return null;
  }, [kind, product]);

  /* ── Détails spécifiques ── */
  const renderDetails = () => {
    if (kind === "construction") return (
      <>
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {product.surface_area && <div className="flex items-center gap-1 text-xs text-slate-500"><Maximize2 size={10} className="text-amber-400"/>{product.surface_area} m²</div>}
        </div>
        <AddressBlock address={product.location} city={product.city} tone="amber" />
      </>
    );
    if (kind === "investment") return (
      <>
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {product.expected_return && <div className="flex items-center gap-1 text-xs text-slate-500"><Percent size={10} className="text-emerald-500"/>{product.expected_return}% rendement</div>}
          {product.duration_months && <div className="flex items-center gap-1 text-xs text-slate-500"><Clock size={10} className="text-emerald-500"/>{product.duration_months} mois</div>}
        </div>
        <AddressBlock address={product.location} city={product.city} tone="emerald" />
      </>
    );
    // PartnerProduct
    return (
      <>
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {td.surface_area && <div className="flex items-center gap-1 text-xs text-slate-500"><Maximize2 size={10} className="text-blue-400"/>{td.surface_area} m²</div>}
          {td.bedrooms    && <div className="flex items-center gap-1 text-xs text-slate-500"><BedDouble size={10} className="text-blue-400"/>{td.bedrooms} ch.</div>}
          {td.interest_rate_min && <div className="flex items-center gap-1 text-xs text-slate-500"><Percent size={10} className="text-blue-400"/>{td.interest_rate_min}% – {td.interest_rate_max || "?"}%</div>}
        </div>
        <AddressBlock address={td.address || td.location} city={td.city} commune={td.commune} quartier={td.quartier} />
      </>
    );
  };

  const Wrapper = product.link ? Link : "div";
  const wrapperProps = product.link ? { to: product.link } : {};

  return (
    <Wrapper {...wrapperProps} className="block min-w-0 bg-white border border-slate-200 hover:shadow-md transition-shadow overflow-hidden group">
      <ImageGallery photosList={photosList} plansList={plansList} rendersList={rendersList} title={product.title} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          {badge}
          {priceStr && <span className="max-w-[48%] shrink-0 break-words text-right text-sm font-bold text-slate-900">{priceStr}</span>}
        </div>
        <h4 className="break-words font-semibold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors">{product.title}</h4>
        {product.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2 break-words">{product.description}</p>}
        {renderDetails()}
        {product.link && (
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600">
            Voir le détail <ArrowRight size={12} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const PartnerDetails = () => {
  const { uuid } = useParams();
  const [partner, setPartner] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
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

    return () => { isMounted = false; };
  }, [uuid]);

  useEffect(() => {
    // On attend que le partenaire soit chargé pour connaître son type
    if (!uuid || !partner) return;
    let mounted = true;

    const kind = resolveKind(partner.company_type);
    if (kind === "juridique") {
      setProducts([]);
      setProductsLoading(false);
      return () => { mounted = false; };
    }
    const endpoint =
      kind === "constructeur"  ? `/partnerships/${uuid}/construction` :
      kind === "investisseur"  ? `/partnerships/${uuid}/investments`  :
      `/partnerships/${uuid}/products`;

    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const res  = await api.get(endpoint);
        const list = res?.data?.data ?? [];
        if (mounted) setProducts(Array.isArray(list) ? list : []);
      } catch { if (mounted) setProducts([]); }
      finally  { if (mounted) setProductsLoading(false); }
    };

    loadProducts();
    return () => { mounted = false; };
  }, [uuid, partner]);

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

              </div>

              {/* Produits du partenaire (depuis partner_products) */}
              <div className="bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.05)] sm:p-7">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-6">
                  <Package size={22} className="text-blue-600" />
                  Nos produits & offres
                </h3>
                {productsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[0,1,2].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded"/>)}
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-slate-500 text-sm">Aucun produit publié pour le moment.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map(product => (
                      <ProductCard key={product.uuid} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      </section>
    </div>);

};

export default PartnerDetails;
