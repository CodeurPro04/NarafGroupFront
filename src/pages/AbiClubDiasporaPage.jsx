import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  FileBadge2,
  Globe2,
  Mail,
  Settings2,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const diasporaIntro = [
  "Le Club Deal Diaspora reunit des membres de la diaspora africaine souhaitant investir ensemble dans des projets d'infrastructure, d'immobilier et de developpement local en Afrique.",
  "L'objectif est d'offrir un cadre plus lisible, plus collectif et plus securise pour canaliser l'epargne, structurer les vehicules d'investissement et accompagner les projets a impact.",
];

const diasporaObjectives = [
  "Canaliser l'epargne de la diaspora vers des projets viables et transparents.",
  "Structurer des vehicules d'investissement : fonds ou SPV adaptes aux besoins locaux.",
  "Favoriser le transfert de competences, de reseaux et de technologies.",
  "Assurer un suivi rigoureux des retours financiers et de l'impact social.",
];

const diasporaBenefits = [
  "Acces a des deals preselectionnes et co-investissements securises.",
  "Due diligence consolidee et conseil en structuration financiere.",
  "Gouvernance claire et reporting regulier sur performance et impact.",
  "Reduction des risques via syndication et partenariats locaux.",
  "Evenements dedies, webinaires et rencontres de networking.",
];

const diasporaOperations = [
  "Selection et preselection de projets par l'equipe Africa Build Investment.",
  "Mise en place de structures juridiques et financieres pour chaque deal.",
  "Gouvernance participative avec comite d'investissement et reporting trimestriel.",
  "Options d'investissement flexibles : ticket individuel, co-investissement, fonds.",
];

const membershipItems = [
  "Profil d'investisseur : resident de la diaspora ou soutien avere au developpement local.",
  "Processus de KYC/AML, validation par le comite et engagement financier minimal par deal selon l'opportunite.",
  "Pourquoi rejoindre : permettre a la diaspora d'investir de maniere collective, securisee et impactante tout en contribuant au developpement durable des territoires d'origine.",
];

const membershipCards = [
  {
    title: "Profil d'investisseur",
    text: "resident de la diaspora ou soutien avere au developpement local.",
    icon: FileBadge2,
  },
  {
    title: "Processus",
    text: "KYC/AML, validation par le comite et engagement financier minimal par deal selon l'opportunite.",
    icon: Settings2,
  },
  {
    title: "Pourquoi rejoindre",
    text: "permettre a la diaspora d'investir de maniere collective, securisee et impactante tout en contribuant au developpement durable des territoires d'origine.",
    icon: Sparkles,
  },
];

const highlights = [
  {
    value: "Collectif",
    label: "Investir ensemble dans un cadre plus structure",
  },
  {
    value: "Impact",
    label: "Relier rendement, utilite locale et gouvernance",
  },
  {
    value: "Visibilite",
    label: "Mieux lire les dossiers, les risques et les etapes",
  },
  {
    value: "Accompagnement",
    label: "Structuration, suivi et animation du deal par ABI",
  },
];

const DiasporaAccordion = ({ title, icon: Icon, items, isOpen, onToggle }) => (
  <div className="border-b border-slate-200 bg-transparent py-1">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 py-5 text-left"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center bg-[#0f62c9] text-white">
          <Icon size={18} />
        </div>
        <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">
          {title}
        </h3>
      </div>
      <ChevronDown
        size={18}
        className={`shrink-0 text-slate-400 transition-transform duration-300 ease-out ${
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
          className={`grid gap-3 pb-5 transition-all duration-500 ease-out ${
            isOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          {items.map((item) => (
            <div
              key={item}
              className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0"
            >
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AbiClubDiasporaPage = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(0);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f7fb_0%,#f7f1e8_42%,#ffffff_100%)] text-slate-900">
      <PropertiesHero
        onPrimaryAction={() => navigate("/investment")}
        onSecondaryAction={() => {
          window.location.href =
            "mailto:contact@africabuildinvest.com?subject=Club%20ABI%20Diaspora";
        }}
        primaryLabel="Voir les opportunites"
        secondaryLabel="Contacter ABI"
        secondaryIcon={Mail}
        title="Trouver des opportunites et de reels avantages."
        descriptionLines={[
          "Africa Build Investment aide la diaspora a acceder a des projets structures, a comprendre les vehicules d'investissement et a se positionner dans un cadre collectif plus lisible.",
          "Le Club ABI Diaspora rapproche epargne, expertise et execution terrain pour transformer l'intention d'investir en action mieux cadree.",
        ]}
        backgroundImage="url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(3,37,99,0.86)_42%,rgba(3,64,145,0.8)_100%)]"
      />

      <section className="border-y border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-[560px]">
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[2.9rem]">
                Un club pense pour investir collectivement avec plus de cadre, de lisibilite et d'impact.
              </h1>
            </div>

            <div className="grid gap-4 content-start">
              {diasporaIntro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-7 text-slate-600 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.value}
                className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fafe_100%)] px-5 py-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f62c9]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc]">
        <div className="mx-auto grid max-w-[1180px] items-stretch gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-16">
          <div className="overflow-hidden bg-[#d7c1a0] shadow-[0_20px_42px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
              alt="Club ABI Diaspora"
              className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]"
            />
          </div>

          <div className="grid gap-2 self-stretch">
            <DiasporaAccordion
              title="Objectifs"
              icon={Globe2}
              items={diasporaObjectives}
              isOpen={openSection === 0}
              onToggle={() =>
                setOpenSection((currentIndex) => (currentIndex === 0 ? -1 : 0))
              }
            />

            <DiasporaAccordion
              title="Avantages pour les membres"
              icon={Users}
              items={diasporaBenefits}
              isOpen={openSection === 1}
              onToggle={() =>
                setOpenSection((currentIndex) => (currentIndex === 1 ? -1 : 1))
              }
            />

            <DiasporaAccordion
              title="Fonctionnement"
              icon={Workflow}
              items={diasporaOperations}
              isOpen={openSection === 2}
              onToggle={() =>
                setOpenSection((currentIndex) => (currentIndex === 2 ? -1 : 2))
              }
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-[920px]">
            <h2 className="text-center text-2xl font-semibold leading-tight text-slate-950 sm:text-[2rem]">
              Conditions d'adhesion
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {membershipCards.map((item) => {
                const Icon = item.icon;
                return (
                <div
                  key={item.title}
                  className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fafe_100%)] px-5 py-5 text-center shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center bg-[#0f62c9] text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-950 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    {item.text}
                  </p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-6 bg-[linear-gradient(135deg,#0a67cf_0%,#0452ac_42%,#033c87_100%)] px-6 py-8 text-white shadow-[0_16px_36px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div className="max-w-[760px]">
              <h2 className="text-2xl font-semibold leading-tight sm:text-[2rem]">
                Rejoindre un cadre collectif plus serieux pour etudier, structurer et suivre les investissements de la diaspora.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                ABI peut vous orienter sur les modalites d'adhesion, la documentation attendue et le type d'opportunites accessibles dans le Club ABI Diaspora.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/investment")}
                className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-[#0f62c9] transition hover:bg-slate-100"
              >
                Voir les opportunites
                <ArrowRight size={16} />
              </button>
              <a
                href="mailto:contact@africabuildinvest.com?subject=Club%20ABI%20Diaspora"
                className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contacter ABI
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AbiClubDiasporaPage;
