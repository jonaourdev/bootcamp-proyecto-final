import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import MainNavbar from "../../../components/MainNavbar";
import {getAllProducts} from "../../../services/productsService";

const categories = [
  "Todos",
  "Hielo",
  "Vegetales",
  "Frutas",
  "Mariscos",
  "Carnes",
  "Comida Lista",
  "Papas",
];

function ProductsPage() {
  const {isAuthenticated} = useAuth();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("ERROR PRODUCTS:", err);
        setError("No fue posible cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        product.categoria_nombre === selectedCategory;

      const matchesSearch = product.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath={isAuthenticated ? "/home" : "/"} />

      <main className="relative px-4 py-8 md:px-8">
        <div className="relative mx-auto max-w-7xl">
          <section className="mb-8">
            <h1 className="text-3xl font-light text-white">
              Todos los Productos
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Descubre nuestra selección de productos congelados.
            </p>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-2xl rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-400"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-2 text-xs transition ${
                        isActive
                          ? "bg-sky-500 text-white"
                          : "border border-white/10 bg-zinc-900 text-zinc-300 hover:border-sky-400/30 hover:text-sky-400"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {loading && <p className="text-zinc-400">Cargando productos...</p>}

          {error && <p className="text-red-400">{error}</p>}

          {!loading && !error && (
            <>
              <p className="mb-4 text-xs text-zinc-500">
                Mostrando {filteredProducts.length} productos
              </p>

              <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id_producto}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-xl shadow-black/20"
                  >
                    <div className="relative flex h-44 items-center justify-center bg-zinc-200 text-zinc-500">
                      {product.imagen_url ? (
                        <img
                          src={product.imagen_url}
                          alt={product.nombre}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl">🖼️</span>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="text-[11px] text-zinc-500">
                        {product.categoria_nombre}
                      </p>

                      <h2 className="mt-1 min-h-[48px] text-sm font-medium text-white">
                        {product.nombre}
                      </h2>

                      <p className="mt-4 text-lg font-light text-sky-400">
                        ${Number(product.precio).toFixed(0)}
                      </p>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <p className="text-xs text-zinc-500">
                          Stock: {product.stock}
                        </p>

                        <Link
                          to={`/productos/${product.id_producto}`}
                          className="text-xs text-sky-400 transition hover:text-sky-300"
                        >
                          Ver detalles →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductsPage;
