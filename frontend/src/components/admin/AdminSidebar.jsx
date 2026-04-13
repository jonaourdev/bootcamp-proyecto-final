import {NavLink} from "react-router-dom";
import logoDonHielo from "../../assets/images/logoDonHielo.png";

function AdminSidebar() {
  const baseClass =
    "block rounded-xl px-4 py-3 text-sm transition border border-transparent";
  const activeClass = "bg-sky-500 text-white";
  const inactiveClass =
    "text-zinc-300 hover:bg-white/5 hover:text-sky-400 hover:border-sky-400/20";

  return (
    <aside className="w-full border-b border-white/10 bg-zinc-950/95 p-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="mb-8 flex items-center gap-3">
        <img
          src={logoDonHielo}
          alt="DonHielo"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-white">DonHielo Admin</p>
          <p className="text-xs text-zinc-500">Panel de administración</p>
        </div>
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({isActive}) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/productos"
          className={({isActive}) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/admin/productos/nuevo"
          className={({isActive}) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Agregar producto
        </NavLink>

        <NavLink
          to="/admin/usuarios"
          className={({isActive}) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Usuarios
        </NavLink>

        <NavLink
          to="/admin/carritos"
          className={({isActive}) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Carritos activos
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
