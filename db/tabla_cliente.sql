CREATE TABLE cliente (
cliente_id INT AUTO_INCREMENT PRIMARY KEY,
cliente_nombre VARCHAR(200) NOT NULL,
cliente_apellido VARCHAR(200) NOT NULL,
cliente_fecha_nacimiento TIMESTAMP,
cliente_estado char(1) default '1'
);
