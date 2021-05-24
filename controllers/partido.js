const Partido = require("../models/partido");

exports.getPartidos = async (req, res) => {
    Partido.find({}, (err, partidosStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar los partidos.",
            });
        }

        if (!partidosStored) {
            return res.status(400).send({
                ok: false,
                message: "No se han podido listar los partidos.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se han listado los partidos correctamente.",
            partidos: partidosStored,
        });
    }).populate('fk_estadio').exec();
}

exports.addPartido = async (req, res) => {
    const { fecha_partido, hora, equipo_local, equipo_visita } = req.body;
    const partido = new Partido();
    
    partido.fecha_partido = fecha_partido;
    partido.hora = hora;
    partido.equipo_local = equipo_local;
    partido.equipo_visita = equipo_visita;

    console.log(partido);
    partido.save((err, partidoSaved) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al crear partido.",
            });
        }

        if (!partidoSaved) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido crear el partido.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha creado el partido correctamente.",
            partido: partidoSaved,
        });
    });


};

exports.editPartido = async (req, res) => {
    Partido.findByIdAndUpdate({ _id: req.body.id }, req.body, (err, partidoUpdated) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al editar partido.",
            });
        }

        if (!partidoUpdated) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido editar el partido.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha editado el partido correctamente.",
            partido: partidoUpdated,
        });
    });
}

exports.deletePartido = async (req, res) => {
    const id = req.body.id;
    Partido.findByIdAndRemove({ _id: id }, (err, partidoDeleted) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al eliminar partido.",
            });
        }

        if (!partidoDeleted) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido eliminar el partido.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha eliminado el partido correctamente.",
            partido: partidoDeleted,
        });
    });
}

exports.getPartido = async (req, res) => {
    const id = req.query.id;
    Partido.findOne({ _id: id }, (err, partidoFounded) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: "Error del servidor al listar partido.",
            });
        }

        if (!partidoFounded) {
            return res.status(400).send({
                ok: false,
                message: "No se ha podido listar el partido.",
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Se ha listado el partido correctamente.",
            partido: partidoFounded,
        });
    });
}
