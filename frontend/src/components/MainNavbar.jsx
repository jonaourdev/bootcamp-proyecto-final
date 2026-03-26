import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";
import logoDonHielo from "../assets/images/logoDonHielo.png";

function MainNavbar({homePath}) {
  const navigate = useNavigate();
  const {isAuthenticated, logout} = useAuth();
  const {totalItems} = useCart();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to={homePath} className="flex items-center gap-2">
          <img
            src={logoDonHielo}
            alt="DonHielo"
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-[11px] text-zinc-300 md:flex">
          <Link to={homePath} className="transition hover:text-sky-400">
            HOME
          </Link>

          <Link to="/productos" className="transition hover:text-sky-400">
            PRODUCTOS
          </Link>

          <a href="#nosotros" className="transition hover:text-sky-400">
            NOSOTROS
          </a>

          <a href="#contacto" className="transition hover:text-sky-400">
            CONTÁCTANOS
          </a>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/carrito" className="transition hover:text-sky-400">
                🛒 {totalItems > 0 ? `(${totalItems})` : ""}
              </Link>
              <Link
                to="/perfil"
                className="rounded-full bg-sky-500 px-4 py-2 text-[11px] font-medium text-white transition hover:bg-sky-400"
              >
                Mi Perfil
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-full border border-red-400/30 px-4 py-2 text-[11px] font-medium text-white transition hover:border-red-400 hover:text-red-300"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full border border-sky-400/30 px-4 py-2 text-[11px] font-medium text-white transition hover:border-sky-400 hover:text-sky-400"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-sky-500 px-4 py-2 text-[11px] font-medium text-white transition hover:bg-sky-400"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default MainNavbar;
