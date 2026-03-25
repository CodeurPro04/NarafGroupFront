import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/layout/Hero";
import api, { getApprovedPartners, getHouseModels } from "../api/axios";
import EmptyState from "../components/ui/EmptyState";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { toMediaUrl } from "../utils/media";
import {
  Shield,
  Phone,
  Mail,
  Award,
  Clock,
  CheckCircle,
  Medal,
  Cpu,
  Handshake,
  ShieldCheck,
  BadgeCheck,
  FileText,
  Eye,
  Users,
} from "lucide-react";

const africanCountries = [
  { name: "Algerie", flag: "🇩🇿" },
  { name: "Angola", flag: "🇦🇴" },
  { name: "Benin", flag: "🇧🇯" },
  { name: "Botswana", flag: "🇧🇼" },
  { name: "Burkina Faso", flag: "🇧🇫" },
  { name: "Burundi", flag: "🇧🇮" },
  { name: "Cameroun", flag: "🇨🇲" },
  { name: "Cap-Vert", flag: "🇨🇻" },
  { name: "Comores", flag: "🇰🇲" },
  { name: "Congo", flag: "🇨🇬" },
  { name: "Cote d'Ivoire", flag: "🇨🇮" },
  { name: "Djibouti", flag: "🇩🇯" },
  { name: "Egypte", flag: "🇪🇬" },
  { name: "Erythree", flag: "🇪🇷" },
  { name: "Eswatini", flag: "🇸🇿" },
  { name: "Ethiopie", flag: "🇪🇹" },
  { name: "Gabon", flag: "🇬🇦" },
  { name: "Gambie", flag: "🇬🇲" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Guinee", flag: "🇬🇳" },
  { name: "Guinee-Bissau", flag: "🇬🇼" },
  { name: "Guinee equatoriale", flag: "🇬🇶" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Lesotho", flag: "🇱🇸" },
  { name: "Liberia", flag: "🇱🇷" },
  { name: "Libye", flag: "🇱🇾" },
  { name: "Madagascar", flag: "🇲🇬" },
  { name: "Malawi", flag: "🇲🇼" },
  { name: "Mali", flag: "🇲🇱" },
  { name: "Maroc", flag: "🇲🇦" },
  { name: "Maurice", flag: "🇲🇺" },
  { name: "Mauritanie", flag: "🇲🇷" },
  { name: "Mozambique", flag: "🇲🇿" },
  { name: "Namibie", flag: "🇳🇦" },
  { name: "Niger", flag: "🇳🇪" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Ouganda", flag: "🇺🇬" },
  { name: "RDC", flag: "🇨🇩" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Sao Tome-et-Principe", flag: "🇸🇹" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "Seychelles", flag: "🇸🇨" },
  { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Somalie", flag: "🇸🇴" },
  { name: "Soudan", flag: "🇸🇩" },
  { name: "Soudan du Sud", flag: "🇸🇸" },
  { name: "Tanzanie", flag: "🇹🇿" },
  { name: "Tchad", flag: "🇹🇩" },
  { name: "Togo", flag: "🇹🇬" },
  { name: "Tunisie", flag: "🇹🇳" },
  { name: "Zambie", flag: "🇿🇲" },
  { name: "Zimbabwe", flag: "🇿🇼" },
  { name: "Afrique du Sud", flag: "🇿🇦" },
  { name: "Republique centrafricaine", flag: "🇨🇫" },
];

const Home = () => {
  const defaultShowcaseSections = [
    {
      title: "Besoin d'un bien",
      button_label: "Voir tous les biens",
      button_link: "/properties",
      items: [],
    },
    {
      title: "Besoin d'un projet de construction",
      button_label: "Voir tous les projets",
      button_link: "/construction",
      items: [],
    },
    {
      title: "J'investis dans un projet",
      button_label: "Voir les opportunites",
      button_link: "/investment",
      items: [],
    },
  ];

  const [partners, setPartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [houseModels, setHouseModels] = useState([]);
  const [houseModelsLoading, setHouseModelsLoading] = useState(true);
  const [showcaseSectionsLoading, setShowcaseSectionsLoading] = useState(true);
  const [showcaseSections, setShowcaseSections] = useState(defaultShowcaseSections);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [houseModelsSection, setHouseModelsSection] = useState({
    title: "Modeles de maison",
    description:
      "Decouvrez nos modeles de maison, pensés pour allier style, confort et fonctionnalite dans chaque projet.",
    videos: ["https://www.youtube.com/watch?v=tgbNymZ7vqY"],
    showcaseSections: defaultShowcaseSections,
  });

  const stats = [
    { number: "2,500+", label: "Biens vendus" },
    { number: "150+", label: "Projets livrés" },
    { number: "98%", label: "Satisfaction client" },
    { number: "25 ans", label: "D'experience" },
  ];

  const whyChooseUs = [
    {
      icon: <BadgeCheck size={24} />,
      title: "Partenaires certifiés",
    },
    {
      icon: <FileText size={24} />,
      title: "Dossiers légaux complets",
    },
    {
      icon: <Eye size={24} />,
      title: "Suivi transparent",
    },
    {
      icon: <Users size={24} />,
      title: "Accompagnement humain",
    },
  ];

  const modelHighlights = [
    { icon: <Medal size={28} />, label: "Qualite de construction" },
    { icon: <Handshake size={28} />, label: "Accompagnement" },
    { icon: <Cpu size={28} />, label: "Equipements connectes" },
    { icon: <ShieldCheck size={28} />, label: "Garanties" },
  ];

  const pickRandomItems = (items, maxItems = 4) => {
    const source = Array.isArray(items) ? [...items] : [];
    for (let index = source.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [source[index], source[randomIndex]] = [source[randomIndex], source[index]];
    }
    return source.slice(0, maxItems);
  };

  const normalizePropertyItem = (property) => {
    const media = Array.isArray(property?.media) ? property.media : [];
    const mediaImage = media.find((item) => item?.file_path)?.file_path;

    return {
      title: property?.title || "Bien immobilier",
      excerpt:
        property?.short_description ||
        property?.description ||
        "Decouvrez ce bien immobilier disponible actuellement.",
      image_url:
        toMediaUrl(property?.primary_image?.file_path) ||
        toMediaUrl(mediaImage) ||
        toMediaUrl(property?.cover_image) ||
        toMediaUrl(property?.image_url) ||
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      link: `/property/${property?.uuid || property?.id}`,
    };
  };

  const normalizeConstructionItem = (project) => {
    const images = Array.isArray(project?.images_path) ? project.images_path : [];

    return {
      title: project?.title || "Projet de construction",
      excerpt:
        project?.short_description ||
        project?.description ||
        "Consultez ce projet de construction disponible actuellement.",
      image_url:
        (images.length ? toMediaUrl(images[0]) : "") ||
        toMediaUrl(project?.cover_image) ||
        toMediaUrl(project?.image_url) ||
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      link: `/construction/${project?.uuid || project?.id}`,
    };
  };

  const normalizeInvestmentItem = (project) => {
    const images = Array.isArray(project?.images_path) ? project.images_path : [];

    return {
      title: project?.title || "Projet d'investissement",
      excerpt:
        project?.short_description ||
        project?.description ||
        "Consultez cette opportunite d'investissement disponible actuellement.",
      image_url:
        (images.length ? toMediaUrl(images[0]) : "") ||
        toMediaUrl(project?.cover_image) ||
        toMediaUrl(project?.image_url) ||
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      link: `/investment/${project?.uuid || project?.id}`,
    };
  };

  const toEmbedVideoUrl = (rawUrl) => {
    if (!rawUrl) return null;

    try {
      const parsedUrl = new URL(rawUrl);

      if (parsedUrl.hostname.includes("youtube.com")) {
        const embedId =
          parsedUrl.searchParams.get("v") ||
          parsedUrl.pathname.split("/").filter(Boolean).pop();
        return embedId
          ? `https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`
          : null;
      }

      if (parsedUrl.hostname.includes("youtu.be")) {
        const embedId = parsedUrl.pathname.split("/").filter(Boolean).pop();
        return embedId
          ? `https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`
          : null;
      }

      if (parsedUrl.hostname.includes("vimeo.com")) {
        const embedId = parsedUrl.pathname.split("/").filter(Boolean).pop();
        return embedId ? `https://player.vimeo.com/video/${embedId}` : null;
      }

      if (rawUrl.includes("/embed/") || rawUrl.includes("player.vimeo.com")) {
        return rawUrl;
      }

      return rawUrl;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadPartners = async () => {
      try {
        setPartnersLoading(true);
        const response = await getApprovedPartners();
        const payload = response?.data?.data ?? response?.data ?? [];
        const list = payload.data || payload;
        setPartners(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Erreur chargement partenaires:", error);
      } finally {
        setPartnersLoading(false);
      }
    };

    loadPartners();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadHouseModels = async () => {
      try {
        setHouseModelsLoading(true);
        const response = await getHouseModels();
        const payload = response?.data ?? {};
        const list = payload?.data ?? [];

        if (isMounted) {
          const models = Array.isArray(list) ? list : [];
          setHouseModels(models);
          setHouseModelsSection({
            title: payload?.section?.title || "Modeles de maison",
            description:
              payload?.section?.description ||
              "Decouvrez nos modeles de maison, pensés pour allier style, confort et fonctionnalite dans chaque projet.",
            videos:
              Array.isArray(payload?.section?.videos) &&
              payload.section.videos.length
                ? payload.section.videos
                : ["https://www.youtube.com/watch?v=tgbNymZ7vqY"],
            showcaseSections:
              Array.isArray(payload?.section?.showcase_sections) &&
              payload.section.showcase_sections.length >= 3
                ? payload.section.showcase_sections.map((section) => ({
                    title: section?.title || "",
                    button_label: section?.button_label || "",
                    button_link: section?.button_link || "",
                    items: Array.isArray(section?.items)
                      ? section.items.filter(
                          (item) =>
                            item?.title ||
                            item?.excerpt ||
                            item?.image_url ||
                            item?.link,
                        )
                      : [],
                  }))
                : defaultShowcaseSections,
          });
        }
      } catch (error) {
        console.error("Erreur chargement modeles maison:", error);
        if (isMounted) {
          setHouseModels([]);
          setHouseModelsSection((prev) => ({
            ...prev,
            videos: ["https://www.youtube.com/watch?v=tgbNymZ7vqY"],
          }));
        }
      } finally {
        if (isMounted) {
          setHouseModelsLoading(false);
        }
      }
    };

    loadHouseModels();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadShowcaseSections = async () => {
      try {
        setShowcaseSectionsLoading(true);

        const [propertiesResponse, constructionResponse, investmentsResponse] =
          await Promise.all([
            api.get("/properties", { params: { per_page: 50 } }),
            api.get("/construction-projects"),
            api.get("/investments"),
          ]);

        const propertiesList =
          propertiesResponse?.data?.data?.data ||
          propertiesResponse?.data?.data ||
          [];
        const constructionList =
          constructionResponse?.data?.data || constructionResponse?.data || [];
        const investmentsList =
          investmentsResponse?.data?.data?.data ||
          investmentsResponse?.data?.data ||
          [];

        if (isMounted) {
          setShowcaseSections([
            {
              title: "Besoin d'un bien",
              button_label: "Voir tous les biens",
              button_link: "/properties",
              items: pickRandomItems(propertiesList, 4).map(normalizePropertyItem),
            },
            {
              title: "Besoin d'un projet de construction",
              button_label: "Voir tous les projets",
              button_link: "/construction",
              items: pickRandomItems(constructionList, 4).map(
                normalizeConstructionItem,
              ),
            },
            {
              title: "J'investis dans un projet",
              button_label: "Voir les opportunites",
              button_link: "/investment",
              items: pickRandomItems(investmentsList, 4).map(
                normalizeInvestmentItem,
              ),
            },
          ]);
        }
      } catch (error) {
        console.error("Erreur chargement sections accueil:", error);
        if (isMounted) {
          setShowcaseSections(defaultShowcaseSections);
        }
      } finally {
        if (isMounted) {
          setShowcaseSectionsLoading(false);
        }
      }
    };

    loadShowcaseSections();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeModel = houseModels[0] || null;
  const fallbackSliderImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80",
    "https://images.unsplash.com/photo-1600566752227-8f3b2f28a2a9?w=1600&q=80",
  ];

  const sliderImages = useMemo(() => {
    const allModelImages = houseModels
      .flatMap((model) => [
        toMediaUrl(model?.cover_image_url || model?.cover_image_path),
        ...(Array.isArray(model?.gallery_image_urls)
          ? model.gallery_image_urls.map(toMediaUrl)
          : []),
      ])
      .filter(Boolean);

    const uniqueImages = Array.from(new Set(allModelImages));
    if (uniqueImages.length === 0) return fallbackSliderImages;

    const shuffledImages = [...uniqueImages].sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImages.slice(0, 4);

    if (selectedImages.length === 4) return selectedImages;
    return [...selectedImages, ...fallbackSliderImages].slice(0, 4);
  }, [houseModels]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [sliderImages]);

  useEffect(() => {
    setActiveVideoIndex(0);
  }, [houseModelsSection.videos]);

  useEffect(() => {
    if (!sliderImages.length) return undefined;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const videoEmbeds = (houseModelsSection.videos || [])
    .map((video) => ({
      source: video,
      embed: toEmbedVideoUrl(video),
    }))
    .filter((video) => video.embed);

  const activeVideo = videoEmbeds[activeVideoIndex] || videoEmbeds[0] || null;

  return (
    <div className="bg-white">
      <Hero />

      <section className="w-full overflow-hidden border-y border-slate-200 bg-slate-100 py-3 text-slate-900">
        <div className="flag-marquee flex w-max items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
          {[...africanCountries, ...africanCountries].map((country, index) => (
            <span
              key={`${country.name}-${index}`}
              className="shrink-0 text-2xl leading-none sm:text-3xl lg:text-[2.2rem]"
              aria-label={country.name}
              title={country.name}
            >
              {country.flag}
            </span>
          ))}
        </div>
      </section>

      {/* Nos Services / Modeles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              {houseModelsSection.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {houseModelsSection.description}
            </p>
          </div>

          {houseModelsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center bg-slate-50 border border-slate-200 p-5 sm:p-8">
              <div>
                <SkeletonBlock className="w-full h-[280px] sm:h-[420px]" />
                <div className="flex items-center justify-center gap-2 mt-4">
                  {[0, 1, 2, 3].map((dot) => (
                    <SkeletonBlock
                      key={`model-dot-${dot}`}
                      className="h-2.5 w-2.5 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <SkeletonBlock className="h-10 w-4/5" />
                <SkeletonBlock className="h-5 w-full" />
                <SkeletonBlock className="h-5 w-11/12" />
                <SkeletonBlock className="h-5 w-4/5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[0, 1, 2, 3].map((item) => (
                    <div
                      key={`model-highlight-${item}`}
                      className="flex items-center gap-4"
                    >
                      <SkeletonBlock className="h-7 w-7 rounded-full" />
                      <SkeletonBlock className="h-5 w-40" />
                    </div>
                  ))}
                </div>
                <SkeletonBlock className="h-12 w-56 mt-3" />
              </div>
            </div>
          ) : !activeModel ? (
            <EmptyState
              title="Aucun modele de maison disponible pour le moment."
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center bg-slate-50 border border-slate-200 p-5 sm:p-8">
              <div>
                <div className="relative overflow-hidden">
                  {sliderImages.map((image, index) => (
                    <img
                      key={`${activeModel?.uuid || "model"}-img-${index}`}
                      src={image}
                      alt={activeModel?.title || "Modele"}
                      className={`absolute inset-0 w-full h-[280px] sm:h-[420px] object-cover transition-opacity duration-700 ${
                        index === activeImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <img
                    src={sliderImages[activeImageIndex]}
                    alt={activeModel?.title || "Modele"}
                    className="invisible w-full h-[280px] sm:h-[420px] object-cover"
                  />
                </div>
                {sliderImages.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {sliderImages.map((image, index) => (
                      <button
                        key={`dot-${image}-${index}`}
                        type="button"
                        aria-label={`Image ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                          activeImageIndex === index
                            ? "bg-blue-700"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-4xl font-bold text-slate-700 leading-tight">
                  {activeModel.title}
                </h2>
                <p className="mt-5 text-lg text-slate-700 leading-relaxed">
                  {activeModel.short_description ||
                    "Choisissez votre future maison neuve a partir de nos gammes de modeles."}
                </p>
                <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                  {activeModel.description
                    ? String(activeModel.description).split("\n")[0]
                    : "Un accompagnement complet pour concevoir une maison qui vous ressemble."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                  {modelHighlights.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className="text-blue-600">{item.icon}</span>
                      <span className="text-lg font-medium text-slate-900">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/house-models"
                  className="inline-flex mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold transition-colors"
                >
                  Decouvrir nos modeles
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {showcaseSections.length > 0 && (
        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
            {showcaseSections.map((section, sectionIndex) => {
              const items = Array.isArray(section.items)
                ? section.items.slice(0, 4)
                : [];

              return (
                <div
                  key={`home-showcase-${sectionIndex}`}
                  className="border-t border-slate-200 pt-4"
                >
                  <div className="mb-5">
                    <h2 className="text-[2rem] font-bold leading-tight text-slate-950">
                      {section.title || "Besoin d'un bien"}
                    </h2>
                    <div className="mt-2 h-1 w-10 rounded-full bg-slate-950" />
                  </div>

                  {showcaseSectionsLoading ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                      {[0, 1, 2, 3].map((itemIndex) => (
                        <div
                          key={`home-showcase-skeleton-${sectionIndex}-${itemIndex}`}
                          className="border-b border-slate-200 pb-4"
                        >
                          <SkeletonBlock className="h-40 w-full" />
                          <SkeletonBlock className="mt-3 h-5 w-5/6" />
                          <SkeletonBlock className="mt-2 h-4 w-full" />
                          <SkeletonBlock className="mt-2 h-4 w-4/5" />
                        </div>
                      ))}
                    </div>
                  ) : items.length === 0 ? (
                    <EmptyState
                      title={
                        sectionIndex === 0
                          ? "Aucune propriete immobiliere disponible pour le moment."
                          : sectionIndex === 1
                            ? "Aucun projet de construction disponible pour le moment."
                            : "Aucun projet d'investissement disponible pour le moment."
                      }
                    />
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                      {items.map((item, itemIndex) => {
                        const imageUrl = toMediaUrl(item.image_url) || item.image_url;
                        const cardLink = item.link || "#";

                        return (
                          <Link
                            key={`home-showcase-card-${sectionIndex}-${itemIndex}`}
                            to={cardLink}
                            className="group block border-b border-slate-200 pb-4 transition duration-200 hover:-translate-y-1"
                          >
                            <div className="overflow-hidden bg-slate-100">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={item.title || `Element ${itemIndex + 1}`}
                                  className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                />
                              ) : (
                                <div className="flex h-40 w-full items-center justify-center bg-slate-200 text-sm text-slate-500">
                                  Image a ajouter
                                </div>
                              )}
                            </div>
                            <div className="pt-3">
                              <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900">
                                {item.title || "Titre a renseigner"}
                              </h3>
                              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                                {item.excerpt || "Resume indisponible pour le moment."}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {section.button_label && (
                    <div className="mt-6">
                      <Link
                        to={section.button_link || "#"}
                        className="inline-flex items-center border-0 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        {section.button_label}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="bg-slate-50 py-16 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Videos de presentation
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                Consulte les contenus video ajoutes depuis l'espace administrateur
                pour decouvrir l'univers ABI et ses modeles.
              </p>
            </div>

            {activeVideo ? (
              <div className="space-y-5">
                <div className="bg-black p-2 shadow-2xl">
                  <div className="aspect-video bg-black">
                    <iframe
                      className="h-full w-full"
                      src={activeVideo.embed}
                      title={`Presentation video ${activeVideoIndex + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>

                {videoEmbeds.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {videoEmbeds.map((video, index) => (
                      <button
                        key={`${video.source}-${index}`}
                        type="button"
                        onClick={() => setActiveVideoIndex(index)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          index === activeVideoIndex
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                        }`}
                      >
                        Video {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <EmptyState
                title="Aucune video disponible pour le moment."
              />
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous faire confiance ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plus de 25 ans d'experience, dans l'immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div
                  className="group inline-flex items-center justify-center w-16 h-16 
                bg-blue-100 text-blue-600 rounded-full mb-4 
                transition-all duration-300 ease-in-out 
                hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-lg"
                >
                  <div className="transition-transform duration-300 group-hover:rotate-6">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gradient-to-r from-blue-600 to-blue-700 p-12 text-white">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos partenaires
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nous collaborons avec des acteurs fiables, vérifiés et engagés
              pour la qualité.
            </p>
            <p className="text-lg text-gray-600">
              Nos partenaires officiels seront dévoilés très prochainement.
            </p>
          </div>

          {partnersLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={`partner-skeleton-${item}`}
                  className="bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                >
                  <SkeletonBlock className="h-24 w-full" />
                  <SkeletonBlock className="mt-5 h-5 w-20" />
                  <SkeletonBlock className="mt-3 h-6 w-3/4" />
                  <SkeletonBlock className="mt-3 h-4 w-1/2" />
                  <SkeletonBlock className="mt-6 h-4 w-24" />
                </div>
              ))}
            </div>
          ) : partners.length === 0 ? (
            <EmptyState
              title="Aucun partenaire publie pour le moment."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner) => {
                const partnerLogo = [
                  partner.logo_url,
                  partner.logo_path,
                  partner.cover_image_url,
                  partner.cover_image_path,
                  partner.logo?.file_path,
                ]
                  .map(toMediaUrl)
                  .find(Boolean);

                return (
                  <Link
                    key={partner.uuid}
                    to={`/partners/${partner.uuid}`}
                    className="group block bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
                  >
                    <div className="flex h-24 items-center justify-center bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f8_100%)] px-6">
                      {partnerLogo ? (
                        <img
                          src={partnerLogo}
                          alt={partner.company_name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Logo
                        </span>
                      )}
                    </div>
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Partenaire ABI
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                      {partner.company_name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      {partner.company_type || "Entreprise"}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-400">
                      {partner.city || "Localisation a definir"}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à passer du rêve au concret ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Tu veux un projet sérieux, pas des paroles. On commence quand tu
            veux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+2250778252525"
              className="bg-white text-blue-900 px-10 py-4 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <Phone size={20} />
              <span>+225 07 78 25 25 25</span>
            </a>
            <a
              href="mailto:contact@africabuildinvest.com?subject=Prise%20de%20rendez-vous"
              className="bg-white text-blue-900 px-10 py-4 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>Prendre rendez-vous</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
