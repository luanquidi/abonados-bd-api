const express = require("express");
const PaqueteController = require("../controllers/paquete");

// Middleware
const md_auth = require("../middleware/authenticated");

// Api Router
const api = express.Router();

// User's routing
api.get("/paquetes", PaqueteController.getPaquetes);
api.get("/paquetes/get-paquete", PaqueteController.getPaquete);
api.post("/paquetes/add-paquete", [md_auth.ensureAuth], PaqueteController.addPaquete);
api.post("/paquetes/edit-paquete", [md_auth.ensureAuth], PaqueteController.editPaquete);
api.post("/paquetes/delete-paquete", [md_auth.ensureAuth], PaqueteController.deletePaquete);
api.get("/paquetes/paquetes-user", [md_auth.ensureAuth], PaqueteController.getPaquetesByUser);

// Export api
module.exports = api;




