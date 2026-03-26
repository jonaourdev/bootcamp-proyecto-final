import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import logoDonHielo from "../../images/logoDonHielo.png";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = (data) => {
    console.log("Register data:", data);
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
            className="mb-4 h-14 w-14 rounded-full object-cover shadow-lg shadow-yellow-500/20"
          />

          <h1 className="text-center text-xl font-medium text-white">
            Crear una cuenta nueva
          </h1>

          <p className="mt-1 text-center text-xs text-zinc-400">
            Únete a DonHielo Congelados
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Ingresa un correo válido",
                },
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
              className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
              {...register("confirmPassword", {
                required: "Debes confirmar la contraseña",
                validate: (value) =>
                  value === passwordValue || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
          >
            Crear cuenta
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500">o</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
        >
          <span className="text-base">G</span>
          Registrarse con Google
        </button>

        <p className="mt-5 text-center text-xs text-zinc-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-sky-400 transition hover:text-sky-300"
          >
            Iniciar sesión
          </Link>
        </p>

        <div className="mt-5 text-center text-[10px] leading-4 text-zinc-500">
          <p>
            Al registrarte aceptas nuestros Términos y Condiciones y la Política
            de Privacidad.
          </p>
          <p className="mt-2">
            © 2026 DonHielo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
