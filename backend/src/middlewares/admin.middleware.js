const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user || req.user.rol !== "admin") {
      return res.status(403).json({
        ok: false,
        message: "Acceso denegado. Solo administradores.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = adminMiddleware;
