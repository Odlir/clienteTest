const sql = require('../../config/conn');

const Cliente = function(cliente) {
    this.cliente_nombre = cliente.cliente_nombre;
    this.cliente_apellido = cliente.cliente_apellido;
    this.cliente_fecha_nacimiento = cliente.cliente_fecha_nacimiento;
};
Cliente.create = (nuevoCliente, result) => {
    sql.query('INSERT INTO clientes SET ?', nuevoCliente, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('created tutorial: ', { id: res.insertId, ...nuevoCliente });
        result(null, { id: res.insertId, ...nuevoCliente });
    });
};
Cliente.getAll = (result) => {
    let query = 'SELECT * FROM clientes';
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('clientes: ', res);
        result(null, res);
    });
};
Cliente.getAvg = (result) => {
    let query = 'SELECT c.*, TIMESTAMPDIFF(YEAR, c.cliente_fecha_nacimiento, CURDATE()) AS age FROM clientes c';
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('clientes: ', res);
        result(null, res);
    });
};
module.exports = Cliente;
