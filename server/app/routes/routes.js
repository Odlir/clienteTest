module.exports = app => {
    const clientes = require('../controllers/cliente');
    const router = require('express').Router();

    router.post('/', clientes.create);
    router.get('/', clientes.findAll);
    router.get('/avg', clientes.findAvg);

    app.use('/api/clientes', router);
};
