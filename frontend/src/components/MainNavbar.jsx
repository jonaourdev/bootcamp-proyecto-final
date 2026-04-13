import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";
import logoDonHielo from "../assets/images/logoDonHielo.png";

function MainNavbar({homePath}) {
  const navigate = useNavigate();
  const {isAuthenticated, logout, user} = useAuth();
  const {totalItems} = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link
          to={homePath}
          className="flex items-center gap-2"
          onClick={handleCloseMenu}
        >
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
              {user?.rol === "admin" ? (
                <Link
                  to="/admin"
                  className="rounded-full border border-yellow-400/30 px-4 py-2 text-[11px] font-medium text-yellow-300 transition hover:border-yellow-400 hover:text-yellow-200"
                >
                  Admin
                </Link>
              ) : (
                <>
                  <Link to="/carrito" className="transition hover:text-sky-400">
                    🛒 {totalItems > 0 ? `(${totalItems})` : ""}
                  </Link>

                  <Link
                    to="/perfil"
                    className="rounded-full bg-sky-500 px-4 py-2 text-[11px] font-medium text-white transition hover:bg-sky-400"
                  >
                    Mi Perfil
                  </Link>
                </>
              )}

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

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-white transition hover:border-sky-400/40 md:hidden"
          aria-label="Abrir menú"
        >
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 bg-white"></span>
            <span className="h-0.5 w-5 bg-white"></span>
            <span className="h-0.5 w-5 bg-white"></span>
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-zinc-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-zinc-300">
            <Link
              to={homePath}
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-sky-400"
            >
              HOME
            </Link>

            <Link
              to="/productos"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-sky-400"
            >
              PRODUCTOS
            </Link>

            <a
              href="#nosotros"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-sky-400"
            >
              NOSOTROS
            </a>

            <a
              href="#contacto"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-sky-400"
            >
              CONTÁCTANOS
            </a>

            <div className="mt-2 h-px bg-white/10"></div>

            {isAuthenticated ? (
              <>
                <Link
                  to="/carrito"
                  onClick={handleCloseMenu}
                  className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-sky-400"
                >
                  🛒 Carrito {totalItems > 0 ? `(${totalItems})` : ""}
                </Link>
                <Link
                  to="/perfil"
                  onClick={handleCloseMenu}
                  className="rounded-lg bg-sky-500 px-3 py-2 text-center font-medium text-white transition hover:bg-sky-400"
                >
                  Mi Perfil
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-red-400/30 px-3 py-2 text-white transition hover:border-red-400 hover:text-red-300"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleCloseMenu}
                  className="rounded-lg border border-sky-400/30 px-3 py-2 text-center font-medium text-white transition hover:border-sky-400 hover:text-sky-400"
                >
                  Iniciar sesión
                </Link>

                <Link
                  to="/register"
                  onClick={handleCloseMenu}
                  className="rounded-lg bg-sky-500 px-3 py-2 text-center font-medium text-white transition hover:bg-sky-400"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default MainNavbar;
