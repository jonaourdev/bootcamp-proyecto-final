const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const {id_usuario} = req.user;

    const result = await pool.query(
      `SELECT id_usuario, nombre, apellido, email, telefono, rol, fecha_registro, activo
            FROM usuarios
            WHERE id_usuario = $1`,
      [id_usuario],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("GET PROFILE ERROR: ", error);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {getProfile};
