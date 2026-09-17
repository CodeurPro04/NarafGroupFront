import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const guides = [
  {
    title: "ACHETER UN BIEN EN AFRIQUE",
    label: "VOIR LES BIENS",
    to: "/properties",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    title: "JE VEUX INVESTIR",
    label: "DÉCOUVRIR",
    to: "/investment/je-veux-investir",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
  },
  {
    title: "MON PROJET DE CONSTRUCTION",
    label: "LIRE LE GUIDE",
    to: "/construction/mon-projet-sur-mesure",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    title: "PREMIER INVESTISSEMENT",
    label: "COMMENCER",
    to: "/investment/je-veux-investir/premier-investissement",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

const GuidesSection = () => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 uppercase tracking-wide">
            NOS GUIDES
          </h2>
          <div className="mt-2 h-1 w-12 bg-blue-600" />
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {guides.map((guide) => (
              <Link
                key={guide.to}
                to={guide.to}
                className="group relative flex-shrink-0 w-[260px] sm:w-[300px] h-[210px] sm:h-[240px] overflow-hidden"
              >
                {/* Image de fond */}
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay dégradé du bas vers le haut */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                {/* Contenu centré */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-5">
                  <h3 className="text-white font-bold text-sm sm:text-base text-center leading-snug tracking-wider uppercase">
                    {guide.title}
                  </h3>
                  <span className="border border-white text-white text-[11px] sm:text-xs font-semibold px-5 py-2 tracking-widest uppercase group-hover:bg-white group-hover:text-slate-900 transition-colors">
                    {guide.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bouton scroll */}
          <button
            type="button"
            onClick={scrollRight}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Voir plus"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
