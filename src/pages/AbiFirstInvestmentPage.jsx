import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  ClipboardList,
  FileCheck2,
  Handshake,
  Mail,
  ShieldCheck,
  TimerReset,
  WalletCards,
  ChevronDown } from
"lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const investmentSteps = [
{
  title: "Prendre contact",
  text: "Envoyez une demande d'information a invest@africabuildinvestment.com ou remplissez le formulaire Investir sur la plateforme. Indiquez votre profil, le montant indicatif et les secteurs preferes."
},
{
  title: "Pre-qualification et présentation d'opportunités",
  text: "ABI vous adresse une brochure et une short-list de projets adaptés à votre profil. Une session d'échange permet d'affiner vos critères et votre appétence au risque."
},
{
  title: "Due diligence initiale",
  text: "Réception d'un dataroom ou d'un teaser complet avec business plan, CAPEX/OPEX, modèle financier, études de faisabilité et synthèse ESG, puis réunion Q&A avec l'équipe projet."
},
{
  title: "Processus KYC / conformité",
  text: "Fourniture des documents KYC/AML, vérification de la structure juridique si applicable, preuve d'origine des fonds et signature des accords de confidentialité si nécessaire."
},
{
  title: "Termes et structuration de l'investissement",
  text: "Negociation et validation du term sheet ou de la lettre d'intention : ticket, valorisation, gouvernance, conditions suspensives et choix du véhicule juridique."
},
{
  title: "Due diligence approfondie et closing conditions",
  text: "Due diligence technique, juridique, fiscale et ESG détaillée, avec obtention des garanties, assurances et approbations requises avant closing."
},
{
  title: "Signature des contrats et decaissement",
  text: "Signature des documents finaux puis transfert des fonds selon les modalités convenues, avec entrée officielle en capital ou émission de la dette."
},
{
  title: "Suivi post-investissement",
  text: "Reporting périodique financier et ESG, participation aux comites de suivi et accès aux services d'accompagnement operationnel des agences locales ABI."
}];


const checklistItems = [
"Piece d'identité et justificatif de domicile.",
"Statuts et extrait Kbis ou registre du commerce pour les entités.",
"Preuve d'origine des fonds : relevés bancaires ou attestation fiscale.",
"Mandat de representation si vous investissez via un tiers.",
"Coordonnees bancaires pour virement international."];


const delayItems = [
"Pre-qualification a réception d'opportunités : 1 a 2 semaines.",
"Due diligence complète et structuration : 4 a 8 semaines selon la complexite.",
"Closing : 1 a 4 semaines après levée des conditions suspensives."];


const supportCards = [
{
  title: "Parcours guide",
  text: "ABI rend les étapes plus lisibles pour un premier investissement moins intimidant et mieux sequence.",
  icon: Handshake
},
{
  title: "Conformité et sécurité",
  text: "Le cadre KYC/AML, la documentation et les validations limitent les zones d'incertitude dès le départ.",
  icon: ShieldCheck
},
{
  title: "Structuration concrète",
  text: "Vous comprenez mieux le ticket, le véhicule, la gouvernance et les conditions de closing avant engagement.",
  icon: Briefcase
},
{
  title: "Suivi dans le temps",
  text: "Le reporting et l'accompagnement post-investissement prolongent la relation au-delà du simple closing.",
  icon: WalletCards
}];


const StepAccordion = ({ title, details, isOpen, onToggle }) =>
<div className="border-b border-slate-300/90">
    <button
    type="button"
    onClick={onToggle}
    className="flex w-full items-center justify-between gap-4 py-5 text-left">

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
        className={`pb-5 text-base leading-7 text-slate-600 transition-all duration-500 ease-out sm:text-lg ${
        isOpen ? "translate-y-0" : "-translate-y-2"}`
        }>

          <p>{details}</p>
        </div>
      </div>
    </div>
  </div>;


const GroupAccordion = ({ title, items, isOpen, onToggle }) =>
<div className="border-b border-slate-300/90">
    <button
    type="button"
    onClick={onToggle}
    className="flex w-full items-center justify-between gap-4 py-5 text-left">

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
        className={`space-y-4 pb-5 transition-all duration-500 ease-out ${
        isOpen ? "translate-y-0" : "-translate-y-2"}`
        }>

          {items.map((item) =>
        <div key={item} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
              <p className="text-sm leading-7 text-slate-600">{item}</p>
            </div>
        )}
        </div>
      </div>
    </div>
  </div>;


const AbiFirstInvestmentPage = () => {
  const navigate = useNavigate();
  const [openStepIndex, setOpenStepIndex] = useState(0);
  const [openInfoSection, setOpenInfoSection] = useState(0);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f6fb_0%,#f0ede7_42%,#ffffff_100%)] text-slate-950">
      <PropertiesHero
        onPrimaryAction={() => navigate("/investment")}
        onSecondaryAction={() => {
          window.location.href =
          "mailto:contact@africabuildinvest.com?subject=Premier%20investissement%20ABI";
        }}
        primaryLabel="Voir les opportunités"
        secondaryLabel="Être accompagne"
        secondaryIcon={Mail}
        eyebrow=""
        title="Faire votre premier investissement avec un parcours plus clair, plus accompagné et plus défendable."
        descriptionLines={[
        "Africa Build Investment vous aide à passer d'une intention d'investir à un engagement mieux structuré.",
        "Chaque étape est pensee pour vous donner de la visibilité sur les documents, les délais, la conformité et le closing."]
        }
        backgroundImage="url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1920&q=80')"
        overlayClassName="bg-[linear-gradient(180deg,rgba(2,6,23,0.86)_0%,rgba(3,37,99,0.88)_42%,rgba(3,64,145,0.82)_100%)]" />


      <section className="border-y border-white/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
          <div className="space-y-8">
            <div className="mx-auto max-w-[860px] text-center">
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[2.9rem]">
                Un parcours d'entrée plus simple pour comprendre, verifier et investir sans avancer dans le flou.
              </h1>
              <p className="mx-auto mt-5 max-w-[760px] text-base leading-7 text-slate-600 sm:text-lg">
                ABI structure le premier investissement autour d'un enchaînement clair : prise de contact, qualification, analyse, conformité, structuration, closing et suivi post-investissement.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {supportCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafe_100%)] px-6 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">

                    <div className="flex h-11 w-11 items-center justify-center bg-[#0f62c9] text-white">
                      <Icon size={18} />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>);

              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebea]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-18">
          <div className="max-w-[620px]">
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[2.65rem]">
              Comment se passe un premier investissement avec ABI ?
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              Une lecture editoriale simple, inspiree du rythme du lien Sogexia de reference, pour suivre chaque étape sans perdre le fil du processus.
            </p>

            <div className="mt-8">
              {investmentSteps.map((item, index) =>
              <StepAccordion
                key={item.title}
                title={`${index + 1}. ${item.title}`}
                details={item.text}
                isOpen={openStepIndex === index}
                onToggle={() =>
                setOpenStepIndex((currentIndex) =>
                currentIndex === index ? -1 : index
                )
                } />

              )}
            </div>
          </div>

          <div className="overflow-hidden bg-[#d9d4cd] shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80"
              alt="Premier investissement accompagne par ABI"
              className="h-full min-h-[420px] w-full object-cover object-center" />

          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
          <div className="overflow-hidden bg-[#dfe8f5] shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80"
              alt="Checklist et validation documentaire"
              className="h-full min-h-[340px] w-full object-cover object-center" />

          </div>

          <div className="max-w-[560px] justify-self-end">
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[2.65rem]">
              Les elements a préparer avant de passer au closing.
            </h2>

            <div className="mt-8">
              <GroupAccordion
                title="Documents usuels a préparer"
                items={checklistItems}
                isOpen={openInfoSection === 0}
                onToggle={() =>
                setOpenInfoSection((currentIndex) =>
                currentIndex === 0 ? -1 : 0
                )
                } />


              <GroupAccordion
                title="Délais estimes"
                items={delayItems}
                isOpen={openInfoSection === 1}
                onToggle={() =>
                setOpenInfoSection((currentIndex) =>
                currentIndex === 1 ? -1 : 1
                )
                } />

            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0a67cf_0%,#0452ac_42%,#033c87_100%)] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
            alt="Accompagnement dédié pour investisseur"
            className="h-full w-full object-cover object-center opacity-40" />

        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,103,207,0.95)_0%,rgba(4,82,172,0.9)_52%,rgba(3,60,135,0.25)_100%)]" />

        <div className="relative mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
          <div className="max-w-[640px]">
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[2.35rem]">
              Contactez ABI pour être mis en relation avec un conseiller dédié.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/82 sm:text-lg">
              Un interlocuteur peut vous accompagner pas a pas sur les opportunités, la documentation, la conformité, la structuration du ticket et les prochaines étapes du processus.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="mailto:contact@africabuildinvest.com?subject=Premier%20investissement%20ABI"
                className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-[#0f62c9] transition hover:bg-slate-100">

                Être accompagne
                <Mail size={16} />
              </a>
              <button
                type="button"
                onClick={() => navigate("/investment/je-veux-investir")}
                className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">

                Voir pourquoi investir avec ABI
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>);

};

export default AbiFirstInvestmentPage;
