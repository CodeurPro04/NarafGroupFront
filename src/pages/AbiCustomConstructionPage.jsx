import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  Hammer,
  HardHat,
  Leaf,
  Ruler,
  ShieldCheck,
  TimerReset,
  Wrench,
  ChevronDown } from
"lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const customServices = [
{
  title: "Conception architecturale personnalisee",
  details: "plans, perspectives et optimisation des espaces."
},
{
  title: "Études techniques et pratiques",
  details: "structure, fondations et géotechnique."
},
{
  title: "Estimation des coûts et modèle financier",
  details: "CAPEX/OPEX et planification de tresorerie."
},
{
  title: "Montage administratif et réglementaire",
  details: "permis de construire et autorisations locales."
},
{
  title: "Selection et gestion des entreprises",
  details: "appels d'offres, contrats et supervision."
},
{
  title: "Suivi de chantier et contrôle qualité",
  details: "planification, photos et rapports périodiques."
},
{
  title: "Accompagnement ESG et performance énergétique",
  details: "isolation et energies renouvelables."
},
{
  title: "Livraison cle en main et service après-livraison",
  details: "garanties et entretien."
}];


const customProcess = [
{
  title: "Première rencontre et brief client",
  details: "besoins, budget, contraintes et calendrier."
},
{
  title: "Etude preliminaire et avant-projet APS/APD",
  details: "esquisses et estimation initiale."
},
{
  title: "Conception détaillée",
  details: "plans techniques, metres et dossiers techniques."
},
{
  title: "Appels d'offres et contractualisation",
  details: "selection des entreprises et negociation."
},
{
  title: "Exécution et suivi de chantier",
  details: "pilotage, reunions de chantier et contrôle qualité."
},
{
  title: "Réception et livraison",
  details: "levée des réserves et remise des documents DOE."
}];


const renovationServices = [
"Diagnostic complet du chantier : technique, financier et conformité réglementaire.",
"Plan de redressement et chiffrage : travaux restants, planning et budget complémentaire.",
"Gestion administrative et régularisation : permis, conformité et assurances.",
"Sélection et coordination des entreprises : appels d'offres, contrats et supervision.",
"Pilotage de chantier et contrôle qualité : réunions, rapports et photos.",
"Gestion des réclamations, levée des réserves et réception finale.",
"Mise en conformité ESG et performance énergétique si nécessaire.",
"Service après-livraison et garanties."];


const renovationProcess = [
"1. Audit initial sur site et réunion de cadrage.",
"2. Elaboration du plan de reprise et devis détaillé.",
"3. Mobilisation des équipes et contractualisation.",
"4. Exécution des travaux selon la planification validée.",
"5. Contrôles, levée des réserves et livraison finale.",
"6. Suivi post-livraison et maintenance éventuelle."];


const reasons = [
{
  title: "Sur mesure",
  text: "Une approche adaptée à votre usage, votre budget, votre typologie de projet et votre calendrier.",
  icon: Ruler
},
{
  title: "Équipe pluridisciplinaire",
  text: "Architecture, technique, administratif, financier et chantier sont coordonnés dans une même logique projet.",
  icon: Building2
},
{
  title: "Transparence",
  text: "Les coûts, les délais, les arbitrages et le reporting restent lisibles tout au long du parcours.",
  icon: ShieldCheck
},
{
  title: "Durabilité",
  text: "Les meilleures pratiques ESG et de performance énergétique sont intégrées dès la conception ou la reprise.",
  icon: Leaf
}];


const chantierReasons = [
"Réactivité et expertise multisectorielle.",
"Maîtrise des coûts et transparence des prestations.",
"Réseau d'artisans et d'entreprises qualifiés.",
"Reporting régulier et respect des normes locales."];


const customDurationItems = [
"Études et permis : 2 à 4 mois selon la complexité.",
"Construction : 6 a 24 mois selon la taille et la typologie."];


const budgetItems = [
"Budget variable selon typologie, finitions et localisation.",
"Estimation préalable fournie après brief ; offre ferme après APS/APD et appels d'offres.",
"Options de financement et de montage disponibles via la plateforme ABI."];


const serviceReasons = [
"Approche sur mesure et centrée utilisateur.",
"Pilotage complet par une équipe pluridisciplinaire.",
"Transparence des coûts et reporting régulier.",
"Intégration des meilleures pratiques ESG et durabilité."];


const durationItems = [
"Diagnostic et plan de reprise renovation/achevement : 1 a 2 semaines.",
"Travaux d'achèvement ou rénovation : de 4 semaines a 12 mois selon l'ampleur."];


const ServiceAccordion = ({ title, details, isOpen, onToggle }) => {
  return (
    <div className="border-b border-slate-300/90">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left">

        <span className="text-xl font-semibold tracking-[-0.02em] text-slate-950 sm:text-2xl">
          {title}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-500 transition-transform duration-300 ease-out ${
          isOpen ? "rotate-180" : "rotate-0"}`
          } />

      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`
        }>

        <div className="min-h-0 overflow-hidden">
          <div
            className={`pb-6 text-base leading-7 text-slate-600 transition-all duration-500 ease-out sm:text-lg ${
            isOpen ? "translate-y-0" : "-translate-y-2"}`
            }>

            <p>{details}</p>
          </div>
        </div>
      </div>
    </div>);

};

const GroupAccordion = ({ title, items, isOpen, onToggle, dark = false }) => {
  const borderClass = dark ? "border-white/15" : "border-slate-300/90";
  const titleClass = dark ?
  "text-xl font-semibold text-white sm:text-2xl" :
  "text-xl font-semibold tracking-[-0.02em] text-slate-950 sm:text-2xl";
  const iconClass = dark ? "text-white/80" : "text-slate-500";
  const textClass = dark ?
  "text-sm leading-7 text-white/82 sm:text-base" :
  "text-base leading-7 text-slate-600 sm:text-lg";
  return (
    <div className={`border-b ${borderClass}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left">

        <span className={titleClass}>{title}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-300 ease-out ${iconClass} ${
          isOpen ? "rotate-180" : "rotate-0"}`
          } />

      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`
        }>

        <div className="min-h-0 overflow-hidden">
          <div
            className={`space-y-4 pb-6 transition-all duration-500 ease-out ${
            isOpen ? "translate-y-0" : "-translate-y-2"}`
            }>

            {items.map((item) =>
            <div
              key={item}
              className={`border-b ${borderClass} pb-4 last:border-b-0 last:pb-0`}>

                <p className={textClass}>{item}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

const AbiCustomConstructionPage = () => {
  const navigate = useNavigate();
  const [openServiceIndex, setOpenServiceIndex] = useState(0);
  const [openProcessIndex, setOpenProcessIndex] = useState(0);
  const [openRenovationSection, setOpenRenovationSection] = useState(0);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f6fb_0%,#f1eee8_42%,#ffffff_100%)] text-slate-950">
      <PropertiesHero
        onPrimaryAction={() => {
          window.location.href =
          "mailto:contact@africabuildinvest.com?subject=Devis%20sur%20mesure";
        }}
        onSecondaryAction={() => {
          window.location.href =
          "mailto:contact@africabuildinvest.com?subject=Demande%20de%20rendez-vous";
        }}
        primaryLabel="Devis sur mesure"
        primaryIcon={ClipboardCheck}
        secondaryLabel="Demander un rendez-vous"
        eyebrow=""
        title="Votre projet de construction sur mesure."
        descriptionLines={[
        "Africa Build Investment conçoit et realise des projets de construction sur mesure, de l'idée initiale à la livraison."]
        }
        backgroundImage="url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.86)_0%,rgba(3,37,99,0.88)_42%,rgba(3,64,145,0.82)_100%)]" />


      <section className="border-y border-white/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
          <div className="space-y-8">
            <div className="mx-auto max-w-[860px] text-center">
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[2.7rem]">
                Un projet conçu selon vos besoins, avec un pilotage complet
                jusqu'à la livraison.
              </h1>
              <p className="mx-auto mt-5 max-w-[760px] text-base leading-7 text-slate-600 sm:text-lg">
                Habitation, immeuble residentiel, bureaux, commerces ou projets
                mixtes : ABI contrôle la conception, la maîtrise d'œuvre, la
                coordination et le suivi qualité dans un même parcours.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {reasons.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafe_100%)] px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">

                    <div className="flex h-11 w-11 items-center justify-center bg-[#0f62c9] text-white">
                      <Icon size={18} />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </article>);

              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebea]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-18">
          <div className="max-w-[620px]">
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[1.9rem]">
              Les services qui structurent un projet de construction sur mesure.
            </h2>
            <div className="mt-8">
              {customServices.map((item, index) =>
              <ServiceAccordion
                key={item.title}
                title={item.title}
                details={item.details}
                isOpen={openServiceIndex === index}
                onToggle={() =>
                setOpenServiceIndex((currentIndex) =>
                currentIndex === index ? -1 : index
                )
                } />

              )}
            </div>
          </div>

          <div className="overflow-hidden bg-[#d9d4cd] shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
              alt="Projet de construction sur mesure"
              className="h-full min-h-[420px] w-full object-cover object-center" />

          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
          <div className="overflow-hidden bg-[#dfe8f5] shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80"
              alt="Suivi de chantier et coordination"
              className="h-full min-h-[340px] w-full object-cover object-center" />

          </div>

          <div className="max-w-[560px] justify-self-end">
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[2rem]">
              Comment ABI pilote votre projet de l'idée au chantier livre.
            </h2>
            <div className="mt-8">
              {customProcess.map((item, index) =>
              <ServiceAccordion
                key={item.title}
                title={`${index + 1}. ${item.title}`}
                details={item.details}
                isOpen={openProcessIndex === index}
                onToggle={() =>
                setOpenProcessIndex((currentIndex) =>
                currentIndex === index ? -1 : index
                )
                } />

              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc]">
        <div className="mx-auto grid max-w-[1180px] gap-6 px-6 py-14 sm:px-10 lg:grid-cols-3 lg:px-8 lg:py-16">
          <article className="border border-slate-200 bg-white px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f2f7fd] text-[#0f62c9]">
                <TimerReset size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">Durée indicative</h3>
            </div>
            <div className="mt-5 space-y-4">
              {customDurationItems.map((item) =>
              <div key={item} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              )}
            </div>
          </article>

          <article className="border border-slate-200 bg-white px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f2f7fd] text-[#0f62c9]">
                <HardHat size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">Budget</h3>
            </div>
            <div className="mt-5 space-y-4">
              {budgetItems.map((item) =>
              <div key={item} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              )}
            </div>
          </article>

          <article className="border border-slate-200 bg-white px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f2f7fd] text-[#0f62c9]">
                <Leaf size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">Pourquoi choisir ce service</h3>
            </div>
            <div className="mt-5 space-y-4">
              {serviceReasons.map((item) =>
              <div key={item} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>

      {/*
          <section className="bg-[linear-gradient(135deg,#0a67cf_0%,#0452ac_48%,#033c87_100%)] text-white">
           <div className="grid w-full gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
             <div className="px-6 py-14 sm:px-10 lg:px-12 lg:py-16 xl:px-16">
               <div className="max-w-[760px]">
                 <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem]">
                   Reprendre, régulariser et finaliser un chantier en maîtrisant
                   mieux coûts, délais et qualité.
                 </h2>
                 <p className="mt-5 max-w-[660px] text-base leading-7 text-white/82 sm:text-lg">
                   ABI prend en charge la remise en état, la finalisation et la
                   livraison de chantiers inachevés ou en cours de rénovation, en
                   garantissant qualité, délais et maîtrise des coûts.
                 </p>
               </div>
                <div className="mt-8 max-w-[760px] space-y-3 pr-0 lg:pr-8 xl:pr-12">
                 <GroupAccordion
                   title="Nos prestations"
                   items={renovationServices}
                   isOpen={openRenovationSection === 0}
                   onToggle={() =>
                     setOpenRenovationSection((currentIndex) =>
                       currentIndex === 0 ? -1 : 0,
                     )
                   }
                   dark={true}
                 />
                  <GroupAccordion
                   title="Processus simplifié"
                   items={renovationProcess}
                   isOpen={openRenovationSection === 1}
                   onToggle={() =>
                     setOpenRenovationSection((currentIndex) =>
                       currentIndex === 1 ? -1 : 1,
                     )
                   }
                   dark={true}
                 />
               </div>
             </div>
              <div className="relative min-h-[420px] overflow-hidden lg:min-h-full lg:w-full">
               <img
                 src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=80"
                 alt="Renovation et achevement de chantier"
                 className="h-full w-full object-cover object-center"
               />
               <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,82,172,0.08)_0%,rgba(3,60,135,0.2)_100%)]" />
             </div>
           </div>
          </section>
          */


      }

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-6 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-8 lg:py-16">
          <article className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f2f7fd] text-[#0f62c9]">
                <TimerReset size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">
                Délais indicatifs
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {durationItems.map((item) =>
              <div
                key={item}
                className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">

                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              )}
            </div>
          </article>

          <article className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f2f7fd] text-[#0f62c9]">
                <HardHat size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">
                Pourquoi nous confier votre chantier
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {chantierReasons.map((item) =>
              <div
                key={item}
                className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">

                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f7f9fc]">
        <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-10 lg:px-8 lg:py-16">
          <div className="grid gap-6 border border-slate-200 bg-white px-6 py-8 shadow-[0_16px_36px_rgba(15,23,42,0.04)] lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div className="max-w-[740px]">
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 sm:text-[1.9rem]">
                Envoyez votre brief ou demandez un rendez-vous pour une
                pre-evaluation gratuite.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Contact : projets@africabuildinvestment.com. ABI vous propose
                une pre-evaluation gratuite et un calendrier de travail adapté a
                votre projet ou à votre chantier a reprendre.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:contact@africabuildinvest.com?subject=Mon%20projet%20sur%20mesure"
                className="inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]">

                Nous contacter
                <ArrowRight size={16} />
              </a>
              <button
                type="button"
                onClick={() => navigate("/construction")}
                className="inline-flex items-center gap-2 border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950">

                Voir les offres construction
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>);

};

export default AbiCustomConstructionPage;
