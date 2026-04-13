const pool = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_usuario, nombre, apellido, email, telefono, rol, fecha_registro, activo
       FROM usuarios
       ORDER BY id_usuario DESC`,
    );

    return res.status(200).json({
      ok: true,
      users: result.rows,
    });
  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener usuarios",
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const {id} = req.params;
    const {rol} = req.body;

    if (!rol || !["admin", "cliente"].includes(rol)) {
      return res.status(400).json({
        ok: false,
        message: "Rol inválido",
      });
    }

    const result = await pool.query(
      `UPDATE usuarios
       SET rol = $1
       WHERE id_usuario = $2
       RETURNING id_usuario, nombre, apellido, email, rol, activo`,
      [rol, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Rol actualizado correctamente",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE USER ROLE ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar rol",
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const {activo} = req.body;

    if (typeof activo !== "boolean") {
      return res.status(400).json({
        ok: false,
        message: "El estado activo debe ser booleano",
      });
    }

    const result = await pool.query(
      `UPDATE usuarios
       SET activo = $1
       WHERE id_usuario = $2
       RETURNING id_usuario, nombre, apellido, email, rol, activo`,
      [activo, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Estado del usuario actualizado",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE USER STATUS ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar estado del usuario",
    });
  }
};

const getActiveCarts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         c.id_carrito,
         c.id_usuario,
         c.fecha_creacion,
         c.estado,
         u.nombre,
         u.apellido,
         u.email
       FROM carritos c
       INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
       WHERE c.estado = 'activo'
       ORDER BY c.fecha_creacion DESC`,
    );

    return res.status(200).json({
      ok: true,
      carts: result.rows,
    });
  } catch (error) {
    console.error("GET ACTIVE CARTS ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener carritos activos",
    });
  }
};

const getCartDetailById = async (req, res) => {
  try {
    const {id} = req.params;

    const cartResult = await pool.query(
      `SELECT 
         c.id_carrito,
         c.id_usuario,
         c.fecha_creacion,
         c.estado,
         u.nombre,
         u.apellido,
         u.email
       FROM carritos c
       INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
       WHERE c.id_carrito = $1`,
      [id],
    );

    if (cartResult.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Carrito no encontrado",
      });
    }

    const itemsResult = await pool.query(
      `SELECT 
         dc.id_detalle_carrito,
         dc.id_producto,
         dc.cantidad,
         dc.precio_unitario,
         p.nombre AS producto_nombre,
         (dc.cantidad * dc.precio_unitario) AS subtotal
       FROM detalle_carrito dc
       INNER JOIN productos p ON dc.id_producto = p.id_producto
       WHERE dc.id_carrito = $1`,
      [id],
    );

    return res.status(200).json({
      ok: true,
      cart: {
        ...cartResult.rows[0],
        items: itemsResult.rows,
      },
    });
  } catch (error) {
    console.error("GET CART DETAIL ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener detalle del carrito",
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  getActiveCarts,
  getCartDetailById,
};
