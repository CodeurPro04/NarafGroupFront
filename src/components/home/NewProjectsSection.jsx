import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "../../api/axios";
import { toMediaUrl } from "../../utils/media";
import { SkeletonBlock } from "../ui/Skeleton";

const FALLBACK_CONSTRUCTION =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80";
const FALLBACK_INVESTMENT =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

const NewProjectsSection = () => {
  const [construction, setConstruction] = useState({ preview: null, total: 0, list: [] });
  const [investment, setInvestment] = useState({ preview: null, total: 0, list: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [cRes, iRes] = await Promise.all([
          api.get("/construction-projects", { params: { per_page: 60 } }),
          api.get("/investments", { params: { per_page: 60 } }),
        ]);

        const cList = Array.isArray(cRes?.data?.data)
          ? cRes.data.data
          : Array.isArray(cRes?.data)
          ? cRes.data
          : [];
        const cTotal = cRes?.data?.total ?? cRes?.data?.data?.total ?? cList.length;

        const iRaw = iRes?.data?.data ?? iRes?.data ?? {};
        const iList = Array.isArray(iRaw) ? iRaw : Array.isArray(iRaw?.data) ? iRaw.data : [];
        const iTotal = iRaw?.total ?? iRes?.data?.total ?? iList.length;

        if (mounted) {
          setConstruction({ preview: cList[0] ?? null, total: cTotal, list: cList.slice(0, 3) });
          setInvestment({ preview: iList[0] ?? null, total: iTotal, list: iList.slice(0, 3) });
        }
      } catch {
        // silent fallback
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  const getConstructionImg = (p) => {
    if (!p) return FALLBACK_CONSTRUCTION;
    const imgs = Array.isArray(p.images_path) ? p.images_path : [];
    return toMediaUrl(imgs[0]) || toMediaUrl(p.cover_image) || FALLBACK_CONSTRUCTION;
  };

  const getInvestmentImg = (p) => {
    if (!p) return FALLBACK_INVESTMENT;
    const imgs = Array.isArray(p.images_path) ? p.images_path : [];
    return toMediaUrl(imgs[0]) || toMediaUrl(p.cover_image) || FALLBACK_INVESTMENT;
  };

  const totalAll = construction.total + investment.total;

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Titre principal */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase leading-tight">
            {loading
              ? "DÉCOUVREZ NOS PROJETS EN EXCLUSIVITÉ"
              : `DÉCOUVREZ PLUS DE ${totalAll > 0 ? totalAll : "50"} PROGRAMMES NEUFS`}
          </h2>
          <div className="mt-3 h-1 w-14 bg-blue-600" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-6">
                <SkeletonBlock className="w-[220px] h-[260px] flex-shrink-0" />
                <div className="flex-1 space-y-4 pt-2">
                  <SkeletonBlock className="h-6 w-5/6" />
                  <SkeletonBlock className="h-5 w-full" />
                  <SkeletonBlock className="h-5 w-4/5" />
                  <SkeletonBlock className="h-5 w-3/5" />
                  <SkeletonBlock className="h-5 w-2/5 mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Panneau Construction */}
            <div className="flex gap-6 items-stretch">
              {/* Image */}
              <div className="flex-shrink-0 w-[200px] sm:w-[240px] h-[260px] sm:h-[290px] overflow-hidden">
                <img
                  src={getConstructionImg(construction.preview)}
                  alt="Projets de construction"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Texte */}
              <div className="flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
                    Découvrez l&apos;ensemble de nos{" "}
                    <span className="text-blue-700">
                      {construction.total > 0 ? construction.total : "50"}+
                    </span>{" "}
                    projets de construction sur plan
                  </p>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed line-clamp-4">
                    {construction.preview?.short_description ||
                      construction.preview?.description ||
                      "Les meilleurs projets de construction disponibles sur la plateforme ABI en Afrique."}
                  </p>
                  {/* Noms des 3 premiers projets */}
                  {construction.list.length > 0 && (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {construction.list.map((p) => p.title).join(", ")}…
                    </p>
                  )}
                </div>
                <Link
                  to="/construction"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-700 hover:text-blue-700 transition-colors group mt-6"
                >
                  Tous les projets de construction
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* Panneau Investissement */}
            <div className="flex gap-6 items-stretch">
              {/* Image */}
              <div className="flex-shrink-0 w-[200px] sm:w-[240px] h-[260px] sm:h-[290px] overflow-hidden">
                <img
                  src={getInvestmentImg(investment.preview)}
                  alt="Projets d'investissement"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Texte */}
              <div className="flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
                    Découvrez plus de{" "}
                    <span className="text-blue-700">
                      {investment.total > 0 ? investment.total : "20"}+
                    </span>{" "}
                    opportunités d&apos;investissement en Afrique
                  </p>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed line-clamp-4">
                    {investment.preview?.short_description ||
                      investment.preview?.description ||
                      "Les meilleures opportunités pour faire fructifier votre capital sur la plateforme ABI."}
                  </p>
                  {/* Noms des 3 premières opportunités */}
                  {investment.list.length > 0 && (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {investment.list.map((p) => p.title).join(", ")}…
                    </p>
                  )}
                </div>
                <Link
                  to="/investment"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-700 hover:text-blue-700 transition-colors group mt-6"
                >
                  Toutes les opportunités d&apos;investissement
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default NewProjectsSection;
