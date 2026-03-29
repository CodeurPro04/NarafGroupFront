const sections = [
{
  title: "Présentation de la plateforme",
  paragraphs: [
  "Africa Build Investment est une plateforme immobiliere innovante qui centralise l'ensemble des outils, services et technologies necessaires aux professionnels de l'immobilier ainsi qu'aux particuliers ayant un projet immobilier.",
  "Elle accompagne les utilisateurs dans toutes les étapes : achat, vente, location, investissement locatif, defiscalisation, programmes neufs.",
  "Un projet immobilier représente un engagement financier et personnel majeur. Il nécessite un accès à des informations fiables, à des outils performants et à un accompagnement professionnel. Africa Build Investment offre cet environnement sécurisé et structuré."]

},
{
  title: "Guide immobilier panafricain",
  paragraphs: [
  "Africa Build Investment propose le premier guide immobilier complet dédié à l'Afrique, couvrant l'ensemble des aspects liés à l'achat, la vente et la location.",
  "Le guide regroupe des fiches pratiques et des conseils experts sur :"],

  items: [
  "les diagnostics obligatoires",
  "l'expertise immobiliere",
  "les dispositifs de defiscalisation",
  "les aides financieres disponibles",
  "les types de credits immobiliers",
  "les étapes d'un achat en VEFA",
  "les obligations du bailleur et du locataire"],

  closing:
  "Ce contenu permet à chaque utilisateur d'avancer dans son projet en toute connaissance de cause."
},
{
  title: "Espace Particulier - Service gratuit",
  paragraphs: [
  "Africa Build Investment met a disposition un espace gratuit permettant aux particuliers de deposer leur projet :"],

  items: [
  "achat",
  "vente",
  "location",
  "recherche de locataire",
  "investissement locatif",
  "defiscalisation"],

  closing:
  "Chaque demande est analysée et traitée par des professionnels du secteur afin d'apporter un accompagnement personnalise, un gain de temps significatif et des propositions adaptées."
},
{
  title: "Solution professionnelle pour les agences immobilieres",
  paragraphs: [
  "Africa Build Investment propose egalement une solution complète destinee aux professionnels : Consortium-immobilier.fr, une marketplace immobiliere activé depuis plus de 7 ans.",
  "Cette plateforme permet aux agences de piloter l'ensemble de leur activité grâce à un outil unique, complet et accessible en full web.",
  "Fonctionnalites principales :"],

  items: [
  "Gestion des mandats",
  "Base de données qualifiée (460 000 acheteurs et vendeurs)",
  "Rapprochement automatique",
  "Systeme inter-agences sans ressaisie",
  "Pige immobiliere gratuite",
  "Diffusion des annonces sur tous les portails",
  "Gestion des passerelles en temps réel",
  "Prise de rendez-vous",
  "Agenda et pilotage des équipes",
  "Statistiques avancees (ROI, performance, trafic)",
  "Dashboard global en temps réel"],

  closing:
  "Cette solution permet aux professionnels de reduire leurs coûts, d'optimiser leur temps et d'ameliorer leur performance commerciale."
},
{
  title: "Identification de la societe",
  paragraphs: [
  "INGS OFFICES STRATEGIES",
  "N° RCS :",
  "Capital social : 1 000 EUR",
  "Representee par :",
  "Directeur de la publication : M. NGUESSAN ATCHOUELOU BARTHELEMY"]

}];


const LegalNotice = () => {
  return (
    <section className="bg-slate-50 pb-20 pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Mentions legales
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Informations legales et présentation de la plateforme
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Retrouvez ici les informations relatives a Africa Build Investment,
              à la présentation de ses services et à l'identification de la
              societe.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {sections.map((section) =>
            <article key={section.title} className="space-y-5">
                <h2 className="text-2xl font-semibold text-slate-900">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) =>
              <p key={paragraph} className="text-base leading-8 text-slate-700">
                    {paragraph}
                  </p>
              )}
                {section.items?.length ?
              <ul className="space-y-2 pl-5 text-base leading-8 text-slate-700">
                    {section.items.map((item) =>
                <li key={item} className="list-disc">
                        {item}
                      </li>
                )}
                  </ul> :
              null}
                {section.closing ?
              <p className="text-base leading-8 text-slate-700">
                    {section.closing}
                  </p> :
              null}
              </article>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default LegalNotice;
