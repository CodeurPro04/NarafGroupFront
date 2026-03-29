import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Landmark,
  Mail,
  MapPinned } from
"lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const agencyRoles = [
"Identifier et sourcer des projets locaux.",
"Faciliter les relations avec les autorités locales et les partenaires techniques.",
"Assurer le suivi operationnel et le pilotage des projets sur le terrain.",
"Promouvoir l'accès au financement et au montage financier adapté."];


const regionalOffices = [
"Afrique du nord : Casablanca, Maroc.",
"Afrique de l'Ouest : Dakar (Senegal) et Abidjan (Cote d'Ivoire).",
"Afrique centrale : Douala (Cameroun).",
"Afrique de l'Est : Nairobi (Kenya).",
"Afrique australe : Johannesburg (Afrique du Sud).",
"Hub nigerian : Lagos (Nigeria).",
"Internationales : Paris (France), Montreal (Canada)."];


const agencyServices = [
"Accompagnement projets : technique, financier, ESG.",
"Bureau d'études local et partenariats métiers.",
"Formation et capacity building pour porteurs de projets locaux.",
"Point de contact pour investisseurs et partenaires."];


const listItemClass =
"border-b border-slate-200 pb-3 last:border-b-0 last:pb-0";

const AccordionCard = ({
  title,
  icon: Icon,
  items,
  children,
  className = "",
  iconWrapperClassName = "bg-[#f3f7fd] text-[#0f62c9]",
  titleClassName = "text-lg font-semibold text-slate-950 sm:text-xl",
  buttonClassName = "flex w-full items-center justify-between gap-4 py-5 text-left",
  contentClassName = "grid gap-3 pb-5 text-sm leading-6 text-slate-600",
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  return (
    <div
      className={`border-b border-slate-200 bg-transparent py-1 ${className}`}>

      <button
        type="button"
        onClick={() => {
          if (isControlled) {
            onToggle?.();
            return;
          }
          setInternalIsOpen((value) => !value);
        }}
        className={buttonClassName}>

        <div className="flex items-center gap-3">
          {Icon ?
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full ${iconWrapperClassName}`}>

              <Icon size={18} />
            </div> :
          null}
          <h3 className={titleClassName}>{title}</h3>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ease-out ${
          isOpen ? "rotate-180" : "rotate-0"}`
          } />

      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`
        }>

        <div className="min-h-0 overflow-hidden">
          <div
            className={`${contentClassName} transition-all duration-500 ease-out ${
            isOpen ? "translate-y-0" : "-translate-y-2"}`
            }>

            {items?.map((item) =>
            <div key={item} className={listItemClass}>
                <p className="text-sm leading-6 text-slate-600 sm:text-base">{item}</p>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>);

};

const AbiAboutPage = () => {
  const navigate = useNavigate();
  const [openAgencyAccordion, setOpenAgencyAccordion] = useState(0);

  return (
    <div className="bg-[linear-gradient(180deg,#f5f8fd_0%,#f9f4ec_42%,#ffffff_100%)] text-slate-900">
      <PropertiesHero
        onPrimaryAction={() => {
          window.location.href =
          "mailto:contact@africabuildinvest.com?subject=Contact%20ABI";
        }}
        onSecondaryAction={() => navigate("/abi/plateforme-immobiliere")}
        primaryLabel="Contacter ABI"
        secondaryLabel="Voir la plateforme"
        primaryIcon={Mail}
        title="Une plateforme Africaine pour structurer et financer."
        descriptionLines={[
        "Africa Build Investment relie investisseurs, promoteurs, experts techniques, agences régionales et partenaires privés et publics."]
        }
        backgroundImage="url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(3,37,99,0.86)_42%,rgba(3,64,145,0.8)_100%)]" />


      <section className="relative overflow-hidden border-y border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,#d8e9ff_0%,rgba(216,233,255,0)_72%)]" />
        <div className="relative mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-1 lg:items-start">
            <div className="max-w-[760px]">
              <h1 className="max-w-[720px] text-3xl font-semibold leading-[1.08] text-slate-950 sm:text-[1.8rem]">
                Construire, Financer et Accompagner les projets qui transforment durablement l'Afrique.
              </h1>
              <p className="mt-5 max-w-[680px] text-sm leading-7 text-slate-600 sm:text-base">
                Africa Build Investment est une plateforme panafricaine dédiée a soutenir,
                financer et accompagner des projets d'immobilier, de construction et
                d'infrastructure durable à travers le continent.
              </p>
              <p className="mt-4 max-w-[680px] text-sm leading-7 text-slate-600 sm:text-base">
                Nous reunissons investisseurs, promoteurs, experts techniques et partenaires
                publics pour catalyser des initiatives a fort impact socio-economique.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+330751521063"
                  className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]">

                  Parler à notre équipe
                  <ArrowRight size={16} />
                </a>
                <a
                  href="mailto:contact@africabuildinvest.com"
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950">

                  contact@africabuildinvest.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-[#d8b4118d]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="max-w-[560px]">
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 sm:text-[1.8rem]">
              Faciliter l'accès au financement pour les projets immobiliers innovants
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base">
              Nous soutenons des projets qui améliorent la qualité de vie, créent des emplois locaux et stimulent le développement urbain et rural en Afrique.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-black/8 bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold text-slate-950">Financement structuré</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Des solutions pensées pour rendre les projets bancables et mieux exécutés.
                </p>
              </div>
              <div className="border border-black/8 bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold text-slate-950">Accompagnement terrain</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Une mobilisation d'expertises techniques, financières et locales.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#d9c09a] shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
              alt="Projet immobilier en Afrique"
              className="h-[320px] w-full object-cover object-center sm:h-[420px]" />

          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0a67cf_0%,#0452ac_45%,#033c87_100%)] text-white">
        <div className="absolute inset-y-0 left-0 hidden w-[42%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
            alt="Infrastructure durable"
            className="h-full w-full object-cover object-center opacity-45" />

        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,60,135,0.24)_0%,rgba(4,82,172,0.88)_42%,rgba(10,103,207,0.96)_100%)]" />

        <div className="relative mx-auto grid max-w-[1180px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <div />
          <div className="max-w-[620px] justify-self-end">
            <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-[1.4rem]">
              Un continent ou des infrastructures résilientes et inclusives soutiennent une croissance equitable.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/82 sm:text-base">
              Nous defendons une Afrique ou des infrastructures respectueuses de l'environnement,
              solides et portees par des acteurs locaux favorisent un développement durable.
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
                  Une vision portée par les expertises régionales, les partenaires et les investisseurs engagés.
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
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 sm:text-[1.6rem]">
                Une présence régionale pour accompagner les projets au plus proche des populations.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Africa Build Investment dispose d'un réseau d'agences régionales pour assurer une présence opérationnelle et un accompagnement de proximité des projets sur l'ensemble du continent.
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
                } />


              <div className="grid gap-1">
                <AccordionCard
                  title="Implantations régionales et internationales"
                  icon={MapPinned}
                  items={regionalOffices}
                  isOpen={openAgencyAccordion === 1}
                  onToggle={() =>
                  setOpenAgencyAccordion((currentIndex) =>
                  currentIndex === 1 ? -1 : 1
                  )
                  } />


                <AccordionCard
                  title="Services en agence"
                  icon={Landmark}
                  items={agencyServices}
                  isOpen={openAgencyAccordion === 2}
                  onToggle={() =>
                  setOpenAgencyAccordion((currentIndex) =>
                  currentIndex === 2 ? -1 : 2
                  )
                  } />

              </div>
            </div>
          </div>

          <div className="self-stretch">
            <div className="h-full overflow-hidden bg-[#e3edf8] shadow-[0_18px_38px_rgba(15,23,42,0.06)]">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&q=80"
                alt="Équipe ABI"
                className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px]" />

            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-[#f7f9fc]">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-6 border border-slate-200 bg-white px-6 py-8 shadow-[0_16px_36px_rgba(15,23,42,0.04)] lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div className="max-w-[720px]">
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 sm:text-[2rem]">
                Besoin de connaitre l'agence la plus proche ou de prendre rendez-vous ?
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Contactez notre équipe via le formulaire sur le site ou par email a contact@africabuildinvest.com pour être orienté vers le bon interlocuteur.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="sms:+330751521063"
                className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]">

                <Mail size={16} />
                Nous ecrire
              </a>
              <a
                href="mailto:contact@africabuildinvest.com?subject=Prise%20de%20rendez-vous"
                className="inline-flex items-center gap-2 border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950">

                Prendre rendez-vous
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>);

};

export default AbiAboutPage;
