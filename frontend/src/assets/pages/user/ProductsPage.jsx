import {Link} from "react-router-dom";
import {useMemo, useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import MainNavbar from "../../../components/MainNavbar";
import ProductCard from "../../../components/ProductCard";

const productsData = [
  {
    id: 1,
    nombre: "Hielo en Cubos Premium",
    categoria: "Hielo",
    precio: 40.5,
    rating: 4.8,
    reviews: 124,
    badge: "-15%",
    stock: "Disponible",
  },
  {
    id: 2,
    nombre: "Vegetales Mixtos Congelados",
    categoria: "Vegetales",
    precio: 95.0,
    rating: 4.7,
    reviews: 210,
    badge: null,
    stock: "Disponible",
  },
  {
    id: 3,
    nombre: "Camarones Congelados Premium",
    categoria: "Mariscos",
    precio: 187.0,
    rating: 4.9,
    reviews: 89,
    badge: "-12%",
    stock: "Disponible",
  },
  {
    id: 4,
    nombre: "Pizza Congelada Familiar",
    categoria: "Comida Lista",
    precio: 120.0,
    rating: 4.6,
    reviews: 144,
    badge: null,
    stock: "Disponible",
  },
  {
    id: 5,
    nombre: "Espinaca Congelada",
    categoria: "Vegetales",
    precio: 56.0,
    rating: 4.5,
    reviews: 170,
    badge: null,
    stock: "Disponible",
  },
  {
    id: 6,
    nombre: "Filetes de Pescado",
    categoria: "Mariscos",
    precio: 190.0,
    rating: 4.8,
    reviews: 155,
    badge: "Agotado",
    stock: "Agotado",
  },
  {
    id: 7,
    nombre: "Pollo en Trozos Congelado",
    categoria: "Carnes",
    precio: 120.0,
    rating: 4.7,
    reviews: 243,
    badge: "-20%",
    stock: "Disponible",
  },
  {
    id: 8,
    nombre: "Papas Fritas Pre-cocidas",
    categoria: "Papas",
    precio: 65.0,
    rating: 4.4,
    reviews: 178,
    badge: null,
    stock: "Disponible",
  },
  {
    id: 9,
    nombre: "Fresas Congeladas",
    categoria: "Frutas",
    precio: 95.0,
    rating: 4.9,
    reviews: 192,
    badge: null,
    stock: "Disponible",
  },
  {
    id: 10,
    nombre: "Mezcla de Frutos del Bosque",
    categoria: "Frutas",
    precio: 110.0,
    rating: 4.8,
    reviews: 154,
    badge: null,
    stock: "Disponible",
  },
  {
    id: 11,
    nombre: "Lasaña Congelada",
    categoria: "Comida Lista",
    precio: 135.0,
    rating: 4.6,
    reviews: 128,
    badge: null,
    stock: "Disponible",
  },
  {
    id: 12,
    nombre: "Carne Molida de Res",
    categoria: "Carnes",
    precio: 185.0,
    rating: 4.7,
    reviews: 199,
    badge: null,
    stock: "Disponible",
  },
];

const categories = [
  "Todos",
  "Hielo",
  "Vegetales",
  "Mariscos",
  "Carnes",
  "Papas",
  "Frutas",
  "Comida Lista",
];

function ProductsPage() {
  const {user, isAuthenticated, logout} = useAuth();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" || product.categoria === selectedCategory;

      const matchesSearch = product.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath="/" />

      <main className="relative px-4 py-8 md:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <section className="mb-8">
            <h1 className="text-3xl font-light text-white">
              Todos los Productos
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Descubre nuestra amplia selección de productos congelados de
              calidad premium.
            </p>

            <div className="mt-6">
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-400"
                />
              </div>

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

              <p className="mt-4 text-xs text-zinc-500">
                Mostrando {filteredProducts.length} productos
              </p>
            </div>
          </section>

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductsPage;
