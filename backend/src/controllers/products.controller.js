const pool = require("../config/db");

const getAllProducts = async (req, res) => {
  try {
    const {categoria, search} = req.query;

    let query = `
      SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock,
             p.imagen_url, p.activo, p.id_categoria, c.nombre AS categoria_nombre
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
      WHERE p.activo = true
    `;

    const values = [];
    let count = 1;

    if (categoria) {
      query += ` AND p.id_categoria = $${count}`;
      values.push(categoria);
      count++;
    }

    if (search) {
      query += ` AND LOWER(p.nombre) LIKE LOWER($${count})`;
      values.push(`%${search}%`);
      count++;
    }

    query += ` ORDER BY p.id_producto DESC`;

    const result = await pool.query(query, values);

    return res.status(200).json({
      ok: true,
      products: result.rows,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener productos",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const {id} = req.params;

    const result = await pool.query(
      `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock,
              p.imagen_url, p.activo, p.id_categoria, c.nombre AS categoria_nombre
       FROM productos p
       INNER JOIN categorias c ON p.id_categoria = c.id_categoria
       WHERE p.id_producto = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      product: result.rows[0],
    });
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener producto",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {nombre, descripcion, precio, stock, imagen_url, id_categoria} =
      req.body;

    const result = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, activo, id_categoria)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [nombre, descripcion, precio, stock, imagen_url, true, id_categoria],
    );

    return res.status(201).json({
      ok: true,
      message: "Producto creado correctamente",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al crear producto",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
