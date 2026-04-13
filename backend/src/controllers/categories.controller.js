const pool = require("../config/db");

const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_categoria, nombre, descripcion
       FROM categorias
       ORDER BY nombre ASC`,
    );

    return res.status(200).json({
      ok: true,
      categories: result.rows,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener categorías",
    });
  }
};

module.exports = {
  getAllCategories,
};
