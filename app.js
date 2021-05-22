const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const { API_VERSION } = require("./config");

// Load routings
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const estadioRoutes = require("./routes/estadio");
const partidoRoutes = require("./routes/partido");
const paqueteRoutes = require("./routes/paquete");
const abonadoRoutes = require("./routes/abonado");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// Configure Header Https
// .....

// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, estadioRoutes);
app.use(`/api/${API_VERSION}`, partidoRoutes);
app.use(`/api/${API_VERSION}`, paqueteRoutes);
app.use(`/api/${API_VERSION}`, abonadoRoutes);

module.exports = app;