const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {getProfile} = require("../controllers/users.controller");

router.get("/me", authMiddleware, getProfile);

module.exports = router;
