import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  CircleHelp,
  FileSearch,
  Landmark,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal } from
"lucide-react";
import PropertiesHero from "../components/layout/PropertiesHero";

const serviceItems = [
{
  title: "Annonces de vente",
  points: [
  "Logements, terrains, locaux commerciaux et projets neufs avec fiches détaillées, photos, plans et visites virtuelles."]

},
{
  title: "Présentation de projets",
  points: [
  "Dossiers complets avec business plan, études de faisabilité, calendriers, budgets et rendements attendus."]

},
{
  title: "Mise en relation",
  points: [
  "Matchmaking entre acheteurs, investisseurs, promoteurs et operateurs locaux."]

},
{
  title: "Outils de financement",
  points: [
  "Simulation de credit, offres partenaires banques et fintechs, informations sur dispositifs fiscaux et aides."]

},
{
  title: "Accompagnement transactionnel",
  points: [
  "Assistance juridique, notariale, due diligence, valorisation et negociation."]

},
{
  title: "Suivi de chantier",
  points: [
  "Reporting, photos périodiques, planning et KPI pour investisseurs et acheteurs."]

},
{
  title: "Espaces investisseurs",
  points: [
  "Accès à des opportunités preselectionnees, documents d'investissement et options de co-investissement ou SPV."]

},
{
  title: "Services annexes",
  points: [
  "Assurance, gestion locative, certification ESG et diagnostics techniques."]

}];


const featureItems = [
"Recherche avancee et filtres par localisation, prix, surface et statut du projet.",
"Dataroom sécurisée pour chaque projet avec documents telechargeables.",
"Systeme de messagerie et prise de rendez-vous intégrée.",
"Visites virtuelles 3D et geolocalisation des biens.",
"Tableau de bord investisseur avec portefeuille, reporting et performances.",
"Processus KYC/AML pour securiser les transactions."];


const valueItems = [
"Transparence et qualité de l'information pour reduire le risque decisionnel.",
"Gain de temps via présélection et matching intelligent.",
"Accès à des projets structures et à des opportunités d'investissement diversifiees.",
"Accompagnement complet de la recherche à la livraison."];


const LineAccordion = ({ title, items, isOpen = false, onToggle }) => {
  return (
    <div className="border-b border-slate-300/90">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left">

        <span className="text-lg font-semibold tracking-[-0.02em] text-slate-950 sm:text-xl">
          {title}
        </span>
        <ChevronDown
          size={22}
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
            className={`space-y-4 pb-7 text-sm leading-7 text-slate-600 transition-all duration-500 ease-out sm:text-base ${
            isOpen ? "translate-y-0" : "-translate-y-2"}`
            }>

            {items.map((item) =>
            <div key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                <p>{item}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

const AbiRealEstatePlatformPage = () => {
  const navigate = useNavigate();
  const [openServiceIndex, setOpenServiceIndex] = useState(0);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f6fb_0%,#f1eee8_36%,#ffffff_100%)] text-slate-950">
      <PropertiesHero
        onPrimaryAction={() => navigate("/properties")}
        onSecondaryAction={() => {
          window.location.href =
          "mailto:contact@africabuildinvest.com?subject=Conseil%20plateforme%20immobiliere";
        }}
        primaryLabel="Explorer les biens"
        secondaryLabel="Parler à un conseiller"
        eyebrow=""
        titleClassName="text-4xl sm:text-5xl lg:text-4xl"
        title={
        <>
            Une plateforme de référence
            pour l'investissement immobilier.
          </>
        }
        descriptionLines={[
        "ABI connecté les bons acteurs et centralise toutes les étapes : biens, projets, financement, accompagnement et suivi. Une expérience unique, claire et sécurisée."]
        }
        backgroundImage="url('https://images.unsplash.com/photo-1494526585095-c41746248156?w=1920&q=80')" />


      <section className="border-y border-white/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
            <div className="max-w-[760px]">
              <h1 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-[2rem]">
                La plateforme immobiliere Africaine qui relie offre, projets et investissement.
              </h1>
              <p className="mt-5 max-w-[680px] text-sm leading-7 text-slate-600 sm:text-base">
                ABI est une plateforme de mise en relation des particuliers, promoteurs et investisseurs pour la vente de biens immobiliers et la présentation de projets de construction: neuf, promotion, lotissements et operations de requalification.
              </p>
              <p className="mt-4 max-w-[680px] text-sm leading-7 text-slate-600 sm:text-base">
                L'objectif est de rassembler dans une même expérience la lecture des biens, la découverte des projets, l'accès à l'information utile et l'accompagnement jusqu'à la décision.
              </p>
            </div>

            <aside className="grid gap-3 border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)] p-6 shadow-[0_16px_36px_rgba(15,23,42,0.04)]">
              <p className="text-base font-semibold leading-7 text-slate-950">
                Une interface pensee pour rendre les parcours immobiliers plus lisibles et les projets plus faciles a comparer.
              </p>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="border border-slate-200 bg-white px-4 py-4">
                  <p className="text-sm leading-6 text-slate-700">Biens existants et projets neufs dans un même cadre de lecture.</p>
                </div>
                <div className="border border-slate-200 bg-white px-4 py-4">
                  <p className="text-sm leading-6 text-slate-700">Mise en relation entre particuliers, promoteurs, partenaires et investisseurs.</p>
                </div>
                <div className="border border-slate-200 bg-white px-4 py-4">
                  <p className="text-sm leading-6 text-slate-700">Informations et outils pour mieux préparer la transaction ou l'investissement.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebea]">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="max-w-[620px]">
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[2rem]">
              Les services qui structurent votre parcours immobilier.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Retrouvez une lecture simple des services disponibles, avec un affichage progressif plus proche du modèle editorial du lien de reference.
            </p>

            <div className="mt-10">
              {serviceItems.map((item, index) =>
              <LineAccordion
                key={item.title}
                title={item.title}
                items={item.points}
                isOpen={openServiceIndex === index}
                onToggle={() =>
                setOpenServiceIndex((currentIndex) =>
                currentIndex === index ? -1 : index
                )
                } />

              )}
            </div>

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="mt-10 inline-flex items-center gap-2 bg-[#0f62c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]">

              Voir les annonces disponibles
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="overflow-hidden rounded-[4px] bg-[#d9d4cd] shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80"
              alt="Consultation de projets immobiliers sur ABI"
              className="h-full min-h-[420px] w-full object-cover object-center" />

          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-18">
          <div className="overflow-hidden bg-[#dfe8f5] shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1400&q=80"
              alt="Fonctionnalites de suivi et de dataroom"
              className="h-full min-h-[340px] w-full object-cover object-center" />

          </div>

          <div className="max-w-[560px] justify-self-end">
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[1.93rem]">
              Des outils concrets pour comparer, verifier et décider plus vite.
            </h2>
            <div className='text- mt-8 space-y-4'>
              {featureItems.map((item, index) => {
                const icons = [
                SlidersHorizontal,
                FileSearch,
                MessageSquareText,
                Building2,
                Landmark,
                ShieldCheck];

                const Icon = icons[index] || CircleHelp;
                return (
                  <div key={item} className="flex gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f2f7fd] text-[#0f62c9]">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>);

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
            className="h-full w-full object-cover object-center opacity-40" />

        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,103,207,0.66)_0%,rgba(4,82,172,0.56)_52%,rgba(3,60,135,0.12)_100%)]" />

        <div className="relative mx-auto max-w-[1180px] px-6 py-14 sm:px-10 lg:px-8 lg:py-18">
          <div className="max-w-[620px]">
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-[1.93rem]">
              Une expérience mieux documentée pour reduire la friction et le risque decisionnel.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {valueItems.map((item) =>
              <div key={item} className="border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
                  <p className="text-sm leading-7 text-white/85">{item}</p>
                </div>
              )}
            </div>
            <a
              href="mailto:contact@africabuildinvest.com?subject=Echange%20avec%20notre%20equipe"
              className="mt-10 inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">

              Echanger avec notre équipe
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>);

};

export default AbiRealEstatePlatformPage;
