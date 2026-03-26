import {Link} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import MainNavbar from "../../../components/MainNavbar";

function LandingLogged() {
  const {user, isAuthenticated, logout} = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath="/" />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

        <section className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-4 text-center md:px-8">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sky-400">
            Bienvenido a DonHielo
          </p>

          <h1 className="text-4xl font-light sm:text-5xl md:text-6xl">
            Hola{user?.nombre ? `, ${user.nombre}` : ""}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Ya iniciaste sesión. Ahora puedes explorar productos, revisar tu
            perfil y gestionar tu carro de compras dentro de la tienda.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/productos"
              className="rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-400"
            >
              Ver productos
            </Link>

            <Link
              to="/carrito"
              className="rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              Ir al carrito
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingLogged;
