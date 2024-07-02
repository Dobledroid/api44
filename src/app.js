import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import categoriasProdutosRoutes from "./routes/categoriasProductos.routes";
import subcategoriasProductosRoutes from "./routes/subcategoriasProductos.routes";
import marcasProductos from "./routes/marcasProductos.routes";
import TokenRoutes from "./routes/token.routes";
import emailRoutes from "./routes/email.routes";
import sendMethod from "./routes/send.routes";
import estadoCuentaRoutes from "./routes/estadoCuenta.routes";
import estadoUsuarioRoutes from "./routes/estadoUsuario.routes";
// import cloudinaryRoutes from "./routes/cloudinary.routes";
import morgan from "morgan";

import config from "./config";

const app = express();

// settings
app.set("port", config.port);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Manejo de la ruta raíz
app.get("/", (req, res) => {
  res.send("¡Hola, este es mi servidor API!");
});

app.get("/api", (req, res) => {
  res.send("¡APIw!");
});

app.get("/users", (req, res) => {
  res.send("Obteniendo información del usuario!");
});


// Routes
app.use("/api", productRoutes);
app.use("/api", usersRoutes);
app.use("/api", emailRoutes);
app.use("/api", sendMethod);
// app.use("/api", cloudinaryRoutes);
app.use("/api", TokenRoutes);
app.use("/api", categoriasProdutosRoutes);
app.use("/api", subcategoriasProductosRoutes);
app.use("/api", marcasProductos);
app.use("/api", estadoCuentaRoutes);
app.use("/api", estadoUsuarioRoutes);

export { app };