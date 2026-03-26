import {Link} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import MainNavbar from "../../../components/MainNavbar";

function ProfilePage() {
  const {user, isAuthenticated, logout} = useAuth();

  const profileData = {
    nombre: user?.nombre || "Usuario Demo",
    membresia: "Miembro desde Marzo 2026",
    email: user?.email || "demo@donhielo.com",
    telefono: "+52 123 456 7890",
    direccion: "15 de Abril, 1990",
    ciudad: "Ciudad de México, México",
  };

  const stats = [
    {id: 1, label: "Total de Pedidos", value: "15", color: "text-sky-400"},
    {id: 2, label: "Productos Favoritos", value: "8", color: "text-yellow-400"},
    {id: 3, label: "Puntos de Lealtad", value: "2,450", color: "text-white"},
  ];

  const orders = [
    {
      id: "Pedido #1001",
      date: "25 de Enero, 2025",
      total: "$1.250,00",
      status: "Entregado",
    },
    {
      id: "Pedido #1002",
      date: "15 de Marzo, 2025",
      total: "$1.250,00",
      status: "Enviado",
    },
    {
      id: "Pedido #1003",
      date: "13 de Marzo, 2025",
      total: "$1.250,00",
      status: "Entregado",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath="/" />

      <main className="relative px-4 py-8 md:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <section className="mb-6 rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-2xl font-semibold text-white">
                    O
                  </div>
                  <span className="absolute bottom-1 right-1 rounded-full bg-yellow-400 px-1.5 py-0.5 text-[10px] text-black">
                    12
                  </span>
                </div>

                <div>
                  <h1 className="text-xl font-medium text-white">
                    {profileData.nombre}
                  </h1>
                  <p className="mt-1 text-xs text-zinc-400">
                    {profileData.membresia}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] text-sky-300">
                      Cliente Premium
                    </span>
                    <span className="rounded-full border border-yellow-400/20 bg-yellow-500/10 px-3 py-1 text-[11px] text-yellow-300">
                      15 Pedidos
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to="/editar-perfil"
                  className="inline-block rounded-lg bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-400"
                >
                  Editar Perfil
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
              <h2 className="mb-4 text-sm font-medium text-white">
                Información Personal
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-300">
                  <span className="text-sky-400">✉</span>
                  <span>{profileData.email}</span>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-300">
                  <span className="text-sky-400">☎</span>
                  <span>{profileData.telefono}</span>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-300">
                  <span className="text-sky-400">📅</span>
                  <span>{profileData.direccion}</span>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-300">
                  <span className="text-sky-400">📍</span>
                  <span>{profileData.ciudad}</span>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
              <h2 className="mb-4 text-sm font-medium text-white">
                Estadísticas de Pedidos
              </h2>

              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={`flex items-center justify-between rounded-lg px-4 py-4 ${
                      index === 1
                        ? "border border-yellow-500/20 bg-yellow-500/10"
                        : "border border-white/5 bg-black/40"
                    }`}
                  >
                    <span className="text-sm text-zinc-400">{stat.label}</span>
                    <span className={`text-2xl font-light ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
            <h2 className="mb-4 text-sm font-medium text-white">
              Pedidos Recientes
            </h2>

            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 rounded-xl border border-white/5 bg-black/40 px-4 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{order.id}</p>
                    <p className="mt-1 text-xs text-zinc-500">{order.date}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-sky-400">
                      {order.total}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-400">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Link
                to="/mis-pedidos"
                className="block rounded-lg border border-white/10 px-4 py-3 text-center text-sm text-zinc-400 transition hover:border-sky-400/40 hover:text-sky-400"
              >
                Ver todos los pedidos
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
