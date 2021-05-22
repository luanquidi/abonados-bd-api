const Estadio = require("../models/estadio");

exports.getEstadios = async (req, res) => {
    Estadio.find({}, (err, estadiosStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar los estadios.",
            });
        }

        if (!estadiosStored) {
            return res.status(400).send({
                ok: false,
                message: "No se han podido listar los estadios.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se han listado los estadios correctamente.",
            estadios: estadiosStored,
        });
    });
}

exports.addEstadio = async (req, res) => {
    const { nombre, latitud, longitud, espectadores } = req.body;
    const estadio = new Estadio();
    estadio.nombre = nombre;
    estadio.latitud = latitud;
    estadio.longitud = longitud;
    estadio.espectadores = espectadores;

    estadio.save((err, estadioSaved) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al crear estadio.",
            });
        }

        if (!estadioSaved) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido crear el estadio.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha creado el estadio correctamente.",
            estadio: estadioSaved,
        });
    });


};

exports.editEstadio = async (req, res) => {
    Estadio.findByIdAndUpdate({ _id: req.body.id }, req.body, (err, estadioUpdated) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al editar estadio.",
            });
        }

        if (!estadioUpdated) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido editar el estadio.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha editado el estadio correctamente.",
            product: estadioUpdated,
        });
    });
}

exports.deleteEstadio = async (req, res) => {
    const id = req.body.id;
    Estadio.findByIdAndRemove({ _id: id }, (err, estadioDeleted) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al eliminar estadio.",
            });
        }

        if (!estadioDeleted) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido eliminar el estadio.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha eliminado el estadio correctamente.",
            estadio: estadioDeleted,
        });
    });
}

exports.getEstadio = async (req, res) => {
    const id = req.query.id;
    Estadio.findOne({ _id: id }, (err, estadioFounded) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar estadio.",
            });
        }

        if (!estadioFounded) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido listar el estadio.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha listado el estadio correctamente.",
            estadio: estadioFounded,
        });
    });
}