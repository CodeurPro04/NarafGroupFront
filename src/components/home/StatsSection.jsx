import {
  Users,
  Building2,
  Globe,
  Award,
  Handshake,
  TrendingUp,
  Star,
  Briefcase,
} from "lucide-react";

const stats = [
  { icon: <Users size={28} />, number: "1 000+", label: "Clients satisfaits" },
  { icon: <TrendingUp size={28} />, number: "500M+", label: "FCFA investis" },
  { icon: <Users size={28} />, number: "+20", label: "Experts dédiés" },
  { icon: <Building2 size={28} />, number: "+150", label: "Articles de presse" },
  { icon: <Award size={28} />, number: "+15", label: "Récompenses" },
  { icon: <Handshake size={28} />, number: "+60", label: "Agences partenaires" },
  { icon: <Globe size={28} />, number: "+20", label: "Pays en Afrique" },
  { icon: <Briefcase size={28} />, number: "+300", label: "Projets accompagnés" },
];

const StatsSection = () => (
  <section className="py-16 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 uppercase tracking-wide">
          ABI EN CHIFFRES
        </h2>
        <div className="mt-2 h-1 w-12 bg-blue-600" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white flex flex-col items-center justify-center gap-3 py-10 px-4 text-center group hover:bg-blue-600 transition-colors duration-300"
          >
            <span className="text-blue-600 group-hover:text-white transition-colors">
              {stat.icon}
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-white transition-colors leading-none">
              {stat.number}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 group-hover:text-blue-100 transition-colors font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
