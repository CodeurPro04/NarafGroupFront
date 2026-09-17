import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, Wallet, Clock, CheckCircle, XCircle,
  ArrowRight, Building2, Percent, Calendar, AlertCircle, ChevronRight, HelpCircle, LineChart,
} from "lucide-react";
import api from "../../api/axios";
import { SkeletonBlock } from "../ui/Skeleton";
import { toMediaUrl } from "../../utils/media";

/* ─── Badge statut ───────────────────────────────────── */
const STATUS = {
  pending:  { label: "En attente",    icon: Clock,        cls: "bg-blue-50 text-blue-700 border-blue-200" },
  approved: { label: "Approuvé",      icon: CheckCircle,  cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejeté",        icon: XCircle,      cls: "bg-red-50 text-red-700 border-red-200" },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS[status] || STATUS.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.cls}`}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

/* ─── Carte stat ─────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, sub, color = "blue" }) => {
  const colorMap = {
    blue:    "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    slate:   "bg-slate-100 text-slate-600",
  };
  return (
    <div className="bg-white border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
};

/* ─── Dashboard investisseur ─────────────────────────── */
const InvestorDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [view, setView] = useState("investments"); // investments | performance
  const [perfTab, setPerfTab] = useState("projets");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const parseList = (res) => {
          const data = res?.data?.data ?? res?.data ?? {};
          const list = Array.isArray(data) ? data : data?.data ?? [];
          return Array.isArray(list) ? list : [];
        };

        // 1) Propositions d'investissement structurees (flux "proposer un investissement")
        let structuredProposals = [];
        try {
          const res = await api.get("/investments/my-proposals");
          structuredProposals = parseList(res);
        } catch (err) {
          if (err?.response?.status !== 404) {
            try {
              const res = await api.get("/investisseur/investments/my-proposals");
              structuredProposals = parseList(res);
            } catch (fallbackErr) {
              // Visiteur sans role investisseur : etat vide, pas d'erreur UI.
              if (fallbackErr?.response?.status !== 403) throw fallbackErr;
            }
          }
        }

        // 2) Demandes envoyees via le formulaire "Je souhaite etre recontacte" sur la fiche
        // projet (POST /client-requests) — c'est le point d'entree reellement utilise par
        // les investisseurs sur le site public, donc on les affiche aussi ici.
        let clientRequestProposals = [];
        try {
          const res = await api.get("/client-requests/mine", {
            params: { request_type: "investissement" },
          });
          const extractAmount = (message) => {
            const match = /Montant souhaite\s*:\s*([\d\s]+)/i.exec(message || "");
            return match ? Number(match[1].replace(/\s/g, "")) : 0;
          };
          const mapClientStatus = (status) => {
            if (["approved", "agent_approved", "deal_concluded"].includes(status)) return "approved";
            if (["rejected", "agent_rejected"].includes(status)) return "rejected";
            return "pending";
          };
          clientRequestProposals = parseList(res).map((item) => ({
            uuid: item.uuid,
            amount: Number(item.deal_sale_price) || extractAmount(item.message),
            status: mapClientStatus(item.status),
            investment_project: item.investment_project || item.investmentProject || null,
          }));
        } catch (err) {
          if (err?.response?.status !== 404) {
            console.error("Erreur chargement demandes investissement:", err);
          }
        }

        setProposals([...structuredProposals, ...clientRequestProposals]);
      } catch (err) {
        setError("Impossible de charger vos investissements.");
        setProposals([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ── Calcul des stats ── */
  const totalInvested = proposals.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const projectCount = new Set(
    proposals
      .map((p) => p?.investment_project?.uuid || p?.investment_project_id || null)
      .filter(Boolean)
  ).size;
  const approved  = proposals.filter(p => p.status === "approved").length;
  const pending   = proposals.filter(p => p.status === "pending").length;
  const rejected  = proposals.filter(p => p.status === "rejected").length;
  const totalPaid = 0; // TODO: à brancher quand le back expose les revenus reversés
  const annualPerf = 0; // TODO: à brancher quand le back expose la performance

  const formatAmount = (n) =>
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);

  const getProjectImage = (proposal) => {
    const imgs = proposal.investment_project?.images_path ?? [];
    return imgs.length ? toMediaUrl(imgs[0]) : null;
  };

  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0,1,2].map(i => <SkeletonBlock key={i} className="h-36" />)}
      </div>
      <div className="space-y-4">
        <SkeletonBlock className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SkeletonBlock className="h-80 lg:col-span-1" />
          <SkeletonBlock className="h-80 lg:col-span-2" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">

      {/* ── En-tête ── */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setView((prev) => (prev === "investments" ? "performance" : "investments"))}
            className="inline-flex items-center gap-2 text-3xl sm:text-4xl font-bold text-slate-900 hover:text-blue-700 transition-colors"
            title={view === "investments" ? "Voir la performance globale" : "Retour à mes investissements"}
          >
            Mes investissements <ChevronRight className="text-gray-400" size={26} />
          </button>
          {view === "performance" && (
            <span className="text-3xl sm:text-4xl font-bold text-slate-500 select-none">Ma performance globale</span>
          )}
        </div>
        {view === "performance" && null}
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {view === "investments" && (
      <>
      {/* ── Cartes (style site) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Patrimoine */}
        <div className="bg-white border border-gray-200 shadow-sm p-6">
          <p className="text-xl font-semibold text-gray-900">Patrimoine</p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
                <Wallet size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-4xl font-semibold text-gray-900">{formatAmount(totalInvested)}</p>
                <p className="text-sm text-gray-500 mt-1">Total investi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
                <Building2 size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-4xl font-semibold text-gray-900">{projectCount}</p>
                <p className="text-sm text-gray-500 mt-1">Propriétés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenus locatifs */}
        <div className="bg-white border border-gray-200 shadow-sm p-6">
          <p className="text-xl font-semibold text-gray-900">Revenus locatifs</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
              <Wallet size={20} className="text-blue-700" />
            </div>
            <div>
              <p className="text-4xl font-semibold text-gray-900">{formatAmount(totalPaid)}</p>
              <p className="text-sm text-gray-500 mt-1">Total reversé</p>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold text-gray-900">Performance</p>
            <HelpCircle size={18} className="text-slate-700" />
          </div>
          <div className="mt-6 flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
              <LineChart size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-4xl font-semibold text-gray-400">{annualPerf.toFixed(2)}%</p>
              <p className="text-sm text-gray-500 mt-1">Annualisée</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setView("performance")}
              className="text-slate-900 text-sm font-medium inline-flex items-center gap-2 hover:text-blue-700 transition-colors"
            >
              Voir plus <ChevronRight size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mes investissements (liste/table) ── */}
      <div className="bg-white border border-gray-200 shadow-sm p-6">
        <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">Mes investissements</h4>
        <p className="text-sm text-gray-600 mt-2">Détail disponible en cliquant sur chaque ligne.</p>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="hidden md:grid md:grid-cols-5 gap-4 text-sm font-semibold text-gray-700">
            <div>Propriété</div>
            <div>Investissement</div>
            <div>Revenus reversés</div>
            <div>Performance annualisée</div>
            <div className="text-right">Statut</div>
          </div>

          {proposals.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <TrendingUp size={44} className="mx-auto text-blue-200 mb-4" />
              Aucun investissement pour le moment.
              <div className="mt-5">
                <Link
                  to="/investment"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Voir les opportunités <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {proposals.map((proposal) => {
                const project = proposal.investment_project;
                const img = getProjectImage(proposal);
                return (
                  <Link
                    key={proposal.uuid}
                    to={project?.uuid ? `/investment/${project.uuid}` : "/investment"}
                    className="block border border-gray-200 hover:border-gray-300 transition bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 bg-gray-100 overflow-hidden flex-shrink-0">
                          {img ? (
                            <img src={img} alt={project?.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building2 size={18} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {project?.title || "Projet d'investissement"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {project?.city || "—"}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 font-semibold">
                        {formatAmount(Number(proposal.amount || 0))}
                      </div>
                      <div className="text-sm text-gray-600">0</div>
                      <div className="text-sm text-gray-600">0%</div>
                      <div className="md:text-right">
                        <StatusBadge status={proposal.status} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── CTA si peu d'investissements ── */}
      {proposals.length > 0 && proposals.length < 3 && (
        <div className="bg-blue-50 border border-blue-200 p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold text-blue-900 text-sm">Diversifiez votre portefeuille</p>
            <p className="text-xs text-blue-700 mt-0.5">Explorez de nouvelles opportunités d&apos;investissement en Afrique.</p>
          </div>
          <Link to="/investment"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors">
            Voir les opportunités <ArrowRight size={14} />
          </Link>
        </div>
      )}
      </>
      )}

      {/* ── Ma performance globale (au clic) ── */}
      {view === "performance" && (
        <div className="bg-sky-50/40 border border-sky-100 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Investissements réalisés */}
            <div className="bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-lg font-semibold text-gray-900">Investissements réalisés</p>
                <div className="inline-flex border border-gray-200 bg-gray-50 p-1">
                  <button
                    type="button"
                    onClick={() => setPerfTab("projets")}
                    className={`px-3 py-1.5 text-sm font-medium ${perfTab === "projets" ? "bg-blue-600 text-white" : "text-slate-900 hover:bg-white"}`}
                  >
                    Projets
                  </button>
                  <button
                    type="button"
                    onClick={() => setPerfTab("categories")}
                    className={`px-3 py-1.5 text-sm font-medium ${perfTab === "categories" ? "bg-blue-600 text-white" : "text-slate-900 hover:bg-white"}`}
                  >
                    Catégories
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="w-44 h-44 rounded-full border-[22px] border-gray-200 mx-auto" />
                <p className="text-gray-500 text-sm leading-relaxed">
                  Vous retrouverez la répartition de votre capital ici.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                    <Wallet size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-gray-900">{formatAmount(totalInvested)}</p>
                    <p className="text-sm text-gray-500 mt-1">Total investi</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                    <Building2 size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-gray-900">{projectCount}</p>
                    <p className="text-sm text-gray-500 mt-1">Propriétés</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-900">Performance</p>
                  <HelpCircle size={18} className="text-slate-700" />
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                    <LineChart size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-gray-400">{annualPerf.toFixed(0)}%</p>
                    <p className="text-sm text-gray-500 mt-1">Annualisée</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenus locatifs reversés */}
            <div className="bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <p className="text-lg font-semibold text-gray-900">Revenus locatifs reversés</p>
                <div className="inline-flex border border-gray-200 bg-gray-50 p-1">
                  <button type="button" className="px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-white">12 mois</button>
                  <button type="button" className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white">Total</button>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                  <Wallet size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-4xl font-semibold text-gray-400">{formatAmount(totalPaid)}</p>
                  <p className="text-sm text-gray-500 mt-1">Total reversé, avant impôt</p>
                </div>
              </div>

              <div className="mt-10 h-56 border border-gray-100 bg-white relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-12">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={`grid-col-${i}`} className="border-l border-gray-100" />
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`grid-row-${i}`} className="border-t border-gray-100" />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">
                    Vous retrouverez vos revenus locatifs reversés par mois ici.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InvestorDashboard;
