import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  X,
  Send,
  ChevronDown,
  Bot,
  Loader2,
  Hammer,
  Building2,
  TrendingUp,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import { AI_AGENTS, sendChatMessage } from "../../services/aiChatService";

/* ─── Couleurs par agent ─────────────────────────────────── */
const COLORS = {
  amber: {
    brand: "#f59e0b",
    bg: "bg-amber-500",
    bgSoft: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    ring: "ring-amber-300",
    header:
      "bg-gradient-to-r from-slate-900 via-slate-900 to-amber-700",
  },
  blue: {
    brand: "#0d63c9",
    bg: "bg-blue-600",
    bgSoft: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    ring: "ring-blue-300",
    header:
      "bg-gradient-to-r from-slate-900 via-slate-900 to-blue-700",
  },
  emerald: {
    brand: "#10b981",
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    ring: "ring-emerald-300",
    header:
      "bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-700",
  },
};

const getSpecialtyIcon = (a) => {
  if (a.id === "akapko" || a.specialty?.toLowerCase().includes("construction")) return Hammer;
  if (a.id === "djuedjue" || a.specialty?.toLowerCase().includes("immobilier")) return Building2;
  return TrendingUp;
};

/* ─── Avatar de l'agent ──────────────────────────────────── */
const AgentAvatar = ({ agent, size = "sm" }) => {
  const c = COLORS[agent.color];
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const Icon = getSpecialtyIcon(agent);
  return (
    <div
      className={`${dim} relative flex-shrink-0 rounded-2xl border border-white/30 shadow-[0_10px_24px_rgba(2,6,23,0.18)]`}
      style={{
        background: `radial-gradient(120% 120% at 20% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.20) 100%), linear-gradient(135deg, ${c.brand} 0%, #0b1220 80%)`,
      }}
    >
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <Bot size={size === "sm" ? 18 : 22} />
      </div>
      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white shadow border border-slate-200 flex items-center justify-center">
        <Icon size={12} className="text-slate-800" />
      </div>
    </div>
  );
};

/* ─── Bulle de message ───────────────────────────────────── */
const MessageBubble = ({ msg, agent }) => {
  const isUser = msg.role === "user";
  const c = COLORS[agent.color];

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && <AgentAvatar agent={agent} size="sm" />}
      <div
        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
          ${
            isUser
              ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-br-sm border border-white/5"
              : `bg-white/80 ${c.text} rounded-bl-sm border ${c.border} backdrop-blur`
          }`}
      >
        {msg.content}
        <span className="block text-[10px] mt-1 opacity-50">
          {new Date(msg.timestamp).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

/* ─── Widget principal ───────────────────────────────────── */
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(1); // Djuêdjuê par défaut
  const [conversations, setConversations] = useState(
    AI_AGENTS.reduce((acc, agent) => ({
      ...acc,
      [agent.id]: {
        messages: [{ role: "assistant", content: agent.welcomeMessage, timestamp: Date.now() }],
        conversationId: null,
      },
    }), {})
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const agent = AI_AGENTS[activeAgentIndex];
  const conv = conversations[agent.id];
  const c = COLORS[agent.color];

  /* scroll vers le bas à chaque nouveau message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conv.messages, isOpen]);

  /* focus sur l'input quand on ouvre */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen, activeAgentIndex]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text, timestamp: Date.now() };

    setConversations((prev) => ({
      ...prev,
      [agent.id]: {
        ...prev[agent.id],
        messages: [...prev[agent.id].messages, userMsg],
      },
    }));
    setInput("");
    setLoading(true);

    try {
      const { reply, conversationId } = await sendChatMessage(
        agent.id,
        text,
        conv.conversationId
      );
      const aiMsg = { role: "assistant", content: reply, timestamp: Date.now() };

      setConversations((prev) => ({
        ...prev,
        [agent.id]: {
          messages: [...prev[agent.id].messages, aiMsg],
          conversationId,
        },
      }));
    } catch {
      const errMsg = {
        role: "assistant",
        content: "Une erreur est survenue. Veuillez réessayer.",
        timestamp: Date.now(),
      };
      setConversations((prev) => ({
        ...prev,
        [agent.id]: {
          ...prev[agent.id],
          messages: [...prev[agent.id].messages, errMsg],
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">

      {/* ── Panneau de chat ─────────────────────────────── */}
      {isOpen && (
        <div
          className="w-[360px] sm:w-[400px] bg-white/85 backdrop-blur rounded-3xl shadow-[0_28px_80px_rgba(2,6,23,0.35)] border border-white/40 flex flex-col overflow-hidden"
          style={{ height: 560 }}
        >
          {/* Cadre futuriste */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-slate-900/5" />

          {/* Header */}
          <div className={`${c.header} px-4 py-3.5 flex items-center justify-between flex-shrink-0 relative overflow-hidden`}>
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.35) 0%, transparent 55%), radial-gradient(circle at 90% 30%, rgba(255,255,255,0.25) 0%, transparent 45%)",
            }} />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-[linear-gradient(90deg,#0d63c9_0%,#10b981_50%,#f59e0b_100%)] opacity-90" />
            <div className="flex items-center gap-3">
              <AgentAvatar agent={agent} size="md" />
              <div>
                <p className="text-white font-extrabold text-[13px] leading-none tracking-wide">
                  {agent.name}
                </p>
                <p className="text-white/70 text-[11px] mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <Sparkles size={12} /> IA ABI
                  </span>
                  <span className="opacity-70">•</span>
                  <span className="font-medium">{agent.specialty}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-white/80 hover:text-white transition-colors rounded-full p-1.5 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Onglets agents */}
          <div className="flex border-b border-slate-100 flex-shrink-0 bg-white/80 backdrop-blur px-2 py-2 gap-2">
            {AI_AGENTS.map((a, i) => {
              const ac = COLORS[a.color];
              const Icon = getSpecialtyIcon(a);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActiveAgentIndex(i)}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold transition-all
                    ${
                      i === activeAgentIndex
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                    }`}
                >
                  <Icon size={14} className="shrink-0" />
                  {a.name.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[radial-gradient(circle_at_20%_0%,rgba(13,99,201,0.08)_0%,transparent_40%),radial-gradient(circle_at_90%_10%,rgba(16,185,129,0.08)_0%,transparent_40%),linear-gradient(180deg,rgba(248,250,252,0.9)_0%,rgba(241,245,249,0.9)_100%)]"
          >
            {conv.messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} agent={agent} />
            ))}

            {/* Indicateur "en train d'écrire" */}
            {loading && (
              <div className="flex gap-2">
                <AgentAvatar agent={agent} size="sm" />
                <div className={`px-4 py-3 rounded-2xl rounded-bl-sm bg-white/80 ${c.border} border backdrop-blur`}>
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full ${c.bg} opacity-60 animate-bounce`}
                        style={{ animationDelay: `${dot * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-slate-100 flex gap-2 items-end bg-white/90 backdrop-blur flex-shrink-0">
            <div className="flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-300 transition">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Posez votre question à ${agent.name.split(" ")[0]}…`}
                rows={1}
                className="w-full resize-none bg-transparent px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none max-h-24"
                style={{ lineHeight: "1.5" }}
              />
            </div>
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-2xl transition-all shadow-sm
                ${
                  input.trim() && !loading
                    ? `${c.bg} text-white hover:opacity-90 hover:shadow-md`
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* ── Bouton flottant ──────────────────────────────── */}
      <button
        type="button"
        onClick={() => { setIsOpen((v) => !v); }}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_16px_40px_rgba(2,6,23,0.35)] transition-all duration-300
          ${isOpen ? "bg-slate-900 hover:bg-slate-800" : "bg-blue-600 hover:bg-blue-700"}
          text-white overflow-hidden`}
        aria-label="Assistant IA ABI"
      >
        <span className="absolute inset-0 opacity-30" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.25) 0%, transparent 45%)",
        }} />
        {isOpen ? <X size={22} /> : <Bot size={22} />}

        {/* Pulse animation quand fermé */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />
        )}
      </button>

    </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#0d63c9] text-white shadow-[0_16px_40px_rgba(2,6,23,0.35)] hover:bg-[#0a56ad] transition-all duration-300 ease-out flex items-center justify-center
          ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
        aria-label="Revenir en haut"
        title="Revenir en haut"
      >
        <ArrowUp size={22} />
      </button>
    </>
  );
};

export default AIChatWidget;
