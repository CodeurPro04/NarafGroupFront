import { AFRICAN_COUNTRIES } from "../../utils/countries";

const LANGUAGES = [
  { code: "ar", label: "Arabe", flag: "🇸🇦", native: "العربية" },
  { code: "en", label: "Anglais", flag: "🇬🇧", native: "English" },
  { code: "es", label: "Espagnole", flag: "🇪🇸", native: "Español" },
  { code: "zh", label: "Chinois", flag: "🇨🇳", native: "中文" },
  { code: "fr", label: "Français", flag: "🇫🇷", native: "Français" },
];

const CountryMenuDropdown = ({ selectedLang, onSelectLang, selectedCountry, onSelectCountry }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="rounded-[8px] bg-white px-10 py-5">
        <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-[48px] items-start">

          {/* Left — Language selector */}
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#9aa0a6] mb-4">
              Langue
            </h2>
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((lang) => {
                const isActive = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onSelectLang(lang.code)}
                    className={`flex items-center gap-3 w-full rounded-[6px] px-3 py-2.5 text-left transition ${
                      isActive
                        ? "bg-[#dff1ff] text-[#0d63c9]"
                        : "hover:bg-[#f7f9fc] text-[#374151]"
                    }`}
                  >
                    <span className="text-[22px] leading-none">{lang.flag}</span>
                    <div>
                      <p className={`text-[14px] font-semibold leading-5 ${isActive ? "text-[#0d63c9]" : "text-[#111111]"}`}>
                        {lang.label}
                      </p>
                      <p className="text-[12px] text-[#9aa0a6] leading-4">{lang.native}</p>
                    </div>
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#0d63c9]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — African countries grid */}
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#9aa0a6]">
                Pays d'Afrique
              </h2>
              <span className="text-[12px] text-[#9aa0a6]">{AFRICAN_COUNTRIES.length} pays</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
              <div className="grid grid-cols-5 gap-1.5">
                {AFRICAN_COUNTRIES.map((country) => {
                  const isActive = selectedCountry === country.code;
                  return (
                    <button
                      key={country.code}
                      onClick={() => onSelectCountry(isActive ? null : country.code)}
                      className={`flex flex-col items-center gap-1 rounded-[6px] px-1 py-2 text-center transition ${
                        isActive
                          ? "bg-[#dff1ff] ring-1 ring-[#0d63c9]"
                          : "hover:bg-[#f7f9fc]"
                      }`}
                    >
                      <span className="text-[24px] leading-none">{country.flag}</span>
                      <span className={`text-[11px] leading-[1.3] font-medium ${isActive ? "text-[#0d63c9]" : "text-[#555555]"}`}>
                        {country.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CountryMenuDropdown;
