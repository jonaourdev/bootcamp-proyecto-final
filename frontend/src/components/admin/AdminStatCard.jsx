function AdminStatCard({title, value, hint, accent = "sky"}) {
  const accentMap = {
    sky: "text-sky-400 border-sky-400/10",
    yellow: "text-yellow-400 border-yellow-400/10",
    emerald: "text-emerald-400 border-emerald-400/10",
    white: "text-white border-white/10",
  };

  return (
    <article
      className={`rounded-2xl border bg-zinc-900/95 p-5 shadow-xl shadow-black/20 ${accentMap[accent]}`}
    >
      <p className="text-sm text-zinc-500">{title}</p>
      <p
        className={`mt-3 text-3xl font-light ${accentMap[accent].split(" ")[0]}`}
      >
        {value}
      </p>
      {hint && <p className="mt-2 text-xs text-zinc-500">{hint}</p>}
    </article>
  );
}

export default AdminStatCard;
