import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../../context/AuthContext";
import logoDonHielo from "../../images/logoDonHielo.png";

function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    const demoUser = {
      nombre: data.email?.split("@")[0] || "Usuario Demo",
      email: data.email,
    };

    const demoToken = "token-demo-donhielo";

    login(demoUser, demoToken);
    navigate("/home");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <Link
        to="/"
        className="absolute left-4 top-4 z-10 text-xs text-zinc-400 transition hover:text-sky-400"
      >
        ← Volver al inicio
      </Link>

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="mb-6 flex flex-col items-center">
          <img
            src={logoDonHielo}
            alt="DonHielo"
            className="mb-4 h-14 w-14 rounded-full object-cover shadow-lg shadow-sky-500/20"
          />

          <h1 className="text-center text-xl font-medium text-white">
            Iniciar sesión con tu cuenta
          </h1>

          <p className="mt-1 text-center text-xs text-zinc-400">
            DonHielo Congelados
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Correo electrónico o nombre de usuario"
              className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-400"
              {...register("email", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-400"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 4,
                  message: "Ingresa al menos 4 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/recuperar-password"
              className="text-xs text-sky-400 transition hover:text-sky-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-sky-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-400"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500">o</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={() => {
            login(
              {
                nombre: "Usuario Demo",
                email: "demo@donhielo.com",
              },
              "token-demo-donhielo",
            );
            navigate("/home");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
        >
          <span className="text-base">G</span>
          Continuar con Google
        </button>

        <p className="mt-5 text-center text-xs text-zinc-400">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-yellow-400 transition hover:text-yellow-300"
          >
            Crear cuenta
          </Link>
        </p>

        <div className="mt-5 text-center text-[10px] leading-4 text-zinc-500">
          <p>
            Al iniciar sesión aceptas nuestros Términos y Condiciones y la
            Política de Privacidad.
          </p>
          <p className="mt-2">
            © 2026 DonHielo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
