const Maintenance = ({ launchDate = "27 Mars 2026" }) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-16 top-[-4rem] h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-[-5rem] h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-14">
        <div className="w-full rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Lancement en cours
          </p>

          <h1 className="text-3xl font-black leading-tight md:text-5xl">
            Notre site revient tres bientot.
          </h1>

          <p className="mt-5 max-w-2xl text-sm text-slate-200 md:text-base">
            Nous preparons le lancement de notre plateforme commerciale pour vous proposer une meilleure experience.
          </p>

          <div className="mt-8 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-emerald-200">
              Date prevue
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-100 md:text-3xl">
              Le site commercial sera lance le {launchDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maintenance;
