const express = require("express");
const AbonadoController = require("../controllers/abonado");

// Middleware
const md_auth = require("../middleware/authenticated");

// Api Router
const api = express.Router();

// User's routing
api.get("/abonados", AbonadoController.getAbonados);
api.get("/abonados/get-abonado", AbonadoController.getAbonado);
api.post("/abonados/add-abonado", [md_auth.ensureAuth], AbonadoController.addAbonado);
api.post("/abonados/edit-abonado", [md_auth.ensureAuth], AbonadoController.editAbonado);
api.post("/abonados/delete-abonado", [md_auth.ensureAuth], AbonadoController.deleteAbonado);

// Export api
module.exports = api;
