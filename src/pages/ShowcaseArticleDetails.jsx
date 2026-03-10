import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getHouseModels } from "../api/axios";
import { toMediaUrl } from "../utils/media";
import { findShowcaseArticle, findShowcaseSection } from "../utils/showcaseArticles";

const ShowcaseArticleDetails = () => {
  const { sectionKey, articleSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [section, setSection] = useState(null);
  const [article, setArticle] = useState(null);

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
        const selectedArticle = findShowcaseArticle(selectedSection, articleSlug);

        if (isMounted) {
          setSection(selectedSection);
          setArticle(selectedArticle);
          if (!selectedSection || !selectedArticle) {
            setError("Article introuvable.");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Impossible de charger cet article.");
          setSection(null);
          setArticle(null);
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
  }, [sectionKey, articleSlug]);

  const relatedArticles = useMemo(() => {
    if (!section || !article) return [];
    return (section.items || [])
      .filter((item) => item.slug !== article.slug)
      .slice(0, 3);
  }, [section, article]);

  const imageUrl = toMediaUrl(article?.image_url) || article?.image_url;
  const isExternalSourceLink = /^https?:\/\//i.test(article?.original_link || "");

  return (
    <div className="min-h-screen bg-slate-50 pt-10 sm:pt-12">
      {loading ? (
        <div className="mx-auto max-w-4xl px-4 py-16 text-slate-500 sm:px-6 lg:px-8">
          Chargement de l'article...
        </div>
      ) : error || !article ? (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="border border-rose-100 bg-rose-50 p-6 text-rose-700">
            {error || "Article introuvable."}
          </div>
          <Link
            to={`/articles/${sectionKey}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Revenir a la liste
          </Link>
        </div>
      ) : (
        <>
          <section className="bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-10">
              <div className="overflow-hidden bg-slate-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={article.title || "Article"}
                    className="h-full min-h-[280px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] w-full items-center justify-center text-slate-500">
                    Image a ajouter
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center bg-slate-900 px-6 py-8 text-white lg:px-8">
                <Link
                  to={`/articles/${section?.key || sectionKey}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  <ArrowLeft size={16} />
                  {section?.title || "Retour a la section"}
                </Link>
                <h1 className="mt-5 text-3xl font-bold leading-tight">{article.title}</h1>
                <p className="mt-4 text-base leading-relaxed text-slate-200">
                  {article.excerpt || "Contenu a renseigner depuis l'espace administrateur."}
                </p>
                {article.original_link &&
                  (isExternalSourceLink ? (
                    <a
                      href={article.original_link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                    >
                      Continuer sur la page associee
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <Link
                      to={article.original_link}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                    >
                      Continuer sur la page associee
                      <ExternalLink size={16} />
                    </Link>
                  ))}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <article className="border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-slate-900">A propos de cet article</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {article.excerpt || "Le contenu detaille sera disponible apres publication."}
                </p>
              </article>
            </div>
          </section>

          {relatedArticles.length > 0 && (
            <section className="pb-14">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h3 className="text-2xl font-bold text-slate-900">A lire aussi</h3>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {relatedArticles.map((item) => {
                    const relatedImageUrl = toMediaUrl(item?.image_url) || item?.image_url;
                    return (
                      <Link
                        key={item.slug}
                        to={item.details_link}
                        className="group overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className="h-40 overflow-hidden bg-slate-100">
                          {relatedImageUrl ? (
                            <img
                              src={relatedImageUrl}
                              alt={item.title || "Article"}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                              Image a ajouter
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="line-clamp-2 text-base font-semibold text-slate-900">
                            {item.title || "Titre a renseigner"}
                          </h4>
                          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                            Lire
                            <ArrowRight size={15} />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default ShowcaseArticleDetails;
