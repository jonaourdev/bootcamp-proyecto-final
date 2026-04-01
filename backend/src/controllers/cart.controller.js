const pool = require("../config/db");

const getOrCreateCart = async (id_usuario) => {
  let cartResult = await pool.query(
    `SELECT * FROM carritos WHERE id_usuario = $1 AND estado = 'activo' LIMIT 1`,
    [id_usuario],
  );

  if (cartResult.rows.length > 0) {
    return cartResult.rows[0];
  }

  cartResult = await pool.query(
    `INSERT INTO carritos (id_usuario, estado)
    values ($1, 'activo')
    RETURNING *`,
    [id_usuario],
  );

  return cartResult.rows[0];
};

const getMyCart = async (req, res) => {
  try {
    const {id_usuario} = req.user;

    const cart = await getOrCreateCart(id_usuario);

    const itemsResult = await pool.query(
      `SELECT dc.id_detalle_carrito, dc.id_producto, dc.cantidad, dc.precio_unitario,
              p.nombre, p.imagen_url,
              (dc.cantidad * dc.precio_unitario) AS subtotal
       FROM detalle_carrito dc
       INNER JOIN productos p ON dc.id_producto = p.id_producto
       WHERE dc.id_carrito = $1`,
      [cart.id_carrito],
    );

    return res.status(200).json({
      ok: true,
      cart: {
        ...cart,
        items: itemsResult.rows,
      },
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener carrito",
    });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const {id_usuario} = req.user;
    const {id_producto, cantidad} = req.body;

    const cart = await getOrCreateCart(id_usuario);

    const productResult = await pool.query(
      `SELECT id_producto, precio, stock FROM productos WHERE id_producto = $1 AND activo = true`,
      [id_producto],
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    const product = productResult.rows[0];

    const existingItem = await pool.query(
      `SELECT * FROM detalle_carrito
       WHERE id_carrito = $1 AND id_producto = $2`,
      [cart.id_carrito, id_producto],
    );

    if (existingItem.rows.length > 0) {
      const updated = await pool.query(
        `UPDATE detalle_carrito
         SET cantidad = cantidad + $1
         WHERE id_carrito = $2 AND id_producto = $3
         RETURNING *`,
        [cantidad, cart.id_carrito, id_producto],
      );

      return res.status(200).json({
        ok: true,
        message: "Cantidad actualizada en carrito",
        item: updated.rows[0],
      });
    }

    const result = await pool.query(
      `INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, precio_unitario)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [cart.id_carrito, id_producto, cantidad, product.precio],
    );

    return res.status(201).json({
      ok: true,
      message: "Producto agregado al carrito",
      item: result.rows[0],
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al agregar producto al carrito",
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const {id} = req.params;
    const {cantidad} = req.body;

    const result = await pool.query(
      `UPDATE detalle_carrito
       SET cantidad = $1
       WHERE id_detalle_carrito = $2
       RETURNING *`,
      [cantidad, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Item del carrito no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Cantidad actualizada",
      item: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE CART ITEM ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar item",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const {id} = req.params;

    const result = await pool.query(
      `DELETE FROM detalle_carrito
       WHERE id_detalle_carrito = $1
       RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Item no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Producto eliminado del carrito",
    });
  } catch (error) {
    console.error("DELETE CART ITEM ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar item",
    });
  }
};

module.exports = {
  getMyCart,
  addItemToCart,
  updateCartItemQuantity,
  deleteCartItem,
};
