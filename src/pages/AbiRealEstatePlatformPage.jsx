import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  CircleHelp,
  FileSearch,
  Handshake,
  Landmark,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const serviceItems = [
  {
    title: "Annonces de vente",
    points: [
      "Logements, terrains, locaux commerciaux et projets neufs avec fiches detaillees, photos, plans et visites virtuelles.",
    ],
  },
  {
    title: "Presentation de projets",
    points: [
      "Dossiers complets avec business plan, etudes de faisabilite, calendriers, budgets et rendements attendus.",
    ],
  },
  {
    title: "Mise en relation",
    points: [
      "Matchmaking entre acheteurs, investisseurs, promoteurs et operateurs locaux.",
    ],
  },
  {
    title: "Outils de financement",
    points: [
      "Simulation de credit, offres partenaires banques et fintechs, informations sur dispositifs fiscaux et aides.",
    ],
  },
  {
    title: "Accompagnement transactionnel",
    points: [
      "Assistance juridique, notariale, due diligence, valorisation et negociation.",
    ],
  },
  {
    title: "Suivi de chantier",
    points: [
      "Reporting, photos periodiques, planning et KPI pour investisseurs et acheteurs.",
    ],
  },
  {
    title: "Espaces investisseurs",
    points: [
      "Acces a des opportunites preselectionnees, documents d'investissement et options de co-investissement ou SPV.",
    ],
  },
  {
    title: "Services annexes",
    points: [
      "Assurance, gestion locative, certification ESG et diagnostics techniques.",
    ],
  },
];

const featureItems = [
  "Recherche avancee et filtres par localisation, prix, surface et statut du projet.",
  "Dataroom securisee pour chaque projet avec documents telechargeables.",
  "Systeme de messagerie et prise de rendez-vous integree.",
  "Visites virtuelles 3D et geolocalisation des biens.",
  "Tableau de bord investisseur avec portefeuille, reporting et performances.",
  "Processus KYC/AML pour securiser les transactions.",
];

const valueItems = [
  "Transparence et qualite de l'information pour reduire le risque decisionnel.",
  "Gain de temps via preselection et matching intelligent.",
  "Acces a des projets structures et a des opportunites d'investissement diversifiees.",
  "Accompagnement complet de la recherche a la livraison.",
];

const overviewCards = [
  {
    title: "Particuliers et professionnels",
    text: "ABI met en relation acheteurs, vendeurs, locataires, promoteurs, operateurs locaux et investisseurs dans un meme cadre de confiance.",
    icon: Handshake,
  },
  {
    title: "Immobilier et construction",
    text: "La plateforme couvre la vente de biens existants comme la presentation de projets neufs, de promotion, de lotissements et d'operations de requalification.",
    icon: Building2,
  },
  {
    title: "Decisions mieux cadres",
    text: "Chaque parcours cherche a mieux documenter les projets, filtrer les opportunites et fluidifier le passage a l'action.",
    icon: ShieldCheck,
  },
];

const LineAccordion = ({ title, items, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-300/90">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-[1.85rem] font-medium tracking-[-0.03em] text-slate-950 sm:text-[2rem]">
          {title}
        </span>
        <ChevronDown
          size={22}
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
            className={`space-y-4 pb-7 text-lg leading-8 text-slate-500 transition-all duration-500 ease-out ${
              isOpen ? "translate-y-0" : "-translate-y-2"
            }`}
          >
            {items.map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AbiRealEstatePlatformPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[linear-gradient(180deg,#f4f6fb_0%,#f1eee8_36%,#ffffff_100%)] text-slate-950">
      <PropertiesHero
        onPrimaryAction={() => navigate("/properties")}
        onSecondaryAction={() => navigate("/partnership")}
        primaryLabel="Explorer les biens"
        secondaryLabel="Parler a un conseiller"
        eyebrow=""
        title="Une plateforme immobiliere plus claire pour acheter, vendre, investir et suivre vos projets."
        descriptionLines={[
          "ABI met en relation particuliers, promoteurs, operateurs locaux et investisseurs dans un cadre plus structure.",
          "Biens existants, projets neufs, financement, accompagnement transactionnel et suivi de chantier sont reunis dans une meme experience.",
        ]}
        backgroundImage="url('https://images.unsplash.com/photo-1494526585095-c41746248156?w=1920&q=80')"
      />

      <section className="border-y border-white/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="max-w-[760px]">
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-[2.7rem] sm:leading-[0.98]">
              La plateforme immobiliere panafricaine qui relie offre, projets et investissement.
            </h1>
            <p className="mt-6 max-w-[700px] text-lg leading-8 text-slate-600">
              ABI est une plateforme de mise en relation des particuliers, promoteurs et investisseurs pour la vente de biens immobiliers et la presentation de projets de construction : neuf, promotion, lotissements et operations de requalification.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {overviewCards.map((item) => {
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
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-[2.7rem] sm:leading-[1]">
              Les services qui structurent votre parcours immobilier.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-500">
              Retrouvez une lecture simple des services disponibles, avec un affichage progressif plus proche du modele editorial du lien de reference.
            </p>

            <div className="mt-10">
              {serviceItems.map((item, index) => (
                <LineAccordion
                  key={item.title}
                  title={item.title}
                  items={item.points}
                  defaultOpen={index === 0}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="mt-10 inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
            >
              Voir les annonces disponibles
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="overflow-hidden rounded-[4px] bg-[#d9d4cd] shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80"
              alt="Consultation de projets immobiliers sur ABI"
              className="h-full min-h-[420px] w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-18">
          <div className="overflow-hidden bg-[#dfe8f5] shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1400&q=80"
              alt="Fonctionnalites de suivi et de dataroom"
              className="h-full min-h-[340px] w-full object-cover object-center"
            />
          </div>

          <div className="max-w-[560px] justify-self-end">
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[2.7rem]">
              Des outils concrets pour comparer, verifier et decider plus vite.
            </h2>
            <div className="mt-8 space-y-4">
              {featureItems.map((item, index) => {
                const icons = [
                  SlidersHorizontal,
                  FileSearch,
                  MessageSquareText,
                  Building2,
                  Landmark,
                  ShieldCheck,
                ];
                const Icon = icons[index] || CircleHelp;
                return (
                  <div key={item} className="flex gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f2f7fd] text-[#0f62c9]">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
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
            src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400&q=80"
            alt="Investissement immobilier et pilotage de projets"
            className="h-full w-full object-cover object-center opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,103,207,0.95)_0%,rgba(4,82,172,0.9)_52%,rgba(3,60,135,0.25)_100%)]" />

        <div className="relative mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="max-w-[620px]">
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-[2.7rem]">
              Une experience mieux documentee pour reduire la friction et le risque decisionnel.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {valueItems.map((item) => (
                <div key={item} className="border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
                  <p className="text-sm leading-7 text-white/85">{item}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate("/partnership")}
              className="mt-10 inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Echanger avec notre equipe
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AbiRealEstatePlatformPage;
