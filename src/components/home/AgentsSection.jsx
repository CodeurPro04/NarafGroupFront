import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import api from "../../api/axios";
import { toMediaUrl } from "../../utils/media";
import { SkeletonBlock } from "../ui/Skeleton";

const AGENT_TYPE_LABELS = {
  constructeur: "Agent Construction",
  immobilier: "Agent Immobilier",
  investissement: "Agent Investissement",
};

const AGENT_TYPE_COLORS = {
  constructeur: "bg-amber-100 text-amber-700",
  immobilier: "bg-blue-100 text-blue-700",
  investissement: "bg-emerald-100 text-emerald-700",
};

const CARD_WIDTH = 220;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

const AgentCard = ({ agent }) => {
  const avatarUrl = toMediaUrl(agent.avatar);
  const typeLabel = AGENT_TYPE_LABELS[agent.agent_type] || "Agent ABI";
  const typeColor = AGENT_TYPE_COLORS[agent.agent_type] || "bg-slate-100 text-slate-600";

  return (
    <div className="flex-shrink-0 flex flex-col" style={{ width: CARD_WIDTH }}>
      {/* Photo */}
      <div className="overflow-hidden bg-slate-100 h-[260px] sm:h-[290px]">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={agent.full_name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
            <Users size={48} className="text-slate-400" />
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="pt-3 space-y-1.5">
        <p className="font-bold text-slate-900 text-sm leading-snug">
          {agent.full_name}
        </p>
        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-sm ${typeColor}`}>
          {typeLabel}
        </span>
      </div>
    </div>
  );
};

const AgentsSection = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef(null);

  /* Calcule combien de cartes sont visibles selon la largeur du conteneur */
  const updateVisibleCount = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    if (w >= 900) setVisibleCount(4);
    else if (w >= 640) setVisibleCount(3);
    else if (w >= 400) setVisibleCount(2);
    else setVisibleCount(1);
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/agents/public");
        const list = res?.data?.data ?? res?.data ?? [];
        setAgents(Array.isArray(list) ? list : []);
      } catch {
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const maxIndex = Math.max(0, agents.length - visibleCount);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  const translateX = currentIndex * CARD_STEP;

  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="mb-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 uppercase tracking-wide">
            NOS AGENTS EN AFRIQUE
          </h2>
          <div className="mt-2 h-1 w-12 bg-blue-600" />
        </div>
        <p className="text-sm text-slate-500 mb-8">
          Agents immobiliers, constructeurs et conseillers en investissement certifiés ABI.
        </p>

        {/* Skeleton */}
        {loading && (
          <div className="flex gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0" style={{ width: CARD_WIDTH }}>
                <SkeletonBlock className="h-[280px] w-full" />
                <SkeletonBlock className="mt-3 h-4 w-3/4" />
                <SkeletonBlock className="mt-2 h-3 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Aucun agent */}
        {!loading && agents.length === 0 && (
          <p className="text-slate-400 text-sm py-8 text-center">
            Aucun agent disponible pour le moment.
          </p>
        )}

        {/* Carousel */}
        {!loading && agents.length > 0 && (
          <div className="relative">
            {/* Piste */}
            <div ref={containerRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-400 ease-in-out"
                style={{
                  gap: CARD_GAP,
                  transform: `translateX(-${translateX}px)`,
                }}
              >
                {agents.map((agent) => (
                  <AgentCard key={agent.uuid} agent={agent} />
                ))}
              </div>
            </div>

            {/* Flèche gauche */}
            <button
              type="button"
              onClick={prev}
              disabled={!canPrev}
              className={`absolute -left-5 top-[130px] -translate-y-1/2 flex h-11 w-11 items-center justify-center border shadow-md transition-all z-10
                ${canPrev
                  ? "bg-white border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                  : "bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed"
                }`}
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Flèche droite */}
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className={`absolute -right-5 top-[130px] -translate-y-1/2 flex h-11 w-11 items-center justify-center border shadow-md transition-all z-10
                ${canNext
                  ? "bg-white border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                  : "bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed"
                }`}
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>

            {/* Indicateurs de page (points) */}
            {agents.length > visibleCount && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "w-6 bg-blue-600"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentsSection;
