const {Pool} = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

pool
  .connect()
  .then((client) => {
    console.log("Conexión a NEON ok");
    client.release();
  })
  .catch((err) => {
    console.log("Error conectandose a NEON: ", err.message);
  });

module.exports = pool;
