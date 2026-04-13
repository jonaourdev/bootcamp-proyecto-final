import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import AdminLayout from "../../../components/admin/AdminLayout";
import {
  createAdminProduct,
  getCategories,
} from "../../../services/adminService";

function AdminNewProductPage() {
  const [categories, setCategories] = useState([]);
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("CATEGORIES ERROR:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      setServerMessage("");

      await createAdminProduct({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: Number(data.precio),
        stock: Number(data.stock),
        imagen_url: data.imagen_url,
        id_categoria: Number(data.id_categoria),
      });

      setServerMessage("Producto creado correctamente");
      reset();
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);
      setServerMessage("No fue posible crear el producto");
    }
  };

  return (
    <AdminLayout
      title="Agregar producto"
      subtitle="Crea nuevos productos para el catálogo"
    >
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-xl shadow-black/20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Nombre del producto"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              {...register("nombre", {required: "El nombre es obligatorio"})}
            />
            {errors.nombre && (
              <p className="mt-1 text-xs text-red-400">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <textarea
              placeholder="Descripción"
              rows="4"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              {...register("descripcion")}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Precio"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              {...register("precio", {required: "El precio es obligatorio"})}
            />
            {errors.precio && (
              <p className="mt-1 text-xs text-red-400">
                {errors.precio.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Stock"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              {...register("stock", {required: "El stock es obligatorio"})}
            />
            {errors.stock && (
              <p className="mt-1 text-xs text-red-400">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="URL o ruta de imagen"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              {...register("imagen_url")}
            />
          </div>

          <div className="md:col-span-2">
            <select
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              {...register("id_categoria", {
                required: "La categoría es obligatoria",
              })}
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categories.map((category) => (
                <option
                  key={category.id_categoria}
                  value={category.id_categoria}
                >
                  {category.nombre}
                </option>
              ))}
            </select>
            {errors.id_categoria && (
              <p className="mt-1 text-xs text-red-400">
                {errors.id_categoria.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-400 disabled:opacity-70"
            >
              {isSubmitting ? "Guardando..." : "Guardar producto"}
            </button>

            {serverMessage && (
              <p className="text-sm text-zinc-400">{serverMessage}</p>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminNewProductPage;
