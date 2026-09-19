import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MapPin, Building2, HardHat, TrendingUp, Locate } from "lucide-react";
import { getMapPins } from "../../api/axios";
import { toMediaUrl } from "../../utils/media";

const TYPE_CONFIG = {
  property: {
    label: "Immobilier",
    color: "#2563eb",
    Icon: Building2,
    shape: "50% 50% 50% 0%",
  },
  construction: {
    label: "Construction",
    color: "#d97706",
    Icon: HardHat,
    shape: "20%",
  },
  investment: {
    label: "Investissement",
    color: "#059669",
    Icon: TrendingUp,
    shape: "50%",
  },
};

const ICON_PATHS = {
  property:
    '<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
  construction:
    '<path d="M2 18h20M4 18V9l4-3 4 3v9M12 18V6l4-2 4 2v12"/>',
  investment: '<path d="M3 17 9 11l4 4 8-8M17 6h4v4"/>',
};

const buildDivIcon = (type) => {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.property;
  const path = ICON_PATHS[type] || ICON_PATHS.property;
  const html = `
    <div class="abi-pin" style="background:${config.color}; border-radius:${config.shape};">
      <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>
    </div>
  `;
  return L.divIcon({
    html,
    className: "abi-map-marker",
    iconSize: [34, 34],
    iconAnchor: [17, 30],
    popupAnchor: [0, -28],
  });
};

const formatAmount = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return null;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  })
    .format(number)
    .replace("XOF", "FCFA");
};

const getPinPrice = (pin) => {
  if (pin.type === "property") return formatAmount(pin.price);
  if (pin.type === "construction") {
    const min = formatAmount(pin.budget_min);
    const max = formatAmount(pin.budget_max);
    if (min && max) return `${min} - ${max}`;
    return min || max;
  }
  if (pin.type === "investment") return formatAmount(pin.total_investment);
  return null;
};

const getPinFallbackImage = () =>
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80";

const buildPopupContent = (pin) => {
  const config = TYPE_CONFIG[pin.type] || TYPE_CONFIG.property;
  const image = toMediaUrl(pin.image) || getPinFallbackImage();
  const price = getPinPrice(pin);

  return `
    <div class="abi-popup">
      <div class="abi-popup-image" style="background-image:url('${image}')"></div>
      <div class="abi-popup-body">
        <span class="abi-popup-badge" style="background:${config.color}1a; color:${config.color};">${config.label}</span>
        <p class="abi-popup-title">${pin.title || "Bien disponible"}</p>
        <p class="abi-popup-location">${pin.city || pin.address || ""}</p>
        ${price ? `<p class="abi-popup-price">${price}</p>` : ""}
        <button type="button" class="abi-popup-link" data-link="${pin.link}">Voir le detail</button>
      </div>
    </div>
  `;
};

const PropertiesMapSection = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const clusterGroupRef = useRef(null);
  const markersRef = useRef([]);

  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTypes, setActiveTypes] = useState(
    new Set(["property", "construction", "investment"]),
  );

  useEffect(() => {
    let isMounted = true;

    const loadPins = async () => {
      try {
        setLoading(true);
        const response = await getMapPins();
        const data = response?.data?.data ?? [];
        if (isMounted) {
          setPins(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (err) {
        console.error("Erreur chargement carte:", err);
        if (isMounted) {
          setError("Impossible de charger la carte pour le moment.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPins();

    return () => {
      isMounted = false;
    };
  }, []);

  const counts = useMemo(() => {
    const base = { property: 0, construction: 0, investment: 0 };
    pins.forEach((pin) => {
      if (base[pin.type] !== undefined) base[pin.type] += 1;
    });
    return base;
  }, [pins]);

  const filteredPins = useMemo(
    () => pins.filter((pin) => activeTypes.has(pin.type)),
    [pins, activeTypes],
  );

  const toggleType = (type) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next.size === 0 ? new Set([type]) : next;
    });
  };

  // Initialisation de la carte (une seule fois)
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return undefined;

    const map = L.map(mapContainerRef.current, {
      center: [4, 20],
      zoom: 3,
      minZoom: 2,
      maxZoom: 19,
      scrollWheelZoom: false,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const container = mapContainerRef.current;
    const enableScrollZoom = () => map.scrollWheelZoom.enable();
    const disableScrollZoom = () => map.scrollWheelZoom.disable();
    container.addEventListener("mouseenter", enableScrollZoom);
    container.addEventListener("mouseleave", disableScrollZoom);

    const clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `<div class="abi-cluster">${count}</div>`,
          className: "abi-cluster-wrapper",
          iconSize: [40, 40],
        });
      },
    });

    map.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;
    mapRef.current = map;

    map.on("popupopen", (event) => {
      const container = event.popup.getElement();
      const button = container?.querySelector(".abi-popup-link");
      if (button) {
        button.addEventListener("click", () => {
          const link = button.getAttribute("data-link");
          if (link) navigate(link);
        });
      }
    });

    return () => {
      container.removeEventListener("mouseenter", enableScrollZoom);
      container.removeEventListener("mouseleave", disableScrollZoom);
      map.remove();
      mapRef.current = null;
      clusterGroupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mise a jour des marqueurs quand les pins ou les filtres changent
  useEffect(() => {
    const map = mapRef.current;
    const clusterGroup = clusterGroupRef.current;
    if (!map || !clusterGroup) return;

    clusterGroup.clearLayers();
    markersRef.current = [];

    if (filteredPins.length === 0) return;

    const markers = filteredPins
      .filter(
        (pin) =>
          Number.isFinite(Number(pin.latitude)) &&
          Number.isFinite(Number(pin.longitude)),
      )
      .map((pin) => {
        const marker = L.marker([Number(pin.latitude), Number(pin.longitude)], {
          icon: buildDivIcon(pin.type),
        });
        marker.bindPopup(buildPopupContent(pin), { maxWidth: 260 });
        return marker;
      });

    markersRef.current = markers;
    clusterGroup.addLayers(markers);

    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((marker) => marker.getLatLng()));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 6 });
    }
  }, [filteredPins]);

  const handleRecenter = () => {
    const map = mapRef.current;
    if (!map || markersRef.current.length === 0) return;
    const bounds = L.latLngBounds(
      markersRef.current.map((marker) => marker.getLatLng()),
    );
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 6 });
  };

  const totalCount = pins.length;

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Explorez nos biens sur la carte
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Localisez chaque bien immobilier, projet de construction et
            opportunite d'investissement partout en Afrique. Zoomez jusqu'a
            l'adresse exacte pour explorer votre prochain investissement.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {Object.entries(TYPE_CONFIG).map(([type, config]) => {
            const isActive = activeTypes.has(type);
            const Icon = config.Icon;
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`inline-flex cursor-pointer items-center gap-2 border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
                style={isActive ? { backgroundColor: config.color } : undefined}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4" />
                {config.label}
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
                    isActive ? "bg-white/25" : "bg-slate-100"
                  }`}
                >
                  {counts[type] || 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative isolate z-0 overflow-hidden bg-white shadow-sm ring-1 ring-slate-200/80">
          <div
            ref={mapContainerRef}
            className="h-[380px] w-full sm:h-[480px] lg:h-[600px]"
            role="application"
            aria-label="Carte interactive des biens ABI"
          />

          {!loading && !error && totalCount > 0 && (
            <button
              type="button"
              onClick={handleRecenter}
              title="Recentrer la carte"
              aria-label="Recentrer la carte sur l'ensemble des biens"
              className="absolute bottom-4 left-4 z-[500] inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <Locate className="h-4 w-4" />
            </button>
          )}

          {loading && (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/80">
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                <p className="text-sm">Chargement de la carte...</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/95 px-6 text-center">
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <MapPin className="h-8 w-8 text-slate-300" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && totalCount === 0 && (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/95 px-6 text-center">
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <MapPin className="h-8 w-8 text-slate-300" />
                <p className="text-sm">
                  Aucun bien geolocalise n'est disponible pour le moment.
                </p>
              </div>
            </div>
          )}

          {!loading && !error && totalCount > 0 && filteredPins.length === 0 && (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/95 px-6 text-center">
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <MapPin className="h-8 w-8 text-slate-300" />
                <p className="text-sm">
                  Aucun bien de ce type n'est actuellement geolocalise.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
          {Object.entries(TYPE_CONFIG).map(([type, config]) => (
            <span key={type} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5"
                style={{ backgroundColor: config.color, borderRadius: config.shape }}
              />
              {config.label}
            </span>
          ))}
          <span>
            {totalCount} bien{totalCount > 1 ? "s" : ""} geolocalise
            {totalCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <style>{`
        .abi-map-marker { background: transparent; border: none; }
        .abi-pin {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.35);
          border: 2px solid #ffffff;
          transform: rotate(45deg);
        }
        .abi-pin svg {
          width: 16px;
          height: 16px;
          transform: rotate(-45deg);
        }
        .abi-cluster-wrapper { background: transparent; border: none; }
        .abi-cluster {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background: #1e293b;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.35);
        }
        .abi-popup { width: 220px; font-family: inherit; }
        .leaflet-popup-content-wrapper { padding: 0; overflow: hidden; border-radius: 0; }
        .leaflet-popup-content { margin: 0; width: 220px !important; }
        .abi-popup-image {
          height: 120px;
          width: 100%;
          background-size: cover;
          background-position: center;
          background-color: #e2e8f0;
        }
        .abi-popup-body { padding: 12px; }
        .abi-popup-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          margin-bottom: 6px;
        }
        .abi-popup-title {
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 2px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .abi-popup-location {
          font-size: 12px;
          color: #64748b;
          margin: 0 0 6px 0;
        }
        .abi-popup-price {
          font-size: 13px;
          font-weight: 700;
          color: #1d4ed8;
          margin: 0 0 8px 0;
        }
        .abi-popup-link {
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          padding: 7px 0;
          border: none;
          cursor: pointer;
          transition: background-color 150ms;
        }
        .abi-popup-link:hover { background: #1e293b; }
      `}</style>
    </section>
  );
};

export default PropertiesMapSection;
