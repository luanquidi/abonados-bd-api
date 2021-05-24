const { path } = require("../app");
const { populate } = require("../models/abonado");
const Abonado = require("../models/abonado");

exports.getAbonados = async (req, res) => {
   const ok = await Abonado.find({}, (err, abonadosStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar los abonados.",
            });
        }

        if (!abonadosStored) {
            return res.status(400).send({
                ok: false,
                message: "No se han podido listar los abonados.",
            });
        }

        abonadosStored[0].fk_usuario.password = ':)';

        return res.status(200).send({
            ok: true,
            message: "Se han listado los abonados correctamente.",
            abonados: abonadosStored,
        });

    }).populate({path:'fk_usuario fk_paquete fk_partidos', populate: {
        path: 'fk_partidos'
    }}).exec();
}

exports.addAbonado = async (req, res) => {
    const { fk_usuario, fk_paquete } = req.body;
    const abonado = new Abonado();
    abonado.fk_usuario = fk_usuario;
    abonado.fk_paquete = fk_paquete;

    abonado.save((err, abonadoSaved) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al crear abonado.",
            });
        }

        if (!abonadoSaved) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido crear el abonado.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha creado el abonado correctamente.",
            abonado: abonadoSaved,
        });
    });


};

exports.editAbonado = async (req, res) => {
    Abonado.findByIdAndUpdate({ _id: req.body.id }, req.body, (err, abonadoUpdated) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al editar abonado.",
            });
        }

        if (!abonadoUpdated) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido editar el abonado.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha editado el abonado correctamente.",
            abonado: abonadoUpdated,
        });
    });
}

exports.deleteAbonado = async (req, res) => {
    const id = req.body.id;
    Abonado.findByIdAndRemove({ _id: id }, (err, abonadoDeleted) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al eliminar abonado.",
            });
        }

        if (!abonadoDeleted) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido eliminar el abonado.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha eliminado el abonado correctamente.",
            abonado: abonadoDeleted,
        });
    });
}

exports.getAbonado = async (req, res) => {
    const id = req.query.id;
    Abonado.findOne({ _id: id }, (err, abonadoFounded) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar abonado.",
            });
        }

        if (!abonadoFounded) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido listar el abonado.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha listado el abonado correctamente.",
            abonado: abonadoFounded,
        });
    }).populate({path: 'fk_usuario fk_paquete', populate: {
        path: 'fk_partidos'
    }}).exec();
}

exports.getAbonosByUser = async (req, res) => {
    const idUser = req.query.id;
    Abonado.find({ fk_usuario: idUser }, (err, abonadosFounded) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar abonado.",
            });
        }

        if (!abonadosFounded) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido listar el abonado.",
            });
        }
        abonadosFounded[0].fk_usuario.password = ':)';
        return res.status(200).send({
            ok: true,
            message: "Se han listado los abonos.",
            abonos: abonadosFounded,
        });
    }).populate({path:'fk_usuario fk_paquete', populate: {
        path: 'fk_partidos', populate: {
            path: 'fk_estadio'
        }
    }}).exec();
}