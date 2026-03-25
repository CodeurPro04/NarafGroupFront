import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

const AbiComingSoonPage = ({
  eyebrow,
  title,
  description,
  accent = "blue",
}) => {
  const accents = {
    blue: {
      shell: "from-[#0a4da3] via-[#1367c3] to-[#0d2f6b]",
      badge: "bg-[#d8ecff] text-[#0a4da3]",
      card: "border-[#cfe2ff] bg-[#f6fbff]",
      button: "bg-[#1367c3] hover:bg-[#0f57a5]",
      glow: "bg-[#7bc0ff]/30",
    },
    sand: {
      shell: "from-[#8d5c18] via-[#c4882c] to-[#5f3a0f]",
      badge: "bg-[#fff0d6] text-[#8d5c18]",
      card: "border-[#f1dfbe] bg-[#fffbf2]",
      button: "bg-[#b6781f] hover:bg-[#9d661a]",
      glow: "bg-[#f4c77d]/30",
    },
  };

  const theme = accents[accent] || accents.blue;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#f6efe4_100%)] pb-20">
      <section className={`relative overflow-hidden bg-gradient-to-r ${theme.shell} text-white`}>
        <div className={`absolute -left-16 top-20 h-48 w-48 blur-3xl ${theme.glow}`} />
        <div className={`absolute right-0 top-0 h-64 w-64 blur-3xl ${theme.glow}`} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className={`grid gap-8 border ${theme.card} p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[1.2fr_0.8fr] lg:p-10`}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${theme.badge}`}>
              <Clock3 size={14} />
              Disponibilite prochaine
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900">
              Cette page est en construction et sera disponible bientot.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              L'equipe ABI finalise actuellement cette experience pour proposer
              un parcours plus clair, plus utile et mieux integre au reste du
              site. La page sera publiee des qu'elle atteindra le niveau de
              qualite attendu.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition ${theme.button}`}
              >
                Retour a ABI
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Explorer les biens
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Statut
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-900">
                Mise en preparation
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Contenu, parcours et experience utilisateur en cours de finition.
              </p>
            </div>
            <div className="border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Objectif
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-900">
                Offrir une interface claire et professionnelle
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Lancement prevu apres validation complete de la structure et des contenus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AbiComingSoonPage;
