import {Link} from "react-router-dom";
import {useState} from "react";
import MainNavbar from "../../../components/MainNavbar";
import CartItem from "../../../components/CartItem";
import CartSummary from "../../../components/CartSummary";
import {useCart} from "../../../context/CartContext";

function CartPage() {
  const [coupon, setCoupon] = useState("");

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
  } = useCart();

  const applyCoupon = () => {
    console.log("Cupón aplicado:", coupon);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath="/home" />

      <main className="relative px-4 py-8 md:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6">
            <Link
              to="/productos"
              className="text-xs text-zinc-400 transition hover:text-sky-400"
            >
              ← Seguir comprando
            </Link>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
                🛒
              </div>

              <div>
                <h1 className="text-2xl font-light text-white">Mi Carrito</h1>
                <p className="text-sm text-zinc-500">
                  {cartItems.length} productos en tu carrito
                </p>
              </div>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <section className="rounded-2xl border border-white/10 bg-zinc-900/95 p-8 text-center shadow-xl shadow-black/20">
              <p className="text-lg text-white">Tu carrito está vacío</p>
              <p className="mt-2 text-sm text-zinc-500">
                Agrega productos para comenzar tu compra.
              </p>

              <Link
                to="/productos"
                className="mt-6 inline-block rounded-xl bg-sky-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-400"
              >
                Ver productos
              </Link>
            </section>
          ) : (
            <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
              <div>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrease={increaseQuantity}
                      onDecrease={decreaseQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/95 p-4 shadow-xl shadow-black/20">
                  <p className="mb-3 text-sm text-zinc-300">
                    💡 ¿Tienes un cupón de descuento?
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      placeholder="Código de cupón"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                    />

                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
                    >
                      Aplicar
                    </button>
                  </div>
                </section>
              </div>

              <CartSummary subtotal={subtotal} shipping={0} />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default CartPage;
