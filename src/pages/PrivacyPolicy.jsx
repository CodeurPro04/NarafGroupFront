const privacySections = [
{
  title: "Politique de protection des données personnelles",
  paragraphs: [
  "Africa Build Investment attache une importance majeure à la protection des données personnelles collectées dans le cadre de ses activités.",
  "Le traitement des données est conforme à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD - UE 2016/679).",
  "Un Délégué à la Protection des Données (DPO) a été désigné afin de garantir la conformité et la sécurité des traitements."]

},
{
  title: "Principes appliqués",
  items: [
  "licéite, loyaute et transparence",
  "finalités déterminées et légitimes",
  "minimisation des données",
  "exactitude et mise à jour",
  "sécurité et confidentialité",
  "limitation des durées de conservation"]

},
{
  title: "Données collectées",
  items: [
  "données d'identification",
  "données professionnelles",
  "données de connexion"]

},
{
  title: "Modes de collecte",
  items: [
  "formulaires",
  "création de compte",
  "newsletters",
  "candidatures",
  "interactions avec les services"]

},
{
  title: "Finalités",
  items: [
  "exécution contractuelle",
  "consentement",
  "obligations légales",
  "intérêt légitime"]

},
{
  title: "Durée de conservation",
  paragraphs: [
  "Les données sont conservées uniquement pour la durée nécessaire aux finalités prévues, augmentée des délais légaux."]

},
{
  title: "Destinataires",
  items: [
  "personnel habilité",
  "partenaires",
  "prestataires",
  "autorités publiques (si requis)"]

},
{
  title: "Transferts hors UE",
  paragraphs: [
  "Les transferts éventuels sont encadrés par des garanties conformes au RGPD, notamment par l'utilisation de clauses contractuelles types lorsque cela est nécessaire."]

},
{
  title: "Droits des personnes",
  items: [
  "accès",
  "rectification",
  "suppression",
  "opposition",
  "limitation",
  "portabilite",
  "retrait du consentement"],

  closing:
  "Les demandes doivent être adressées au DPO à l'adresse postale indiquée dans le document."
},
{
  title: "Sécurité informatique",
  paragraphs: [
  "Africa Build Investment met en oeuvre des mesures techniques et organisationnelles strictes pour garantir la sécurité des données et prévenir tout accès non autorisé, perte ou altération."]

},
{
  title: "Liens externes",
  paragraphs: [
  "Les sites tiers accessibles depuis la plateforme disposent de leurs propres politiques de confidentialité. Africa Build Investment ne peut être tenue responsable de leurs pratiques."]

},
{
  title: "Traitement des données en tant que sous-traitant",
  paragraphs: [
  "Lorsque Africa Build Investment agit en tant que sous-traitant, elle s'engage à respecter l'ensemble des obligations prévues par le RGPD, notamment :"],

  items: [
  "traitement conforme aux instructions du responsable de traitement",
  "confidentialité",
  "sécurité",
  "assistance pour l'exercice des droits",
  "notification des violations",
  "documentation",
  "gestion des sous-traitants ultérieurs"]

}];


const PrivacyPolicy = () => {
  return (
    <section className="bg-slate-50 pb-20 pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Politique de confidentialité
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Protection des données personnelles
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Cette page présente les engagements de Africa Build Investment en
              matière de confidentialité, de traitement et de protection des
              données personnelles.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {privacySections.map((section) =>
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

export default PrivacyPolicy;
