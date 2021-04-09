const express = require("express");
const ProductController = require("../controllers/product");
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })

// Middleware
const md_auth = require("../middleware/authenticated");

// Api Router
const api = express.Router();

// User's routing
api.get("/products", ProductController.getProducts);
api.get("/products/get-product", ProductController.getProduct);
api.post("/products/add-product", [md_auth.ensureAuth], upload.array('image'), ProductController.addProduct);
api.post("/products/edit-product", [md_auth.ensureAuth], upload.array('image'), ProductController.editProduct);
api.post("/products/delete-product", [md_auth.ensureAuth], ProductController.deleteProduct);

// Export api
module.exports = api;




