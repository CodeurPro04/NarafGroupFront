const SECTION_DEFINITIONS = [
  {
    key: "besoin-bien",
    title: "Besoin d'un bien",
    ctaLabel: "Voir tous les articles",
  },
  {
    key: "projet-construction",
    title: "Besoin d'un projet de construction",
    ctaLabel: "Voir tous les projets",
  },
  {
    key: "investissement-projet",
    title: "J'investis dans un projet",
    ctaLabel: "Voir les opportunites",
  },
];

const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const slugify = (value = "") =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const findDefinitionByTitle = (title = "") => {
  const normalized = normalizeText(title);
  return SECTION_DEFINITIONS.find(
    (definition) => normalizeText(definition.title) === normalized,
  );
};

export const getSectionKey = (section, index = 0) => {
  const byTitle = findDefinitionByTitle(section?.title || "");
  if (byTitle) return byTitle.key;
  return SECTION_DEFINITIONS[index]?.key || `section-${index + 1}`;
};

export const getSectionDisplay = (section, index = 0) => {
  const key = getSectionKey(section, index);
  const definition =
    SECTION_DEFINITIONS.find((item) => item.key === key) ||
    SECTION_DEFINITIONS[index] ||
    {};

  return {
    key,
    title: section?.title || definition.title || `Section ${index + 1}`,
    buttonLabel: section?.button_label || definition.ctaLabel || "Voir tout",
    buttonLink: `/articles/${key}`,
  };
};

export const mapShowcaseSections = (rawSections = []) =>
  (Array.isArray(rawSections) ? rawSections : []).map((section, sectionIndex) => {
    const display = getSectionDisplay(section, sectionIndex);
    const items = Array.isArray(section?.items) ? section.items : [];

    return {
      ...section,
      key: display.key,
      title: display.title,
      button_label: display.buttonLabel,
      button_link: display.buttonLink,
      items: items.map((item, itemIndex) => {
        const baseSlug = slugify(item?.title || "");
        const slug = baseSlug ? `${baseSlug}-${itemIndex + 1}` : `article-${itemIndex + 1}`;
        return {
          ...item,
          slug,
          details_link: `/articles/${display.key}/${slug}`,
          original_link: item?.link || "",
        };
      }),
    };
  });

export const findShowcaseSection = (sections, sectionKey) =>
  mapShowcaseSections(sections).find((section) => section.key === sectionKey) || null;

export const findShowcaseArticle = (section, articleSlug) =>
  (section?.items || []).find((item) => item.slug === articleSlug) || null;

