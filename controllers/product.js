const Product = require("../models/product");
const cloudinary = require("cloudinary");

exports.getProducts = async (req, res) => {
    Product.find({}, (err, productsStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar los productos.",
            });
        }

        if (!productsStored) {
            return res.status(400).send({
                ok: false,
                message: "No se han podido listar los productos.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se han listado los productos correctamente.",
            products: productsStored,
        });
    });
}

exports.addProduct = async (req, res) => {
    const { name, description, createdAt, price, category, stock } = req.body;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.createdAt = createdAt;
    product.price = price;
    product.category = category;
    product.stock = stock;
    
    if (req.files) {
        let arrayImages = [];
        let arrayImagesNormales = [];
        let cont = 0;
        req.files.forEach(async(item, index) => {
            const imgCloudinary = await cloudinary.v2.uploader.upload(item.path, {
                    eager: [
                        { width: 360, height: 240, crop: "pad" },
                    ]

                },
                function(error, result) {});
            arrayImagesNormales.push(imgCloudinary.url);
            arrayImagesNormales.push(imgCloudinary.eager[0].url);
            arrayImages.push(arrayImagesNormales);
            arrayImagesNormales = [];
            cont++;
            if (req.files.length === cont) {
                product.image = arrayImages;
                product.save((err, productSaved) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: "Error del servidor al crear producto.",
                        });
                    }

                    if (!productSaved) {
                        return res.status(400).send({
                            ok: false,
                            message: "No se ha podido crear el producto.",
                        });
                    }

                    return res.status(200).send({
                        ok: true,
                        message: "Se ha creado el producto correctamente.",
                        product: productSaved,
                    });
                });
            }
        });
    }


};

exports.editProduct = async(req, res) => {
    let arrayImagesNormales = [];
    if (req.files && req.files.length > 0) {
        let cont = 0;
        let arrayImages = [];
        req.files.forEach(async(item, index) => {
            const imgCloudinary = await cloudinary.v2.uploader.upload(item.path, {
                    eager: [
                        { width: 360, height: 240, crop: "pad" },
                    ]
                },
                function(error, result) {});
            arrayImagesNormales.push(imgCloudinary.url);
            arrayImagesNormales.push(imgCloudinary.eager[0].url);
            arrayImages.push(arrayImagesNormales);
            arrayImagesNormales = [];
            cont++;
            if (req.files.length === cont) {
                req.body.image = arrayImages;
                Product.findByIdAndUpdate({ _id: req.body.id }, req.body, (err, productUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: "Error del servidor al editar producto.",
                        });
                    }

                    if (!productUpdated) {
                        return res.status(400).send({
                            ok: false,
                            message: "No se ha podido editar el producto.",
                        });
                    }

                    return res.status(200).send({
                        ok: true,
                        message: "Se ha editado el producto correctamente.",
                        product: productUpdated,
                    });
                });
            }
        });

    } else {
        Product.findByIdAndUpdate({ _id: req.body.id }, req.body, (err, productUpdated) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: "Error del servidor al editar producto.",
                });
            }

            if (!productUpdated) {
                return res.status(400).send({
                    ok: false,
                    message: "No se ha podido editar el producto.",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Se ha editado el producto correctamente.",
                product: productUpdated,
            });
        });
    }





}

exports.deleteProduct = async (req, res) => {
    const id = req.body.id;
    Product.findByIdAndRemove({ _id: id }, (err, productDeleted) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al eliminar producto.",
            });
        }

        if (!productDeleted) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido eliminar el producto.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha eliminado el producto correctamente.",
            product: productDeleted,
        });
    });
}

exports. getProduct = async (req, res)  => {
    const id = req.query.id;
    Product.findOne({ _id: id }, (err, productoFounded) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar producto.",
            });
        }

        if (!productoFounded) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido listar el productos.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha listado el producto correctamente.",
            product: productoFounded,
        });
    });
}
