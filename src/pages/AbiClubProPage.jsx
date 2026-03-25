import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarRange,
  Check,
  ChevronDown,
  CreditCard,
  FileSignature,
  Mail,
  Network,
  ShieldCheck,
} from "lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const proClubIntro = [
  "Le Club Pro ABI rassemble des professionnels, operateurs et partenaires qui souhaitent evoluer dans un cadre plus structure autour de l'immobilier, de la construction et de l'investissement.",
  "L'objectif est de faciliter les mises en relation, rendre les opportunites plus lisibles et permettre a chaque membre de s'integrer dans un ecosysteme plus utile, plus qualifie et plus coherent.",
];

const proClubObjectives = [
  "Faciliter l'acces a des opportunites d'investissement qualifiees.",
  "Stimuler les partenariats public-prive et les co-investissements.",
  "Promouvoir les bonnes pratiques en matiere d'eco-construction et d'impact social.",
  "Renforcer les capacites et le reseautage des membres.",
];

const proClubBenefits = [
  "Acces prioritaire aux projets et due diligences preselectionnees.",
  "Sessions de matchmaking cible avec porteurs de projets et co-investisseurs.",
  "Invitations exclusives a des evenements, masterclasses et visites de sites.",
  "Bulletins d'opportunites et analyses de marche periodiques.",
  "Acces a un repertoire d'experts : technique, juridique, financier, ESG.",
];

const proClubActivities = [
  "Rencontres trimestrielles, physiques et virtuelles, et forums thematiques.",
  "Programmes de mentoring et d'acceleration de projets.",
  "Ateliers de formation et partenariats academiques.",
  "Missions d'etude et visites de projets sur le terrain.",
];

const membershipItems = [
  "Conditions : profil lie aux secteurs de la construction, des infrastructures, de l'investissement, du developpement ou a un interet fort pour l'ecosysteme ABI.",
  "Modalites : inscription via la plateforme, evaluation par l'equipe ABI et orientation selon le format d'adhesion le plus adapte.",
  "Pourquoi rejoindre : accelerer l'acces a des deals de qualite, partager l'expertise et s'inscrire dans un reseau plus structure.",
];

const highlights = [
  {
    value: "Reseau",
    label: "Mieux connecter les membres, expertises et opportunites ABI.",
  },
  {
    value: "Lisibilite",
    label: "Rendre les projets, les rencontres et les benefices plus clairs.",
  },
  {
    value: "Partenariats",
    label: "Creer un cadre utile pour les collaborations et les deals.",
  },
  {
    value: "Accompagnement",
    label: "Orienter les membres selon leurs enjeux, leur profil et leur secteur.",
  },
];

const subscriptionPlans = {
  particuliers: {
    label: "Particuliers",
    price: "75 000 FCFA / an",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400&q=80",
    items: [
      "Acces a une information plus lisible sur les opportunites ABI.",
      "Participation aux rencontres, webinaires et sessions de partage.",
      "Orientation vers les bons interlocuteurs selon votre profil.",
      "Veille sur les projets, actualites et temps forts du club.",
      "Demande d'adhesion simplifiee avec accompagnement ABI.",
    ],
  },
  entreprises: {
    label: "Entreprises",
    price: "250 000 FCFA / an",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    items: [
      "Mises en relation plus ciblees avec experts, investisseurs et operateurs.",
      "Visibilite accrue dans l'ecosysteme professionnel ABI.",
      "Acces a des rencontres et formats de networking plus qualifies.",
      "Cadre utile pour les partenariats, collaborations et dealflow.",
      "Demande de souscription preparee avec l'equipe ABI.",
    ],
  },
};

const ClubAccordion = ({ title, icon: Icon, items, isOpen, onToggle }) => (
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

const AbiClubProPage = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(0);
  const [activePlan, setActivePlan] = useState("particuliers");

  const currentPlan = subscriptionPlans[activePlan];

  const handleAccordionToggle = (index) => {
    setOpenSection((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <div className="bg-[linear-gradient(180deg,#f4f7fb_0%,#f7f1e8_42%,#ffffff_100%)] text-slate-900">
      <PropertiesHero
        onPrimaryAction={() => navigate("/investment")}
        onSecondaryAction={() => {
          window.location.href =
            "mailto:contact@africabuildinvest.com?subject=Club%20Pro%20ABI";
        }}
        primaryLabel="Voir les opportunites"
        secondaryLabel="Contacter ABI"
        secondaryIcon={Mail}
        title="Club Pro ABI, un cadre plus clair pour connecter reseau, projets et opportunites."
        descriptionLines={[
          "Africa Build Investment reunit professionnels, operateurs et partenaires dans un club pense pour structurer les rencontres, les collaborations et les opportunites.",
          "Le Club Pro ABI aide a mieux lire l'ecosysteme, accelerer les mises en relation et integrer un cadre de travail plus utile.",
        ]}
        backgroundImage="url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(3,37,99,0.86)_42%,rgba(3,64,145,0.8)_100%)]"
      />

      <section className="border-y border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-[560px]">
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[2.9rem]">
                Un club pense pour renforcer les relations professionnelles autour des projets ABI.
              </h1>
            </div>

            <div className="grid gap-4 content-start">
              {proClubIntro.map((paragraph) => (
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
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80"
              alt="Club Pro ABI"
              className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]"
            />
          </div>

          <div className="grid gap-2 self-stretch">
            <ClubAccordion
              title="Objectifs"
              icon={Network}
              items={proClubObjectives}
              isOpen={openSection === 0}
              onToggle={() => handleAccordionToggle(0)}
            />

            <ClubAccordion
              title="Avantages pour les membres"
              icon={ShieldCheck}
              items={proClubBenefits}
              isOpen={openSection === 1}
              onToggle={() => handleAccordionToggle(1)}
            />

            <ClubAccordion
              title="Activites principales"
              icon={CalendarRange}
              items={proClubActivities}
              isOpen={openSection === 2}
              onToggle={() => handleAccordionToggle(2)}
            />

            <ClubAccordion
              title="Adhesion"
              icon={FileSignature}
              items={membershipItems}
              isOpen={openSection === 3}
              onToggle={() => handleAccordionToggle(3)}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[3rem]">
              Souscrire au Club Pro selon votre profil.
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-[760px] border border-[#0f62c9] p-1">
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(subscriptionPlans).map(([key, plan]) => {
                const isActive = activePlan === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePlan(key)}
                    className={`px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] transition ${
                      isActive
                        ? "bg-[#0f62c9] text-white"
                        : "bg-white text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    {plan.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 bg-[#f4f6fa] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="overflow-hidden bg-white shadow-[0_16px_34px_rgba(15,23,42,0.08)]">
                <img
                  src={currentPlan.image}
                  alt={currentPlan.label}
                  className="h-full min-h-[280px] w-full object-cover sm:min-h-[360px]"
                />
              </div>

              <div>
                <div className="inline-flex bg-[#0f62c9] px-5 py-3 text-white shadow-[0_12px_24px_rgba(15,98,201,0.18)]">
                  <p className="text-lg font-semibold tracking-[0.04em] sm:text-[1.45rem]">
                    {currentPlan.price}
                  </p>
                </div>
                <div className="mt-8 divide-y divide-slate-300/80 border-y border-slate-300/80">
                  {currentPlan.items.map((item) => (
                    <div key={item} className="flex items-start gap-4 py-5">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[#0f62c9]">
                        <Check size={18} strokeWidth={2.4} />
                      </div>
                      <p className="text-sm leading-7 text-slate-700 sm:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
                  >
                    <CreditCard size={16} />
                    Souscrire a l'offre {currentPlan.label}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-6 bg-[linear-gradient(135deg,#0a67cf_0%,#0452ac_42%,#033c87_100%)] px-6 py-8 text-white shadow-[0_16px_36px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div className="max-w-[760px]">
              <h2 className="text-2xl font-semibold leading-tight sm:text-[2rem]">
                Rejoindre un reseau plus structure pour mieux lire les opportunites et activer les bonnes connexions.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                ABI peut vous orienter sur les modalites d'adhesion, les rencontres du club et la facon d'integrer l'ecosysteme selon votre profil.
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
                href="mailto:contact@africabuildinvest.com?subject=Club%20Pro%20ABI"
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

export default AbiClubProPage;
