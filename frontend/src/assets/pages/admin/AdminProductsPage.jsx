import {useEffect, useState} from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import {
  deleteAdminProduct,
  getAdminProducts,
} from "../../../services/adminService";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAdminProducts();
      setProducts(data);
    } catch (error) {
      console.error("ADMIN PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAdminProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
    }
  };

  return (
    <AdminLayout
      title="Productos"
      subtitle="Administra el catálogo disponible en la tienda"
    >
      <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
        {loading ? (
          <p className="text-zinc-400">Cargando productos...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-zinc-500">
                <tr className="border-b border-white/10">
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Producto</th>
                  <th className="px-3 py-3">Categoría</th>
                  <th className="px-3 py-3">Precio</th>
                  <th className="px-3 py-3">Stock</th>
                  <th className="px-3 py-3">Estado</th>
                  <th className="px-3 py-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id_producto}
                    className="border-b border-white/5 text-zinc-300"
                  >
                    <td className="px-3 py-4">{product.id_producto}</td>
                    <td className="px-3 py-4">{product.nombre}</td>
                    <td className="px-3 py-4">{product.categoria_nombre}</td>
                    <td className="px-3 py-4">
                      ${Number(product.precio).toFixed(0)}
                    </td>
                    <td className="px-3 py-4">{product.stock}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          product.activo
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {product.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-sky-400/20 px-3 py-2 text-xs text-sky-400 transition hover:border-sky-400"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id_producto)}
                          className="rounded-lg border border-red-400/20 px-3 py-2 text-xs text-red-400 transition hover:border-red-400"
                        >
                          Desactivar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminProductsPage;
