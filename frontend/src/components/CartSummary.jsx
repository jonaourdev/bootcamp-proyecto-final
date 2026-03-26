function CartSummary({subtotal, shipping = 0}) {
  const total = subtotal + shipping;

  return (
    <aside className="h-fit rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
      <h2 className="text-base font-medium text-white">Resumen del Pedido</h2>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between text-zinc-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-zinc-400">
          <span>Envío</span>
          <span className="text-emerald-400">
            {shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex items-center justify-between">
          <span className="text-white">Total</span>
          <span className="text-2xl font-light text-sky-400">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <button
          type="button"
          className="w-full rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
        >
          Proceder al Pago
        </button>

        <button
          type="button"
          className="w-full rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition hover:border-sky-400/40 hover:text-sky-400"
        >
          Guardar para después
        </button>
      </div>

      <div className="mt-5 space-y-2 text-xs text-zinc-500">
        <p>◇ Compra 100% segura</p>
        <p>◇ Devoluciones gratis</p>
        <p>◇ Entrega express disponible</p>
      </div>
    </aside>
  );
}

export default CartSummary;
