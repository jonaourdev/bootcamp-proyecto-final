import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import {useCart} from "../../../context/CartContext";
import MainNavbar from "../../../components/MainNavbar";
import {getProductById} from "../../../services/productsService";

function ProductDetailPage() {
  const {id} = useParams();
  const {isAuthenticated} = useAuth();
  const {addToCart} = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("ERROR PRODUCT DETAIL:", err);
        setError("No fue posible cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      {
        id: product.id_producto,
        nombre: product.nombre,
        detalle: product.descripcion,
        precio: Number(product.precio),
        imagen: product.imagen_url,
      },
      quantity,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <MainNavbar homePath={isAuthenticated ? "/home" : "/"} />
        <main className="px-4 py-8 md:px-8">
          <p className="text-zinc-400">Cargando producto...</p>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <MainNavbar homePath={isAuthenticated ? "/home" : "/"} />
        <main className="px-4 py-8 md:px-8">
          <p className="text-red-400">{error || "Producto no encontrado"}</p>
        </main>
      </div>
    );
  }

  const total = (Number(product.precio) * quantity).toFixed(0);

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath={isAuthenticated ? "/home" : "/"} />

      <main className="relative px-4 py-8 md:px-8">
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6">
            <Link
              to="/productos"
              className="text-xs text-zinc-400 transition hover:text-sky-400"
            >
              ← Volver a productos
            </Link>
          </div>

          <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-200">
                {product.imagen_url ? (
                  <img
                    src={product.imagen_url}
                    alt={product.nombre}
                    className="h-[380px] w-full object-cover md:h-[460px]"
                  />
                ) : (
                  <div className="flex h-[380px] items-center justify-center md:h-[460px]">
                    <span className="text-6xl">🖼️</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
                {product.categoria_nombre}
              </span>

              <h1 className="mt-3 text-3xl font-light text-white md:text-4xl">
                {product.nombre}
              </h1>

              <div className="mt-4">
                <span className="text-4xl font-light text-sky-400">
                  ${Number(product.precio).toFixed(0)}
                </span>
              </div>

              <p className="mt-4 text-sm text-emerald-400">
                Stock disponible: {product.stock}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                {product.descripcion}
              </p>

              <div className="mt-6">
                <p className="mb-2 text-sm text-zinc-300">Cantidad:</p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="px-4 py-3 text-sm text-white transition hover:bg-zinc-800"
                    >
                      -
                    </button>

                    <span className="min-w-[48px] text-center text-sm text-white">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="px-4 py-3 text-sm text-white transition hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
                    Total: ${total}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="rounded-xl bg-yellow-500 px-6 py-4 text-sm font-semibold text-black transition hover:bg-yellow-400"
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;
