import {useEffect, useState} from "react";
import MainNavbar from "../../../components/MainNavbar";
import {useAuth} from "../../../context/AuthContext";
import {getMyProfile} from "../../../services/userService";

function ProfilePage() {
  const {user: authUser, isAuthenticated} = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("PROFILE ERROR:", err);
        setError("No fue posible cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fullName = profile
    ? `${profile.nombre || ""} ${profile.apellido || ""}`.trim()
    : authUser?.nombre || "Usuario";

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath={isAuthenticated ? "/home" : "/"} />

      <main className="relative px-4 py-8 md:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <section className="mb-6 rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-xl shadow-black/20">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/20 text-2xl font-semibold text-sky-300">
                  {fullName.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h1 className="text-2xl font-light text-white">{fullName}</h1>
                  <p className="mt-1 text-sm text-zinc-500">
                    Perfil de usuario
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300">
                {profile?.rol === "admin" ? "Administrador" : "Cliente"}
              </div>
            </div>
          </section>

          {loading && (
            <section className="rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-xl shadow-black/20">
              <p className="text-zinc-400">Cargando perfil...</p>
            </section>
          )}

          {error && !loading && (
            <section className="rounded-2xl border border-red-400/20 bg-zinc-900/95 p-6 shadow-xl shadow-black/20">
              <p className="text-red-400">{error}</p>
            </section>
          )}

          {!loading && !error && profile && (
            <section className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-xl shadow-black/20">
                <h2 className="text-base font-medium text-white">
                  Información personal
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-xs text-zinc-500">Nombre</p>
                    <p className="mt-1 text-sm text-white">{profile.nombre}</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-xs text-zinc-500">Apellido</p>
                    <p className="mt-1 text-sm text-white">
                      {profile.apellido}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-xs text-zinc-500">Correo electrónico</p>
                    <p className="mt-1 text-sm text-white">{profile.email}</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-xs text-zinc-500">Teléfono</p>
                    <p className="mt-1 text-sm text-white">
                      {profile.telefono || "No registrado"}
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-xl shadow-black/20">
                <h2 className="text-base font-medium text-white">
                  Estado de la cuenta
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-xs text-zinc-500">Rol</p>
                    <p className="mt-1 text-sm text-white">{profile.rol}</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-xs text-zinc-500">Estado</p>
                    <p
                      className={`mt-1 text-sm ${
                        profile.activo ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {profile.activo ? "Activo" : "Inactivo"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-xs text-zinc-500">Fecha de registro</p>
                    <p className="mt-1 text-sm text-white">
                      {new Date(profile.fecha_registro).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </article>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
