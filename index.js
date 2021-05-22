const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const uuid = require('uuid/v4');
const path = require('path');
const multer = require('multer');
const app = require("./app");
const port = process.env.PORT || 3977;
const {
  API_VERSION,
  IP_SERVER,
  PORT_DB,
  USER_DB,
  PASSWORD_DB,
} = require("./config");


// =================================================== URL CONEXIÓN A MONGO ==========================================================
const urlDatabaseProd = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0-2dg8m.mongodb.net/abonados?retryWrites=true&w=majority`;
mongoose.set("useFindAndModify", false);


// =================================================== CLOUDINARY CREDENCIALES ==========================================================
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
      cb(null, uuid() + path.extname(file.originalname));
  }
});

cloudinary.config({
  cloud_name: 'dxc1pkofx',
  api_key: '338795214563965',
  api_secret: 'DAcYKBN2cgJPAFjhIc1f6YAVm3g'
});
// =================================================== CLOUDINARY CREDENCIALES ==========================================================


// =================================================== CONEXIÓN A MONGO =================================================================
mongoose.connect(
  urlDatabaseProd,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err, res) => {
    if (err) throw err;

    console.log("La conexión a la base de datos es correcta.");

    app.listen(port, () => {
      console.log("####################");
      console.log("##### API REST #####");
      console.log("####################");
      console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
    });
  }
);