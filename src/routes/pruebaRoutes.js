const express = require("express");
const router = express.Router();

// Ruta para la prueba
router.get("/ruta", (req, res) => {
  res.send("¡Hola, esta es la ruta de prueba!");
});

module.exports = router;
