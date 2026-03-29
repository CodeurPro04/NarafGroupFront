import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHouseModelById } from "../api/axios";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";

const HouseModelDetails = () => {
  const { uuid } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getHouseModelById(uuid);
        const payload = response?.data?.data ?? response?.data ?? null;
        const data = payload?.data || payload;

        if (isMounted) {
          setModel(data || null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Modèle introuvable ou indisponible.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadModel();

    return () => {
      isMounted = false;
    };
  }, [uuid]);

  const paragraphs = useMemo(
    () =>
    String(model?.description || model?.short_description || "").
    split(/\n+/).
    map((line) => line.trim()).
    filter(Boolean),
    [model]
  );

  const gallery = Array.isArray(model?.gallery_image_urls) ?
  model.gallery_image_urls.map(toMediaUrl).filter(Boolean) :
  [];
  const cover =
  toMediaUrl(model?.cover_image_url || model?.cover_image_path) ||
  gallery[0] ||
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80";

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="pt-24 pb-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ?
          <div className="mt-4">
              <SkeletonBlock className="h-10 sm:h-14 w-64 sm:w-96" />
            </div> :

          <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-slate-900">
              {model?.title || "Modèle"}
            </h1>
          }
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && <p className="text-red-600">{error}</p>}

          {!error && loading &&
          <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 bg-white border border-slate-200 p-4 sm:p-6">
                <div>
                  <SkeletonBlock className="w-full h-[320px] sm:h-[520px]" />
                </div>
                <div className="space-y-5">
                  <SkeletonBlock className="h-9 w-36" />
                  <SkeletonBlock className="h-12 w-5/6" />
                  <SkeletonBlock className="h-6 w-full" />
                  <SkeletonBlock className="h-6 w-11/12" />
                  <SkeletonBlock className="h-6 w-10/12" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 sm:p-6">
                <SkeletonBlock className="h-9 w-56 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[0, 1, 2, 3, 4, 5].map((img) =>
                <SkeletonBlock
                  key={`house-model-details-skeleton-${img}`}
                  className={`w-full ${img === 0 ? "md:col-span-2 h-72" : "h-52"}`} />

                )}
                </div>
              </div>
            </div>
          }

          {!error && !loading && model &&
          <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 bg-white border border-slate-200 p-4 sm:p-6">
                <div>
                  <img src={cover} alt={model.title} className="w-full h-[320px] sm:h-[520px] object-cover" />
                </div>
                <div className="space-y-5">
                  {model.short_description &&
                <span className="inline-block bg-blue-900 text-white px-4 py-2 text-sm font-semibold">
                      Gamme {model.title}
                    </span>
                }
                  <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                    {model.short_description || model.title}
                  </h2>
                  <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                    {paragraphs.length > 0 ?
                  paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>) :

                  <p>Aucune description détaillée disponible.</p>
                  }
                  </div>
                </div>
              </div>

              {gallery.length > 0 &&
            <div className="bg-white border border-slate-200 p-4 sm:p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Galerie du modèle</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[cover, ...gallery].slice(0, 9).map((image, idx) =>
                <img
                  key={`${model.uuid}-img-${idx}`}
                  src={image}
                  alt={`${model.title} ${idx + 1}`}
                  className={`w-full object-cover ${idx === 0 ? "md:col-span-2 h-72" : "h-52"}`} />

                )}
                  </div>
                </div>
            }
            </div>
          }
        </div>
      </section>
    </div>);

};

export default HouseModelDetails;