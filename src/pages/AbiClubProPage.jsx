import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarRange,
  Check,
  ChevronDown,
  CreditCard,
  FileBadge2,
  Mail,
  Network,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserPlus,
  X,
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

const membershipCards = [
  {
    title: "Conditions",
    text: "profil lie aux secteurs de la construction, des infrastructures, de l'investissement, du developpement ou a un interet fort pour l'ecosysteme ABI.",
    icon: FileBadge2,
  },
  {
    title: "Modalites",
    text: "inscription via la plateforme, evaluation par l'equipe ABI et orientation selon le format d'adhesion le plus adapte.",
    icon: Settings2,
  },
  {
    title: "Pourquoi rejoindre",
    text: "accelerer l'acces a des deals de qualite, partager l'expertise et s'inscrire dans un reseau plus structure.",
    icon: Sparkles,
  },
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
  investisseur: {
    label: "Investisseur",
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
    label: "Entreprise",
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
  const [activePlan, setActivePlan] = useState("investisseur");
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const initialMembershipForm = {
    fullName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    country: "",
    message: "",
  };
  const [membershipForm, setMembershipForm] = useState(initialMembershipForm);

  const currentPlan = subscriptionPlans[activePlan];

  const handleAccordionToggle = (index) => {
    setOpenSection((currentIndex) => (currentIndex === index ? -1 : index));
  };

  const openMembershipModal = (planKey) => {
    setActivePlan(planKey);
    setMembershipForm(initialMembershipForm);
    setIsMembershipModalOpen(true);
  };

  const handleMembershipFormChange = (event) => {
    const { name, value } = event.target;
    setMembershipForm((current) => ({ ...current, [name]: value }));
  };

  const handleCloseMembershipModal = () => {
    setIsMembershipModalOpen(false);
    setMembershipForm(initialMembershipForm);
  };

  const handleMembershipSubmit = (event) => {
    event.preventDefault();

    const subject = `Demande d'adhesion Club Pro - ${currentPlan.label}`;
    const body = [
      `Profil : ${currentPlan.label}`,
      `Nom complet : ${membershipForm.fullName}`,
      `Email : ${membershipForm.email}`,
      `Telephone : ${membershipForm.phone || "Non renseigne"}`,
      `Entreprise : ${membershipForm.company || "Non renseignee"}`,
      `Fonction : ${membershipForm.role || "Non renseignee"}`,
      `Pays : ${membershipForm.country || "Non renseigne"}`,
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
        onPrimaryAction={() => openMembershipModal("entreprises")}
        onSecondaryAction={() => {
          window.location.href =
            "mailto:contact@africabuildinvest.com?subject=Club%20Pro%20ABI";
        }}
        primaryLabel="Adhérer maintenant"
        primaryIcon={UserPlus}
        secondaryLabel="Contacter ABI"
        secondaryIcon={Mail}
        title="Club Pro ABI, un cadre clair pour connecter reseau, projets et opportunites."
        descriptionLines={[
          "Africa Build Investment reunit professionnels, operateurs et partenaires dans un club pense pour structurer les rencontres, les collaborations et les opportunites.",
        ]}
        backgroundImage="url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(3,37,99,0.86)_42%,rgba(3,64,145,0.8)_100%)]"
      />

      <section className="border-y border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-[560px]">
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[2.9rem]">
                Un réseau de professionnelles autour des projets Africains.
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
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80"
              alt="Club Pro ABI"
              className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]"
            />
          </div>

          <div className="grid gap-2 self-stretch">
            <div className="pb-4">
              <h2 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-[2rem]">
                Pourquoi devenir membre du club ABI ?
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Vous avez un conseiller dedie qui vous propose des projets adaptes a vos besoins.
                Ideal quand le temps manque ou que le marche est complexe.
                Acces complet au catalogue, inscription gratuite.
              </p>
            </div>

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
          </div>
        </div>
      </section>

      {/*
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-[920px]">
            <h2 className="text-center text-2xl font-semibold leading-tight text-slate-950 sm:text-[2rem]">
              Adhesion
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

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[3rem]">
              Souscrire au Club Pro selon votre profil.
            </h2>
          </div>

          <div className="relative z-10 mx-auto mt-10 mb-[-28px] max-w-[760px] border border-[#0f62c9] bg-white p-1 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
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

          <div className="mt-0 bg-[#f4f6fa] px-6 pt-16 pb-8 sm:px-8 sm:pt-18 sm:py-10 lg:px-12 lg:pt-20 lg:pb-12">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="overflow-hidden bg-white shadow-[0_16px_34px_rgba(15,23,42,0.08)]">
                <img
                  src={currentPlan.image}
                  alt={currentPlan.label}
                  className="h-full min-h-[280px] w-full object-cover sm:min-h-[360px]"
                />
              </div>

              <div>
                <div className="mt-6 divide-y divide-slate-300/80 border-y border-slate-300/80">
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
              </div>
            </div>

            <div className="mt-10 grid gap-6 border-t border-slate-300/80 pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-[760px]">
                <h3 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-[2rem]">
                  Rejoindre un reseau plus structure pour mieux lire les opportunites et activer les bonnes connexions.
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  ABI peut vous orienter sur les modalites d'adhesion, les rencontres du club et la facon d'integrer l'ecosysteme selon votre profil.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openMembershipModal(activePlan)}
                  className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
                >
                  Adhérer maintenant
                  <ArrowRight size={16} />
                </button>
                <a
                  href="mailto:contact@africabuildinvest.com?subject=Club%20Pro%20ABI"
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Contacter ABI
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  Formulaire d'adhésion {currentPlan.label.toLowerCase()}.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                  Renseignez vos informations pour transmettre une demande d'adhésion claire et structurée à l'équipe ABI.
                </p>
                <div className="mt-8 space-y-3 border-t border-white/15 pt-6">
                  {currentPlan.items.slice(0, 3).map((item) => (
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
                      list="african-countries"
                      className={inputClassName}
                      placeholder="Recherchez puis sélectionnez votre pays"
                    />
                    <datalist id="african-countries">
                      {africanCountries.map((country) => (
                        <option key={country} value={country} />
                      ))}
                    </datalist>
                  </label>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                      {activePlan === "entreprises" ? "Entreprise" : "Structure d'investissement"}
                    </span>
                    <input
                      type="text"
                      name="company"
                      value={membershipForm.company}
                      onChange={handleMembershipFormChange}
                      className={inputClassName}
                      placeholder={
                        activePlan === "entreprises"
                          ? "Nom de votre entreprise"
                          : "Nom de votre structure"
                      }
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Fonction</span>
                    <input
                      type="text"
                      name="role"
                      value={membershipForm.role}
                      onChange={handleMembershipFormChange}
                      className={inputClassName}
                      placeholder="Votre fonction"
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
                    placeholder="Precisez votre profil, votre interet pour le club et ce que vous recherchez."
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

    </div>
  );
};

export default AbiClubProPage;
