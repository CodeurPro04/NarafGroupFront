import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getHouseModels } from "../api/axios";
import EmptyState from "../components/ui/EmptyState";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";

const HouseModels = () => {
  const location = useLocation();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadModels = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getHouseModels();
        const payload = response?.data?.data ?? response?.data ?? [];
        const list = payload?.data || payload;
        if (isMounted) {
          setModels(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Impossible de charger les modeles de maison.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadModels();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeModelUuid = useMemo(() => {
    const search = new URLSearchParams(location.search);
    return search.get("model");
  }, [location.search]);

  const getMainImage = (model) =>
    toMediaUrl(model?.cover_image_url || model?.cover_image_path) ||
    toMediaUrl(model?.gallery_image_urls?.[0]) ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80";

  const getParagraphs = (value) =>
    String(value || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="pt-24 pb-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Nos modeles de maison
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Decouvrez des modeles personnalisables, connectes et evolutifs,
            avec une presentation detaillee pour chaque gamme.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {loading && (
            <div className="space-y-8">
              {[0, 1].map((item) => (
                <article
                  key={`house-model-skeleton-${item}`}
                  className="bg-white border border-slate-200 p-4 sm:p-6 lg:p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <SkeletonBlock className="w-full h-[320px] sm:h-[420px]" />
                    </div>
                    <div className="space-y-5">
                      <SkeletonBlock className="h-10 w-3/4" />
                      <SkeletonBlock className="h-7 w-full" />
                      <SkeletonBlock className="h-6 w-full" />
                      <SkeletonBlock className="h-6 w-11/12" />
                      <SkeletonBlock className="h-6 w-4/5" />
                      <SkeletonBlock className="h-12 w-40" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((img) => (
                      <SkeletonBlock
                        key={`house-model-skeleton-thumb-${item}-${img}`}
                        className="w-full h-36"
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && models.length === 0 && (
            <EmptyState
              title="Aucun modele disponible pour le moment."
            />
          )}

          {models.map((model, index) => {
            const paragraphs = getParagraphs(model.description || model.short_description);
            const gallery = Array.isArray(model.gallery_image_urls)
              ? model.gallery_image_urls.map(toMediaUrl).filter(Boolean)
              : [];
            const reverse = index % 2 === 1;

            return (
              <article
                key={model.uuid}
                id={`model-${model.uuid}`}
                className={`bg-white border ${activeModelUuid === model.uuid ? "border-blue-300 shadow-lg" : "border-slate-200"} p-4 sm:p-6 lg:p-8`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
                >
                  <div>
                    <img
                      src={getMainImage(model)}
                      alt={model.title}
                      className="w-full h-[320px] sm:h-[420px] object-cover"
                    />
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                      {model.title}
                    </h2>
                    {model.short_description && (
                      <p className="text-xl text-slate-700">{model.short_description}</p>
                    )}
                    <div className="space-y-3 text-slate-700 text-lg leading-relaxed">
                      {paragraphs.length > 0 ? (
                        paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                      ) : (
                        <p>Description detaillee non renseignee.</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/house-models/${model.uuid}`}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                      >
                        Voir les details
                      </Link>
                    </div>
                  </div>
                </div>

                {gallery.length > 1 && (
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {gallery.slice(1, 5).map((image, idx) => (
                      <img
                        key={`${model.uuid}-gallery-${idx}`}
                        src={toMediaUrl(image)}
                        alt={`${model.title} ${idx + 2}`}
                        className="w-full h-36 object-cover"
                      />
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HouseModels;
