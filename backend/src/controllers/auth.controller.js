const bcrypt = require("bcrypt");
const pool = require("../config/db");
const {generateToken} = require("../utils/jwt");

//Función de registro controller
const register = async (req, res) => {
  try {
    console.log("body register: ", req.body);
    const {nombre, apellido, email, password, telefono} = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Faltan campos obligatorios",
      });
    }

    const userExits = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE email = $1",
      [email],
    );

    if (userExits.rows.length > 0) {
      return res.status(409).json({
        ok: false,
        message: "El correo ya está registrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, rol, activo)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id_usuario, nombre, apellido, email, telefono, rol`,
      [
        nombre,
        apellido,
        email,
        passwordHash,
        telefono || null,
        "cliente",
        true,
      ],
    );

    const user = result.rows[0];
    const token = generateToken({
      id_usuario: user.id_usuario,
      email: user.email,
      rol: user.rol,
    });

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado existosamente",
      user,
      token,
    });
  } catch (error) {
    console.error("ERROR DE REGISTRO: ", error);
    return res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

//Función de login controller
const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const result = await pool.query(
      `SELECT id_usuario, nombre, apellido, email, password_hash, rol
            FROM usuarios
            WHERE email = $1 AND activo = true`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas!",
      });
    }

    const user = result.rows[0];

    console.log("BODY LOGIN:", req.body);
    console.log("USER FROM DB:", user);
    console.log("PASSWORD FRONT:", password);
    console.log("PASSWORD HASH DB:", user.password_hash);

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    const token = generateToken({
      id_usuario: user.id_usuario,
      email: user.email,
      rol: user.rol,
    });

    return res.status(200).json({
      ok: true,
      message: "Login exitoso",
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR: ", error);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {register, login};
