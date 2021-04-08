const express = require("express");
const UserController = require("../controllers/user");

// Middleware
const md_auth = require("../middleware/authenticated");
const multipart = require("connect-multiparty");
md_upload_avatar = multipart({
    uploadDir: "./uploads/avatar",
});

// Api Router
const api = express.Router();

// User's routing
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);

// Export api
module.exports = api;