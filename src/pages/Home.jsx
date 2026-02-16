import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/layout/Hero";
import { getApprovedPartners, getHouseModels } from "../api/axios";
import { SkeletonBlock } from "../components/ui/Skeleton";
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
} from "lucide-react";

const Home = () => {
  const [partners, setPartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [houseModels, setHouseModels] = useState([]);
  const [houseModelsLoading, setHouseModelsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const stats = [
    { number: "2,500+", label: "Biens vendus" },
    { number: "150+", label: "Projets livres" },
    { number: "98%", label: "Satisfaction client" },
    { number: "25 ans", label: "D'experience" },
  ];

  const whyChooseUs = [
    {
      icon: <Award size={24} />,
      title: "Expertise reconnue",
      text: "Plus de 25 ans d'experience dans l'immobilier",
    },
    {
      icon: <Clock size={24} />,
      title: "Reactivite",
      text: "Reponse sous 24h a toutes vos demandes",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Transparence",
      text: "Des tarifs clairs et sans frais caches",
    },
    {
      icon: <Shield size={24} />,
      title: "Securite",
      text: "Transactions 100% securisees et garanties",
    },
  ];

  const modelHighlights = [
    { icon: <Medal size={28} />, label: "Qualite de construction" },
    { icon: <Handshake size={28} />, label: "Accompagnement" },
    { icon: <Cpu size={28} />, label: "Equipements connectes" },
    { icon: <ShieldCheck size={28} />, label: "Garanties" },
  ];

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
        const payload = response?.data?.data ?? response?.data ?? [];
        const list = payload?.data || payload;

        if (isMounted) {
          const models = Array.isArray(list) ? list : [];
          setHouseModels(models);
        }
      } catch (error) {
        console.error("Erreur chargement modeles maison:", error);
        if (isMounted) {
          setHouseModels([]);
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

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const storageBase = apiBase.replace(/\/api\/?$/, "");

  const getLogoUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const cleaned = path.replace(/^public\//, "");
    return `${storageBase}/storage/${cleaned}`;
  };

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
        model?.cover_image_url,
        ...(Array.isArray(model?.gallery_image_urls) ? model.gallery_image_urls : []),
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
    if (!sliderImages.length) return undefined;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="bg-white">
      <Hero />

      {/* Nos Services / Modeles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="text-gray-500">Aucun modele de maison disponible.</p>
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
                      <span className="text-lg font-medium text-slate-900">{item.label}</span>
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

      {/* Information + Video */}
      <section className="py-16 sm:py-18 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] gap-8 lg:gap-10 items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-blue-700 mb-6">
                Faire construire une maison avec
                <br />
                NARAF Group, c&apos;est...
              </h2>

              <div className="space-y-5 text-gray-900 text-base md:text-lg leading-relaxed">
                <p>
                  ...se lancer dans un projet de construction en toute serenite.
                  Nous placons l'accompagnement de nos clients au coeur de nos
                  priorites.
                </p>

                <p>
                  C'est pourquoi nous vous proposons une offre de services:
                  recherche du terrain, financement adapte, conseil sur le choix
                  des plans, gestion des demarches administratives et de
                  l'obtention des autorisations.
                </p>

                <p>
                  Nos maisons disposent d'equipements performants, notamment
                  pour l'optimisation energetique et le confort quotidien.
                </p>

                <p>
                  *Les performances reelles dependent du type de projet, des
                  options techniques choisies et des conditions d'utilisation.
                </p>
              </div>
            </div>

            <div className="w-full lg:max-w-[560px] lg:ml-auto">
              <div className="bg-black shadow-2xl p-2">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY?rel=0&modestbranding=1"
                    title="Presentation NARAF Group"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir NARAF ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'excellence a chaque etape de votre projet immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  {item.icon}
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
              Des entreprises de confiance qui travaillent avec Naraf Group.
            </p>
          </div>

          {partnersLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={`partner-skeleton-${item}`}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <SkeletonBlock className="h-16 w-16 rounded-2xl" />
                  <SkeletonBlock className="h-6 w-3/4 mt-4" />
                  <SkeletonBlock className="h-4 w-1/2 mt-2" />
                  <SkeletonBlock className="h-4 w-2/3 mt-3" />
                </div>
              ))}
            </div>
          ) : partners.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              Aucun partenaire publie pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner) => (
                <Link
                  key={partner.uuid}
                  to={`/partners/${partner.uuid}`}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition block"
                >
                  <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    {partner.logo_path ? (
                      <img
                        src={getLogoUrl(partner.logo_path)}
                        alt={partner.company_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-500">
                        Logo
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {partner.company_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {partner.company_type || "Entreprise"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {partner.city || "Localisation a definir"}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pret a concretiser votre projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Notre equipe d'experts est a votre disposition pour vous accompagner
            dans toutes les etapes de votre projet immobilier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-10 py-4 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 shadow-lg">
              <Phone size={20} />
              <span>+225 XX XX XX XX XX</span>
            </button>
            <button className="bg-transparent text-white px-10 py-4 font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
              <Mail size={20} />
              <span>contact@naraf.ci</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
