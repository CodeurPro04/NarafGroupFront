import { MapPin } from "lucide-react";

const AddressMap = ({ address, title = "Localisation" }) => {
  const cleanedAddress = String(address || "").replace(/\s+/g, " ").trim();

  if (!cleanedAddress) return null;

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(cleanedAddress)}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanedAddress)}`;

  return (
    <div className="overflow-hidden border border-gray-100 bg-white shadow-xl">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <MapPin size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Adresse sur la carte
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-950">{title}</h2>
            <p className="mt-1 break-words text-sm leading-6 text-gray-600">
              {cleanedAddress}
            </p>
          </div>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          Ouvrir la carte
        </a>
      </div>
      <div className="relative h-72 w-full bg-blue-50 sm:h-80">
        <iframe
          title={`Carte - ${cleanedAddress}`}
          src={mapUrl}
          className="pointer-events-none h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen />
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-blue-700 shadow-sm backdrop-blur">
          Carte centrée sur l’adresse
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full">
          <div className="relative flex flex-col items-center">
            <span className="absolute top-7 h-3 w-6 rounded-full bg-blue-950/20 blur-sm" />
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-[0_12px_28px_rgba(37,99,235,0.28)] ring-1 ring-blue-100">
              <span className="absolute h-14 w-14 rounded-full border border-blue-500/20" />
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_6px_16px_rgba(37,99,235,0.38)]">
                <MapPin size={15} fill="currentColor" strokeWidth={2.4} />
              </span>
            </span>
            <span className="-mt-1.5 h-2.5 w-2.5 rotate-45 bg-blue-600 shadow-[2px_2px_8px_rgba(37,99,235,0.22)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressMap;
