const privacySections = [
  {
    title: "Politique de protection des donnees personnelles",
    paragraphs: [
      "Africa Build Investment attache une importance majeure a la protection des donnees personnelles collectees dans le cadre de ses activites.",
      "Le traitement des donnees est conforme a la loi Informatique et Libertes du 6 janvier 1978 modifiee et au Reglement General sur la Protection des Donnees (RGPD - UE 2016/679).",
      "Un Delegue a la Protection des Donnees (DPO) a ete designe afin de garantir la conformite et la securite des traitements.",
    ],
  },
  {
    title: "Principes appliques",
    items: [
      "licéite, loyaute et transparence",
      "finalites determinees et legitimes",
      "minimisation des donnees",
      "exactitude et mise a jour",
      "securite et confidentialite",
      "limitation des durees de conservation",
    ],
  },
  {
    title: "Donnees collectees",
    items: [
      "donnees d'identification",
      "donnees professionnelles",
      "donnees de connexion",
    ],
  },
  {
    title: "Modes de collecte",
    items: [
      "formulaires",
      "creation de compte",
      "newsletters",
      "candidatures",
      "interactions avec les services",
    ],
  },
  {
    title: "Finalites",
    items: [
      "execution contractuelle",
      "consentement",
      "obligations legales",
      "interet legitime",
    ],
  },
  {
    title: "Duree de conservation",
    paragraphs: [
      "Les donnees sont conservees uniquement pour la duree necessaire aux finalites prevues, augmentee des delais legaux.",
    ],
  },
  {
    title: "Destinataires",
    items: [
      "personnel habilite",
      "partenaires",
      "prestataires",
      "autorites publiques (si requis)",
    ],
  },
  {
    title: "Transferts hors UE",
    paragraphs: [
      "Les transferts eventuels sont encadres par des garanties conformes au RGPD, notamment par l'utilisation de clauses contractuelles types lorsque cela est necessaire.",
    ],
  },
  {
    title: "Droits des personnes",
    items: [
      "acces",
      "rectification",
      "suppression",
      "opposition",
      "limitation",
      "portabilite",
      "retrait du consentement",
    ],
    closing:
      "Les demandes doivent etre adressees au DPO a l'adresse postale indiquee dans le document.",
  },
  {
    title: "Securite informatique",
    paragraphs: [
      "Africa Build Investment met en oeuvre des mesures techniques et organisationnelles strictes pour garantir la securite des donnees et prevenir tout acces non autorise, perte ou alteration.",
    ],
  },
  {
    title: "Liens externes",
    paragraphs: [
      "Les sites tiers accessibles depuis la plateforme disposent de leurs propres politiques de confidentialite. Africa Build Investment ne peut etre tenue responsable de leurs pratiques.",
    ],
  },
  {
    title: "Traitement des donnees en tant que sous-traitant",
    paragraphs: [
      "Lorsque Africa Build Investment agit en tant que sous-traitant, elle s'engage a respecter l'ensemble des obligations prevues par le RGPD, notamment :",
    ],
    items: [
      "traitement conforme aux instructions du responsable de traitement",
      "confidentialite",
      "securite",
      "assistance pour l'exercice des droits",
      "notification des violations",
      "documentation",
      "gestion des sous-traitants ulterieurs",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="bg-slate-50 pb-20 pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Politique de confidentialite
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Protection des donnees personnelles
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Cette page presente les engagements de Africa Build Investment en
              matiere de confidentialite, de traitement et de protection des
              donnees personnelles.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {privacySections.map((section) => (
              <article key={section.title} className="space-y-5">
                <h2 className="text-2xl font-semibold text-slate-900">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="space-y-2 pl-5 text-base leading-8 text-slate-700">
                    {section.items.map((item) => (
                      <li key={item} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.closing ? (
                  <p className="text-base leading-8 text-slate-700">
                    {section.closing}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
