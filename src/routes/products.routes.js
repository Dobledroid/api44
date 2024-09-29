import { Router } from "express";
import {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
  getTotalProducts,
  updateProductById,
  getAllProductsWithRelations,
  getListProductsWithImagen,
  getListProductsWithImagenPrincipal,
  getProductByIdWithImagens,
  getListProductsWithImagenPrincipalAdmin,
  createNewProductCrear,
  getProductByIdEditar,
  getProductByIdWithImagensIonic
} from "../controllers/products.controller";

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { config } from 'dotenv';

// Configurar dotenv para cargar las variables de entorno
config();

// Configurar Cloudinary usando CLOUDINARY_URL
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});
console.log(process.env.CLOUDINARY_URL)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', // Cambia el formato si es necesario
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage: storage });

const router = Router();


router.get("/products", getProducts);

router.get("/list-products", getListProductsWithImagen);

// router.get("/list-products-imagenPrincipal", getListProductsWithImagenPrincipal);
router.get("/list-products-imagenPrincipal-admin", getListProductsWithImagenPrincipalAdmin);

router.get("/products/relations", getAllProductsWithRelations);

// router.post("/products", createNewProduct);
router.post("/products", upload.array('images', 10), createNewProduct);

router.get("/products/count", getTotalProducts);

router.get("/products/:id", getProductById);
router.get("/products-editar/:id", getProductByIdEditar);

router.get("/products-with-imagens/:id", getProductByIdWithImagens);
router.get("/products-with-imagensIonic/:id", getProductByIdWithImagensIonic);


router.delete("/products/:id", deleteProductById);

router.put("/products/:id", upload.array('images', 10), updateProductById);



export default router;
