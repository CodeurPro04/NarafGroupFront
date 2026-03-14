import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Globe2,
  Handshake,
  Landmark,
  Leaf,
  Mail,
  MapPinned,
  Network,
  ShieldCheck,
  Users,
  CalendarRange,
  FileSignature,
  Workflow,
  BadgeCheck,
} from "lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const overviewCards = [
  {
    title: "Plateforme panafricaine",
    text: "Africa Build Investment soutient, finance et accompagne des projets d'immobilier, de construction et d'infrastructure durable a travers le continent.",
    icon: Building2,
  },
  {
    title: "Ecosysteme d'acteurs",
    text: "Nous reunissons investisseurs, promoteurs, experts techniques et partenaires publics pour catalyser des initiatives a fort impact socio-economique.",
    icon: Handshake,
  },
  {
    title: "Impact durable",
    text: "Nos interventions privilegient des projets resilients, inclusifs et utiles aux territoires urbains comme ruraux.",
    icon: Leaf,
  },
];

const agencyRoles = [
  "Identifier et sourcer des projets locaux.",
  "Accompagner la structuration et la preparation des dossiers : faisabilite et due diligence.",
  "Faciliter les relations avec les autorites locales et les partenaires techniques.",
  "Assurer le suivi operationnel et le pilotage des projets sur le terrain.",
  "Promouvoir l'acces au financement et au montage financier adapte.",
];

const regionalOffices = [
  "Siege regional : Casablanca, Maroc.",
  "Afrique de l'Ouest : Dakar (Senegal) et Abidjan (Cote d'Ivoire).",
  "Afrique centrale : Douala (Cameroun).",
  "Afrique de l'Est : Nairobi (Kenya).",
  "Afrique australe : Johannesburg (Afrique du Sud).",
  "Hub nigerian : Lagos (Nigeria).",
];

const agencyServices = [
  "Accompagnement projets : technique, financier, ESG.",
  "Bureau d'etudes local et partenariats metiers.",
  "Formation et capacity building pour porteurs de projets locaux.",
  "Point de contact pour investisseurs et partenaires.",
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

const listItemClass =
  "flex gap-3 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0";

const AccordionCard = ({
  title,
  icon: Icon,
  items,
  children,
  className = "",
  iconWrapperClassName = "bg-[#f3f7fd] text-[#0f62c9]",
  titleClassName = "text-2xl font-semibold text-slate-950",
  buttonClassName = "flex w-full items-center justify-between gap-4 py-5 text-left",
  contentClassName = "grid gap-3 pb-5 text-sm leading-6 text-slate-600",
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  return (
    <div
      className={`border-b border-slate-200 bg-transparent py-1 ${className}`}
    >
      <button
        type="button"
        onClick={() => {
          if (isControlled) {
            onToggle?.();
            return;
          }
          setInternalIsOpen((value) => !value);
        }}
        className={buttonClassName}
      >
        <div className="flex items-center gap-3">
          {Icon ? (
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full ${iconWrapperClassName}`}
            >
              <Icon size={18} />
            </div>
          ) : null}
          <h3 className={titleClassName}>{title}</h3>
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
            className={`${contentClassName} transition-all duration-500 ease-out ${
              isOpen ? "translate-y-0" : "-translate-y-2"
            }`}
          >
            {items?.map((item) => (
              <div key={item} className={listItemClass}>
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62c9]" />
                <p className="text-xl leading-6 text-slate-600">{item}</p>
              </div>
            ))}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const AbiAboutPage = () => {
  const navigate = useNavigate();
  const [openAgencyAccordion, setOpenAgencyAccordion] = useState(0);
  const [openProClubAccordion, setOpenProClubAccordion] = useState(0);
  const [openDiasporaAccordion, setOpenDiasporaAccordion] = useState(0);

  return (
    <div className="bg-[linear-gradient(180deg,#f5f8fd_0%,#f9f4ec_42%,#ffffff_100%)] text-slate-900">
      <PropertiesHero
        onPrimaryAction={() => navigate("/partnership")}
        onSecondaryAction={() => navigate("/abi/plateforme-immobiliere")}
        primaryLabel="Contacter ABI"
        secondaryLabel="Voir la plateforme"
        eyebrow=""
        title="Une plateforme panafricaine pour structurer, financer."
        descriptionLines={[
          "Africa Build Investment relie investisseurs, promoteurs, experts techniques, agences regionales et partenaires publics.",
          "Cette page presente notre mission, notre vision, notre reseau d'agences et les clubs qui animent l'ecosysteme ABI.",
        ]}
        backgroundImage="url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(3,37,99,0.86)_42%,rgba(3,64,145,0.8)_100%)]"
      />

      <section className="relative overflow-hidden border-y border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,#d8e9ff_0%,rgba(216,233,255,0)_72%)]" />
        <div className="relative mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-20">
          <div className="max-w-[820px]">
            <h1 className="mt-4 max-w-[780px] text-4xl font-semibold leading-tight text-slate-950 sm:text-[2.7rem] sm:leading-[1.02]">
              Construire, financer et accompagner les projets qui transforment durablement l'Afrique.
            </h1>
            <p className="mt-6 max-w-[700px] text-base leading-7 text-slate-600 sm:text-lg">
              Africa Build Investment est une plateforme panafricaine dediee a soutenir,
              financer et accompagner des projets d'immobilier, de construction et
              d'infrastructure durable a travers le continent.
            </p>
            <p className="mt-4 max-w-[700px] text-base leading-7 text-slate-600 sm:text-lg">
              Nous reunissons investisseurs, promoteurs, experts techniques et partenaires
              publics pour catalyser des initiatives a fort impact socio-economique.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/partnership"
                className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
              >
                Parler a notre equipe
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:contact@africabuildinvestment.com"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                contact@africabuildinvestment.com
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {overviewCards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-6 py-6 shadow-[0_14px_28px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-[#0f62c9] text-white shadow-md">
                    <Icon size={18} />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#d8b4118d]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="max-w-[560px]">
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-[2.1rem]">
              Faciliter l'acces au financement et aux competences pour des projets durables.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base">
              Nous soutenons des projets qui ameliorent la qualite de vie, creent des emplois
              locaux et stimulent le developpement urbain et rural en Afrique.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-black/8 bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold text-slate-950">Financement structure</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Des solutions pensees pour rendre les projets bancables et mieux executes.
                </p>
              </div>
              <div className="border border-black/8 bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold text-slate-950">Accompagnement terrain</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Une mobilisation d'expertises techniques, financieres et locales.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#d9c09a] shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
              alt="Projet immobilier en Afrique"
              className="h-[320px] w-full object-cover object-center sm:h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0a67cf_0%,#0452ac_45%,#033c87_100%)] text-white">
        <div className="absolute inset-y-0 left-0 hidden w-[42%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
            alt="Infrastructure durable"
            className="h-full w-full object-cover object-center opacity-45"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,60,135,0.24)_0%,rgba(4,82,172,0.88)_42%,rgba(10,103,207,0.96)_100%)]" />

        <div className="relative mx-auto grid max-w-[1180px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <div />
          <div className="max-w-[620px] justify-self-end">
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-[2.1rem]">
              Un continent ou des infrastructures resilientes et inclusives soutiennent une croissance equitable.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/82 sm:text-base">
              Nous defendons une Afrique ou des infrastructures respectueuses de l'environnement,
              solides et portees par des acteurs locaux favorisent un developpement durable.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">Croissance equitable</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  Des projets utiles aux territoires, aux populations et aux economies locales.
                </p>
              </div>
              <div className="border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">Acteurs locaux</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  Une vision portee par les expertises regionales, les partenaires et les investisseurs engages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] items-stretch gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16 xl:gap-14">
          <div className="grid gap-6 self-stretch">
            <div className="max-w-[620px]">
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-[2.1rem]">
                Une presence regionale pour accompagner les projets au plus pres du terrain.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Africa Build Investment dispose d'un reseau d'agences regionales pour assurer une presence operationnelle et un accompagnement de proximite des projets sur l'ensemble du continent.
              </p>
            </div>

            <div className="grid gap-1">
              <AccordionCard
                title="Roles des agences"
                icon={BriefcaseBusiness}
                items={agencyRoles}
                iconWrapperClassName="bg-[#0f62c9] text-white"
                isOpen={openAgencyAccordion === 0}
                onToggle={() =>
                  setOpenAgencyAccordion((currentIndex) =>
                    currentIndex === 0 ? -1 : 0
                  )
                }
              />

              <div className="grid gap-1">
                <AccordionCard
                  title="Implantations regionales"
                  icon={MapPinned}
                  items={regionalOffices}
                  isOpen={openAgencyAccordion === 1}
                  onToggle={() =>
                    setOpenAgencyAccordion((currentIndex) =>
                      currentIndex === 1 ? -1 : 1
                    )
                  }
                />

                <AccordionCard
                  title="Services en agence"
                  icon={Landmark}
                  items={agencyServices}
                  isOpen={openAgencyAccordion === 2}
                  onToggle={() =>
                    setOpenAgencyAccordion((currentIndex) =>
                      currentIndex === 2 ? -1 : 2
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="self-stretch">
            <div className="h-full overflow-hidden bg-[#e3edf8] shadow-[0_18px_38px_rgba(15,23,42,0.06)]">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&q=80"
                alt="Equipe ABI"
                className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden border-t border-slate-200 bg-[#f7f9fc]">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,#d6e7fb_0%,rgba(214,231,251,0)_72%)]" />
        <div className="relative mx-auto grid max-w-[1180px] items-stretch gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16 xl:gap-14">
          <div className="self-stretch">
            <div className="h-full overflow-hidden bg-[#d9e8fb] shadow-[0_18px_38px_rgba(15,23,42,0.06)]">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80"
                alt="Reseau d'investisseurs et de promoteurs"
                className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]"
              />
            </div>
          </div>

          <div className="grid gap-6 self-stretch">
            <div className="max-w-[620px]">
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-[2.1rem]">
                Un reseau exclusif pour accelerer les projets, les partenariats et les investissements.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Le Club Africa Build Investment reunit investisseurs, promoteurs,
                professionnels de la construction, experts ESG et decideurs publics engages
                dans la transformation des infrastructures et de l'immobilier en Afrique.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Le Club favorise le partage d'opportunites, l'acceleration de projets et la co-construction de solutions durables.
              </p>
            </div>

            <div className="grid gap-2">
              <AccordionCard
                title="Objectifs"
                buttonClassName="flex w-full items-center justify-between gap-4 py-3 text-left"
                contentClassName="grid gap-2 pb-3 text-sm leading-6 text-slate-600"
                icon={Network}
                items={proClubObjectives}
                iconWrapperClassName="bg-[#0f62c9] text-white"
                isOpen={openProClubAccordion === 0}
                onToggle={() =>
                  setOpenProClubAccordion((currentIndex) =>
                    currentIndex === 0 ? -1 : 0
                  )
                }
              />

              <AccordionCard
                title="Avantages pour les membres"
                buttonClassName="flex w-full items-center justify-between gap-4 py-3 text-left"
                contentClassName="grid gap-2 pb-3 text-sm leading-6 text-slate-600"
                icon={ShieldCheck}
                items={proClubBenefits}
                isOpen={openProClubAccordion === 1}
                onToggle={() =>
                  setOpenProClubAccordion((currentIndex) =>
                    currentIndex === 1 ? -1 : 1
                  )
                }
              />

              <AccordionCard
                title="Activites principales"
                icon={CalendarRange}
                items={proClubActivities}
                isOpen={openProClubAccordion === 2}
                onToggle={() =>
                  setOpenProClubAccordion((currentIndex) =>
                    currentIndex === 2 ? -1 : 2
                  )
                }
              />

              <AccordionCard
                title="Adhesion"
                icon={FileSignature}
                isOpen={openProClubAccordion === 3}
                onToggle={() =>
                  setOpenProClubAccordion((currentIndex) =>
                    currentIndex === 3 ? -1 : 3
                  )
                }
              >
                <div className={listItemClass}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62c9]" />
                  <p className="text-sm leading-7 text-slate-600">
                    Conditions : profil professionnel lie aux secteurs de la construction,
                    des infrastructures, de l'investissement ou du developpement.
                  </p>
                </div>
                <div className={listItemClass}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62c9]" />
                  <p className="text-sm leading-7 text-slate-600">
                    Modalites : inscription via la plateforme, evaluation par le comite du Club
                    et versement d'une cotisation annuelle. Les tarifs et niveaux d'adhesion sont disponibles sur demande.
                  </p>
                </div>
                <div className={listItemClass}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62c9]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Pourquoi rejoindre</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Accelerer l'acces a des deals de qualite, partager l'expertise, co-construire des projets a impact et s'inscrire durablement dans l'ecosysteme africain de la construction et de l'investissement.
                    </p>
                  </div>
                </div>
              </AccordionCard>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#d8b4118d]">
        <div className="mx-auto grid max-w-[1180px] items-stretch gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16 xl:gap-14">
          <div className="grid gap-6 self-stretch">
            <div className="max-w-[620px]">
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-[2.1rem]">
                Investir collectivement dans des projets a impact en Afrique.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base">
                Le Club Deal Diaspora reunit des membres de la diaspora africaine souhaitant investir ensemble dans des projets d'infrastructure, d'immobilier et de developpement local en Afrique.
              </p>
            </div>

            <div className="grid gap-0">
              <AccordionCard
                title="Objectifs"
                buttonClassName="flex w-full items-center justify-between gap-4 py-3 text-left"
                contentClassName="grid gap-2 pb-3 text-sm leading-6 text-slate-600"
                icon={Globe2}
                items={diasporaObjectives}
                className="border-black/8"
                titleClassName="text-base font-semibold text-slate-950"
                isOpen={openDiasporaAccordion === 0}
                onToggle={() =>
                  setOpenDiasporaAccordion((currentIndex) =>
                    currentIndex === 0 ? -1 : 0
                  )
                }
              />

              <AccordionCard
                title="Avantages pour les membres"
                buttonClassName="flex w-full items-center justify-between gap-4 py-3 text-left"
                contentClassName="grid gap-2 pb-3 text-sm leading-6 text-slate-600"
                icon={Users}
                items={diasporaBenefits}
                className="border-black/8"
                titleClassName="text-base font-semibold text-slate-950"
                isOpen={openDiasporaAccordion === 1}
                onToggle={() =>
                  setOpenDiasporaAccordion((currentIndex) =>
                    currentIndex === 1 ? -1 : 1
                  )
                }
              />

              <AccordionCard
                title="Fonctionnement"
                buttonClassName="flex w-full items-center justify-between gap-4 py-3 text-left"
                contentClassName="grid gap-2 pb-3 text-sm leading-6 text-slate-600"
                icon={Workflow}
                items={diasporaOperations}
                className="border-black/8"
                titleClassName="text-base font-semibold text-slate-950"
                isOpen={openDiasporaAccordion === 2}
                onToggle={() =>
                  setOpenDiasporaAccordion((currentIndex) =>
                    currentIndex === 2 ? -1 : 2
                  )
                }
              />

              <AccordionCard
                title="Conditions d'adhesion"
                buttonClassName="flex w-full items-center justify-between gap-4 py-3 text-left"
                contentClassName="grid gap-2 pb-3 text-sm leading-6 text-slate-600"
                icon={BadgeCheck}
                className="border-black/8"
                titleClassName="text-base font-semibold text-slate-950"
                isOpen={openDiasporaAccordion === 3}
                onToggle={() =>
                  setOpenDiasporaAccordion((currentIndex) =>
                    currentIndex === 3 ? -1 : 3
                  )
                }
              >
                <div className={listItemClass}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62c9]" />
                  <p className="text-2xl leading-7 text-slate-600">
                    Profil d'investisseur : resident de la diaspora ou soutien avere au developpement local.
                  </p>
                </div>
                <div className={listItemClass}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62c9]" />
                  <p className="text-2xl leading-7 text-slate-600">
                    Processus de KYC/AML, validation par le comite et engagement financier minimal par deal selon l'opportunite.
                  </p>
                </div>
                <div className={listItemClass}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62c9]" />
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">Pourquoi rejoindre</p>
                    <p className="mt-2 text-2xl leading-7 text-slate-600">
                      Permettre a la diaspora d'investir de maniere collective, securisee et impactante tout en contribuant au developpement durable des territoires d'origine.
                    </p>
                  </div>
                </div>
              </AccordionCard>
            </div>
          </div>

          <div className="self-stretch">
            <div className="h-full overflow-hidden bg-[#d7c1a0] shadow-[0_20px_42px_rgba(15,23,42,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
                alt="Club Deal Diaspora"
                className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f7f9fc]">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-6 border border-slate-200 bg-white px-6 py-8 shadow-[0_16px_36px_rgba(15,23,42,0.04)] lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div className="max-w-[720px]">
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-slate-950">
                Besoin de connaitre l'agence la plus proche ou de prendre rendez-vous ?
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Contactez notre equipe via le formulaire sur le site ou par email a contact@africabuildinvestment.com pour etre oriente vers le bon interlocuteur.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:contact@africabuildinvestment.com"
                className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
              >
                <Mail size={16} />
                Nous ecrire
              </a>
              <Link
                to="/partnership"
                className="inline-flex items-center gap-2 border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Prendre rendez-vous
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AbiAboutPage;
