import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileBadge2,
  Globe2,
  Mail,
  Shield,
  Settings2,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Workflow,
  X,
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

const diasporaValueItems = [
  {
    title: "1. Choisissez une opportunite d'investissement",
    subtitle:
      "Nous sélectionnons et présentons chaque mois de nouvelles opportunités d'investissement partout en Afrique.",
  },
  {
    title: "2. Acheter des parts dès 100 euros",
    subtitle:
      "Tous nos biens sont accessibles à partir de 100 euros. Vous pouvez ainsi investir simplement et à la hauteur de vos revenus.",
  },
  {
    title: "3. Recevez chaque mois votre part de loyers",
    subtitle:
      "Vos revenus locatifs sont matérialisées par des obligations nominatives. Un tableau de bord permet de visualiser vos loyers perçus et l'évolution annuelle de la valeur de vos parts.",
  },
  {
    title: "4. Profiter de plus-value à la revente",
    subtitle:
      "Touchez votre plus-value à la revente du bien après quelques années. Simple et efficace.",
  },
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

const diasporaTrustCards = [
  {
    title: "Des rendements structures",
    text: "Investissez dans des projets immobiliers a fort potentiel avec une lecture plus claire des revenus, des loyers et de la creation de valeur.",
    icon: TrendingUp,
  },
  {
    title: "Une selection plus exclusive",
    text: "Les dossiers presentes passent par un cadre de lecture plus exigeant pour mieux filtrer les opportunites et reduire l'incertitude.",
    icon: FileBadge2,
  },
  {
    title: "100% digital et securise",
    text: "Le parcours d'adhesion, le suivi des dossiers et les echanges sont pensés pour rester fluides, meme a distance depuis la diaspora.",
    icon: Shield,
  },
  {
    title: "Une experience terrain",
    text: "ABI rapproche expertise locale, structuration des deals et animation du suivi pour rendre l'investissement plus concret et mieux accompagne.",
    icon: Clock3,
  },
];

const africanCountries = [
  "Afrique du Sud",
  "Algerie",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroun",
  "Comores",
  "Congo",
  "Cote d'Ivoire",
  "Djibouti",
  "Egypte",
  "Erythree",
  "Eswatini",
  "Ethiopie",
  "Gabon",
  "Gambie",
  "Ghana",
  "Guinee",
  "Guinee-Bissau",
  "Guinee equatoriale",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libye",
  "Madagascar",
  "Malawi",
  "Mali",
  "Maroc",
  "Maurice",
  "Mauritanie",
  "Mozambique",
  "Namibie",
  "Niger",
  "Nigeria",
  "Ouganda",
  "Republique centrafricaine",
  "Republique democratique du Congo",
  "Rwanda",
  "Sao Tome-et-Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalie",
  "Soudan",
  "Soudan du Sud",
  "Tanzanie",
  "Tchad",
  "Togo",
  "Tunisie",
  "Zambie",
  "Zimbabwe",
];

const inputClassName =
  "mt-2 w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f62c9] focus:ring-4 focus:ring-[#0f62c9]/10";

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
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const initialMembershipForm = {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    investmentCapacity: "",
    message: "",
  };
  const [membershipForm, setMembershipForm] = useState(initialMembershipForm);

  const handleMembershipFormChange = (event) => {
    const { name, value } = event.target;
    setMembershipForm((current) => ({ ...current, [name]: value }));
  };

  const openMembershipModal = () => {
    setMembershipForm(initialMembershipForm);
    setIsMembershipModalOpen(true);
  };

  const handleCloseMembershipModal = () => {
    setIsMembershipModalOpen(false);
    setMembershipForm(initialMembershipForm);
  };

  const handleMembershipSubmit = (event) => {
    event.preventDefault();

    const subject = "Demande d'adhesion Club ABI Diaspora";
    const body = [
      "Programme : Club ABI Diaspora",
      `Nom complet : ${membershipForm.fullName}`,
      `Email : ${membershipForm.email}`,
      `Telephone : ${membershipForm.phone || "Non renseigne"}`,
      `Pays : ${membershipForm.country || "Non renseigne"}`,
      `Ville : ${membershipForm.city || "Non renseignee"}`,
      `Capacite d'investissement : ${membershipForm.investmentCapacity || "Non renseignee"}`,
      "",
      "Message :",
      membershipForm.message || "Aucun message complementaire.",
    ].join("\n");

    window.location.href = `mailto:contact@africabuildinvest.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-[linear-gradient(180deg,#f4f7fb_0%,#f7f1e8_42%,#ffffff_100%)] text-slate-900">
      <PropertiesHero
        onPrimaryAction={openMembershipModal}
        onSecondaryAction={() => {
          window.location.href =
            "mailto:contact@africabuildinvest.com?subject=Club%20ABI%20Diaspora";
        }}
        primaryLabel="Adhérer maintenant"
        primaryIcon={UserPlus}
        secondaryLabel="Contacter ABI"
        secondaryIcon={Mail}
        title="Trouver des opportunites et de reels avantages."
        descriptionLines={[
          "Africa Build Investment accompagne la diaspora pour accéder à des projets structurés, comprendre les mécanismes d’investissement et se positionner dans un cadre clair et sécurisé.",
        ]}
        backgroundImage="url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(3,37,99,0.86)_42%,rgba(3,64,145,0.8)_100%)]"
      />

      <section className="border-y border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
          <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
            <h1 className="max-w-[960px] text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[2.9rem]">
              Diversifiez votre patrimoine en intégrant le meilleur club immobilier de la diaspora.
            </h1>

            <div className="mt-6 grid max-w-[860px] gap-4">
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

          {/*
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
          */}
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
            <div className="pb-4">
              <h2 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-[2rem]">
                Pourquoi devenir membre du club ABI diaspora ?
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                A partir de 100 euros, investissez dans des projets immobilier a fort rendement et percevez chaque mois une part des loyers et la plus-value a la revente.
              </p>
            </div>

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

      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0a67cf_0%,#0452ac_42%,#033c87_100%)] text-white">
        <div className="relative mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-[860px] text-center">
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">
              Investir en immobilier n'a jamais ete aussi facile
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/85 sm:text-base">
              Realiser votre premier investissement en quatre etapes simple.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {diasporaValueItems.map((item) => (
                <div key={item.title} className="border border-white/15 bg-white/10 px-5 py-5 text-center backdrop-blur-sm">
                  <h3 className="text-base font-semibold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/85">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="mailto:contact@africabuildinvest.com?subject=Echange%20Club%20ABI%20Diaspora"
              className="mt-10 inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Echanger avec notre equipe
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/*
        Section Conditions d'adhesion a retravailler.
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
      */}

      {isMembershipModalOpen ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white shadow-[0_30px_80px_rgba(15,23,42,0.32)]">
            <button
              type="button"
              onClick={handleCloseMembershipModal}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-[linear-gradient(180deg,#0f62c9_0%,#084896_100%)] px-6 py-8 text-white sm:px-8">
                <h2 className="text-3xl font-semibold leading-tight">
                  Formulaire d'adhésion au Club ABI Diaspora.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                  Renseignez vos informations pour transmettre une demande claire et structurée à l'équipe ABI Diaspora.
                </p>
                <div className="mt-8 space-y-3 border-t border-white/15 pt-6">
                  {diasporaBenefits.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-white">
                        <Check size={16} strokeWidth={2.4} />
                      </div>
                      <p className="text-sm leading-6 text-white/85">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleMembershipSubmit} className="bg-[#f7f9fc] px-6 py-8 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Nom complet</span>
                    <input
                      type="text"
                      name="fullName"
                      value={membershipForm.fullName}
                      onChange={handleMembershipFormChange}
                      className={inputClassName}
                      placeholder="Votre nom complet"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={membershipForm.email}
                      onChange={handleMembershipFormChange}
                      className={inputClassName}
                      placeholder="vous@exemple.com"
                      required
                    />
                  </label>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Telephone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={membershipForm.phone}
                      onChange={handleMembershipFormChange}
                      className={inputClassName}
                      placeholder="+33 07 51 52 10 63"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Pays</span>
                    <input
                      type="text"
                      name="country"
                      value={membershipForm.country}
                      onChange={handleMembershipFormChange}
                      list="diaspora-african-countries"
                      className={inputClassName}
                      placeholder="Recherchez puis sélectionnez votre pays"
                    />
                    <datalist id="diaspora-african-countries">
                      {africanCountries.map((country) => (
                        <option key={country} value={country} />
                      ))}
                    </datalist>
                  </label>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Ville</span>
                    <input
                      type="text"
                      name="city"
                      value={membershipForm.city}
                      onChange={handleMembershipFormChange}
                      className={inputClassName}
                      placeholder="Votre ville"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Capacite d'investissement</span>
                    <input
                      type="text"
                      name="investmentCapacity"
                      value={membershipForm.investmentCapacity}
                      onChange={handleMembershipFormChange}
                      className={inputClassName}
                      placeholder="Ex. a partir de 100 euros"
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="text-sm font-medium text-slate-700">Message</span>
                  <textarea
                    name="message"
                    value={membershipForm.message}
                    onChange={handleMembershipFormChange}
                    rows={5}
                    className={`${inputClassName} resize-none`}
                    placeholder="Precisez votre profil, votre interet pour le club et vos objectifs d'investissement."
                  />
                </label>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#0f62c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
                  >
                    <Mail size={16} />
                    Envoyer la demande
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseMembershipModal}
                    className="inline-flex items-center justify-center border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Fermer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="max-w-[860px]">
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[2.45rem]">
              Decouvrez pourquoi plusieurs investisseurs nous font confiance
            </h2>
            <p className="mt-4 max-w-[760px] text-sm leading-7 text-slate-600 sm:text-base">
              Des projets mieux cadres, des opportunites plus lisibles et un accompagnement plus concret pour investir sereinement depuis la diaspora.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.1fr_0.95fr] lg:items-stretch">
            <div className="grid gap-6">
              {diasporaTrustCards.slice(0, 2).map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] px-5 py-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center bg-[#e7f1ff] text-[#0f62c9]">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="overflow-hidden bg-[#d7c1a0] shadow-[0_20px_42px_rgba(15,23,42,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&q=80"
                alt="Investisseurs de la diaspora"
                className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]"
              />
            </div>

            <div className="grid gap-6">
              {diasporaTrustCards.slice(2).map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] px-5 py-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center bg-[#e7f1ff] text-[#0f62c9]">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-16">
          <div className="bg-[linear-gradient(135deg,#0a67cf_0%,#0452ac_42%,#033c87_100%)] px-6 py-8 text-white shadow-[0_16px_36px_rgba(15,23,42,0.08)] lg:px-8">
            <div className="max-w-[760px]">
              <h2 className="text-2xl font-semibold leading-tight sm:text-[2rem]">
                Rejoindre un cadre collectif plus serieux pour etudier, structurer et suivre les investissements de la diaspora.
              </h2>
            </div>

            <p className="mt-4 max-w-[760px] text-sm leading-7 text-white/82 sm:text-base">
              ABI peut vous orienter sur les modalites d'adhesion, la documentation attendue et le type d'opportunites accessibles dans le Club ABI Diaspora.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openMembershipModal}
                className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-[#0f62c9] transition hover:bg-slate-100"
              >
                Adhérer maintenant
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
