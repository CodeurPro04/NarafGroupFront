const AbiPlaceholderPage = ({ title }) => {
  return (
    <section className="bg-white pb-20 pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            ABI
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Cette page est en construction et sera disponible bientôt.
          </p>
        </div>
      </div>
    </section>);

};

export default AbiPlaceholderPage;