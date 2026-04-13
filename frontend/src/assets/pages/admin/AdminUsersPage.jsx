import {useEffect, useState} from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import {
  getAdminUsers,
  updateAdminUserRole,
  updateAdminUserStatus,
} from "../../../services/adminService";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch (error) {
      console.error("USERS ADMIN ERROR:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, rol) => {
    try {
      await updateAdminUserRole(id, rol);
      fetchUsers();
    } catch (error) {
      console.error("ROLE UPDATE ERROR:", error);
    }
  };

  const handleStatusChange = async (id, activo) => {
    try {
      await updateAdminUserStatus(id, activo);
      fetchUsers();
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);
    }
  };

  return (
    <AdminLayout
      title="Usuarios"
      subtitle="Administra roles y estados de los usuarios registrados"
    >
      <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-zinc-500">
              <tr className="border-b border-white/10">
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Nombre</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Rol</th>
                <th className="px-3 py-3">Estado</th>
                <th className="px-3 py-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id_usuario}
                  className="border-b border-white/5 text-zinc-300"
                >
                  <td className="px-3 py-4">{user.id_usuario}</td>
                  <td className="px-3 py-4">
                    {user.nombre} {user.apellido}
                  </td>
                  <td className="px-3 py-4">{user.email}</td>
                  <td className="px-3 py-4">
                    <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
                      {user.rol}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        user.activo
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleRoleChange(
                            user.id_usuario,
                            user.rol === "admin" ? "cliente" : "admin",
                          )
                        }
                        className="rounded-lg border border-yellow-400/20 px-3 py-2 text-xs text-yellow-400 transition hover:border-yellow-400"
                      >
                        Cambiar rol
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(user.id_usuario, !user.activo)
                        }
                        className="rounded-lg border border-red-400/20 px-3 py-2 text-xs text-red-400 transition hover:border-red-400"
                      >
                        {user.activo ? "Desactivar" : "Activar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminUsersPage;
