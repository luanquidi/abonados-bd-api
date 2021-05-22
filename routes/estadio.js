const express = require("express");
const EstadioController = require("../controllers/estadio");

// Middleware
const md_auth = require("../middleware/authenticated");

// Api Router
const api = express.Router();

// User's routing
api.get("/estadios", EstadioController.getEstadios);
api.get("/estadios/get-estadio", EstadioController.getEstadio);
api.post("/estadios/add-estadio", [md_auth.ensureAuth], EstadioController.addEstadio);
api.post("/estadios/edit-estadio", [md_auth.ensureAuth], EstadioController.editEstadio);
api.post("/estadios/delete-estadio", [md_auth.ensureAuth], EstadioController.deleteEstadio);

// Export api
module.exports = api;




