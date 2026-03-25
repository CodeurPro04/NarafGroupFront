import { Plus, Search } from "lucide-react";

const PropertiesHero = ({
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel = "Rechercher un bien",
  secondaryLabel = "Faire une annonce",
  primaryIcon: PrimaryIcon = Search,
  secondaryIcon: SecondaryIcon = Plus,
  title = "Des biens fiables, pas des promesses",
  descriptionLines = [
    "Tu veux investir au pays ou en Afrique francophone, mais tu veux du serieux",
    "Ici, chaque bien est verifie, documente et pret pour toi.",
  ],
  backgroundImage =
    "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')",
  overlayClassName = "bg-gradient-to-b from-blue-950/90 via-blue-900/85 to-blue-900/80",
}) => {
  return (
    <div
      className="relative min-h-[560px] lg:min-h-[620px]"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 ${overlayClassName}`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight py-6">
            {title}
          </h1>

          {descriptionLines.map((line, index) => (
            <p
              key={`${line}-${index}`}
              className={`text-base sm:text-lg lg:text-2xl text-blue-100 leading-relaxed ${
                index === descriptionLines.length - 1 ? "mb-8" : "mb-2"
              }`}
            >
              {line}
            </p>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              <PrimaryIcon size={20} />
              <span>{primaryLabel}</span>
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 font-semibold hover:bg-white/10 transition-colors"
            >
              <SecondaryIcon size={20} />
              <span>{secondaryLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesHero;
