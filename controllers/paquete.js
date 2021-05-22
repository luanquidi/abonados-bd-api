const Paquete = require("../models/paquete");

exports.getPaquetes = async (req, res) => {
    Paquete.find({}, (err, paquetesStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar los paquetes.",
            });
        }

        if (!paquetesStored) {
            return res.status(400).send({
                ok: false,
                message: "No se han podido listar los paquetes.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se han listado los paquetes correctamente.",
            paquetes: paquetesStored,
        });
    }).populate('fk_partidos').exec();
}

exports.addPaquete = async (req, res) => {
    const { nombre_paquete, precio, descripcion_paquete, fk_partidos } = req.body;
    const paquete = new Paquete();
    paquete.nombre_paquete = nombre_paquete;
    paquete.precio = precio;
    paquete.descripcion_paquete = descripcion_paquete;
    paquete.fk_partidos = fk_partidos;

    paquete.save((err, paqueteSaved) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al crear paquete.",
            });
        }

        if (!paqueteSaved) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido crear el paquete.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha creado el paquete correctamente.",
            paquete: paqueteSaved,
        });
    });


};

exports.editPaquete = async (req, res) => {
    Paquete.findByIdAndUpdate({ _id: req.body.id }, req.body, (err, paqueteUpdated) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al editar paquete.",
            });
        }

        if (!paqueteUpdated) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido editar el paquete.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha editado el paquete correctamente.",
            paquete: paqueteUpdated,
        });
    });
}

exports.deletePaquete = async (req, res) => {
    const id = req.body.id;
    Paquete.findByIdAndRemove({ _id: id }, (err, paqueteDeleted) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al eliminar paquete.",
            });
        }

        if (!paqueteDeleted) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido eliminar el paquete.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha eliminado el paquete correctamente.",
            paquete: paqueteDeleted,
        });
    });
}

exports.getPaquete = async (req, res) => {
    const id = req.query.id;
    Paquete.findOne({ _id: id }, (err, paqueteFounded) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar paquete.",
            });
        }

        if (!paqueteFounded) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido listar el paquete.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha listado el paquete correctamente.",
            paquete: paqueteFounded,
        });
    }).populate('fk_partidos').exec();
}