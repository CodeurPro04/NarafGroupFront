import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronRight,
  Compass,
  FileText,
  Hammer,
  Landmark,
  Newspaper,
  Pickaxe,
  Search,
  ShieldCheck,
  UserRound,
  UserRoundPlus,
  WalletCards,
} from "lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const CATEGORY_PRESETS = {
  abi: {
    introEyebrow: "Africa Business Invest",
    introBadge:
      "Un cadre plus lisible, des points de contact plus clairs et une experience plus coherente.",
    cards: [
      {
        title: "Orientation",
        text: "ABI structure mieux l'entree dans la rubrique pour aller plus vite a l'essentiel.",
        icon: UserRoundPlus,
      },
      {
        title: "Lecture claire",
        text: "Les informations prioritaires sont mieux hierarchisees pour simplifier la decision.",
        icon: Search,
      },
      {
        title: "Confiance",
        text: "Le parcours reste raccord avec l'univers ABI et ses engagements de fiabilite.",
        icon: ShieldCheck,
      },
      {
        title: "Passage a l'action",
        text: "Chaque rubrique oriente ensuite vers le bon service, la bonne page ou le bon parcours.",
        icon: WalletCards,
      },
    ],
    processEyebrow: "Parcours ABI",
    highlightEyebrow: "Ecosysteme ABI",
    highlightTags: ["Confiance", "Accompagnement", "Lisibilite", "Execution"],
    detailsEyebrow: "Points clés",
    detailItems: [
      "Un contenu plus direct pour comprendre la rubrique rapidement.",
      "Une page connectee aux autres parcours utiles de la plateforme.",
      "Une meilleure coherence entre information, conseil et action.",
      "Une experience plus proche des attentes reelles des utilisateurs ABI.",
    ],
  },
  construction: {
    introEyebrow: "Construction ABI",
    introBadge:
      "Un projet mieux cadre, des etapes plus visibles et une execution plus defendable.",
    cards: [
      {
        title: "Cadrage",
        text: "La rubrique aide a poser les bonnes bases avant de lancer ou relancer un projet.",
        icon: Pickaxe,
      },
      {
        title: "Projection",
        text: "Les options sont relues avec une logique plus concrete de faisabilite.",
        icon: Hammer,
      },
      {
        title: "Maitrise",
        text: "Les arbitrages techniques, budgetaires et de sequence gagnent en clarté.",
        icon: ShieldCheck,
      },
      {
        title: "Avancement",
        text: "Vous gardez un meilleur fil entre idee, choix et execution chantier.",
        icon: WalletCards,
      },
    ],
    processEyebrow: "Parcours construction",
    highlightEyebrow: "Execution ABI",
    highlightTags: ["Faisabilite", "Budget", "Technique", "Progression"],
    detailsEyebrow: "Lecture chantier",
    detailItems: [
      "Une meilleure lecture des priorites avant l'engagement.",
      "Des choix plus coherents entre terrain, plan, budget et execution.",
      "Moins d'improvisation grace a un parcours plus explicite.",
      "Une trajectoire projet plus simple a suivre et a justifier.",
    ],
  },
  investment: {
    introEyebrow: "Investissement ABI",
    introBadge:
      "Plus de lisibilite sur les opportunites, les zones et les choix d'engagement.",
    cards: [
      {
        title: "Objectif",
        text: "La page aide a mieux relier l'opportunite a votre intention d'investissement.",
        icon: BadgeDollarSign,
      },
      {
        title: "Comparaison",
        text: "Les projets et options sont remis dans un cadre plus utile a l'analyse.",
        icon: Search,
      },
      {
        title: "Discernement",
        text: "Les zones de risque et de potentiel deviennent plus lisibles.",
        icon: ShieldCheck,
      },
      {
        title: "Decision",
        text: "Le parcours aide a passer de l'interet a une decision plus defendable.",
        icon: Briefcase,
      },
    ],
    processEyebrow: "Parcours investissement",
    highlightEyebrow: "Strategie ABI",
    highlightTags: ["Potentiel", "Horizon", "Arbitrage", "Opportunite"],
    detailsEyebrow: "Base de decision",
    detailItems: [
      "Une lecture plus nette avant tout engagement de capital.",
      "Des contenus relies a une vraie logique d'objectif et d'horizon.",
      "Une meilleure priorisation des dossiers a etudier.",
      "Un parcours plus simple entre analyse, comparaison et action.",
    ],
  },
};

const DEFAULT_IMAGES = {
  hero: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')",
  process:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  highlight:
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&q=80",
  details:
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900&q=80",
};

const buildPageContent = (page) => {
  const preset = CATEGORY_PRESETS[page.category];
  const topic = page.topic.toLowerCase();

  return {
    hero: {
      eyebrow: page.heroEyebrow,
      eyebrowIcon: page.heroIcon,
      title: page.heroTitle,
      description: page.heroDescription,
      descriptionSecondary: page.heroDescriptionSecondary,
      primaryLabel: page.primaryLabel,
      primaryTo: page.primaryTo,
      secondaryLabel: page.secondaryLabel,
      secondaryTo: page.secondaryTo,
      backgroundImage: page.images?.hero || DEFAULT_IMAGES.hero,
      overlayClassName:
        "bg-gradient-to-b from-blue-950/90 via-blue-900/85 to-blue-900/80",
    },
    intro: {
      eyebrow: preset.introEyebrow,
      title: `${page.title} dans un cadre plus clair et plus utile.`,
      description: `Cette page presente ${topic} avec une lecture plus structuree pour vous aider a comprendre les enjeux, comparer plus vite et agir dans la bonne direction.`,
      badge: preset.introBadge,
      cards: preset.cards.map((card, index) => ({
        ...card,
        step: String(index + 1).padStart(2, "0"),
      })),
    },
    process: {
      eyebrow: preset.processEyebrow,
      title: `Comment ABI organise ${topic} ?`,
      image: page.images?.process || DEFAULT_IMAGES.process,
      ctaLabel: page.processCtaLabel || page.primaryLabel,
      ctaTo: page.processCtaTo || page.primaryTo,
      steps: [
        `Vous entrez dans ${topic} avec une meilleure lecture du besoin et du contexte.`,
        `ABI remet les informations prioritaires dans un ordre plus utile a la decision.`,
        `Les options, points de vigilance et leviers d'action deviennent plus visibles.`,
        `Le parcours reste relie aux services et rubriques les plus pertinents pour avancer.`,
        `Vous gardez une trajectoire plus nette entre comprehension, comparaison et execution.`,
      ],
    },
    highlight: {
      eyebrow: preset.highlightEyebrow,
      title: page.highlightTitle,
      description: `La rubrique ${topic} s'inscrit dans une logique plus large: offrir une experience ABI plus lisible, plus professionnelle et plus utile au moment de decider.`,
      tags: page.highlightTags || preset.highlightTags,
      ctaLabel: page.highlightCtaLabel || page.secondaryLabel,
      ctaTo: page.highlightCtaTo || page.secondaryTo,
      image: page.images?.highlight || DEFAULT_IMAGES.highlight,
    },
    details: {
      eyebrow: preset.detailsEyebrow,
      title: `Ce qu'il faut retenir sur ${topic}.`,
      description: `L'objectif de cette page est de rendre ${topic} plus simple a lire, plus coherent avec le theme du site et plus directement exploitable dans votre parcours.`,
      image: page.images?.details || DEFAULT_IMAGES.details,
      items: preset.detailItems.map((text, index) => ({
        title: `${page.title} - point ${index + 1}`,
        text,
      })),
    },
  };
};

const AbiSubmenuPage = ({ page }) => {
  const [openDetail, setOpenDetail] = useState(0);
  const navigate = useNavigate();
  const content = useMemo(() => buildPageContent(page), [page]);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f7fb_0%,#f7f2ea_48%,#ffffff_100%)]">
      <PropertiesHero
        onPrimaryAction={() => navigate(content.hero.primaryTo)}
        onSecondaryAction={() => navigate(content.hero.secondaryTo)}
        primaryLabel={content.hero.primaryLabel}
        secondaryLabel={content.hero.secondaryLabel}
        eyebrow={content.hero.eyebrow}
        eyebrowIcon={content.hero.eyebrowIcon}
        title={content.hero.title}
        descriptionLines={[
          content.hero.description,
          content.hero.descriptionSecondary,
        ].filter(Boolean)}
        backgroundImage={content.hero.backgroundImage}
        overlayClassName={content.hero.overlayClassName}
      />

      <section className="overflow-hidden border-y border-white/70 bg-white/95 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-10 sm:px-10 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-[620px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#1a4f9c]">
              {content.intro.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-[2.2rem]">
              {content.intro.title}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {content.intro.description}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.intro.cards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.step}
                  className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-5 py-6 text-left shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center bg-[#1f6fd0] text-white shadow-md">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 border border-slate-200 bg-[#f7fbff] px-4 py-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-[#2b87df]" />
            {content.intro.badge}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f3e7d7] shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:min-h-[620px]">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] md:block lg:w-[46%] xl:w-[42%]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,231,215,1)_0%,rgba(243,231,215,0.72)_10%,rgba(243,231,215,0.08)_22%,rgba(243,231,215,0)_100%)]" />
          <img
            src={content.process.image}
            alt={content.process.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1180px] items-center px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="max-w-[760px] px-4 sm:px-6">
            <div className="max-w-[560px]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1f6fd0]">
                {content.process.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-[2.2rem]">
                {content.process.title}
              </h2>
              <div className="mt-8 space-y-5">
                {content.process.steps.map((item, index) => (
                  <div
                    key={item}
                    className="grid grid-cols-[34px_1fr] gap-4 border-b border-black/8 pb-4"
                  >
                    <span className="text-sm font-medium text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              <Link
                to={content.process.ctaTo}
                className="mt-8 inline-flex items-center gap-2 bg-[#1e76d3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#135ca8]"
              >
                {content.process.ctaLabel}
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[320px] md:hidden">
          <img
            src={content.process.image}
            alt={content.process.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0272df_0%,#005bb7_38%,#003d8d_100%)] text-white shadow-[0_22px_60px_rgba(15,23,42,0.08)] md:min-h-[620px]">
        <img
          src={content.highlight.image}
          alt={content.highlight.title}
          className="absolute right-0 top-0 h-full w-full object-cover object-center opacity-45 sm:object-[center_top] md:w-[52%] md:opacity-80 lg:w-[46%] xl:w-[42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,113,220,0.94)_0%,rgba(0,79,169,0.82)_42%,rgba(0,61,141,0.24)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1180px] items-center px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-[760px] px-4 sm:px-6">
            <p className="text-4xl font-medium italic text-[#53d5ff]">
              {content.highlight.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[420px] text-2xl font-semibold leading-tight">
              {content.highlight.title}
            </h2>
            <p className="mt-4 max-w-[460px] text-sm leading-6 text-white/85">
              {content.highlight.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg font-semibold text-white/90">
              {content.highlight.tags.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <Link
              to={content.highlight.ctaTo}
              className="mt-12 inline-flex bg-white px-5 py-3 text-sm font-semibold text-[#005bb7] shadow-md transition hover:bg-slate-100"
            >
              {content.highlight.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
        <div className="mx-auto grid max-w-[1180px] items-start gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8 lg:py-12">
          <div className="px-4 sm:px-6 lg:px-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1f6fd0]">
              {content.details.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[320px] text-3xl font-semibold leading-tight text-slate-900">
              {content.details.title}
            </h2>
            <p className="mt-4 max-w-[320px] text-sm leading-6 text-slate-500">
              {content.details.description}
            </p>
            <div className="mt-8 overflow-hidden bg-[#d8bf90]">
              <img
                src={content.details.image}
                alt={content.details.title}
                className="h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-200 border-t border-slate-200 px-4 sm:px-6 lg:mt-14 lg:px-0">
            {content.details.items.map((item, index) => {
              const isOpen = openDetail === index;
              return (
                <div key={item.title} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenDetail(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 text-left transition hover:text-[#1f6fd0]"
                  >
                    <span className="text-sm font-medium text-slate-800">
                      {item.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 max-w-[580px] text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AbiSubmenuPage;
