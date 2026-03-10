import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getHouseModels } from "../api/axios";
import { toMediaUrl } from "../utils/media";
import { findShowcaseSection } from "../utils/showcaseArticles";

const ShowcaseArticlesList = () => {
  const { sectionKey } = useParams();
  if (sectionKey === "besoin-bien") {
    return <Navigate to="/properties" replace />;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [section, setSection] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getHouseModels();
        const payload = response?.data ?? {};
        const sections = payload?.section?.showcase_sections ?? [];
        const selectedSection = findShowcaseSection(sections, sectionKey);

        if (isMounted) {
          setSection(selectedSection);
          if (!selectedSection) {
            setError("Section introuvable.");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Impossible de charger les articles.");
          setSection(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [sectionKey]);

  const items = useMemo(() => (Array.isArray(section?.items) ? section.items : []), [section]);

  return (
    <div className="min-h-screen bg-slate-50 pt-10 sm:pt-12">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Retour a l'accueil
          </Link>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            {section?.title || "Articles"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
            Retrouvez ici l'ensemble des contenus publies pour cette section.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-slate-500">Chargement des articles...</p>
          ) : error ? (
            <div className="border border-rose-100 bg-rose-50 p-6 text-rose-700">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="border border-slate-200 bg-white p-6 text-slate-600">
              Aucun article disponible pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => {
                const imageUrl = toMediaUrl(item?.image_url) || item?.image_url;
                return (
                  <article
                    key={`${item?.slug || "article"}-${index}`}
                    className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link to={item?.details_link || "#"} className="block">
                      <div className="h-52 overflow-hidden bg-slate-100">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item?.title || "Article"}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                            Image a ajouter
                          </div>
                        )}
                      </div>
                      <div className="space-y-3 p-5">
                        <h2 className="line-clamp-2 text-xl font-semibold text-slate-900">
                          {item?.title || "Titre a renseigner"}
                        </h2>
                        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                          {item?.excerpt || "Resume a renseigner depuis l'espace administrateur."}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                          Lire l'article
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShowcaseArticlesList;
