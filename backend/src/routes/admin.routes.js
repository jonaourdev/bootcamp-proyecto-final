const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  getActiveCarts,
  getCartDetailById,
} = require("../controllers/admin.controller");

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.patch(
  "/users/:id/role",
  authMiddleware,
  adminMiddleware,
  updateUserRole,
);
router.patch(
  "/users/:id/status",
  authMiddleware,
  adminMiddleware,
  updateUserStatus,
);

router.get("/carts/active", authMiddleware, adminMiddleware, getActiveCarts);
router.get("/carts/:id", authMiddleware, adminMiddleware, getCartDetailById);

module.exports = router;
