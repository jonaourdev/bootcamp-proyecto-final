import {Link, useParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import {useCart} from "../../../context/CartContext";
import MainNavbar from "../../../components/MainNavbar";

const productsData = [
  {
    id: 1,
    nombre: "Hielo en Cubos Premium",
    categoria: "Hielo",
    precio: 40.5,
    precioAnterior: 45.0,
    rating: 4.8,
    reviews: 128,
    badge: "-10%",
    unidad: "Precio por 2kg",
    stock: "En Stock - Disponible",
    descripcion:
      "Hielo en cubos de fabricación industrial, elaborado con agua purificada. Ideal para bebidas, cócteles y eventos. Mantiene la temperatura de tus bebidas sin alterar su sabor.",
    ingredientes: ["Agua purificada"],
    nutricional: {
      calorias: "0 kcal",
      proteinas: "0 g",
      carbohidratos: "0 g",
      grasas: "0 g",
    },
    almacenamiento: "Mantener congelado a -18°C o menos.",
  },
  {
    id: 2,
    nombre: "Vegetales Mixtos Congelados",
    categoria: "Vegetales",
    precio: 95.0,
    precioAnterior: null,
    rating: 4.7,
    reviews: 210,
    badge: null,
    unidad: "Bolsa de 1kg",
    stock: "En Stock - Disponible",
    descripcion:
      "Mezcla de vegetales seleccionados y congelados en su punto óptimo para conservar su sabor, textura y valor nutricional.",
    ingredientes: ["Zanahoria", "Arvejas", "Choclo", "Brócoli"],
    nutricional: {
      calorias: "65 kcal",
      proteinas: "2 g",
      carbohidratos: "12 g",
      grasas: "0 g",
    },
    almacenamiento: "Mantener congelado a -18°C o menos.",
  },
  {
    id: 3,
    nombre: "Camarones Congelados Premium",
    categoria: "Mariscos",
    precio: 187.0,
    precioAnterior: null,
    rating: 4.9,
    reviews: 89,
    badge: "-12%",
    unidad: "Bolsa de 1kg",
    stock: "En Stock - Disponible",
    descripcion:
      "Camarones premium seleccionados, limpios y congelados para conservar su frescura. Perfectos para salteados, pastas y preparaciones gourmet.",
    ingredientes: ["Camarón"],
    nutricional: {
      calorias: "99 kcal",
      proteinas: "24 g",
      carbohidratos: "0.2 g",
      grasas: "0.3 g",
    },
    almacenamiento: "Mantener congelado a -18°C o menos.",
  },
];

const productImages = [
  "https://picsum.photos/seed/donhielo-detail-main/900/700",
  "https://picsum.photos/seed/donhielo-detail-1/400/300",
  "https://picsum.photos/seed/donhielo-detail-2/400/300",
  "https://picsum.photos/seed/donhielo-detail-3/400/300",
];

function ProductDetailPage() {
  const {id} = useParams();
  const {isAuthenticated} = useAuth();
  const {addToCart} = useCart();

  const product = useMemo(() => {
    return (
      productsData.find((item) => item.id === Number(id)) || productsData[0]
    );
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const total = (product.precio * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        nombre: product.nombre,
        detalle: product.unidad,
        precio: product.precio,
        imagen: selectedImage,
      },
      quantity,
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath={isAuthenticated ? "/home" : "/"} />

      <main className="relative px-4 py-8 md:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

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
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-200">
                {product.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-semibold text-black">
                    {product.badge}
                  </span>
                )}

                <img
                  src={selectedImage}
                  alt={product.nombre}
                  className="h-[380px] w-full object-cover md:h-[460px]"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {productImages.slice(1).map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`overflow-hidden rounded-xl border transition ${
                      selectedImage === img
                        ? "border-sky-400"
                        : "border-white/10 hover:border-sky-400/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Vista previa ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
                {product.categoria}
              </span>

              <h1 className="mt-3 text-3xl font-light text-white md:text-4xl">
                {product.nombre}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
                <span className="text-yellow-400">★★★★★</span>
                <span>{product.rating}</span>
                <span>({product.reviews} reseñas)</span>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-light text-sky-400">
                  ${product.precio.toFixed(2)}
                </span>

                {product.precioAnterior && (
                  <span className="pb-1 text-sm text-zinc-500 line-through">
                    ${product.precioAnterior.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-zinc-500">{product.unidad}</p>

              <p className="mt-4 text-sm text-emerald-400">{product.stock}</p>

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

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl bg-yellow-500 px-6 py-4 text-sm font-semibold text-black transition hover:bg-yellow-400"
                >
                  🛒 Agregar al Carro
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl border border-sky-400/30 bg-transparent px-6 py-4 text-sm font-medium text-sky-300 transition hover:border-sky-400 hover:text-sky-200"
                >
                  Comprar ahora
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
                  <p className="text-sm font-medium text-white">Envío rápido</p>
                  <p className="mt-1 text-xs text-zinc-500">Recibe en 24-48h</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
                  <p className="text-sm font-medium text-white">
                    Calidad garantizada
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    100% de satisfacción
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
                  <p className="text-sm font-medium text-white">
                    Producto fresco
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Siempre congelado
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
                  <p className="text-sm font-medium text-white">
                    Atención 24/7
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">Soporte en línea</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-xl shadow-black/20">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h2 className="mb-4 text-sm font-medium text-white">
                  Ingredientes
                </h2>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {product.ingredientes.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-sm font-medium text-white">
                  Información Nutricional
                </h2>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>Calorías: {product.nutricional.calorias}</li>
                  <li>Proteínas: {product.nutricional.proteinas}</li>
                  <li>Carbohidratos: {product.nutricional.carbohidratos}</li>
                  <li>Grasas: {product.nutricional.grasas}</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-sm font-medium text-white">
                  Almacenamiento
                </h2>
                <p className="text-sm leading-7 text-zinc-400">
                  {product.almacenamiento}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;
