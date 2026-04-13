import {Link} from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminStatCard from "../../../components/admin/AdminStatCard";

function AdminDashboard() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Resumen general de la administración de DonHielo"
    >
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Productos activos"
          value="22"
          hint="Catálogo publicado actualmente"
          accent="sky"
        />
        <AdminStatCard
          title="Usuarios registrados"
          value="18"
          hint="Clientes activos en la plataforma"
          accent="white"
        />
        <AdminStatCard
          title="Carritos activos"
          value="6"
          hint="Carritos en proceso de compra"
          accent="yellow"
        />
        <AdminStatCard
          title="Ventas del día"
          value="$94.500"
          hint="Total preliminar"
          accent="emerald"
        />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <article className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
          <h2 className="text-base font-medium text-white">
            Actividad reciente
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "Nuevo usuario registrado: camila@email.com",
              "Producto agregado: Filete de Salmón",
              "Carrito activo detectado para Usuario #12",
              "Producto actualizado: Papas Fritas Pre-cocidas",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/5 bg-black/30 px-4 py-3 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
          <h2 className="text-base font-medium text-white">Accesos rápidos</h2>

          <div className="mt-5 grid gap-3">
            <Link to="/admin/productos/nuevo">
              <a
                href="/admin/productos/nuevo"
                className="rounded-xl bg-sky-500 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-sky-400"
              >
                Agregar producto
              </a>
            </Link>
            <Link to="/admin/usuarios">
              <a
                href="/admin/usuarios"
                className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-zinc-300 transition hover:border-sky-400/30 hover:text-sky-400"
              >
                Administrar usuarios
              </a>
            </Link>
            <Link to="/admin/carritos">
              <a
                href="/admin/carritos"
                className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-zinc-300 transition hover:border-yellow-400/30 hover:text-yellow-400"
              >
                Ver carritos activos
              </a>
            </Link>
          </div>
        </article>
      </section>
    </AdminLayout>
  );
}

export default AdminDashboard;
