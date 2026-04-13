import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({title, subtitle, children}) {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar />

        <div className="flex-1">
          <header className="border-b border-white/10 bg-zinc-950/80 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-light text-white">{title}</h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/home"
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-sky-400/30 hover:text-sky-400"
                >
                  Volver a tienda
                </Link>

                <div className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  {user?.nombre || "Admin"}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-red-400/20 px-4 py-2 text-sm text-white transition hover:border-red-400 hover:text-red-300"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </header>

          <main className="relative p-4 md:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
            </div>

            <div className="relative">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
