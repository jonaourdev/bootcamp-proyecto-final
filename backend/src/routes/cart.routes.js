const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getMyCart,
  addItemToCart,
  updateCartItemQuantity,
  deleteCartItem,
} = require("../controllers/cart.controller");

router.get("/", authMiddleware, getMyCart);
router.post("/items", authMiddleware, addItemToCart);
router.put("/items/:id", authMiddleware, updateCartItemQuantity);
router.delete("/items/:id", authMiddleware, deleteCartItem);

module.exports = router;
