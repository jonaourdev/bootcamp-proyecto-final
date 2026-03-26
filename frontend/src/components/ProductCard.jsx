import {Link} from "react-router-dom";

function ProductCard({product, isAuthenticated}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-xl shadow-black/20">
      <div className="relative flex h-44 items-center justify-center bg-zinc-200 text-zinc-500">
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium ${
              product.badge === "Agotado"
                ? "bg-red-500 text-white"
                : "bg-yellow-400 text-black"
            }`}
          >
            {product.badge}
          </span>
        )}

        <span className="text-5xl">🖼️</span>
      </div>

      <div className="p-4">
        <p className="text-[11px] text-zinc-500">{product.categoria}</p>

        <h2 className="mt-1 min-h-[48px] text-sm font-medium text-white">
          {product.nombre}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
          <span className="text-yellow-400">★★★★★</span>
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-lg font-light text-sky-400">
            ${product.precio.toFixed(2)}
          </p>

          <Link
            to={`/productos/${product.id}`}
            className="text-xs text-sky-400 transition hover:text-sky-300"
          >
            Ver detalles →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
