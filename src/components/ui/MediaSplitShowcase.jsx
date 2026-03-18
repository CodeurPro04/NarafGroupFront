import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const fallbackCardClassName =
  "flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-6 text-center text-sm font-medium text-slate-500";

const MediaBadge = ({ label, className = "" }) => (
  <span
    className={`bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm ${className}`.trim()}
  >
    {label}
  </span>
);

const SecondaryMediaCard = ({ title, image, alt, emptyLabel, onOpen }) => (
  <div className="relative h-[220px] overflow-hidden bg-slate-100 md:h-[252px] lg:h-[302px]">
    {image ? (
      <button
        type="button"
        onClick={() => onOpen?.(image, alt)}
        className="block h-full w-full bg-slate-50"
        aria-label={`Ouvrir ${title.toLowerCase()} en grand`}
      >
        <img src={image} alt={alt} className="h-full w-full object-contain bg-slate-50" />
      </button>
    ) : (
      <div className={fallbackCardClassName}>{emptyLabel}</div>
    )}
    <div className="absolute left-4 top-4">
      <MediaBadge label={title} />
    </div>
  </div>
);

const MediaSplitShowcase = ({
  title,
  images,
  currentIndex,
  onPrev,
  onNext,
  onSelect,
  planImage,
  render3DImage,
}) => {
  const [lightbox, setLightbox] = useState(null);
  const hasImages = Array.isArray(images) && images.length > 0;
  const activeImage = hasImages ? images[currentIndex] || images[0] : null;

  useEffect(() => {
    if (!lightbox) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setLightbox(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [lightbox]);

  const openLightbox = (src, alt) => {
    if (!src) return;
    setLightbox({ src, alt: alt || title });
  };

  return (
    <>
      <div className="w-full px-4 pt-20 sm:pt-24 lg:pt-28">
        <div className="overflow-hidden bg-white p-3 shadow-sm ring-1 ring-slate-200/80 md:p-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <div className="relative h-[360px] overflow-hidden bg-slate-100 md:h-[520px] lg:h-[620px]">
              {activeImage ? (
                <button
                  type="button"
                  onClick={() => openLightbox(activeImage, title)}
                  className="block h-full w-full bg-slate-50"
                  aria-label="Ouvrir l'image standard en grand"
                >
                  <img
                    src={activeImage}
                    alt={title}
                    className="h-full w-full object-contain bg-slate-50 transition-transform duration-500"
                  />
                </button>
              ) : (
                <div className={fallbackCardClassName}>Aucune image disponible</div>
              )}

              {hasImages && images.length > 1 && (
                <>
                  <button
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                    aria-label="Image precedente"
                    type="button"
                  >
                    <ChevronLeft size={24} className="text-gray-700" />
                  </button>
                  <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                    aria-label="Image suivante"
                    type="button"
                  >
                    <ChevronRight size={24} className="text-gray-700" />
                  </button>
                </>
              )}

              <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-2">
                <MediaBadge label="Images standards" />
              </div>

              {hasImages && images.length > 1 && typeof onSelect === "function" && (
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2 bg-black/10 px-3 py-2 backdrop-blur-sm">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => onSelect(index)}
                      className={`h-2 w-2 transition-all duration-300 ${
                        index === currentIndex ? "w-6 bg-white" : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Aller a l'image ${index + 1}`}
                      type="button"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 lg:grid-rows-2">
              <SecondaryMediaCard
                title="Plans de construction"
                image={planImage}
                alt="Plan de construction"
                emptyLabel="Plan non disponible"
                onOpen={openLightbox}
              />
              <SecondaryMediaCard
                title="Representations 3D"
                image={render3DImage}
                alt="Representation 3D"
                emptyLabel="Representation 3D non disponible"
                onOpen={openLightbox}
              />
            </div>
          </div>
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Apercu image"
        >
          <button
            type="button"
            className="absolute right-4 top-4 bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
            onClick={() => setLightbox(null)}
            aria-label="Fermer l'image"
          >
            <X size={22} />
          </button>
          <div className="max-h-[90vh] max-w-[92vw] bg-white p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[82vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MediaSplitShowcase;
