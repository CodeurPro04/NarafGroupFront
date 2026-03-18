import { useState } from "react";
import { CheckCircle2, Copy, X } from "lucide-react";

const AccountCredentialsModal = ({
  account,
  title = "Votre compte visiteur est pret.",
  description = "Conservez ce mot de passe temporaire pour votre premiere connexion.",
  activationMessage = "",
  onClose,
  onLogin,
}) => {
  const [copied, setCopied] = useState(false);

  if (!account?.defaultPassword) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.defaultPassword);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 px-4 py-8">
      <div className="w-full max-w-xl border border-[#d8dfeb] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.22)] sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#e4e8ef] pb-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-[#e9f2ff] text-[#0f62c9]">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f62c9]">
                Compte cree
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-[#d8dfeb] bg-white text-slate-500 transition hover:text-slate-950"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="border border-[#d8dfeb] bg-[#f8fbff] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Email de connexion
            </p>
            <p className="mt-2 text-base font-semibold text-slate-950">
              {account.email}
            </p>
          </div>

          <div className="border border-[#d8dfeb] bg-[#f8fbff] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Mot de passe temporaire
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <code className="break-all bg-white px-3 py-3 text-base font-semibold text-slate-950">
                {account.defaultPassword}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 border border-[#d8dfeb] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0f62c9] hover:text-[#0f62c9]"
              >
                <Copy size={16} />
                {copied ? "Copie effectuee" : "Copier le mot de passe"}
              </button>
            </div>
          </div>

          {activationMessage ? (
            <div className="border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-800">
              {activationMessage}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="border border-[#d8dfeb] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="bg-[#0f62c9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4fa5]"
          >
            Aller a la connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCredentialsModal;
