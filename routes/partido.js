const express = require("express");
const PartidoController = require("../controllers/partido");

// Middleware
const md_auth = require("../middleware/authenticated");

// Api Router
const api = express.Router();

// User's routing
api.get("/partidos", PartidoController.getPartidos);
api.get("/partidos/get-partido", PartidoController.getPartido);
api.post("/partidos/add-partido", [md_auth.ensureAuth], PartidoController.addPartido);
api.post("/partidos/edit-partido", [md_auth.ensureAuth], PartidoController.editPartido);
api.post("/partidos/delete-partido", [md_auth.ensureAuth], PartidoController.deletePartido);

// Export api
module.exports = api;




