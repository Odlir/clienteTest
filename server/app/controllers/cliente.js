const Cliente = require('../models/cliente');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: '¡El contenido no puede estar vacio!'
        });
    }

    const cliente = new Cliente({
        cliente_nombre: req.body.cliente_nombre,
        cliente_apellido: req.body.cliente_apellido,
        cliente_fecha_nacimiento: req.body.cliente_fecha_nacimiento
    });

    Cliente.create(cliente, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || '¡Ocurrio un error al insertar el cliente!'
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Cliente.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || '¡Ocurrio un error al traer los clientes!'
            });
        else res.send(data);
    });
};

exports.findAvg = (req, res) => {
    Cliente.getAvg((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || '¡Ocurrio un error al traer el promedio de las edades de los clientes!'
            });
        } else {
            res.send(data);
        }
    });
};

