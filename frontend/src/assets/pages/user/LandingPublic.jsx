import {Link} from "react-router-dom";
import MainNavbar from "../../../components/MainNavbar";

const heroLeft = "https://picsum.photos/seed/donhielo1/1200/800";
const heroRight = "https://picsum.photos/seed/donhielo2/1200/800";
const carnesImg = "https://picsum.photos/seed/donhielo3/800/600";
const vegetalesImg = "https://picsum.photos/seed/donhielo3/800/600";

const benefits = [
  {
    id: 1,
    icon: "❄️",
    title: "Congelación Rápida",
    text: "Utilizamos tecnología de congelación ultrarrápida para preservar la frescura y calidad de nuestros productos.",
  },
  {
    id: 2,
    icon: "🛡️",
    title: "Calidad Garantizada",
    text: "Todos nuestros productos pasan por estrictos controles de calidad para asegurar la mejor experiencia.",
  },
  {
    id: 3,
    icon: "📦",
    title: "Entrega Segura",
    text: "Trabajamos con logística de frío para que tus productos lleguen en excelentes condiciones.",
  },
  {
    id: 4,
    icon: "🌡️",
    title: "Almacenamiento Óptimo",
    text: "Mantenemos una cadena de frío constante para conservar textura, sabor y calidad.",
  },
];

function LandingPublic() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar homePath="/" />

      <section className="relative">
        <div className="grid min-h-[88vh] grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[44vh] md:min-h-[88vh]">
            <img
              src={heroLeft}
              alt="Pasillo de productos congelados"
              className="h-full w-full object-cover brightness-40"
            />
            <div className="absolute inset-0 border-r border-white/10" />
          </div>

          <div className="relative min-h-[44vh] md:min-h-[88vh]">
            <img
              src={heroRight}
              alt="Frutas congeladas"
              className="h-full w-full object-cover brightness-40"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl font-light leading-none tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
              CALIDAD Y
              <br />
              <span className="font-normal text-sky-400">FRESCURA</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm text-zinc-300 sm:text-base">
              Los mejores productos congelados para tu hogar o negocio.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/productos"
                className="rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                Ver Productos
              </Link>

              <a
                href="#contacto"
                className="rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-yellow-500/20 transition hover:bg-yellow-400"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_center,rgba(14,79,145,0.18),transparent_35%)] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-light sm:text-3xl md:text-4xl">
              LO QUE NOS <span className="text-sky-400">DIFERENCIA</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-sky-400" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-sky-400/10 bg-zinc-950/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-lg">
                  {item.icon}
                </div>

                <h3 className="mb-3 text-base font-medium text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-zinc-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="bg-black px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-2xl font-light sm:text-3xl md:text-4xl">
              NUESTROS <span className="text-yellow-400">PRODUCTOS</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-yellow-400" />
          </div>

          <div className="mb-14 grid items-center gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-zinc-900 shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
              <img
                src={vegetalesImg}
                alt="Vegetales congelados"
                className="h-[260px] w-full object-cover sm:h-[320px]"
              />
            </div>

            <div>
              <span className="text-xs tracking-[0.2em] text-sky-400">
                CALIDAD PREMIUM
              </span>

              <h3 className="mt-3 text-3xl font-light text-white">
                Vegetales Congelados
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                Nuestros vegetales son seleccionados cuidadosamente y congelados
                en su punto óptimo de maduración para conservar nutrientes,
                sabor y textura.
              </p>

              <ul className="mt-6 space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Conservan todos sus nutrientes
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Listos para cocinar
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Sin conservantes artificiales
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Variedad de opciones disponibles
                </li>
              </ul>

              <Link
                to="/productos"
                className="mt-8 inline-block rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                Ver más productos
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="text-xs tracking-[0.2em] text-sky-400">
                CALIDAD PREMIUM
              </span>

              <h3 className="mt-3 text-3xl font-light text-white">
                Carnes Premium
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                Carnes de la más alta calidad, congeladas para mantener su sabor
                y textura original. Perfectas para quienes buscan practicidad y
                buen nivel de producto.
              </p>

              <ul className="mt-6 space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Cortes premium seleccionados
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Empaque al vacío
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Textura ideal al cocinar
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-sky-400">●</span>
                  Diversas presentaciones
                </li>
              </ul>

              <Link
                to="/productos"
                className="mt-8 inline-block rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                Ver más productos
              </Link>
            </div>

            <div className="order-1 overflow-hidden rounded-3xl bg-zinc-900 shadow-[0_14px_30px_rgba(0,0,0,0.28)] lg:order-2">
              <img
                src={carnesImg}
                alt="Carnes premium"
                className="h-[260px] w-full object-cover sm:h-[320px]"
              />
            </div>
          </div>
        </div>
      </section>

      <footer
        id="contacto"
        className="border-t border-white/10 bg-zinc-950 px-4 py-8 text-center md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-base text-white">DonHielo Congelados</p>
          <p className="mt-2 text-sm text-zinc-400">
            Productos congelados con calidad, frescura y confianza.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPublic;
