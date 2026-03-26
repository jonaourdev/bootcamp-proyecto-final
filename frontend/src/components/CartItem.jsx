function CartItem({item, onIncrease, onDecrease, onRemove}) {
  const itemTotal = (item.precio * item.cantidad).toFixed(2);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900/95 p-4 shadow-xl shadow-black/20 sm:flex-row">
      <div className="h-24 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-200 sm:w-28">
        <img
          src={item.imagen}
          alt={item.nombre}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-sm font-medium text-white">{item.nombre}</h2>

          <p className="mt-1 text-xs text-zinc-500">{item.detalle}</p>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDecrease(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/40 text-sm text-white transition hover:border-sky-400/40"
            >
              -
            </button>

            <span className="min-w-[20px] text-center text-sm text-white">
              {item.cantidad}
            </span>

            <button
              type="button"
              onClick={() => onIncrease(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/40 text-sm text-white transition hover:border-sky-400/40"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 sm:items-end">
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-xs text-zinc-500 transition hover:text-red-400"
          >
            🗑
          </button>

          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-sky-400">${itemTotal}</p>
            <p className="text-[11px] text-zinc-500">
              ${item.precio.toFixed(2)} c/u
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
