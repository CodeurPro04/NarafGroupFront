const EmptyState = ({
  title,
  description,
  action = null,
  className = "",
}) => {
  return (
    <div
      className={`border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center ${className}`.trim()}
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
