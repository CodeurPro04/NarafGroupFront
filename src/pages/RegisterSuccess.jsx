import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Clock3, LogIn, ShieldAlert } from "lucide-react";

const roleLabel = (role) => {
  if (role === "agent") return "agent";
  if (role === "proprietaire") return "proprietaire";
  if (role === "entreprise") return "entreprise";
  return "utilisateur";
};

const RegisterSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full bg-white shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-slate-900 text-white px-8 py-10">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200 font-semibold">
                Inscription envoyee
              </p>
              <h1 className="text-3xl font-bold mt-2">Compte en attente d activation</h1>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-6">
          <p className="text-base text-gray-700 leading-7">
            Votre compte {roleLabel(role)} a bien ete cree. Il est actuellement
            inactif et en attente d activation par un administrateur.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-amber-200 bg-amber-50 px-5 py-5">
              <div className="flex items-center gap-3 mb-3">
                <Clock3 className="h-5 w-5 text-amber-700" />
                <p className="font-semibold text-amber-900">Activation en attente</p>
              </div>
              <p className="text-sm text-amber-800 leading-6">
                Un administrateur doit d abord valider votre compte avant son activation complete.
              </p>
            </div>

            <div className="border border-blue-200 bg-blue-50 px-5 py-5">
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="h-5 w-5 text-blue-700" />
                <p className="font-semibold text-blue-900">Acces agent controle</p>
              </div>
              <p className="text-sm text-blue-800 leading-6">
                Le bouton <span className="font-semibold">Espace administrateur</span> n apparaitra
                pour un agent qu apres activation effective du compte.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 bg-gray-50 px-5 py-5">
            <p className="text-sm text-gray-700 leading-6">
              Vous pouvez continuer a utiliser le site public. Une fois votre compte active,
              les acces associes a votre profil seront disponibles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              <LogIn className="h-4 w-4" />
              Se connecter
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Retour a l accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
