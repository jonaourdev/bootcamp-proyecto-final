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

    if (!nombre || !precio || stock === undefined || !id_categoria) {
      return res.status(400).json({
        ok: false,
        message: "Faltan campos obligatorios del producto",
      });
    }

    const categoryResult = await pool.query(
      `SELECT id_categoria FROM categorias WHERE id_categoria = $1`,
      [id_categoria],
    );

    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "La categoría no existe",
      });
    }

    const result = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, activo, id_categoria)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        nombre,
        descripcion || null,
        precio,
        stock,
        imagen_url || null,
        true,
        id_categoria,
      ],
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

const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      nombre,
      descripcion,
      precio,
      stock,
      imagen_url,
      id_categoria,
      activo,
    } = req.body;

    const existingProduct = await pool.query(
      `SELECT id_producto FROM productos WHERE id_producto = $1`,
      [id],
    );

    if (existingProduct.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    const result = await pool.query(
      `UPDATE productos
       SET nombre = $1,
           descripcion = $2,
           precio = $3,
           stock = $4,
           imagen_url = $5,
           id_categoria = $6,
           activo = $7
       WHERE id_producto = $8
       RETURNING *`,
      [
        nombre,
        descripcion,
        precio,
        stock,
        imagen_url,
        id_categoria,
        activo,
        id,
      ],
    );

    return res.status(200).json({
      ok: true,
      message: "Producto actualizado correctamente",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar producto",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;

    const result = await pool.query(
      `UPDATE productos
       SET activo = false
       WHERE id_producto = $1
       RETURNING *`,
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
      message: "Producto desactivado correctamente",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al desactivar producto",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
