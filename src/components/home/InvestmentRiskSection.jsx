import { AlertTriangle } from "lucide-react";
import { toMediaUrl } from "../../utils/media";

const FALLBACK_PARTNERS = [
  { company_name: "ABI Capital" },
  { company_name: "Naraf Group" },
  { company_name: "Partenaires Financiers" },
];

const InvestmentRiskSection = ({ approvedPartners = [] }) => {
  const displayPartners =
    approvedPartners.length > 0
      ? approvedPartners.slice(0, 4)
      : FALLBACK_PARTNERS;

  const getLogoUrl = (p) =>
    [p.logo_url, p.logo_path, p.cover_image_url, p.cover_image_path, p.logo?.file_path]
      .map(toMediaUrl)
      .find(Boolean);

  return (
    <section className="w-full bg-amber-50 border-t-4 border-amber-400 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Titre centré */}
        <p className="text-center text-base sm:text-lg font-bold text-slate-800 mb-6">
          Nos partenaires assurent la protection des intérêts de nos investisseurs
        </p>

        {/* Logos partenaires centrés */}
        <div className="flex flex-wrap items-center justify-center gap-10 mb-8">
          {displayPartners.map((p, i) => {
            const logo = getLogoUrl(p);
            return (
              <div key={i} className="flex items-center">
                {logo ? (
                  <img
                    src={logo}
                    alt={p.company_name}
                    className="h-8 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span
                    className="text-sm font-extrabold tracking-widest text-slate-400 hover:text-slate-700 uppercase transition-colors duration-300"
                    style={{ fontFamily: "serif" }}
                  >
                    {p.company_name}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-100 border border-amber-300 px-6 py-5 flex gap-4 items-start">
          <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-relaxed">
            Investir en immobilier fractionné sous forme obligataire comporte des risques
            de perte en capital et de liquidité, en l&apos;absence de garantie de rachat
            en cours de vie du produit, mais aussi du fait du risque de liquidité du bien
            immobilier sous-jacent à l&apos;échéance.{" "}
            <a href="/legal" className="font-bold underline hover:text-amber-700">
              Consulter l&apos;ensemble des risques identifiés
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default InvestmentRiskSection;
