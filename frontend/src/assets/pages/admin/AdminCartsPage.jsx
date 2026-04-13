import {useEffect, useState} from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import {
  getActiveCarts,
  getCartDetailById,
} from "../../../services/adminService";

function AdminCartsPage() {
  const [carts, setCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const data = await getActiveCarts();
        setCarts(data);
      } catch (error) {
        console.error("ACTIVE CARTS ERROR:", error);
      }
    };

    fetchCarts();
  }, []);

  const handleViewDetail = async (id) => {
    try {
      const data = await getCartDetailById(id);
      setSelectedCart(data);
    } catch (error) {
      console.error("CART DETAIL ERROR:", error);
    }
  };

  return (
    <AdminLayout
      title="Carritos activos"
      subtitle="Monitorea carritos en proceso y sus productos"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-zinc-500">
                <tr className="border-b border-white/10">
                  <th className="px-3 py-3">Carrito</th>
                  <th className="px-3 py-3">Usuario</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Fecha</th>
                  <th className="px-3 py-3">Acción</th>
                </tr>
              </thead>

              <tbody>
                {carts.map((cart) => (
                  <tr
                    key={cart.id_carrito}
                    className="border-b border-white/5 text-zinc-300"
                  >
                    <td className="px-3 py-4">#{cart.id_carrito}</td>
                    <td className="px-3 py-4">
                      {cart.nombre} {cart.apellido}
                    </td>
                    <td className="px-3 py-4">{cart.email}</td>
                    <td className="px-3 py-4">
                      {new Date(cart.fecha_creacion).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4">
                      <button
                        type="button"
                        onClick={() => handleViewDetail(cart.id_carrito)}
                        className="rounded-lg border border-sky-400/20 px-3 py-2 text-xs text-sky-400 transition hover:border-sky-400"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
          <h2 className="text-base font-medium text-white">
            Detalle del carrito
          </h2>

          {!selectedCart ? (
            <p className="mt-4 text-sm text-zinc-500">
              Selecciona un carrito para ver sus productos.
            </p>
          ) : (
            <div className="mt-4">
              <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                <p className="text-sm text-white">
                  #{selectedCart.id_carrito} - {selectedCart.nombre}{" "}
                  {selectedCart.apellido}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {selectedCart.email}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {selectedCart.items?.map((item) => (
                  <div
                    key={item.id_detalle_carrito}
                    className="rounded-xl border border-white/5 bg-black/30 p-4"
                  >
                    <p className="text-sm text-white">{item.producto_nombre}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Cantidad: {item.cantidad}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Precio unitario: $
                      {Number(item.precio_unitario).toFixed(0)}
                    </p>
                    <p className="mt-2 text-sm text-sky-400">
                      Subtotal: ${Number(item.subtotal).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCartsPage;
