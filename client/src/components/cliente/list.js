import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../../services/conf";

export default function List() {
    const [clientes, setClientes] = useState([]);
    const [avgAge, setAvgAge] = useState(0);

    useEffect(()=>{
        fetchClientes();
        fetchAvgAgeClientes();
    },[]);

    const fetchClientes = async () => {
        await axios.get(`${BASE_URL}api/clientes`).then(({data})=>{
            setClientes(data)
        })
    }

    const fetchAvgAgeClientes = async () => {
        await axios.get(`${BASE_URL}api/clientes/avg`).then(({data})=>{
            setAvgAge(data.reduce((acc, b) => acc + b.age, 0));
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className='col-12'>
                    <span>El promedio de las edades es {avgAge/clientes.length}</span>
                    <Link className='btn btn-primary mb-2 float-end' to={"/cliente/create"}>
                        Nuevo Cliente
                    </Link>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered text-center">
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Fecha Nacimiento</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    clientes.length > 0 && (
                                        clientes.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.cliente_nombre}</td>
                                                <td>{row.cliente_apellido}</td>
                                                <td>{new Date(row.cliente_fecha_nacimiento).toLocaleDateString()}</td>
                                                <td>
                                                    <Link to={`/cliente/edit/${row.cliente_id}`} className='btn btn-success me-2'>
                                                        Editar
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
