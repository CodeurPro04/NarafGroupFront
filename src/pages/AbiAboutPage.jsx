import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Search,
  UserRoundPlus,
  WalletCards,
  ShieldCheck,
} from "lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const proofCards = [
  {
    step: "01",
    title: "Inscription",
    text: "Renseignez votre profil en quelques minutes et accedez a un parcours simple.",
    icon: UserRoundPlus,
  },
  {
    step: "02",
    title: "Verification",
    text: "ABI verifie vos informations pour securiser chaque interaction.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Recherche ciblee",
    text: "Identifiez les biens ou opportunites qui correspondent a vos objectifs.",
    icon: Search,
  },
  {
    step: "04",
    title: "Activation",
    text: "Passez a l'action avec un accompagnement concret a chaque etape.",
    icon: WalletCards,
  },
];

const howItWorks = [
  "Votre aventure ABI commence ici. Inscrivez-vous en 3 minutes.",
  "Verifiez votre identite pour acceder a une experience securisee.",
  "Choisissez le type de bien, l'investissement ou l'accompagnement souhaite.",
  "Profitez d'un parcours pense pour convertir votre projet en resultat concret.",
  "Plus vous avancez, plus vous gagnez. Il n'y a pas de limite a ce que vous pouvez accomplir.",
];

const clubLogos = ["ABI Immo", "ABI Construction", "ABI Invest", "Partenaires+"];

const advantageItems = [
  {
    title: "Rapidite d'execution",
    text: "Des demarches plus fluides, une lecture claire des opportunites et un traitement plus rapide de vos demandes.",
  },
  {
    title: "Carte de securite",
    text: "Un suivi rigoureux et des etapes de verification pour reduire les risques sur vos transactions.",
  },
  {
    title: "Conseillers faciles a joindre",
    text: "Une equipe disponible pour vous orienter rapidement et garder le projet sous controle.",
  },
  {
    title: "Payer et etre paye",
    text: "Des flux plus simples pour les acomptes, les remboursements et les paiements de prestations.",
  },
  {
    title: "Plafonds eleves",
    text: "Des montants adaptes aux projets ambitieux, sans bloquer votre progression sur des seuils trop bas.",
  },
  {
    title: "Gerer et controler, la totale autonomie",
    text: "Un espace pour suivre, piloter et ajuster votre avancement a tout moment.",
  },
];

const AbiAboutPage = () => {
  const [openAdvantage, setOpenAdvantage] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="bg-[linear-gradient(180deg,#f4f7fb_0%,#f7f2ea_48%,#ffffff_100%)] pb-20">
      <PropertiesHero
        onPrimaryAction={() => navigate("/properties")}
        onSecondaryAction={() => navigate("/partnership")}
        secondaryLabel="Faire une annonce"
      />

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1040px] overflow-hidden border border-white/70 bg-white/95 px-6 py-10 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur sm:px-10 sm:py-12">
          <div className="mx-auto max-w-[520px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#1a4f9c]">
              Africa Business Invest
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-[2.2rem]">
              1 an d'accompagnement offert.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Une entree claire dans l'ecosysteme ABI pour acheter, construire
              ou investir avec un cadre plus lisible et plus fiable.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofCards.map((item) => {
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
            Un acces fluide, des verifications strictes et une experience structuree.
          </div>
        </section>

        <section className="grid overflow-hidden border-y border-[#eadfcf] bg-[#f3e7d7] shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-10 sm:px-10 sm:py-12 lg:px-8">
            <div className="max-w-[560px]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1f6fd0]">
                Parcours ABI
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Comment ca marche ?
              </h2>
              <div className="mt-8 space-y-5">
                {howItWorks.map((item, index) => (
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
                to="/abi/parrainage"
                className="mt-8 inline-flex items-center gap-2 bg-[#1e76d3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#135ca8]"
              >
                Mon espace de parrainage
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] bg-[#d8c2a7]">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
              alt="Comment ca marche"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

      </div>

      <section className="relative mt-10 overflow-hidden bg-[linear-gradient(90deg,#0272df_0%,#005bb7_38%,#003d8d_100%)] text-white shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&q=80"
          alt="ABI Club"
          className="absolute right-0 top-0 h-full w-full object-cover opacity-30 md:w-[48%] md:opacity-75"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,113,220,0.96)_0%,rgba(0,79,169,0.9)_48%,rgba(0,61,141,0.4)_100%)]" />

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-[760px] px-4 sm:px-6">
            <p className="text-4xl font-medium italic text-[#53d5ff]">
              ABI Club
            </p>
            <h2 className="mt-4 max-w-[360px] text-2xl font-semibold leading-tight">
              Des avantages exclusifs dans tout l'ecosysteme ABI.
            </h2>
            <p className="mt-4 max-w-[390px] text-sm leading-6 text-white/85">
              Immobilier, construction, investissement et partenaires verifies:
              tout est reuni pour prolonger la valeur de votre compte ABI.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg font-semibold text-white/90">
              {clubLogos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>

            <Link
              to="/abi/club"
              className="mt-12 inline-flex bg-white px-5 py-3 text-sm font-semibold text-[#005bb7] shadow-md transition hover:bg-slate-100"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="grid items-start gap-8 border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_55px_rgba(15,23,42,0.06)] lg:grid-cols-[320px_1fr] lg:px-10 lg:py-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1f6fd0]">
              Avantages ABI
            </p>
            <h2 className="mt-3 max-w-[280px] text-3xl font-semibold leading-tight text-slate-900">
              Tous nos avantages pour les professionnels en un seul compte.
            </h2>
            <p className="mt-4 max-w-[280px] text-sm leading-6 text-slate-500">
              Une page plus lisible, des actions plus claires et un parcours
              coherent avec l'univers du site public ABI.
            </p>
            <div className="mt-8 overflow-hidden bg-[#d8bf90]">
              <img
                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900&q=80"
                alt="Professionnelle"
                className="h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-200 border-t border-slate-200 lg:mt-14">
            {advantageItems.map((item, index) => {
              const isOpen = openAdvantage === index;
              return (
                <div key={item.title} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenAdvantage(isOpen ? -1 : index)}
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
        </section>
      </div>
    </div>
  );
};

export default AbiAboutPage;
