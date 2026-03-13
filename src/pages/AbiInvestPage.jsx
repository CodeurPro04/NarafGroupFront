import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Globe2,
  Handshake,
  Landmark,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const investmentReasons = [
  {
    title: "Acces a des opportunites preselectionnees",
    details: "sourcing rigoureux de projets d'infrastructure et d'immobilier a fort potentiel sur l'ensemble du continent.",
  },
  {
    title: "Expertise multidisciplinaire",
    details: "equipe de structuration financiere, juridique, technique et ESG pour monter des deals bancables.",
  },
  {
    title: "Presence locale operationnelle",
    details: "reseau d'agences regionales pour diligences, suivi terrain et relations avec autorites locales.",
  },
  {
    title: "Solutions de montage adaptees",
    details: "vehicules juridiques, co-investissements et syndication pour diversifier et reduire les risques.",
  },
  {
    title: "Gouvernance et transparence",
    details: "comites d'investissement, KYC/AML stricts, reporting financier et extra-financier regulier.",
  },
  {
    title: "Focus impact et durabilite",
    details: "integration systematique des criteres ESG et mesure d'impact social et environnemental.",
  },
  {
    title: "Reduction des risques operationnels",
    details: "partenariats avec operateurs locaux, assurances et due diligence technique approfondie.",
  },
  {
    title: "Acces au reseau et au marche",
    details: "mise en relation avec co-investisseurs, bailleurs multilateraux et partenaires techniques.",
  },
  {
    title: "Flexibilite d'entree et de sortie",
    details: "options d'investissement modulables et strategies d'exit definies en amont.",
  },
  {
    title: "Mesure de performance et suivi",
    details: "KPIs financiers et extra-financiers, tableaux de bord et audits periodiques.",
  },
];

const proofCards = [
  {
    title: "Opportunites qualifiees",
    text: "Des projets filtres, documentes et structures avant mise en relation avec les investisseurs.",
    icon: Building2,
  },
  {
    title: "Montages securises",
    text: "Des cadres juridiques et financiers adaptes au profil du projet, du ticket et du risque.",
    icon: ShieldCheck,
  },
  {
    title: "Execution locale",
    text: "Une presence terrain utile pour diligences, suivi operationnel et coordination avec les parties prenantes.",
    icon: Globe2,
  },
  {
    title: "Pilotage de performance",
    text: "Des indicateurs clairs pour suivre rendement, avancement, impact et arbitrages de sortie.",
    icon: BarChart3,
  },
];

const highlightItems = [
  {
    title: "Structuration",
    text: "ABI aide a rendre les dossiers plus lisibles, plus bancables et mieux defendables devant les investisseurs et partenaires.",
  },
  {
    title: "Transparence",
    text: "Vous avancez avec des informations plus qualifiees, un cadre de gouvernance plus net et des reportings reguliers.",
  },
  {
    title: "Partenariats",
    text: "Le reseau ABI facilite les co-investissements, les relations institutionnelles et la mobilisation de partenaires techniques.",
  },
  {
    title: "Impact",
    text: "L'analyse integre les enjeux ESG et la contribution du projet au developpement economique et social local.",
  },
];

const ReasonAccordion = ({ title, details, isOpen, onToggle }) => (
  <div className="border-b border-slate-300/90">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 py-5 text-left"
    >
      <span className="text-[1.35rem] font-medium tracking-[-0.02em] text-slate-950 sm:text-[1.55rem]">
        {title}
      </span>
      <ChevronDown
        size={20}
        className={`shrink-0 text-slate-500 transition-transform duration-300 ease-out ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>

    <div
      className={`grid overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={`pb-5 text-lg leading-8 text-slate-500 transition-all duration-500 ease-out ${
            isOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <p>{details}</p>
        </div>
      </div>
    </div>
  </div>
);

const AbiInvestPage = () => {
  const navigate = useNavigate();
  const [openReasonIndex, setOpenReasonIndex] = useState(0);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f6fb_0%,#f0ede7_42%,#ffffff_100%)] text-slate-950">
      <PropertiesHero
        onPrimaryAction={() => navigate("/investment")}
        onSecondaryAction={() => navigate("/partnership")}
        primaryLabel="Voir les opportunites"
        secondaryLabel="Contacter ABI"
        eyebrow="Je veux investir"
        title="Investir avec une plateforme qui structure mieux les opportunites africaines."
        descriptionLines={[
          "Africa Build Investment connecte sourcing local, structuration de deals et execution terrain dans une meme experience.",
          "Vous gagnez en lisibilite sur les projets, en maitrise du risque et en capacite d'action sur des dossiers a fort potentiel.",
        ]}
        backgroundImage="url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.86)_0%,rgba(3,37,99,0.88)_42%,rgba(3,64,145,0.82)_100%)]"
      />

      <section className="border-y border-white/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="max-w-[760px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#1a4f9c]">
              Pourquoi investir avec ABI
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-[3.9rem] sm:leading-[0.98]">
              Une approche plus rigoureuse pour investir dans l'immobilier et les infrastructures africaines.
            </h1>
            <p className="mt-6 max-w-[720px] text-lg leading-8 text-slate-600">
              ABI combine selection d'opportunites, expertise multidisciplinaire, presence locale et outils de gouvernance pour aider a investir avec plus de confiance, de transparence et de controle.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {proofCards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafe_100%)] px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f62c9] text-white">
                    <Icon size={18} />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebea]">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a4f9c]">
              Les raisons d'investir
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-[3.7rem] sm:leading-[1]">
              Les avantages ABI pour etudier et executer une opportunite d'investissement.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-500">
              Une lecture editoriale simple, proche de la reference Sogexia, pour faire ressortir clairement les leviers de confiance et de performance.
            </p>

            <div className="mt-10">
              {investmentReasons.map((item, index) => (
                <ReasonAccordion
                  key={item.title}
                  title={item.title}
                  details={item.details}
                  isOpen={openReasonIndex === index}
                  onToggle={() =>
                    setOpenReasonIndex((currentIndex) =>
                      currentIndex === index ? -1 : index
                    )
                  }
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate("/investment")}
              className="mt-10 inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
            >
              Etudier les opportunites
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="overflow-hidden rounded-[4px] bg-[#d9d4cd] shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&q=80"
              alt="Analyse d'opportunites d'investissement"
              className="h-full min-h-[420px] w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-18">
          <div className="overflow-hidden bg-[#dfe8f5] shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80"
              alt="Structuration et gouvernance d'investissement"
              className="h-full min-h-[340px] w-full object-cover object-center"
            />
          </div>

          <div className="max-w-[560px] justify-self-end">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a4f9c]">
              Ce que vous gagnez concretement
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[3rem]">
              Un meilleur cadre de decision entre sourcing, structuration et suivi de performance.
            </h2>
            <div className="mt-8 space-y-4">
              {highlightItems.map((item, index) => {
                const icons = [Landmark, ShieldCheck, Handshake, Globe2];
                const Icon = icons[index] || Building2;
                return (
                  <div key={item.title} className="flex gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f2f7fd] text-[#0f62c9]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0a67cf_0%,#0452ac_42%,#033c87_100%)] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1400&q=80"
            alt="Rencontre entre investisseurs et partenaires"
            className="h-full w-full object-cover object-center opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,103,207,0.95)_0%,rgba(4,82,172,0.9)_52%,rgba(3,60,135,0.25)_100%)]" />

        <div className="relative mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="max-w-[640px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8ed7ff]">
              Pour aller plus loin
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-[3rem]">
              Pour en savoir plus ou etudier une opportunite concrete, contactez-nous.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/82">
              Notre equipe peut vous orienter sur les dossiers en cours, les modalites d'entree, les options de co-investissement et le niveau de documentation disponible selon votre profil.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/partnership")}
                className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-[#0f62c9] transition hover:bg-slate-100"
              >
                Contacter ABI
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/investment")}
                className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Voir les projets d'investissement
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AbiInvestPage;
